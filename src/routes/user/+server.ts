import { LASTFM_API_KEY } from '$env/static/private';
import type { Album } from '$lib/interfaces/Album';
import { redirect } from '@sveltejs/kit';
import placeholder from '$lib/img/placeholder.png'

export async function POST({ request }) {
	const form = await request.formData();
	const user = form.get('user');
	const limit = form.get('limit');
	const period = form.get('period');

	const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${user}&limit=${limit}&period=${period}&api_key=${LASTFM_API_KEY}&format=json`);
	const data = await response.json();

	const albums: Album[] = await Promise.all(data.topalbums.album.map(async (album: any) => {
		const coverResponse = await fetch(`https://coverartarchive.org/release/${album.mbid}`);

		if (!coverResponse.ok) {
			return {
				mbid: album.mbid,
				name: album.name,
				artist: {
					name: album.artist.name,
				},
				images: {
					image: placeholder
				}
			};
		}

		const coverData = await coverResponse.json();
		return {
			mbid: album.mbid,
			name: album.name,
			artist: {
				name: album.artist.name,
			},
			images: {
				image: coverData.images[0]?.image || placeholder
			}
		};
	}));

	const albumsURI = encodeURIComponent(JSON.stringify(albums));
	return redirect(303, `/callback?albums=${albumsURI}`);
}
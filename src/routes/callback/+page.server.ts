import type { PageServerLoad } from './$types';

export const load : PageServerLoad = async ({ url }) => {
	const albumsURL = url.searchParams.get('albums');
	const albums = albumsURL ? JSON.parse(decodeURIComponent(albumsURL)) : [];
	return {
		albums: albums
	};
}
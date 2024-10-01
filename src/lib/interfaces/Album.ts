import type { Artist } from '$lib/interfaces/Artist';
import type { Images } from '$lib/interfaces/Images';

export interface Album {
	mbid: string;
	name: string;
	artist: Artist;
	images : Images;
}
<script lang="ts">
	import type { Album } from '$lib/interfaces/Album';
	import { onMount } from 'svelte';

	export let data;
	const albums: Album[] = data.albums;

	let canvas: HTMLCanvasElement;
	let downloadLink: HTMLAnchorElement;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		const imagePromises = albums.map(album => {
			return new Promise<HTMLImageElement>((resolve) => {
				const img = new Image();
				img.crossOrigin = 'Anonymous';
				img.src = album.images.image;
				img.onload = () => resolve(img);
			});
		});

		Promise.all(imagePromises).then(images => {
			const cols = 3;
			const rows = Math.ceil(images.length / cols);
			const imgWidth = canvas.width / cols;
			const imgHeight = canvas.height / rows;

			images.forEach((img, index) => {
				const x = (index % cols) * imgWidth;
				const y = Math.floor(index / cols) * imgHeight;
				ctx.drawImage(img, x, y, imgWidth, imgHeight);
				ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
				ctx.fillRect(x, y + imgHeight - 40, imgWidth, 40);
				ctx.fillStyle = 'white';
				ctx.font = '12px Arial';
				ctx.fillText(albums[index].name, x + 5, y + imgHeight - 25);
				ctx.fillText(albums[index].artist.name, x + 5, y + imgHeight - 10);
			});

			downloadLink.href = canvas.toDataURL('image/png');
			downloadLink.download = 'mosaic.png';
		});
	});

	function preventDownload(event: MouseEvent) {
		event.preventDefault();
	}
</script>
<div class="grid grid-cols-3 gap-0 select-none p-5">
	{#each albums as album}
		<div class="relative">
			<img class="w-full h-full object-cover" src={album.images.image} alt="cover" on:contextmenu={preventDownload} on:dragstart={preventDownload}>
			<div class="absolute inset-0" on:contextmenu={preventDownload} on:dragstart={preventDownload}></div>
			<p class="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-sm p-1">{album.name}</p>
			<p class="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-sm p-1">{album.artist.name}</p>
		</div>
	{/each}
</div>

<canvas bind:this={canvas} width="900" height="900" class="hidden"></canvas>

<div class="flex justify-center mt-4">
	<a bind:this={downloadLink} class="btn btn-primary">Download Mosaic</a>
</div>
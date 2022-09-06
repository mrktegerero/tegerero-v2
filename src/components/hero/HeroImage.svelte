<script lang="ts">
	import IconSvelte from '$components/icons/IconSvelte.svelte';

	export let img;
	export let desktop: boolean = false;
</script>

<div class="right-0 lg:pt-80 lg:hidden z-0" class:image-container-desktop={desktop}>
	<div class="relative">
		<div class="" class:image-bg-desktop={desktop}>
			<img src={img} alt="" class="w-full" class:image-desktop={desktop} />
		</div>
		<div class="absolute top-96 left-[-2] p-7 bg-darker-bg rounded-full z-50">
			<div class="w-14 text-[#ef4823]"><IconSvelte /></div>
		</div>
	</div>
</div>

<style lang="postcss">
	.image-container-desktop {
		@apply absolute bottom-0 hidden lg:block;
	}

	.image-bg-desktop {
		@apply relative cursor-pointer;
		@apply after:content-[''] after:h-[40rem] after:w-[40rem] after:absolute after:bottom-20 after:right-12 after:rounded-full;
	}

	.image-bg-desktop::after {
		background-image: linear-gradient(to right bottom, #28292d, #2d2e32);
	}

	.image-desktop {
		@apply relative block z-10;
	}
</style>

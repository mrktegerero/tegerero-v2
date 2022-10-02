<script lang="ts">
	import IconJs from '$components/icons/IconJs.svelte';
import IconReact from '$components/icons/IconReact.svelte';

	import IconSvelte from '$components/icons/IconSvelte.svelte';

	export let img;
	export let desktop: boolean = false;
</script>

<div class="right-0 lg:pt-80 lg:hidden z-0 " class:image-container-desktop={desktop}>
	<div class="relative">
		<div class="" class:image-bg-desktop={desktop}>
			<img src={img} alt="" class="w-full" class:image-desktop={desktop} />
		</div>
		<div class="absolute top-24 left-16 lg:left-[40rem] p-3 bg-[#25262A] rounded-full z-40" />
		<div class="absolute top-40 right-20 lg:right-0 p-6 bg-darker-bg rounded-full z-40 shadow-2xl">
			<div class="w-8 animate-[wiggle_4s_ease-in-out_infinite]"><IconReact /></div>
		</div>
		<div class="absolute top-80 lg:top-96 left-[-2] p-7 bg-darker-bg rounded-full z-40 shadow-2xl">
			<div class="w-14 text-[#ef4823] animate-[wiggle_4s_ease-in-out_infinite]"><IconSvelte /></div>
		</div>
		<div class="absolute top-[20rem] md:top-[25rem] lg:top-[30rem] right-0 p-9 bg-darker-bg rounded-full z-40">
			<div class="w-16 text-[#FFD600] animate-[wiggle_4s_ease-in-out_infinite]"><IconJs /></div>
		</div>
		<div class="absolute top-[15rem] md:top-[20rem] lg:top-[30rem] right-10 lg:right-0 lg:left-[43rem] p-1 bg-[#64F4AC] rounded-full z-40" />
	</div>
</div>

<style lang="postcss">
	.image-container-desktop {
		@apply absolute bottom-0 hidden lg:block;
	}

	.image-bg-desktop {
		@apply relative;
		@apply after:content-[''] after:h-[40rem] after:w-[40rem] after:absolute after:bottom-20 after:right-12 after:rounded-full;
	}

	.image-bg-desktop::after {
		background-image: linear-gradient(to right bottom, #28292d, #2d2e32);
	}

	.image-desktop {
		@apply relative block z-10;
	}
</style>

<script lang="ts">
	export let element: Element = undefined;
	export let id: string = undefined;
	let classes: string = '';
	export { classes as class };
	export let wide = false;
	export let fluid = false;
	export let gutters = false;
	export let background: string | undefined = undefined;
	$: img = background ? `url('${background?.replaceAll('\\', '/')}')` : '';
</script>

<div class="bg-cover {classes} try" style:background-image={img} {id} bind:this={element}>
	<div class="mx-auto" class:default={!wide} class:wide class:gutters class:fluid><slot /></div>
</div>

<style lang="postcss">
	.default {
		@apply max-w-screen-xl;
	}
	.wide {
		@apply max-w-screen-2xl;
	}

	.fluid {
		@apply max-w-none;
	}

	/* Probably want to expand on this to include breakpoint-based gutter settings */

	.gutters {
		@apply px-[1rem] lg:px-[7rem] 3xl:px-[1rem];
	}

	.try {
		@apply visible opacity-100;
	}
</style>

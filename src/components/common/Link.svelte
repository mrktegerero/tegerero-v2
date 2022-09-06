<script lang="ts">
	export let href: string = '';
	export let label: string = '';
	export let newTab: boolean = false;
	export let large: boolean = false;
	export let largeHeight: boolean = false;
	let classes: string = '';
	export { classes as class };
</script>

{#if newTab}
	<a class="link {classes}" class:large class:large-height={largeHeight} target="_blank" {href}>
		{label}</a
	>
{:else}
	<a class="link {classes}" class:large class:large-height={largeHeight} {href}> {label}</a>
{/if}

<style lang="postcss">
	.link {
		@apply text-primary inline-block relative;
		@apply after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0.5 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out;
		@apply hover:after:scale-x-[1] hover:after:origin-bottom-left;
	}

	.large {
		@apply after:bottom-1.5 after:h-0.5;
	}

	.large-height {
		@apply after:h-0.5;
	}
</style>

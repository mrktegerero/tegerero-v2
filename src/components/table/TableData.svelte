<script lang="ts">
	import IconGithub from '$components/icons/IconGithub.svelte';
	import IconLink from '$components/icons/IconLink.svelte';

	export let github: string = undefined;
	export let link: string = undefined;
</script>

<td class="data text-xl py-3"
	><slot />

	{#if github || link}
		<div class="flex">
			{#if link}
				<a href={link}><div class="w-5 mx-1 icon"><IconLink /></div> </a>
			{/if}
			{#if github}
				<a href={github}><div class="w-5 mx-1 icon"><IconGithub /></div> </a>
			{/if}
		</div>
	{/if}
</td>

<style lang="postcss">
	.icon {
		@apply text-light-text transition-all duration-300 hover:text-primary;
	}
	.data {
		@apply px-4;
	}

	.data:first-child {
		@apply pl-0;
	}

	.data:last-child {
		@apply pr-0;
	}

	.data:nth-child(1) {
		@apply text-primary font-mono text-base;
	}

	.data:nth-child(2) {
		@apply font-semibold text-base md:text-xl;
	}

	.data:nth-child(3) {
		@apply text-mute-text font-mono text-sm font-semibold hidden md:table-cell;
	}

	.data:nth-child(4) {
		@apply text-mute-text font-mono text-xs font-semibold hidden md:table-cell;
	}

	.data:nth-child(2) {
		@apply font-semibold;
	}
</style>

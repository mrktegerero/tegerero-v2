<script lang="ts">
	export let title: string;
	export let href: string;
	export let onClick = undefined;
	export let active: boolean = undefined;
</script>

<a {href} class="link" class:active on:click={onClick}>{title}</a>

<style lang="postcss">
	.link {
		@apply text-dark-text font-mono uppercase pr-3 last:pr-0;
	}

	.active {
		@apply text-primary;
	}
</style>

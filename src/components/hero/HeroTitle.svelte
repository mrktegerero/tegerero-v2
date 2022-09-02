<script lang="ts">
	export let label: string;
	export let span: string = undefined;
	let classes: string = '';
	export { classes as class };
</script>

{#if span}
	<h1 class="title {classes}">{label}<span class="text-secondary">{span}</span></h1>
{:else}
	<h1 class="title {classes}">{label}</h1>
{/if}

<style lang="postcss">
	.title {
		@apply text-4xl sm:text-5xl leading-[3.5rem] sm:leading-[5.8rem] block relative;
	}
</style>

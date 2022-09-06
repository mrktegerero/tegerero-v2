<script lang="ts">
	export let label: string;
</script>

<div class="bg-primary absolute rounded">
	<p class="title">{label}</p>
</div>

<style lang="postcss">
	.title {
		@apply text-dark-text py-1 px-3 font-mono text-base;
	}
</style>

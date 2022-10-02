<script lang="ts">
	export let label: string;
</script>

<div class="devTitle bg-primary absolute rounded flex-shrink-0 ">
	<p class="title">{label}</p>
</div>

<style lang="postcss">
	.title {
		@apply text-dark-text py-1 px-3 font-mono text-base;
	}

	.devTitle {
		@apply animate-[show_0.5s_ease-in-out] animation-fill-both animation-delay-1000 lg:animation-delay-1600;
	}
</style>

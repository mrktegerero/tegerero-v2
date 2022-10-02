<script lang="ts">
	import IconX from '$components/icons/IconX.svelte';
	export let warm = false;
	export let sm = false;
	export let white = false;
</script>

<button
	type="button"
	on:click|preventDefault|stopPropagation|capture
	class:sm
	class:warm
	class:white
	class="button animate-[left_0.5s_ease-in-out] animation-fill-both animation-delay-200"
>
	<span class="sr-only">Close panel</span>

	<IconX />
</button>

<style lang="postcss">
	.button {
		@apply w-6 h-6 rounded-md text-dark-bg opacity-50 hover:opacity-100 transition;
		@apply focus:outline-none focus:ring-2 focus:ring-dark-bg;
 
	}
	.warm {
		@apply text-white opacity-100 hover:text-dark-text focus:ring-white;
	}

	.white {
		@apply text-white opacity-100;
	}

	.sm {
		@apply w-4 h-4;
	}
</style>

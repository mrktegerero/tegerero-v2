<script lang="ts">
	export let label: string;
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	const inFly = { delay: 200, duration: 400, opacity: 0, y: 10, easing: cubicInOut };
	const outFly = { y: -10, duration: 200, opacity: 0, easing: cubicInOut };
</script>

<div class="bg-primary absolute rounded flex-shrink-0 animate-[show_1s_ease-in-out]">
	<p class="title">{label}</p>
</div>

<style lang="postcss">
	.title {
		@apply text-dark-text py-1 px-3 font-mono text-base;
	}
</style>

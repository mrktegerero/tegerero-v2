<script lang="ts">
	import { afterUpdate } from 'svelte';
	export let label: string;
	export let number: string= '';
	export let href: string;
	export let onClick = undefined;
	export let active: boolean = undefined;
</script>


<a {href} class="link" class:active on:click={onClick}><span class="text-primary pr-1">{number}</span>{label}</a>

<style lang="postcss">
	.link {
		@apply text-light-text leading-7 text-sm font-mono mr-7 last:mr-0 relative block flex;
		/* @apply after:content-[''] after:absolute after:leading-7 after:w-full after:scale-x-0 after:h-[3px] after:bottom-0 after:left-0 after:right-0 after:bg-primary after:transition-all after:duration-300 after:ease-out; */
		@apply after:content-[''] after:absolute after:top-0.5 after:right-[0.2rem] after:w-4 after:h-6 after:bg-[rgb(227,_174,_34,_.35)] after:opacity-0 after:transition-all after:duration-300 after:ease-out hover:after:right-[-0.5rem] hover:after:opacity-100;
		/* @apply hover:after:scale-x-[1]; */
	}

	.active {
		@apply after:scale-x-[1] after:right-[-0.5rem] after:opacity-100;
	}
</style>

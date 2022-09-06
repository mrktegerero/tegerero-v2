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
		@apply text-light-text leading-7 text-[13px] font-mono mr-12 last:mr-0 relative block flex hover:text-primary;
		@apply before:content-['<'] before:absolute before:left-[0.4rem] before:opacity-0 before:transition-all before:duration-300 before:ease-out hover:before:left-[-0.8rem] hover:before:opacity-100;
		@apply after:content-['>'] after:absolute after:right-[0.2rem] after:opacity-0 after:transition-all after:duration-300 after:ease-out hover:after:right-[-1rem] hover:after:opacity-100;
	}

	.active {
		@apply text-primary;
		@apply before:scale-x-[1] before:left-[-0.5rem] before:opacity-100;
		@apply after:scale-x-[1] after:right-[-0.7rem] after:opacity-100;
	}
</style>

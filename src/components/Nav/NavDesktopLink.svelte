<script lang="ts">
	export let label: string;
	export let number: string;
	export let href: string;
	export let onClick = undefined;
	export let active: boolean = undefined;
</script>


<a {href} class="link" class:active on:click={onClick}><span class="text-primary">{number}</span> {label}</a>

<style lang="postcss">
	.link {
		@apply text-dark-text leading-7 text-sm font-mono mr-7 last:mr-0 relative block;
		@apply after:content-[''] after:absolute after:leading-7 after:w-full after:scale-x-0 after:h-[3px] after:bottom-0 after:left-0 after:right-0 after:bg-primary after:transition-all after:duration-300 after:ease-out;
		@apply hover:after:scale-x-[1];
	}

	.active {
		@apply after:scale-x-[1];
	}
</style>

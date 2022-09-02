<script lang="ts">
	// export let label: string;
	export let href: string;
</script>

<li class="links"><a {href} target="_blank"><slot /></a></li>

<style lang="postcss">
	.links {
		@apply w-[22px] my-3 transition-all duration-200 hover:text-muted-text hover:translate-y-[-3px];
	}
</style>

<script lang="ts">
	export let href: string;
</script>

<li class="links"><a {href} target="_blank"><slot /></a></li>

<style lang="postcss">
	.links {
		@apply w-[18px] my-4 transition-all duration-200 hover:text-muted-text hover:translate-y-[-3px];
	}
</style>

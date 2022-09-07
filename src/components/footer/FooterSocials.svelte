<script lang="ts">
	export let href: string = '';
</script>

<a {href} target="_blank" class="social"><slot /></a>

<style lang="postcss">
	.social {
		@apply w-4 ml-6 first:ml-0 transition-all duration-300 hover:text-primary;
	}
</style>

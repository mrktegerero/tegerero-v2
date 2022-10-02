<script lang="ts">
	export let label: string | undefined;
	export let href: string;
	let classes: string = '';
	export { classes as class };
</script>

<div class="links {classes}"><a {href} target="_blank" class="flex text-muted-text text-sm group"><div class="icon"><slot /></div>{label} </a></div>

<style lang="postcss">
	.links {
		@apply mx-5 last:mr-14;
	}
  .icon {
    @apply w-[15px] mr-2 text-light-text transition-all duration-300 group-hover:text-primary;
  }
</style>

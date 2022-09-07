<script lang="ts">
	import Text from '$components/common/Text.svelte';
	export let title: string = '';
	export let src = '';
	export let hideDesktop: boolean = false;
	export let right: boolean = false;
  export let left: boolean = false;
  export let primary: boolean = false;
	let classes: string = '';
	export { classes as class };
</script>

<div class="{classes} rounded-xl w-full overflow-hidden" class:hide={hideDesktop}>
	<div class="p-8 py-14 lg:p-14 flex justify-between">
		<p class="text-[1.85rem] font-mono" class:primary>{title}</p>
		<div class="flex">
			<slot name="tags" />
		</div>
	</div>
	<div class="pt-14">
		<div class="w-full">
			<img {src} alt="" class="rounded-lg" class:right class:left />
		</div>
	</div>
</div>

<style lang="postcss">
	.hide {
		@apply lg:hidden;
	}

	.right {
		@apply translate-x-12 translate-y-[-30px];
	}

  .left {
		@apply translate-x-[-60px];
	}

  .primary {
    @apply text-primary;
  }
</style>

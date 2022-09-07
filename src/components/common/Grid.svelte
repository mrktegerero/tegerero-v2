<script lang="ts">
	export let hide: boolean = false;
</script>

<div class="grid grid-cols-12 lg:gap-16 xl:gap-24 w-full">
	<div class="col-span-12 lg:col-span-6">
		<slot name="grid-left" />
	</div>
	<div class="col-span-12 lg:col-span-6" class:hide>
		<slot name="grid-right" />
	</div>
</div>

<style lang="postcss">
	.hide {
		@apply hidden lg:block;
	}
</style>

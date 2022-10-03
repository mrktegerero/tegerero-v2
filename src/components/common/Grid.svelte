<script lang="ts">
	export let hide: boolean = false;
	export let gridHalf: boolean = false;
	export let gridQuarter: boolean = false;
	let classes: string = '';
	export { classes as class };
</script>

<div class="grid grid-cols-12 w-full" class:grid-half={gridHalf}>
	<div class:grid-div={gridHalf} class:grid-quarter-left={gridQuarter}>
		<slot name="grid-left" />
	</div>
	<div class:grid-div={gridHalf} class:grid-quarter-right={gridQuarter} class:hide>
		<slot name="grid-right"/>
	</div>
</div>

<style lang="postcss">
	.hide {
		@apply hidden lg:block;
	}

	.grid-half {
		@apply lg:gap-16 xl:gap-24;
	}

	.grid-div {
		@apply col-span-12 lg:col-span-6;
	}

	.grid-quarter-left {
		@apply col-span-12 lg:col-span-3;
	}

	.grid-quarter-right {
		@apply col-span-12 lg:col-span-9;
	}
</style>

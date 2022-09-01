<script lang="ts">
	import Container from '$components/containers/Container.svelte';
	let classes = '';
	export { classes as class };
</script>

<!-- <svelte:window on:scroll={scroll} /> -->
<div class={classes}>
	<Container wide class="hidden lg:block fixed">
		<div class="navigation h-20  mx-auto justify-between items-stretch w-full px-2">
			<div class="flex flex-grow items-center pt-4">
				<div class="flex h-full">
					<slot name="navLink" />
				</div>
			</div>
		</div>
	</Container>
</div>

<!-- <slot/> -->
<style lang="postcss">
	.navigation {
		@apply grid;
		grid-template-columns: minmax(0, 1fr) min-content minmax(0, 1fr);
	}
</style>

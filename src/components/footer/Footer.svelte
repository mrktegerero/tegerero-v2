<script lang="ts">
	import Text from '$components/common/Text.svelte';
	import Container from '$components/containers/Container.svelte';
	import FooterMain from './FooterMain.svelte';
</script>

<FooterMain>
	<Container wide gutters>
		<div class="grid grid-cols-12 py-20">
			<div class="col-span-8"><Text class="text-3xl">Let's Make something amazing</Text></div>
			<div class="col-span-4"><Text class="text-3xl">Let's Make something amazing</Text></div>
		</div>
	</Container>
</FooterMain>

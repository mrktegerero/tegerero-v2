<script>
	import Spacer from '$components/common/Spacer.svelte';
	import Text from '$components/common/Text.svelte';
	import Container from '$components/containers/Container.svelte';
	import Projects from '$components/Projects.svelte';
</script>

<Container wide gutters>
	<div class="animate-[bottom_0.5s_ease-in-out] animation-fill-both animation-delay-300">
		<div class="hidden lg:block">
			<Spacer size="lg" />
		</div>
		<Spacer size="lg" />
		<Text header>All Projects</Text>
		<Text descriptionPrimary class="self-end pb-3 text-primary"
			>A great list of projects I've worked on</Text
		>
		<Spacer size="lg" />
		<div>
			<Projects />
		</div>

		<div class="hidden lg:block">
			<Spacer size="lg" />
		</div>
		<Spacer size="lg" />
	</div>
</Container>

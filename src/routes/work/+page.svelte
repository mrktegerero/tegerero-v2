<script>
	import Spacer from '$components/common/Spacer.svelte';
	import Text from '$components/common/Text.svelte';
	import Container from '$components/containers/Container.svelte';
</script>

<Container wide gutters>
	<div class="hidden lg:block">
		<Spacer size="lg" />
		<Spacer size="lg" />
	</div>
	<Text header>All Projects</Text>
	<Text description class=" self-end pb-3">A great list of projects I've worked on</Text>
	<Spacer size="lg" />
	<div>
		<!-- <div class="flex justify-between">
			<div>Year</div>
			<div>Title</div>
			<div>Made at</div>
			<div>Built with</div>
			<div>Link</div>
		</div> -->
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Title</th>
          <th>Made at</th>
          <th>Built with</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            2021
          </td>
          <td>
            2021
          </td>
          <td>
            2021
          </td>
          <td>
            2021
          </td>
          <td>
            2021
          </td>
        </tr>
      </tbody>
    </table>
	</div>
</Container>

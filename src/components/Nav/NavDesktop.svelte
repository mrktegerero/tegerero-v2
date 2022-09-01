<script lang="ts">
	import { page } from '$app/stores';
	import NavDesktopMain from './NavDesktopMain.svelte';
	import NavDesktopLink from './NavDesktopLink.svelte';
</script>

{#if $page.url.pathname != '/'}
	<NavDesktopMain>
		<svelte:fragment slot="navLink">
			<NavDesktopLink href="/#about" title="About" />
			<NavDesktopLink href="/#work" title="Work" />
		</svelte:fragment>
	</NavDesktopMain>
{/if}

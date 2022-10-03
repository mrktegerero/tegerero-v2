<script lang="ts">
	import { page } from '$app/stores';
	import NavDesktopMain from './NavDesktopMain.svelte';
	import NavDesktopLink from './NavDesktopLink.svelte';
	import NavMobile from './NavMobile.svelte';
</script>

{#if $page.url.pathname !== '/' && $page.url.pathname === '/work'}
	<NavDesktopMain>
		<svelte:fragment slot="navLink">
			<NavDesktopLink href="/#about" label="About" />
			<NavDesktopLink href="/#jobs" label="Experience" />
			<NavDesktopLink href="/#projects" label="Work" />
			<NavDesktopLink href="/#contact" label="Contact" />
		</svelte:fragment>
	</NavDesktopMain>

	<NavMobile />
{/if}

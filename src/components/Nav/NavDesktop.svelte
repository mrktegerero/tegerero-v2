<script lang="ts">
	import { page } from '$app/stores';
	import NavDesktopMain from './NavDesktopMain.svelte';
	import NavDesktopLink from './NavDesktopLink.svelte';
</script>

{#if $page.url.pathname != '/'}
	<NavDesktopMain duration="350ms" offset={50} tolerance={5}>
		<svelte:fragment slot="navLink">
			<NavDesktopLink number="01." href="/#about" label="About" />
			<NavDesktopLink number="02." href="/#jobs" label="Experience" />
			<NavDesktopLink number="03." href="/#projects" label="Work" />
			<NavDesktopLink number="04." href="/#contact" label="Contact" />
		</svelte:fragment>
	</NavDesktopMain>
{/if}

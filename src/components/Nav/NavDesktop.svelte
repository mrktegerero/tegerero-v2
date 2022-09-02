<script>
	import { page } from '$app/stores';
	import NavDesktopMain from './NavDesktopMain.svelte';
	import NavDesktopLink from './NavDesktopLink.svelte';
	import { getContext, setContext } from 'svelte';
	import { createUrlStore } from '$lib/url';
	export let ssrUrl = '';

	setContext('APP', { url: createUrlStore(ssrUrl) });

	// Usage across descendants for SSR support
	const { url } = getContext('APP');
</script>

{#if $url.pathname !== '/' && $url.pathname === '/work'}
	<NavDesktopMain>
		<svelte:fragment slot="navLink">
			<NavDesktopLink number="01." href="/#about" label="About" />
			<NavDesktopLink number="02." href="/#jobs" label="Experience" />
			<NavDesktopLink number="03." href="/#projects" label="Work" />
			<NavDesktopLink number="04." href="/#contact" label="Contact" />
		</svelte:fragment>
	</NavDesktopMain>
{/if}

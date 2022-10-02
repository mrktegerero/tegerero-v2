<script>
	import { page } from '$app/stores';
	import NavDesktopMain from './NavMain.svelte';
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
			<NavDesktopLink href="/#about" label="About" />
			<NavDesktopLink href="/#jobs" label="Experience" />
			<NavDesktopLink href="/#projects" label="Work" />
			<NavDesktopLink href="/#contact" label="Contact" />
		</svelte:fragment>
	</NavDesktopMain>
{/if}

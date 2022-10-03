<script lang="ts">
	import { page } from '$app/stores';
	// import icon from '$images/favicon-32x32.png';
	export let title: string = `Tegerero`;
	export let description = '';
	// export let image: string = undefined;
	export let alt = '';
	// let icon = '/src/images/KT-icon.png';
	import icon from '$images/KT-icon.png';
	import image from '$images/tegerero_web.png';
</script>

<svelte:head>
	<!-- General Tags -->
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph Tags -->
	<meta property="og:title" content={title} />
	{#if description}
		<meta property="og:description" content={description} />
	{/if}
	<meta property="og:type" content="website" />
	{#if image}
		<meta property="og:image" content={image} />
	{/if}
	{#if alt}
		<meta property="og:image:alt" content={alt} />
	{/if}

	<!-- Twitter Tags -->
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	{#if image}
		<meta property="twitter:image" content={image} />
		<meta property="twitter:card" content="summary_large_image" />
		{#if alt}
			<meta property="twitter:image:alt" content={alt} />
		{/if}
	{/if}

	<!-- Url tags-->

	<meta property="og:url" content={$page.url.toString()} />
	<link rel="canonical" href={$page.url.toString()} />

	<link rel="icon" type="image/png" sizes="32x32" href={icon} />
</svelte:head>
<script lang="ts">
	export let href: string = undefined;
	export let name: string;
	let classes: string = '';
	export { classes as class };
</script>

{#if href}
	<a {href} class="{classes} text-white w-[15px] m-4 last:mr-6">
		<span class="sr-only">{name}</span>
		<slot /></a
	>
{:else}
	<button on:click class="{classes} text-white">
		<span class="sr-only">{name}</span>
		<slot />
	</button>
{/if}

<script lang="ts">
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'lg';
	let classes: string = '';
	export { classes as class };
</script>

<div
	class={classes}
	class:pb-2={size === 'xs'}
	class:pb-4={size === 'sm'}
	class:pb-8={size === 'md'}
	class:pb-16={size === 'lg'}
	class:pb-32={size === 'xl'}
/>

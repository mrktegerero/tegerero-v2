<script lang="ts">
	// import { sveltekit } from '@sveltejs/kit/vite';
	import { mobileNavOpen } from '$lib/ui';
	import BaseDrawer from '$components/SideDrawers/BaseDrawer.svelte';

	const close = () => ($mobileNavOpen = false);
</script>

<BaseDrawer left opened={$mobileNavOpen} on:close={close} dark>
	<div class="wrapper">
		<div class="level">
			<div class="nav-items">
				<a href="/#about" class="nav-item animate-[left_1s_ease-in-out]" on:click={close}>About</a>
				<a href="/#projects" class="nav-item animate-[left_1s_ease-in-out_2s]" on:click={close}
					>Projects</a
				>
				<a href="/#jobs" class="nav-item" on:click={close}>Experience</a>
				<a href="/#contact" class="nav-item" on:click={close}>Contact</a>
			</div>
		</div>
	</div>
</BaseDrawer>

<style lang="postcss">
	.nav-items {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		@apply gap-1;
		@apply h-full;
	}

	.nav-item {
		@apply flex flex-row items-center justify-between;
		@apply w-full text-white font-medium tracking-wide py-4 font-mono;
		@apply animate-[left_0.5s_ease-in-out] animation-fill-both;

		
	}

	.nav-item:nth-child(1) {
		@apply animation-delay-200;
	}

	.nav-item:nth-child(2) {
		@apply animation-delay-400;
	}
	.nav-item:nth-child(3) {
		@apply animation-delay-600;
	}
	.nav-item:nth-child(4) {
		@apply animation-delay-800;
	}
	.wrapper {
		@apply text-white bg-dark-bg;
		/* @apply border-t border-t-dark-bg-light; */
		@apply w-full h-full;
		@apply overflow-x-hidden pt-10;
	}
	.level {
		@apply h-full;
		@apply p-8;
		@apply w-full overflow-x-hidden;
	}
</style>

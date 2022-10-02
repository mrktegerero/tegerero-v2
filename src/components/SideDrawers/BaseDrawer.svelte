<script lang="ts">
	import { fade, type TransitionConfig } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { createEventDispatcher, setContext } from 'svelte';
	import Portal from '$components/common/Portal.svelte';
	import CloseButton from '$components/common/CloseButton.svelte';

	const dispatch = createEventDispatcher();

	const close = () => dispatch('close');
	let scrollingElement: HTMLElement;

	setContext('DRAWER', {
		scrollToTop() {
			scrollingElement.scrollTo({ top: 0 });
		}
	});

	export let opened = false;
	export let left = false;
	export let title: string = undefined;
	export let layer: 50 | 60 | 70 = 50;
	export let depth: number = 0;
	export let dark = false;

	function slideover(node: HTMLElement, params?: TransitionConfig) {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');
		const d = left ? -1 : 1;
		return {
			delay: params?.delay ?? 0,
			duration: params?.duration ?? 300,
			easing: params?.easing ?? cubicInOut,
			css: (_: number, u: number) => `transform: ${existingTransform} translate(${d * u * 100}%)`
		};
	}

	let enabled = false;
	let timeout: ReturnType<typeof setTimeout>;
	$: if (opened) {
		timeout = setTimeout(() => {
			if (opened) {
				enabled = true;
			}
		}, 200);
	} else {
		clearTimeout(timeout);
		enabled = false;
	}
</script>

<Portal>
	{#if opened}
		<!-- This example requires Tailwind CSS v2.0+ -->
		<div
			class="relative  pointer-events-none touch-manipulation"
			class:z-50={layer === 50}
			class:z-60={layer === 60}
			class:z-70={layer === 70}
			aria-labelledby="slide-over-title"
			role="dialog"
			aria-modal="true"
		>
			<div
				class="bg-overlay"
				transition:fade|local={{ easing: cubicInOut }}
				class:pointer-events-auto={enabled}
				on:click={close}
			/>

			<div
				class="fixed inset-0 overflow-hidden transition-transform duration-300 ease-in-out transform"
				class:depth-1={depth === 1}
				class:depth-2={depth === 2}
			>
				<div class="absolute inset-0 overflow-hidden">
					<div
						class="fixed inset-y-0 flex max-w-full "
						class:xxs:pl-10={!left}
						class:xxs:pr-10={left}
						class:right-0={!left}
						class:left-0={left}
					>
						<!--
            Slide-over panel, show/hide based on slide-over state.
  
            Entering: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-full"
              To: "translate-x-0"
            Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-0"
              To: "translate-x-full"
          -->
						<div
							class="pointer-events-auto w-screen xxs:max-w-md transform drawer-bg"
							class:dark
							transition:slideover|local
						>
							<div
								class="flex h-full flex-col  shadow-xl scrollbar overscroll-y-contain"
								style="overflow-y:overlay;"
								bind:this={scrollingElement}
							>
								<div class="bg-white">
									<div class="flex items-start justify-end">
										<div class="w-16 h-16 flex justify-center items-center fixed z-50">
											<CloseButton white on:click={close} />
										</div>
									</div>

									<div class="relative drawer-wrapper">
										{#if $$slots.title || title}
											<div class="drawer-header">
												<slot name="title">
													<h3 class="drawer-header-heading">{title}</h3>
												</slot>
											</div>
										{/if}
										<div class="drawer-body">
											<slot />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</Portal>

<style lang="postcss">
	.drawer-wrapper {
		@apply h-full;

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: min-content auto;
	}
	.depth-1 {
		@apply -translate-x-4;
	}
	.depth-1 {
		@apply -translate-x-8;
	}
	.drawer-header {
		@apply h-16 bg-dark-bg flex flex-row items-center justify-start px-4;
	}

	.drawer-header-heading {
		@apply block text-xl font-semibold text-white leading-none;
	}
	.drawer-body {
		@apply h-full;
		/* handle this at the component level*/
	}

	.drawer-bg {
		@apply bg-white;
		/* background: linear-gradient(
			180deg,
			theme('colors.dark-bg') 0%,
			theme('colors.dark-bg') 50%,
			theme('colors.white') 50%,
			theme('colors.white') 100%
		); */
	}
	.drawer-bg.dark {
		background: unset;
		@apply bg-dark-bg;
	}
</style>

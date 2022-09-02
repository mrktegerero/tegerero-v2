<script lang="ts">
	import Container from '$components/containers/Container.svelte';
	import IconResume from '$components/icons/IconResume.svelte';

	export let duration: string = '1000ms';
	export let offset: number = 0;
	export let tolerance: number = 0;

	let headerClass: string = 'show';
	let y: number = 0;
	let lastY: number = 0;

	function deriveClass(y, dy) {
		if (y < offset) {
			return 'show';
		}

		if (Math.abs(dy) <= tolerance) {
			return headerClass;
		}

		if (dy < 0) {
			return 'hide';
		}

		return 'show';
	}

	function updateClass(y) {
		const dy = lastY - y;
		lastY = y;
		return deriveClass(y, dy);
	}

	function setTransitionDuration(node) {
		node.style.transitionDuration = duration;
	}

	$: headerClass = updateClass(y);
</script>

<svelte:window bind:scrollY={y} />

<div use:setTransitionDuration class="nav {headerClass}" class:nav-scroll={y >= 1}>
	<Container wide>
		<div
			class="navigation w-full mx-auto flex justify-between bg-transparent h-[6.25rem] px-16 3xl:px-2"
			class:nav-height={y >= 1}
		>
			<div class="flex flex-grow items-center">
				<slot name="navLink" />
			</div>

			<div class="flex flex-grow items-center">
				<!-- <slot name="navLink" /> -->
			</div>
			<div class="flex flex-grow items-center justify-end">
				<div class="w-6 text-dark-text border-dark-text">
					<IconResume />
				</div>
			</div>
		</div>
	</Container>
</div>

<style lang="postcss">
	.navigation {
		@apply grid transition-all duration-300 ease-in-out;
		grid-template-columns: minmax(0, 1fr) min-content minmax(0, 1fr);
	}

	.nav {
		@apply sticky top-0 w-full z-50 transition-all duration-300 ease-in-out hidden lg:block;
	}

	.nav-scroll {
		@apply h-[4.25rem] bg-[rgba(237,_237,_237,_0.85)] shadow-[0_10px_30px_-10px_#DFDFDF];
	}

	.nav-height {
		@apply h-[4.25rem];
	}
	.show {
		@apply translate-y-0;
	}
	.hide {
		@apply translate-y-[-100%];
	}
</style>

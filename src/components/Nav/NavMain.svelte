<script lang="ts">
	import IconGithub from '$components/icons/IconGithub.svelte';
	import IconResume from '$components/icons/IconResume.svelte';
	import IconTwitter from '$components/icons/IconTwitter.svelte';
	import NavDesktopIcon from './NavDesktopIcon.svelte';
	import NavDesktopIconMain from './NavDesktopIconMain.svelte';
	// import Icon from '$images/KT-icon.png'
	// import Resume from '$files/resume.pdf'

	export let desktopHidden: boolean = false;

	export let duration: string = '1000ms';
	export let offset: number = 0;
	export let tolerance: number = 0;

	let headerClass: string = 'show';
	let y: number = 0;
	let lastY: number = 0;
	// let icon = '/src/images/KT-icon.png';
	// let resume = '/src/resume.pdf';

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

<div
	use:setTransitionDuration
	class="nav {headerClass}"
	class:desktopHide={desktopHidden}
	class:mobileHide={!desktopHidden}
	class:nav-scroll={y >= 1}
>
	<div class="navigation w-full mx-auto flex bg-transparent h-[6.25rem]" class:nav-height={y >= 1}>
		<slot />
	</div>
</div>

<style lang="postcss">
	.navigation {
		@apply grid transition-all duration-300 ease-in-out grid-cols-[minmax(0,_1fr)_min-content_minmax(0,_1fr)] xl:grid-cols-[minmax(0,_1fr)_min-content_minmax(0,_3fr)];

		@apply z-50;
		/* grid-template-columns: minmax(0, 1fr) min-content minmax(0, 2fr); */
	}

	.nav {
		@apply sticky top-0 w-full z-50 transition-all duration-300 ease-in-out hidden lg:block px-4 lg:px-14 h-max;
	}

	.mobileHide {
		@apply hidden lg:block;
	}

	.desktopHide {
		@apply block lg:hidden;
	}

	.height-full {
		@apply h-max;
	}
	.nav-scroll {
		@apply h-[4.25rem] bg-[rgba(45,_46,_50,_0.85)] shadow-[0_10px_30px_-10px_#25262A] backdrop-blur;
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

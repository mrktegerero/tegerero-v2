<script lang="ts">
	import Container from '$components/containers/Container.svelte';
	import IconGithub from '$components/icons/IconGithub.svelte';
	import IconResume from '$components/icons/IconResume.svelte';
	import IconTwitter from '$components/icons/IconTwitter.svelte';
	import NavDesktopIcon from './NavDesktopIcon.svelte';
	import NavDesktopIconMain from './NavDesktopIconMain.svelte';

	export let duration: string = '1000ms';
	export let offset: number = 0;
	export let tolerance: number = 0;

	let headerClass: string = 'show';
	let y: number = 0;
	let lastY: number = 0;
	let icon = '/src/images/KT-icon.png';
	let resume = '/src/resume.pdf';

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
	<div class="navigation w-full mx-auto flex bg-transparent h-[6.25rem]" class:nav-height={y >= 1}>
		<div class="flex flex-row items-center justify-start">
			<a href="/" class="flex">
				<div class="w-10">
					<img src={icon} alt="" />
				</div>
				<div>
					<h5
						class="text-base mt-1  font-semibold opacity-100 transition-all duration-300 delay-300 ease-in-out "
						class:hide-text={y >= 1}
					>
						urt Tegerero
					</h5>
				</div></a
			>
		</div>
		<div class="flex flex-row items-center 2xl:ml-[-10rem]">
			<slot name="navLink" />
		</div>

		<div class="flex flex-row items-center justify-end">
			<NavDesktopIconMain
				><NavDesktopIcon href="https://twitter.com/mr_ktegerero" label="Twitter"
					><IconTwitter /></NavDesktopIcon
				>
				<NavDesktopIcon href="https://github.com/mrktegerero" label="Github"
					><IconGithub /></NavDesktopIcon
				></NavDesktopIconMain
			>
			<a data-tooltip="Check my resume!" href={resume} target="_blank" class="bg-muted-dark-bg p-3 rounded-full relative"><div class="w-6 text-primary"><IconResume/></div></a>
		</div>
	</div>
</div>

<style lang="postcss">
	.navigation {
		@apply grid transition-all duration-300 ease-in-out grid-cols-[minmax(0,_1fr)_min-content_minmax(0,_1fr)] xl:grid-cols-[minmax(0,_1fr)_min-content_minmax(0,_1fr)];
		/* grid-template-columns: minmax(0, 1fr) min-content minmax(0, 2fr); */
	}

	.nav {
		@apply sticky top-0 w-full z-50 transition-all duration-300 ease-in-out hidden lg:block lg:px-14;
	}

	.nav-scroll {
		@apply h-[4.25rem] bg-[rgba(45,_46,_50,_0.85)] shadow-[0_10px_30px_-10px_#25262A];
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

	.hide-text {
		@apply opacity-0 translate-x-[-2rem];
	}
</style>

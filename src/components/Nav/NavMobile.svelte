<script lang="ts">
	import NavMain from './NavMain.svelte';
	import Icon from '$images/KT-icon.png';
	import IconGithub from '$components/icons/IconGithub.svelte';
	import IconResume from '$components/icons/IconResume.svelte';
	import IconTwitter from '$components/icons/IconTwitter.svelte';
	import NavDesktopIcon from './NavDesktopIcon.svelte';
	import NavDesktopIconMain from './NavDesktopIconMain.svelte';
	import Resume from '$files/resume.pdf';
	import IconHamburger from '$components/icons/IconHamburger.svelte';
	import NavigationIcon from './NavIcon.svelte';
	import { mobileNavOpen } from '$lib/ui';
	import NavMobileMenu from './NavMobileMenu.svelte';

	let y: number = 0;

	const openMenu = () => {
		$mobileNavOpen = true;
	};
</script>

<svelte:window bind:scrollY={y} />

<NavMain desktopHidden>
	<div class="flex flex-row items-center justify-start">
		<NavigationIcon name="Mobile Nav" on:click={openMenu}>
			<IconHamburger />
		</NavigationIcon>
	</div>

	<div class="flex flex-row items-center justify-center">
		<a
			href="/"
			class="flex flex-row w-40 transition-all duration-500 delay-300 ease-in-out animate-[left_0.5s_ease-in-out] animation-fill-both @apply animation-delay-200"
			class:center={y >= 1}
		>
			<div class="w-8">
				<img src={Icon} alt="" />
			</div>
			<div>
				<h5
					class="text-sm font-semibold opacity-100 transition-all duration-500 delay-300 ease-in-out "
					class:hide-text={y >= 1}
				>
					urt <span class="text-[#B2B2B3] font-normal">Tegerero</span>
				</h5>
			</div></a
		>
	</div>

	<div class="flex flex-row items-center justify-end">
		<div class="hidden sm:block">
			<NavDesktopIconMain >
				<NavigationIcon class="animate-[left_0.5s_ease-in-out] animation-fill-both animation-delay-400" href="https://twitter.com/mr_ktegerero" name="Twitter"
					><IconTwitter /></NavigationIcon
				>
				<NavigationIcon class="animate-[left_0.5s_ease-in-out] animation-fill-both animation-delay-600" href="https://github.com/mrktegerero" name="Github"
					><IconGithub /></NavigationIcon
				></NavDesktopIconMain
			>
		</div>
		<a
			data-tooltip="Check my resume!"
			href={Resume}
			target="_blank"
			class="bg-muted-dark-bg p-3 rounded-full relative animate-[left_0.5s_ease-in-out] animation-fill-both animation-delay-800"
			><div class="w-6 text-primary"><IconResume /></div></a
		>
	</div>
</NavMain>

<NavMobileMenu/>

<style lang="postcss">
	.hide-text {
		@apply opacity-0 translate-x-[-2rem] ;
	}

	.center {
		@apply translate-x-[4rem];
	}
</style>

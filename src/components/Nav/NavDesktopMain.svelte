<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$images/KT-icon.png';
	import Resume from '$files/resume.pdf';
	import NavMain from './NavMain.svelte';
	import IconGithub from '$components/icons/IconGithub.svelte';
	import IconResume from '$components/icons/IconResume.svelte';
	import IconTwitter from '$components/icons/IconTwitter.svelte';
	import NavDesktopIcon from './NavDesktopIcon.svelte';
	import NavDesktopIconMain from './NavDesktopIconMain.svelte';

	let y: number = 0;
</script>

<svelte:window bind:scrollY={y} />

<NavMain>
	<div class="flex flex-row items-center justify-start">
		<a href="/" class="flex">
			<div class="w-10">
				<img src={Icon} alt="" />
			</div>
			<div>
				<h5
					class="text-base mt-1 font-semibold opacity-100 transition-all duration-500 delay-300 ease-in-out "
					class:hide-text={y >= 1}
				>
					urt <span class="text-[#B2B2B3] font-normal">Tegerero</span>
				</h5>
			</div></a
		>
	</div>
	<div class="flex flex-row items-center 2xl:ml-[-10rem]">
		<slot name="navLink" />
	</div>

	<div class="flex flex-row items-center justify-end">
		<NavDesktopIconMain>
			<div
				class="icon-1"
				class:animation={$page.url.pathname === '/' && $page.url.pathname !== '/work'}
			>
				<NavDesktopIcon href="https://twitter.com/notktrrr" label="Twitter"
					><IconTwitter /></NavDesktopIcon
				>
			</div>
			<div
				class="icon-2"
				class:animation={$page.url.pathname === '/' && $page.url.pathname !== '/work'}
			>
				<NavDesktopIcon href="https://github.com/kurttegerero" label="Github"
					><IconGithub /></NavDesktopIcon
				>
			</div>
		</NavDesktopIconMain>
		<a
			data-tooltip="Check my resume!"
			href={Resume}
			target="_blank"
			class="bg-muted-dark-bg p-3 rounded-full relative icon-3"
			class:animation={$page.url.pathname === '/' && $page.url.pathname !== '/work'}
			><div class="w-6 text-primary"><IconResume /></div></a
		>
	</div>
</NavMain>

<style lang="postcss">
	.hide-text {
		@apply opacity-0 translate-x-[-2rem];
	}

	.animation {
		@apply animate-[left_0.5s_ease-in-out] animation-fill-both;
	}

	.icon-1 {
		@apply animation-delay-1000;
	}

	.icon-2 {
		@apply animation-delay-1200;
	}

	.icon-3 {
		@apply animation-delay-1400;
	}
</style>

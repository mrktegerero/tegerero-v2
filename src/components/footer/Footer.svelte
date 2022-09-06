<script lang="ts">
	import IconFb from './../icons/IconFb.svelte';
	import Link from '$components/common/Link.svelte';
	import Text from '$components/common/Text.svelte';
	import Container from '$components/containers/Container.svelte';
	import IconGithub from '$components/icons/IconGithub.svelte';
	import IconTwitter from '$components/icons/IconTwitter.svelte';
	import NavDesktopLink from '$components/Nav/NavDesktopLink.svelte';
	import FoorterLinksMain from './FoorterLinksMain.svelte';
	import FooterLinks from './FooterLinks.svelte';
	import FooterMain from './FooterMain.svelte';
	import FooterSocials from './FooterSocials.svelte';
	import IconIg from '$components/icons/IconIg.svelte';
	import IconLinkedIn from '$components/icons/IconLinkedIn.svelte';

	let icon = '/src/images/KT-icon.png';

  let now = new Date();

  let year = now.getFullYear();
</script>

<FooterMain>
	<Container wide gutters>
		<div class="grid grid-cols-12 py-32">
			<div class="col-span-12 lg:col-span-6 3xl:pr-20">
				<Text class="text-3xl">Let's Make something amazing together.</Text>
				<Text class="text-3xl pt-12"
					>Start by <Link href="mailto:kurtrendel@gmail.com" label="saying hi" largeHeight /></Text
				>
			</div>
			<div class="col-span-12 lg:col-span-6 lg:pl-20 3xl:pl-40 pt-20 lg:pt-0">
				<Text class="text-xs text-mute-text font-semibold">Information</Text>
				<Text class="pt-7 text-mute-text font-semibold text-base"
					>14-11 Chester St, LV, Pampanga, PH</Text
				>
				<div class="pt-3">
					<a
						href="mailto:kurtrendel@gmail.com"
						class="font-mono text-2xl transition-all duration-300 hover:text-primary"
						>hello@kurt.io</a
					>
				</div>
				<FoorterLinksMain>
					<FooterLinks><NavDesktopLink footer label="About" href="#about" /></FooterLinks>
					<FooterLinks><NavDesktopLink footer label="Experience" href="#jobs" /></FooterLinks>
					<FooterLinks><NavDesktopLink footer label="Work" href="#projects" /></FooterLinks>
					<FooterLinks><NavDesktopLink footer label="Contact" href="#contact" /></FooterLinks>
				</FoorterLinksMain>
			</div>
		</div>
		<div class="flex flex-col-reverse lg:grid lg:grid-cols-12 pb-24">
			<div class="col-span-12 lg:col-span-6 3xl:pr-20 pt-20 lg:pt-0">
				<div class="flex">
					<a href="/" class="flex">
						<div class="w-10">
							<img src={icon} alt="" />
						</div>
						<div>
							<h5
								class="text-base mt-1 font-semibold opacity-100 transition-all duration-300 delay-300 ease-in-out "
							>
								urt <span class="text-[#B2B2B3] font-normal">Tegerero</span>
							</h5>
						</div></a
					>
          <div class="pl-5 flex items-center">
            <Text class="text-mute-text text-sm font-bold flex items-center"><span class="pr-2">&copy;</span> {year}. All rights Reserved</Text>
          </div>
				</div>
			</div>
			<div class="col-span-12 lg:col-span-6 lg:pl-20 3xl:pl-40">
				<div class="flex">
					<FooterSocials href=""><IconTwitter /></FooterSocials><FooterSocials href=""
						><IconGithub /></FooterSocials
					><FooterSocials href=""><IconFb /></FooterSocials><FooterSocials href=""
						><IconIg /></FooterSocials
					><FooterSocials href=""><IconLinkedIn /></FooterSocials>
				</div>
			</div>
		</div>
	</Container>
</FooterMain>

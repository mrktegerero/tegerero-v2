<script lang="ts">
	import Text from '$components/common/Text.svelte';
	import Seo from '$components/common/SEO.svelte';
	import NavDesktopMain from '$components/Nav/NavDesktopMain.svelte';
	import NavDesktopLink from '$components/Nav/NavDesktopLink.svelte';
	import { onMount, setContext } from 'svelte';
	import Container from '$components/containers/Container.svelte';
	import Link from '$components/common/Link.svelte';
	import Spacer from '$components/common/Spacer.svelte';
	import Hero from '$components/hero/Hero.svelte';
	import { fade } from 'svelte/transition';
	import HeroImage from '$components/hero/HeroImage.svelte';
	import ProjectCard from '$components/cards/ProjectCard.svelte';
	import Tag from '$components/common/Tag.svelte';
	import Grid from '$components/common/Grid.svelte';
	import AboutGeneric from '$components/about/AboutGeneric.svelte';
	import Kurt from '$images/hero/krt.png';
	import Mansion from '$images/projects/mansion88.png';
	import Yre from '$images/projects/yre.png';
	import Tier1 from '$images/projects/tier1.png';
	import NavMobile from '$components/Nav/NavMobile.svelte';

	const scrollToElement = (selector: string) => {
		const element = document.querySelector(selector) as HTMLElement;
		if (!element) return;
		element.scrollIntoView({ behavior: 'smooth' });
	};

	let firstActive = [false, false, false, false];

	let elements: Element[] = [undefined, undefined, undefined, undefined];
	let actives = [false, false, false, false];

	setContext('Section', {
		setActive(index: number, active: boolean) {
			actives[index] = active;
		}
	});

	function scroll() {
		let index = -1;
		let min = Infinity;
		for (let i = 0; i < elements.length; i++) {
			const el = elements[i];
			const { bottom } = el.getBoundingClientRect();
			if (bottom >= 1 && bottom < min) {
				min = bottom;
				index = i;
			}
		}
		for (let i = 0; i < actives.length; i++) {
			actives[i] = i == index;
		}
	}

	onMount(() => scroll());

	$: {
		for (let i = 0; i < actives.length; i++) {
			if (i === actives.indexOf(true)) {
				firstActive[i] = true;
			} else {
				firstActive[i] = false;
			}
		}
	}
</script>

<svelte:window on:scroll={scroll} />

<Seo title="Kurt Tegerero" description="Front end developer of @sodadigital" />

<NavDesktopMain>
	<svelte:fragment slot="navLink">
		<NavDesktopLink
			href="#about"
			label="About"
			onClick={() => scrollToElement('#about')}
			active={firstActive[1]}
		/>
		<NavDesktopLink
			href="#projects"
			label="Work"
			onClick={() => scrollToElement('#projects')}
			active={firstActive[2]}
		/>
		<NavDesktopLink
			href="#jobs"
			label="Experience"
			onClick={() => scrollToElement('#jobs')}
			active={firstActive[3]}
		/>
		<NavDesktopLink
			href="#contact"
			label="Contact"
			onClick={() => scrollToElement('#contact')}
			active={firstActive[4]}
		/>
	</svelte:fragment>
</NavDesktopMain>

<NavMobile />

<!-- <slot/> -->

<Container wide gutters bind:element={elements[0]}>
	<div class="py-[5rem] pb-20 lg:mt-[-6.25rem] relative">
		<Hero />
	</div>
</Container>
<HeroImage img={Kurt} />

<div class="bg-[#25262A]">
	<Container wide gutters id="about" bind:element={elements[1]}>
		<Spacer size="lg" />
		<Spacer size="lg" />
		<AboutGeneric />
		<Spacer size="lg" />
		<Spacer size="sm" />
	</Container>
</div>

<Container wide gutters id="projects" bind:element={elements[2]} class="bg-[#25262A]">
	<div class="hidden lg:block">
		<Spacer size="lg" />
		<Spacer size="sm" />
	</div>
	<Grid hide gridHalf>
		<svelte:fragment slot="grid-left">
			<Spacer size="sm" />
			<Text header class="xl:pl-32">Latest Works</Text>
			<Text description class="xl:pl-32">Perfect solutions for digital experience</Text>
			<div class="hidden md:block">
				<Spacer size="lg" />
			</div>
			<Spacer size="lg" />
			<ProjectCard title="Mansion 88" src={Mansion} class="bg-[#191C2F]" right>
				<svelte:fragment slot="tags">
					<Tag label="HTML" />
					<Tag label="Javascript" />
					<Tag label="CSS" />
				</svelte:fragment>
			</ProjectCard>
			<ProjectCard hideDesktop title="YRE Travel" src={Yre} class="bg-[#171616] mt-20" left primary>
				<svelte:fragment slot="tags">
					<Tag label="HTML" />
					<Tag label="GatsbyJs" />
					<Tag label="GraphQL" />
				</svelte:fragment>
			</ProjectCard>
			<ProjectCard hideDesktop title="Tier One" src={Tier1} class="bg-[#080808] mt-20">
				<svelte:fragment slot="tags">
					<Tag label="HTML" />
					<Tag label="Javascript" />
					<Tag label="CSS" />
				</svelte:fragment>
			</ProjectCard>
			<Spacer size="lg" />
			<Spacer size="lg" />
			<Link
				label="ALL PROJECTS"
				href="/work"
				class="uppercase text-[1.7rem] font-bold xl:ml-32"
				large
			/>
			<Spacer size="lg" />
			<Spacer size="sm" />
			<Text class="text-muted-text text-sm xl:pl-32 md:pr-12 lg:pr-0 xl:w-[31rem]"
				>* Some projects not allow publish by NDA, if you want to see more. <Link
					label="contact"
					href="mailto:kurtrendel@gmail.com"
				/></Text
			>
		</svelte:fragment>
		<svelte:fragment slot="grid-right">
			<ProjectCard title="YRE Travel" src={Yre} class="bg-[#171616]" left primary>
				<svelte:fragment slot="tags">
					<Tag label="HTML" />
					<Tag label="GatsbyJs" />
					<Tag label="GraphQL" />
				</svelte:fragment>
			</ProjectCard>
			<Spacer size="lg" />
			<Spacer size="md" />
			<ProjectCard title="Tier One" src={Tier1} class="bg-[#080808]">
				<svelte:fragment slot="tags">
					<Tag label="HTML" />
					<Tag label="Javascript" />
					<Tag label="CSS" />
				</svelte:fragment>
			</ProjectCard>
		</svelte:fragment>
	</Grid>
	<Spacer size="lg" />
	<Spacer size="lg" />
	<Spacer size="md" />
</Container>

<Container wide gutters id="jobs" bind:element={elements[3]}>
	<Spacer size="lg" />
	<Spacer size="lg" />
	<Grid gridQuarter>
		<svelte:fragment slot="grid-left">
			<Text header>Experience</Text>
		</svelte:fragment>
		<svelte:fragment slot="grid-right">
			<div class="flex items-stretch h-full w-full">
				<Text description class="lg:pl-32 self-end pb-3"
					>Companies that I once working with made me who I am</Text
				>
			</div>
		</svelte:fragment>
	</Grid>
	<Spacer size="lg" />
	<Grid gridQuarter>
		<svelte:fragment slot="grid-left">
			<Text class="text-sm text-light-muted-text hidden lg:block">2022 - present</Text>
		</svelte:fragment>
		<svelte:fragment slot="grid-right">
			<Text class="text-base xl:pl-32"
				>Front-end Developer <Link
					href="https://www.sodadigital.com.au/"
					label="@Soda Digital"
					newTab
				/></Text
			>
			<Text class="text-sm text-light-muted-text lg:hidden pt-2">2022 - present</Text>
			<Spacer size="sm" />
			<Text class="text-mute-text text-sm pt-3 xl:pl-32"
				><span class="text-muted-text">▶</span> Developed and maintained code for in-house and
				client websites, tested site <span class="text-light-muted-text">compatibility</span> across
				multiple browsers and devices, uncovering and debugging issues and addressing
				inconsistencies and debug errors, troubleshoot issues, and perform routine performance
				<span class="text-light-muted-text">optimizations</span>.
			</Text>
			<Text class="text-mute-text text-sm pt-7 xl:pl-32"
				><span class="text-light-muted-text">Svelte</span>,
				<span class="text-light-muted-text">SvelteKit</span>,
				<span class="text-light-muted-text">Shopify API</span>,
				<span class="text-light-muted-text">Asp.Net</span>,
				<span class="text-light-muted-text">React</span>,
				<span class="text-light-muted-text">Typescript</span>,
				<span class="text-light-muted-text">Umbraco</span>,
				<span class="text-light-muted-text">Bootstrap</span>
				and <span class="text-light-muted-text">Tailwind</span>.</Text
			>
		</svelte:fragment>
	</Grid>
	<Spacer size="lg" />
	<Grid gridQuarter>
		<svelte:fragment slot="grid-left">
			<Text class="text-sm text-light-muted-text hidden lg:block">2021 - 2022</Text>
		</svelte:fragment>
		<svelte:fragment slot="grid-right">
			<Text class="text-base xl:pl-32"
				>Web Developer <Link href="https://fullstackhq.com/" label="@Fullstack HQ" newTab /></Text
			>
			<Text class="text-sm text-light-muted-text lg:hidden pt-2">2021 - 2022</Text>
			<Spacer size="sm" />
			<Text class="text-mute-text text-sm pt-3 xl:pl-32"
				><span class="text-muted-text">▶</span> Work with a variety of different languages,
				platforms, frameworks, and content management systems, Implemented a
				<span class="text-light-muted-text">pixel-perfect</span> websites and landing pages from
				concept through development and Standardized all output with a new,
				<span class="text-light-muted-text">responsive</span>, mobile-first approach and strategy.
			</Text>
			<Text class="text-mute-text text-sm pt-7 xl:pl-32"
				><span class="text-light-muted-text">JavaScript</span>,
				<span class="text-light-muted-text">Typescript</span>,
				<span class="text-light-muted-text">Gatsby</span>,
				<span class="text-light-muted-text">React</span>,
				<span class="text-light-muted-text">Next.js</span>,
				<span class="text-light-muted-text">Vercel</span>,
				<span class="text-light-muted-text">Chakra UI</span>,
				<span class="text-light-muted-text">Prismic</span>
				and <span class="text-light-muted-text">Netlify</span>.</Text
			>
		</svelte:fragment>
	</Grid>
	<Spacer size="lg" />
	<Grid gridQuarter>
		<svelte:fragment slot="grid-left">
			<Text class="text-sm text-light-muted-text hidden lg:block">2021</Text>
		</svelte:fragment>
		<svelte:fragment slot="grid-right">
			<Text class="text-base xl:pl-32 hidden sm:block"
				>Front-end Developer Associate <Link
					href="https://www.chimesconsulting.com/"
					label="@Chimes Consulting"
					newTab
				/></Text
			>
			<Text class="text-base xl:pl-32 sm:hidden"
				>Front-end Developer Associate <Link
					href="https://www.chimesconsulting.com/"
					label="@Chimes"
					newTab
				/></Text
			>
			<Text class="text-sm text-light-muted-text lg:hidden pt-2">2021</Text>
			<Spacer size="sm" />
			<Text class="text-mute-text pt-3 xl:pl-32 text-sm"
				><span class="text-muted-text">▶</span> Created
				<span class="text-light-muted-text">mockup</span> designs for web application and mobile app
				and Build Chimes Consulting HR System with product team members to implement new feature developments.</Text
			>
			<Text class="text-mute-text text-sm pt-7 xl:pl-32 "
				><span class="text-light-muted-text">HTML</span>,
				<span class="text-light-muted-text">PHP</span>
				,
				<span class="text-light-muted-text">CSS</span>
				and <span class="text-light-muted-text">JavaScript</span>.</Text
			>
		</svelte:fragment>
	</Grid>
	<Spacer size="lg" />
	<Spacer size="lg" />
</Container>

<script lang="ts">
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

	const scrollToElement = (selector: string) => {
		const element = document.querySelector(selector) as HTMLElement;
		if (!element) return;
		element.scrollIntoView({ behavior: 'smooth' });
	};

	let firstActive = [false, false, false, false, false];

	let elements: Element[] = [undefined, undefined, undefined, undefined, undefined];
	let actives = [false, false, false, false, false];

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

	let src = '/src/images/hero/krt2.png';
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
			href="#jobs"
			label="Experience"
			onClick={() => scrollToElement('#jobs')}
			active={firstActive[2]}
		/>
		<NavDesktopLink
			href="#projects"
			label="Work"
			onClick={() => scrollToElement('#projects')}
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

<!-- <slot/> -->

<Container wide gutters bind:element={elements[0]}>
	<div class="py-[5rem] pb-20 lg:mt-[-6.25rem]">
		<Hero />
	</div>
</Container>
<HeroImage img={src} />

<div class="bg-[#25262A] 3xl:bg-[#25262A]">
	<Container wide gutters id="about" bind:element={elements[1]}>
		<div class="py-[30rem]">
			<Spacer size="sm" />
			<p class="text-primary font-mono text-base">Hi, my name is</p>
			<h1 class="text-3.5xl">KURT TEGERERO</h1>
			<p class="text-muted-text font-medium">
				I’m a front-end developer specializing in building exceptional User Interface (UI) and User
				Experience (UX) of web applications <Link
					newTab
					href="https://www.sodadigital.com.au/"
					label="@sodadigital"
				/>
			</p>
		</div>
	</Container>
</div>

<Container wide gutters id="jobs" bind:element={elements[2]}>
	<div class="py-[30rem]">
		<Spacer size="sm" />
		<p class="text-primary font-mono text-base">Hi, my name is</p>
		<h1 class="text-3.5xl">BODY</h1>
		<p class="text-muted-text font-medium">
			I’m a front-end developer specializing in building exceptional User Interface (UI) and User
			Experience (UX) of web applications <Link
				newTab
				href="https://www.sodadigital.com.au/"
				label="@sodadigital"
			/>
		</p>
	</div>
</Container>

<div>
	<Container wide gutters id="projects" bind:element={elements[3]}>
		<div class="py-[30rem]">
			<Spacer size="sm" />
			<p class="text-primary font-mono text-base">Hi, my name is</p>
			<h1 class="text-3.5xl">BODY</h1>
			<p class="text-muted-text font-medium">
				I’m a front-end developer specializing in building exceptional User Interface (UI) and User
				Experience (UX) of web applications <Link
					newTab
					href="https://www.sodadigital.com.au/"
					label="@sodadigital"
				/>
			</p>
		</div>
	</Container>
</div>
<Container wide gutters id="contact" bind:element={elements[4]}>
	<div class="py-[30rem]">
		<Spacer size="sm" />
		<p class="text-primary font-mono text-base">Hi, my name is</p>
		<h1 class="text-3.5xl">BODY</h1>
		<p class="text-muted-text font-medium">
			I’m a front-end developer specializing in building exceptional User Interface (UI) and User
			Experience (UX) of web applications <Link
				newTab
				href="https://www.sodadigital.com.au/"
				label="@sodadigital"
			/>
		</p>
	</div>
</Container>

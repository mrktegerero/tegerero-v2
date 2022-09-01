<script lang="ts">
	import Seo from '$components/common/SEO.svelte';
	import NavDesktopMain from '$components/Nav/NavDesktopMain.svelte';
	import NavDesktopLink from '$components/Nav/NavDesktopLink.svelte';
	import { onMount, setContext } from 'svelte';
	import Container from '$components/containers/Container.svelte';
	import Link from '$components/common/Link.svelte';
	import Spacer from '$components/common/Spacer.svelte';

	const scrollToElement = (selector: string) => {
		const element = document.querySelector(selector) as HTMLElement;
		if (!element) return;
		element.scrollIntoView({ behavior: 'smooth' });
	};

	let firstActive = [false, false];

	let elements: Element[] = [undefined, undefined];

	let actives = [false, false];

	setContext('ELEMENT', {
		setActive(index: number, active: boolean) {
			actives[index] = active;
		}
	});

	function scroll() {
		let index = -1;
		let min = Infinity;
		for (let i = 0; i < elements.length; i++) {
			const el = elements[i];
			const { top } = el.getBoundingClientRect();
			if (top >= 0 && top < min) {
				min = top;
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
		href="/work"
		title="About"
	/>
		<NavDesktopLink
			href="#about"
			title="About"
			onClick={() => scrollToElement('#about')}
			active={firstActive[0]}
		/>
		<NavDesktopLink
			href="#work"
			title="Work"
			onClick={() => scrollToElement('#work')}
			active={firstActive[1]}
		/>
	</svelte:fragment>
</NavDesktopMain>

<!-- <slot/> -->

<Container wide gutters>
	<div class="py-[30rem]">
		<Spacer size="sm" />
		<p class="text-primary font-mono text-base">Hi, my name is</p>
		<h1 class="text-3.5xl">KURT TEGERERO wew</h1>
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



<Container wide gutters>
	<div id="about" class="py-[30rem]" bind:this={elements[0]}>
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

<Container wide gutters>
	<div id="work" class="py-[30rem]" bind:this={elements[1]}>
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


<Container wide gutters>
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
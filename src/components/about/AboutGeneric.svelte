<script lang="ts">
	import Grid from '$components/common/Grid.svelte';
	import AboutButton from './AboutButton.svelte';
	import IconJs from '$components/icons/IconJs.svelte';
	import IconFb from '$components/icons/IconFb.svelte';
	import Text from '$components/common/Text.svelte';
	import Spacer from '$components/common/Spacer.svelte';
	import { cubicInOut } from 'svelte/easing';
	// import { swipe } from '$lib/actions/swipe';
	import { screens } from '$lib/responsive';
	import { scale, fly } from 'svelte/transition';
	import AboutCompanies from './AboutCompanies.svelte';
	import SEO from '$images/icon-image/seo.png';
	import FrontEnd from '$images/icon-image/front-end.png';
	import TechStack from '$images/icon-image/tech-stack.png';
	import Chimes from '$images/companies/chimes.png';
	import FStack from '$images/companies/fullstackhq.png';
	import Soda from '$images/companies/soda.png';

	// import beggining from '$images/icon-image/beginning.png';

	export let start = 0;
	// let begin = '/src/images/icon-image/beginning.png';
	// let company1 = '/src/images/companies/chimes.png';
	// let company2 = '/src/images/companies/fullstackhq.png';
	// let company3 = '/src/images/companies/soda.png';

	let content = [
		{
			label: 'Front-End',
			img: FrontEnd,
			desc: 'I develop front-end with super smooth coding',
			subtitle: 'Every fantastic design needs a fantastic Front-end dev',
			comment: `Since the beginning of my journey as a front-end developer nearly 2 years ago. I've done remote work with such an amazing companies with talented people to create web applications for both business and consumer use. I am confident, naturally curious and actively seeking out new technologies to improve coding.`
		},
		{
			label: 'Tech Stacks',
			img: TechStack,
			desc: `Front End technologies I've been worked with`,
			subtitle: 'Developers use a combination of loosely termed tools as the frontend tech stack.',
			comment: `JavaScript (ES6+), React, Typescript, Next.js, Gatsby, Svelte, SvelteKit, Vercel, Clouflare, Prismic, ASP.NET, Umbraco,  SASS, Tailwind, Bootstrap and Chakra UI`
		},
		{
			label: 'SEO',
			img: SEO,
			desc: `Let's boost your website with SEO optimize`,
			subtitle: 'SEO can makes your website more visible',
			comment: `Optimizing SEO can helps businesses to find new customers and promote brans on top pages of section engines that makes easy to find. Let's take advantage of the latest modern technologies to build amazing user experiences for everyone.`
		}
	];

	let companies = [
		{
			img: Soda
		},
		{
			img: FStack
		},
		{
			img: Chimes
		}
	];

	start = start % content.length;

	content = [...content.slice(start, content.length), ...content.slice(0, start)];

	type Content = typeof content[0];
	let current: Content = content[0];

	function select(e: CustomEvent<Content>) {
		current = e.detail;
	}
</script>

<div
	class="animate-[bottom_0.5s_ease-in-out] animation-fill-both animation-delay-2000 sm:animation-delay-2600 lg:animation-delay-3000"
>
	<Grid gridHalf>
		<svelte:fragment slot="grid-left">
			<div class="w-full pb-8 lg:pb-12 lg:bottom-0">
				<AboutButton items={content} {current} on:select={select} />
			</div>
		</svelte:fragment>
		<svelte:fragment slot="grid-right">
			<div class="lg:pl-16 xl:pr-24 relative">
				<Text class="text-muted-text text-xs">Introduce</Text>
				<Spacer size="sm" />
				<Spacer size="sm" />
				<Text class="text-2xl md:text-3xl">Hello! I'm Kurt Tegerero</Text>
				<Spacer size="sm" />
				<Spacer size="md" />
				<div class="stacked">
					{#key current}
						<div
							out:fly|local={{
								x: !$screens.md ? 0 : -30,
								y: !$screens.md ? 0 : 0,
								delay: !$screens.md ? 800 : 400,
								duration: 200,
								opacity: 0,
								easing: cubicInOut
							}}
							in:fly|local={{
								delay: !$screens.md ? 800 : 400,
								duration: 400,
								opacity: 0,
								x: !$screens.md ? 0 : 30,
								y: !$screens.md ? 30 : 0,
								easing: cubicInOut
							}}
						>
							<Text class="italic">{current.subtitle}</Text>
							<Spacer size="sm" />
							<Spacer size="sm" />
							<Text class="text-muted-text text-xs leading-6">{current.comment}</Text>
						</div>
					{/key}
				</div>
			</div>
		</svelte:fragment>
	</Grid>
</div>
<Spacer size="lg" />
<Spacer size="sm" />

<AboutCompanies items={companies} />

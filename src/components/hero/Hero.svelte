<script lang="ts">
	import Img from '$components/common/Img.svelte';
	import Link from '$components/common/Link.svelte';

	import Spacer from '$components/common/Spacer.svelte';
	import HeroImage from './HeroImage.svelte';
	import HeroText from './HeroText.svelte';
	import HeroTitle from './HeroTitle.svelte';
	// import imgPlinth from '$src/images/hero/';
	let src = '/src/images/hero/krt2.png';
</script>

<div class="grid lg:grid-cols-2">
	<div class="z-4">
		<Spacer size="lg" />
		<Spacer size="lg" />
		<div
			class="relative block after:content-[''] after:h-[30rem] after:w-[15rem] after:bg-primary after:absolute after:top-0 after:left-5 after:z-[-1] py-10"
		>
			<HeroTitle label="Front" class="pl-6" />
			<HeroTitle label="End" class="pl-14" />
			<HeroTitle label="Developer." />
		</div>
		<div class=" pt-48 md:pt-52">
			<HeroText large
				>A day without developing is like... just kidding I have no idea. I just create things
				everyday for the web <Link
					newTab
					href="https://www.sodadigital.com.au/"
					label="@sodadigital"
				/>.</HeroText
			>
		</div>
		<div class="pt-20 grid grid-cols-2 gap-4 md:pr-40 lg:pr-0 xl:pr-40">
			<HeroText small
				>Highly skilled at progressive enhancement, design systems & UI Engineering.</HeroText
			>
			<HeroText small
				>Over a year of experience building products for clients across several countries.</HeroText
			>
		</div>
	</div>
	<HeroImage desktop img={src} />
</div>

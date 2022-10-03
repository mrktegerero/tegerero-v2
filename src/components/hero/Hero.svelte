<script lang="ts">
	import Img from '$components/common/Img.svelte';
	import Link from '$components/common/Link.svelte';

	import Spacer from '$components/common/Spacer.svelte';
	import Text from '$components/common/Text.svelte';
	import HeroImage from './HeroImage.svelte';
	import HeroNumber from './HeroNumber.svelte';
	import HeroNumbers from './HeroNumbers.svelte';
	import HeroNumberText from './HeroNumberText.svelte';
	// import HeroText from './HeroText.svelte';
	import HeroTitle from './HeroTitle.svelte';
	// import imgPlinth from '$src/images/hero/';
	// let src = '/src/images/hero/krt.png';
	import Kurt from '$images/hero/krt.png';
</script>

<div class="grid lg:grid-cols-2">
	<div class="z-20">
		<div class="3xl:pl-32">
			<div class="hidden lg:block">
				<Spacer size="lg" />
				<Spacer size="lg" />
				<Spacer size="sm" />
			</div>
			<div class="relative">
				<HeroTitle label="Front-end Developer" />
			</div>
			<div class="pt-20">
				<Text
					large
					qouteBefore
					class="animate-[bottom_0.5s_ease-in-out] animation-fill-both animation-delay-1000 sm:animation-delay-1400 lg:animation-delay-2000"
					><span class="pl-3 sm:pl-5" /> Talk is cheap.</Text
				>
				<Text
					large
					qouteAfter
					class="animate-[bottom_0.5s_ease-in-out] animation-fill-both animation-delay-1100 sm:animation-delay-1700 lg:animation-delay-2100"
					>Show me the code</Text
				>
			</div>
			<div class="pt-12">
				<Text
					small
					class="animate-[bottom_0.5s_ease-in-out] animation-fill-both animation-delay-1200 sm:animation-delay-1800 lg:animation-delay-2200"
					>I build exceptional UI and UX of web applications,</Text
				>
				<Text
					small
					class="animate-[bottom_0.5s_ease-in-out] animation-fill-both animation-delay-1300 sm:animation-delay-1900 lg:animation-delay-2300"
					>and I just love what I do.</Text
				>
			</div>
			<div
				class="pt-20 animate-[bottom_0.5s_ease-in-out] animation-fill-both animation-delay-1400 sm:animation-delay-2000 lg:animation-delay-2400"
			>
				<Link
					href="mailto:kurtrendel@gmail.com"
					label="Let's Chat!"
					class="uppercase text-[1.7rem] font-bold"
					large
				/>
			</div>
		</div>
		<Spacer size="lg" />
		<Spacer size="lg" />
		<HeroNumber>
			<HeroNumbers number="1.5">
				<HeroNumberText label="Years" />
				<HeroNumberText label="Experience" />
			</HeroNumbers>
			<HeroNumbers number="11">
				<HeroNumberText label="Projects Completed" />
				<HeroNumberText label="in my career " />
			</HeroNumbers>
		</HeroNumber>
	</div>
	<HeroImage desktop img={Kurt} />
</div>

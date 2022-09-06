<script lang="ts">
	import Img from '$components/common/Img.svelte';
	import Link from '$components/common/Link.svelte';

	import Spacer from '$components/common/Spacer.svelte';
import Text from '$components/common/Text.svelte';
	import HeroImage from './HeroImage.svelte';
	import HeroNumber from './HeroNumber.svelte';
	import HeroNumbers from './HeroNumbers.svelte';
	import HeroNumberText from './HeroNumberText.svelte';
	import HeroText from './HeroText.svelte';
	import HeroTitle from './HeroTitle.svelte';
	// import imgPlinth from '$src/images/hero/';
	let src = '/src/images/hero/krt.png';
</script>

<div class="grid lg:grid-cols-2">
	<div class="z-50">
		<div class="3xl:pl-32">
			<Spacer size="lg" />
			<Spacer size="lg" />
			<Spacer size="sm" />
			<div class="relative">
				<HeroTitle label="Front-end Developer" />
			</div>
			<div class="pt-20">
				<Text large>'Talk is cheap.</Text>
				<Text large>Show me the code'</Text>
			</div>
			<div class="pt-12">
				<Text small>I build exceptional UI and UX of web applications,</Text>
				<Text small>and I love what I do.</Text>
			</div>
			<div class="pt-20">
				<Link
					href="mailto:kurtrendel@gmail.com"
					label="Let's Chat!"
					class="uppercase text-[1.7rem] font-bold"
					large
				/>
			</div>
		</div>
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
	<HeroImage desktop img={src} />
</div>

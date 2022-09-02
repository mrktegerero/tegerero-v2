<script lang="ts">
	import Img from '$components/common/Img.svelte';

	import Spacer from '$components/common/Spacer.svelte';
	import HeroTitle from './HeroTitle.svelte';
	// import imgPlinth from '$src/images/hero/';
  let src = '/src/images/hero/krt.png';
</script>

<div class="grid lg:grid-cols-2">
	<div>
		<Spacer size="lg" />
		<Spacer size="lg" />
		<div
			class="relative block after:content-[''] after:h-[30rem] after:w-[15rem] after:bg-primary after:absolute after:top-0 after:left-5 after:z-[-1] py-10"
		>
			<HeroTitle label="Front" class="pl-6" />
			<HeroTitle label="End" class="pl-14" />
			<HeroTitle label="Developer." />
		</div>
		<div>
			<p class="text-[22px] font-medium text-muted-text">
				A day withouth developing is like... just kidding I have no idea. I just create things
				everyday for the web.
			</p>
		</div>
		<div class="pt-52 grid grid-cols-2 gap-4 xl:pr-40">
			<p class="text-muted-text font-medium leading-6">
				Highly skilled at progressive enhancement, design systems & UI Engineering.
			</p>
			<p class="text-muted-text font-medium leading-6">
				Over a year of experience building products for clients across several countries.
			</p>
		</div>
	</div>
	<div class="xl:absolute right-0">
    <div class="xl:w-[50rem]">
    <img src={src} alt="" class="w-full">
  </div>
		<!-- <Img
    fit="cover"
    loading="lazy"
    decoding="async"
    srcset={current.image.srcset}
    width={current.image.width}
    height={current.image.height}
    sizes={current.image.sizes}
    alt={current.person.name}
  /> -->
		<!-- <img src={image.src} alt=""> -->
	</div>
</div>

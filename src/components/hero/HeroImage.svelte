<script lang="ts">
  export let img;
  export let desktop: boolean = false;
</script>

<div class="right-0 lg:pt-80 lg:hidden" class:image-container-desktop={desktop}>
	<div class="" class:image-bg-desktop={desktop}>
		<img src={img} alt="" class="w-full" class:image-desktop={desktop}/>
	</div>
</div>

<style lang="postcss">
  .image-container-desktop {
    @apply pl-40 3xl:pl-96 right-40 hidden lg:block;
  }

	.image-bg-desktop {
		@apply  relative cursor-pointer;
		@apply after:content-[''] after:border-[2px] after:border-dark-bg after:absolute after:left-16 after:top-16 after:w-full after:h-full after:z-0;
		@apply before:content-[''] before:border-[4px] before:border-primary before:absolute  before:w-full before:h-full before:z-20 before:transition-all before:duration-300 before:ease-in-out before:bg-[rgb(227,_174,_34,_.35)] hover:before:bg-transparent;
	}

  .image-desktop {
    @apply mb-[3rem] relative block mt-[-3rem] z-10;
  }
</style>

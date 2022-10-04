<script lang="ts">
	export let large: boolean = false;
	export let small: boolean = false;
	export let header: boolean = false;
  export let description: boolean = false;
	export let descriptionPrimary: boolean = false;
	export let qouteBefore: boolean = false;
	export let qouteAfter: boolean = false;
	let classes: string = '';
	export { classes as class };
</script>

<p
	class="text-light-text font-mono relative {classes}"
	class:large
	class:small
	class:qoute-before={qouteBefore}
	class:header
  class:description
	class:qoute-after={qouteAfter}
	class:description-primary={descriptionPrimary}
>
	<slot />
</p>

<style lang="postcss">
	.small {
		@apply leading-6 text-muted-text font-semibold text-sm md:text-base;
	}

	.large {
		@apply text-[2.1rem] sm:text-[3.6rem] leading-[4rem] sm:leading-[5rem];
	}

	.qoute-before {
		@apply before:content-['"'] before:text-[1rem] before:sm:text-[1.5rem] before:absolute before:top-[-10px] before:sm:top-[-15px];
	}

	.qoute-after {
		@apply after:content-['"'] after:text-[1rem] after:sm:text-[1.5rem] after:absolute after:mt-[-10px] after:sm:mt-[-17px];
	}

	.header {
		@apply text-[2rem] md:text-[2.5rem] leading-[3.5rem] ;
	}

  .description {
		@apply text-muted-text text-xs md:text-sm;
	}

	.description-primary {
		@apply text-primary text-xs md:text-sm;
	}
</style>

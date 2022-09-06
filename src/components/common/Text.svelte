<script lang="ts">
  export let large: boolean = false;
  export let small: boolean = false;
  let classes: string = '';
	export { classes as class };
</script>

<p class="text-light-text font-mono {classes}" class:large class:small><slot/></p>


<style lang="postcss">
.small {
  @apply leading-6 text-muted-text font-semibold text-base;
}

.large {
  @apply text-[3.6rem] leading-[5rem];
}
</style>
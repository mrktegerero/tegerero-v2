<script lang="ts">
  export let label: string;
  let classes: string = '';
	export { classes as class };
</script>

<h1 class="title {classes}">{label}</h1>

<style lang="postcss">
  .title {
    @apply text-4xl sm:text-5xl leading-[3.5rem] sm:leading-[5.5rem] block relative;
  }
</style>
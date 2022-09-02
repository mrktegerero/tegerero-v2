<script lang="ts">
  export let large: boolean = false;
  export let small: boolean = false;
</script>

<p class:large class:small><slot/></p>


<style lang="postcss">
.small {
  @apply text-muted-text font-medium leading-6;
}

  .large {
    @apply text-[22px] font-medium text-muted-text;
  }
</style>
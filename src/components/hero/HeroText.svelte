<script lang="ts">
  export let large: boolean = false;
  export let small: boolean = false;
</script>

<p class:large class:small class="text-light-text"><slot/></p>


<style lang="postcss">
.small {
  @apply font-medium leading-6 text-primary;
}

  .large {
    @apply text-[22px] font-medium;
  }
</style>
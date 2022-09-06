<script lang="ts">
  export let large: boolean = false;
  export let small: boolean = false;
</script>

<p class:large class:small class="text-light-text"><slot/></p>


<style lang="postcss">
.small {
  @apply leading-6 text-muted-text font-semibold text-base font-mono;
}

.large {
  @apply text-[3.6rem] leading-[5rem] font-mono;
}
</style>
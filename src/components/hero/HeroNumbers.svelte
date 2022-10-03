<script lang="ts">
  export let number: string = '';
</script>

<div class="flex pl-0 sm:pl-20 first:pl-0 animate-[bottom_0.5s_ease-in-out] animation-fill-both animation-delay-1400 sm:animation-delay-2000 lg:animation-delay-2400">
  <p class="number-text">{number}</p>
  <div class="pl-4 pt-0.5 sm:pt-0">
    <slot/>
  </div>
</div>

<style lang="postcss">
  .number-text{
    @apply text-[3rem] sm:text-[4rem] leading-[3.5rem] sm:pt-2;
  }
</style>

<script lang="ts">
  export let number: string = '';
</script>

<div class="flex pl-0 sm:pl-20 first:pl-0">
  <p class="number-text">{number}</p>
  <div class="pl-4">
    <slot/>
  </div>
</div>

<style lang="postcss">
  .number-text{
    @apply text-[3rem] sm:text-[4rem] leading-[3.5rem] md:pt-2;
  }
</style>

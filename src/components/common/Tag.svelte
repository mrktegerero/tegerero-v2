<script lang="ts">
  export let label: string = '';
</script>

<div class="flex items-center pr-2 last:pr-0"><p class="text">{label}</p></div>

<style lang="postcss">
  .text {
    @apply bg-mute-bg m-0 py-0.5 px-1.5 text-xs rounded pt-1;
  }
</style>
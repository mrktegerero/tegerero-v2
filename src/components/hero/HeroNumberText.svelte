<script lang="ts">
  export let label: string = '';
</script>

<p class="text">{label}</p>

<style lang="postcss">
  .text {
    @apply uppercase text-muted-text;
  }
</style>
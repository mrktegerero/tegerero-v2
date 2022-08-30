<script lang="ts">
  export let href: string;
  export let label: string;
</script>

<a class="link" {href}> {label}</a>

<style lang="postcss">
  .link {
    @apply text-primary inline-block relative;
    @apply after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0.5 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out after:delay-150;
    @apply hover:after:scale-x-[1] hover:after:origin-bottom-left;
  }
</style>
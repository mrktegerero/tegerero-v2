<div class="socials">
    <slot/>
</div>

<style lang="postcss">
  .socials {
    @apply flex m-0 p-0 list-none;
    /* @apply before:content-[''] before:block before:w-[1px] before:h-[90px] before:my-0 before:mx-auto before:bg-dark-text;
    @apply after:content-[''] after:block after:w-[1px] after:h-[90px] after:my-0 after:mx-auto after:bg-dark-text; */
  }
</style>
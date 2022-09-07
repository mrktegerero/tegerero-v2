<div class="socials">
	<ul class="socialList">
		<slot />
	</ul>
</div>

<style lang="postcss">
	.socials {
		@apply w-[40px] fixed h-screen top-2/4 left-[40px] mt-[-10vh] hidden lg:block;
	}

	.socialList {
		@apply flex items-center flex-col m-0 p-0 list-none;
		/* @apply before:content-[''] before:block before:w-[1px] before:h-[90px] before:my-0 before:mx-auto before:bg-dark-text;
    @apply after:content-[''] after:block after:w-[1px] after:h-[90px] after:my-0 after:mx-auto after:bg-dark-text; */
	}
</style>

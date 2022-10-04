<th class="text-left text-xl text-light-muted-text header"><slot /></th>

<style lang="postcss">
	.header {
		@apply px-4 py-2 pb-4;
	}

	.header:first-child {
		@apply pl-0;
	}

	.header:last-child {
		@apply pr-0;
	}
	.header:nth-child(3) {
		@apply hidden md:table-cell;
	}

	.header:nth-child(4) {
		@apply hidden md:table-cell;
	}
</style>

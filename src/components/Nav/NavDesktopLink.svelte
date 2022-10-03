<script lang="ts">
	import { page } from '$app/stores';

	export let label: string = '';
	export let number: string = '';
	export let href: string = '';
	export let onClick = undefined;
	export let active: boolean = undefined;
	export let footer: boolean = undefined;
</script>

<a
	{href}
	class="link"
	class:footer
	class:active
	on:click={onClick}
	class:animation={$page.url.pathname === '/' && $page.url.pathname !== '/work'}
	><span class="text-primary pr-1">{number}</span>{label}</a
>

<style lang="postcss">
	.link {
		@apply text-light-text leading-7 text-[13px] font-mono mr-12 last:mr-0  relative transition-all duration-300 hover:text-primary focus:text-primary;
		@apply before:content-['<'] before:absolute before:left-[0.4rem] before:opacity-0 before:transition-all before:duration-300 before:ease-out hover:before:left-[-0.8rem] hover:before:opacity-100;

		@apply focus:before:left-[-0.8rem] focus:before:opacity-100;

		@apply after:content-['>'] after:absolute after:right-[0.2rem] after:opacity-0 after:transition-all after:duration-300 after:ease-out hover:after:right-[-1rem] hover:after:opacity-100;

		@apply focus:after:right-[-1rem] focus:after:opacity-100;
	}

	.animation {
		@apply animate-[left_0.5s_ease-in-out] animation-fill-both;
	}

	.link:nth-child(1) {
		@apply animation-delay-200;
	}

	.link:nth-child(2) {
		@apply animation-delay-400;
	}
	.link:nth-child(3) {
		@apply animation-delay-600;
	}
	.link:nth-child(4) {
		@apply animation-delay-800;
	}

	.link::after:hover {
		-webkit-left: 0.8rem;
	}

	.footer {
		@apply mr-0;
	}
	.active {
		@apply text-primary;
		@apply before:scale-x-[1] before:left-[-0.8rem] before:opacity-100;
		@apply after:scale-x-[1] after:right-[-1rem] after:opacity-100;
	}
</style>

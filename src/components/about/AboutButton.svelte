<script lang="ts">
	import Text from '$components/common/Text.svelte';
import { createEventDispatcher } from 'svelte';

	export let items;
	export let current: unknown;

	const dispatch = createEventDispatcher();

	const click = (item: unknown) => () => dispatch('select', item);
</script>

<div class="flex flex-col gap-2 lg:pr-10">
	{#each items as item}
		<div on:click={click(item)} class="group button" class:active={item === current}>
      <div class="flex justify-between items-center">
        <p class="md:text-xl font-mono transition duration-200 group-hover:text-primary" class:text-active={item === current}>{item.label}</p>
        <div class="w-4 md:w-5">
        <img src={item.img} alt="">
      </div>
      </div>
      <div class="flex justify-start">
        <Text class="text-muted-text text-xs">{item.desc}</Text>
      </div>
    </div>
	{/each}
</div>

<style lang="postcss">
	.button.active {
		@apply drop-shadow-2xl;
	}

  .text-active {
    @apply text-primary;
  }
	.button {
		/* @apply appearance-none rounded-full h-4 w-4 border-2 border-primary;
		@apply bg-transparent hover:bg-mute-bg hover:border-mute-bg;
		@apply focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat;
		@apply bg-center bg-contain float-left cursor-pointer; */
    @apply bg-dark-bg p-5 md:p-10 rounded-md transition duration-200 cursor-pointer;
    @apply hover:drop-shadow-2xl;
	}

  img {
    @apply w-full;
    filter: invert(100%) sepia(49%) saturate(2288%) hue-rotate(68deg) brightness(105%) contrast(91%);
  }
</style>

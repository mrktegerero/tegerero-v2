import { derived, writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

export const mobileNavOpen = writable(false);
export const scrolling = derived(
	[
		mobileNavOpen
	],
	(stores) => !stores.some((x) => x)
);

if (browser) {
	scrolling.subscribe((value) => {
		const html = document.scrollingElement as HTMLHtmlElement;
		if (value) {
			html.classList.remove('disable');
		} else {
			html.classList.add('disable');
		}
	});
}

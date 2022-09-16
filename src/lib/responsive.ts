import theme from '$tailwind';
import { readable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultValue: Record<string, boolean> = {};

for (const [key] of Object.entries(theme.screens)) {
	defaultValue[key] = false;
}

export const screens = readable(defaultValue, (set) => {
	const unsubs: (() => void)[] = [];

	const matches = {};

	for (const [key, value] of Object.entries(theme.screens)) {
		matches[key] = false;
		if (browser) {
			const m = matchMedia(`(min-width: ${value})`);
			matches[key] = m.matches;
			const handler = () => {
				matches[key] = m.matches;
				set(matches);
			};
			m.addEventListener('change', handler);
			unsubs.push(() => m.removeEventListener('change', handler));
		}
	}
	set(matches);

	return () => {
		if (browser) {
			for (const unsub of unsubs) {
				unsub();
			}
		}
	};
});

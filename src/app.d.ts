// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
}

declare module '$tailwind' {
	export const screens: Record<string, string>;
	export const colors: Record<string, string>;
}
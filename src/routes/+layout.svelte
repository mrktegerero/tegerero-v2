<script lang="ts">
	import '$src/app.css';
	import NavDesktop from '$components/Nav/NavDesktop.svelte';
import Socials from '$components/socials/Socials.svelte';
import Footer from '$components/footer/Footer.svelte';
</script>

<NavDesktop />
<slot />
<Footer/>
<script>
	import TableData from './table/TableData.svelte';
	import TableHead from './table/TableHead.svelte';
	import TableMain from './table/TableMain.svelte';
	import TableRow from './table/TableRow.svelte';
</script>

<TableMain>
	<svelte:fragment slot="table-header">
		<TableHead>Year</TableHead>
		<TableHead>Title</TableHead>
		<TableHead>Made at</TableHead>
		<TableHead>Built with</TableHead>
		<TableHead>Link</TableHead>
	</svelte:fragment>
	<svelte:fragment slot="table-body">
		<TableRow>
			<TableData>2023</TableData>
			<TableData>Pack & Send Australia</TableData>
			<TableData>Soda Digital</TableData>
			<TableData>ASP.NET · C# · Lit · Tailwind · Umbraco</TableData>
			<TableData
				link="https://www.packsend.com.au/"
			/>
		</TableRow>
		<TableRow>
			<TableData>2023</TableData>
			<TableData>Caritas Australia - Supporter Hub</TableData>
			<TableData>Soda Digital</TableData>
			<TableData>ASP.NET · C# · Lit · Tailwind · Umbraco</TableData>
			<TableData
				link="https://www.caritas.org.au/supporter-hub/dashboard/"
			/>
		</TableRow>
		<TableRow>
			<TableData>2023</TableData>
			<TableData>Aged Care 101</TableData>
			<TableData>Soda Digital</TableData>
			<TableData>ASP.NET · C# · Bootstrap · Umbraco</TableData>
			<TableData
				link="https://www.agedcare101.com.au/"
			/>
		</TableRow>
		<TableRow>
			<TableData>2022</TableData>
			<TableData>Royal Life Saving Society - Australia MVP</TableData>
			<TableData>Soda Digital</TableData>
			<TableData>.NET · C# · Bootstrap</TableData>
			<TableData
				link="https://app-web-ka63eko4wrpea.azurewebsites.net/"
			/>
		</TableRow>
		<TableRow>
			<TableData>2022</TableData>
			<TableData>Sterland - Warehouse PWA</TableData>
			<TableData>Soda Digital</TableData>
			<TableData>React · Tailwind · Typescript · Postman</TableData>
			<TableData
				link="https://sterland-warehouse-pwa.soda.dev/#/login"
			/>
		</TableRow>
		<TableRow>
			<TableData>2022</TableData>
			<TableData>Villages Mercer</TableData>
			<TableData>Soda Digital</TableData>
			<TableData>ASP.NET · C# · Bootstrap · Umbraco</TableData>
			<TableData
				link="https://mercer-web.azurewebsites.net/"
			/>
		</TableRow>
		<TableRow>
			<TableData>2022</TableData>
			<TableData>Porter's Paints Original - Shop</TableData>
			<TableData>Soda Digital</TableData>
			<TableData>SvelteKit · Tailwind · TypeScript · Shopify API · Cloudflare</TableData>
			<TableData
				link="https://shop.porterspaints.com/"
			/>
		</TableRow>
		<TableRow>
			<TableData>2022</TableData>
			<TableData>Sterland - Trade Portal</TableData>
			<TableData>Soda Digital</TableData>
			<TableData>React · Tailwind · Typescript · Postman</TableData>
			<TableData
				link="https://sterland.soda.dev/#/login"
			/>
		</TableRow>
		<TableRow>
			<TableData>2021</TableData>
			<TableData>Plotly Marketing</TableData>
			<TableData>Fullstack HQ</TableData>
			<TableData>Next.js · Chakra UI · TypeScript · Prismic · Vercel</TableData>
			<TableData
				link="https://plotly.com/"
			/>
		</TableRow>
		<TableRow>
			<TableData>2021</TableData>
			<TableData>Anduin Transaction</TableData>
			<TableData>Fullstack HQ</TableData>
			<TableData>Gatsby · SASS · Prismic · Netlify</TableData>
			<TableData
				link="https://www.anduintransact.com/"
			/>
		</TableRow>
		<TableRow>
			<TableData>2021</TableData>
			<TableData>Mansion 88</TableData>
			<TableData>—</TableData>
			<TableData>Html · SASS · JS · Netlify</TableData>
			<TableData
				link="https://mansion88test.netlify.app/"
				github="https://github.com/mrktegerero/M88-TEST"
			/>
		</TableRow>
		<TableRow>
			<TableData>2021</TableData>
			<TableData>Personal Website V1</TableData>
			<TableData>—</TableData>
			<TableData>Html · CSS · JS · Netlify</TableData>
			<TableData
				link="https://ktegerero.netlify.app/"
				github="https://github.com/mrktegerero/portfolio-first-project"
			/>
		</TableRow>
		<TableRow>
			<TableData>2021</TableData>
			<TableData>Tier One Entertainment</TableData>
			<TableData>—</TableData>
			<TableData>Html · SASS · JS · jQuery · Netlify</TableData>
			<TableData
				link="https://tier-one.netlify.app/"
				github="https://github.com/mrktegerero/tierone"
			/>
		</TableRow>
		<TableRow>
			<TableData>2021</TableData>
			<TableData>YRE Travel</TableData>
			<TableData>—</TableData>
			<TableData>Gastby · GraphQL · Styled Components · Netlify</TableData>
			<TableData
				link="https://yre.netlify.app/"
				github="https://github.com/mrktegerero/yre-travel"
			/>
		</TableRow>
		<TableRow>
			<TableData>2021</TableData>
			<TableData>Chime Consulting HR System</TableData>
			<TableData>Chimes Consulting</TableData>
			<TableData>Html · CSS · JS · PHP · MySQL</TableData>
			<TableData github="https://github.com/chimesconsultingph/chimes_system" />
		</TableRow>
		<TableRow>
			<TableData>2021</TableData>
			<TableData>Non Contact Apprehension - User / Admin</TableData>
			<TableData>AMA Makati</TableData>
			<TableData>Html · CSS · JS · PHP · MySQL</TableData>
			<TableData github="https://github.com/mrktegerero/noncontactmakati" />
		</TableRow>
	</svelte:fragment>
</TableMain>

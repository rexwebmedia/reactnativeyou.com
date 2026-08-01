// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://reactnativeyou.web.app',
	integrations: [
		starlight({
			title: 'React Native You',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/byvex/react-native-you' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Getting Started', slug: 'guides/getting-started' },
					],
				},
				{
					label: 'Components',
					autogenerate: { directory: 'components' },
				},
				{
					label: 'Hooks',
					autogenerate: { directory: 'hooks' },
				},
				{
					label: 'Articles',
					collapsed: true,
					autogenerate: { directory: 'articles' },
				},
			],
			head: [
				{
					tag: 'script',
					attrs: {
						src: 'https://www.googletagmanager.com/gtag/js?id=G-ZYW94515ZL',
						async: true,
					},
				},
				{
					tag: 'script',
					content: `window.dataLayer=window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-ZYW94515ZL');`,
				},
				{
					tag: 'script',
					attrs: {
						src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5653379291765127',
						crossorigin: 'anonymous',
						async: true,
					}
				},
				{
					tag: 'meta',
					attrs: {
						name: 'google-adsense-account',
						content: 'ca-pub-5653379291765127',
					}
				}
			],
			customCss: [
				'./src/styles/custom.css',
			],
		}),
	],
});

import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		preact({
			prerender: {
				enabled: false,
			},
		}),
		// libInjectCss(),
	],
	build: {
		copyPublicDir: false,
		target: 'modules',
		cssCodeSplit: true,
		lib: {
			entry: 'src/index.tsx',
			name: 'MyHomePage',
			fileName: 'my-home-page',
		},
	},
});

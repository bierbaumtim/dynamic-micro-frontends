import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import { resolve } from 'path'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [svelte()],
//   build: {
//     lib: {
//       entry: resolve(__dirname, 'src/main.ts'),
//       name: 'MyTodoListComponent',
//       fileName: (format) => `my-todo-list.${format}.js`,
//       formats: ['es'],
//     },
//     outDir: 'dist-js',
//   }
// })
export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess({}),
      exclude: /\.component\.svelte$/,
      emitCss: false,
    }),
    svelte({
      preprocess: sveltePreprocess(),
      include: /\.component\.svelte$/,
      compilerOptions: {
        customElement: true,
      },
      emitCss: false,
    }),
  ],
  build: {
    sourcemap: true,
    target: 'modules',
    lib: {
      entry: 'src/main.ts',
      name: '<<name>>',
      fileName: 'components',
    },
  },
})

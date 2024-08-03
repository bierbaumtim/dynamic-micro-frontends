import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
        css: 'injected',
      }
    })
  ],
  build: {
    lib: {
      entry: './src/main.wc.ts',
      name: 'MyTodoListComponent',
      // fileName: (format) => `my-todo-list.${format}.js`,
      // formats: ['es'],
    },
  }
})
// export default defineConfig({
//   plugins: [
//     svelte({
//       preprocess: sveltePreprocess({}),
//       exclude: 'src/App.svelte',
//       emitCss: false,
//     }),
//     svelte({
//       preprocess: sveltePreprocess(),
//       include: 'src/App.svelte',
//       compilerOptions: {
//         customElement: true,
//         css: 'injected',
//       },
//       emitCss: false,
//     }),
//   ],
//   build: {
//     sourcemap: true,
//     target: 'modules',
//     lib: {
//       entry: 'src/main.ts',
//       name: '<<name>>',
//       fileName: 'components',
//     },
//   },
// })

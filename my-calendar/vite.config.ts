import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
    ],
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      assetsInlineLimit: 0,
      cssCodeSplit: true,
      sourcemap: 'inline',
      ssr: false,
      lib: {
        entry: resolve(__dirname, 'src/main.js'),
        name: 'MyCalendarComponent',
        fileName: (format) => `my-calendar.${format}.js`,
        formats: ['es', 'cjs', 'umd', 'iife'],
      },
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
          entryFileNames: '[name].js',
        }
      }
    }
  }
})
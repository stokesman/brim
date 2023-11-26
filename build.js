#!/usr/bin/env node
import { build } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { build as svelte_pack } from '@sveltejs/package/node_modules/src/index'
import solid from 'vite-plugin-solid'
import react from '@vitejs/plugin-react'

// Vanilla
await build({
  configFile: false,
  build: {
    lib: {
      entry: './src/lib/vanilla',
      fileName: 'brim',
      name: 'brim',
      formats: ['iife', 'es'],
    },
  }
})

// Svelte
/** @param {import('@sveltejs/package/types').PackageConfig} */
svelte_pack({
  files: path => path.endsWith('svelte.js')
})
/*
await build({
  configFile: false,
  plugins: [svelte()],
  build: {
    emptyOutDir: false,
    lib: {
      entry: './src/lib/svelte',
      fileName: 'brim-svelte',
      formats: ['es'],
    },
  },
})
*/

// Solid
await build({
  configFile: false,
  plugins: [solid()],
  build: {
    emptyOutDir: false,
    lib: {
      entry: './src/lib/solid.jsx',
      fileName: 'brim-solid',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['solid-js']
    }
  },
})

// React
await build({
  configFile: false,
  plugins: [react()],
  build: {
    minify: false,
    emptyOutDir: false,
    lib: {
      entry: './src/lib/react.jsx',
      fileName: 'brim-react',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react'],
      // Doubtful that UMD or IIFE build would be needed
      // output: {
      //   globals: {
      //     react: 'React'
      //   }
      // }
    }
  },
})
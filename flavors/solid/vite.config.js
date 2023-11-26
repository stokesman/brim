import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import alias from '@rollup/plugin-alias'

// Alias solid-js as a way to test integration with multiple versions
const {SOLID_VERSION = ''} = process.env
const aliased = alias({
  entries: [
    { find: 'solid-js', replacement: `solid-js${SOLID_VERSION}` },
  ]
})

export default defineConfig({
  plugins: [
    aliased,
    solid()
  ],
  build: {
    minify: false,
    lib: {
      entry: './index.jsx',
      fileName: 'brim',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['solid-js']
    }
  }
})

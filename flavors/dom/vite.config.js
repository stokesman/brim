import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './index.js',
      fileName: 'brim',
      formats: ['iife'],
      name: 'brim'
    },
  },
})

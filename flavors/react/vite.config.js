import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    minify: false,
    lib: {
      entry: './index.jsx',
      fileName: 'brim',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react']
    }
  }
})

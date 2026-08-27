import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // The current CSS minifier drops unprefixed backdrop-filter declarations
    // when followed by -webkit-backdrop-filter, changing the dev/prod cascade.
    // Preserve authored CSS until that behavior is fixed; JS stays minified.
    cssMinify: false,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    restoreMocks: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
      '/uploads': 'http://localhost:8080',
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { dirname, resolve as pathResolve } from 'node:path'

// https://vite.dev/config/
const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: pathResolve(__dirname, 'src/components'),
      pages: pathResolve(__dirname, 'src/pages'),
    },
  },
})

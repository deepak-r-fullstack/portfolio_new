import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Served at the root of portfolio.sritaraksolutions.in (GitHub Pages custom domain)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
})

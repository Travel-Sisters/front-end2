import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'

export default defineConfig({
  plugins: [react()],
  cors: true,
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
      
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    }
  }
})

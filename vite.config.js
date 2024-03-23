import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'

export default defineConfig({
  server:{
    proxy:{
      '/API_URL':{
        target: '',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\API_URL/,''),
      },
    },
    cors: true,
  },
  plugins: [react()],
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

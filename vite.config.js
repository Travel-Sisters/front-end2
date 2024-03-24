import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'

export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target: 'http://10.0.0.215:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/,''),
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

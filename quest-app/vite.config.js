import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/posts': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/comments': { // Mevcut proxy
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/likes': { // Mevcut proxy
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
     '/auth/register': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/auth/login': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/auth/refresh': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      "/users/activity":{
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      "/users":{
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      "/users/avatar":{
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    },
  }
})

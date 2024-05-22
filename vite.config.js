import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:"/animedb",
  build: {
    // outDir: "../src/main/resources/static",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  outDir:"./dist",
  server: {
    // proxy: {
    //   "/api": {
    //     target: process.env.VITE_API_URL,
    //     changeOrigin: true,
    //   },
    // },
    port: 5173,
  },
})

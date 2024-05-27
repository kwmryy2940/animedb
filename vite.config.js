import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/animedb",
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
  outDir: "./dist",
  server: {
    proxy: {
      "/syoboiapi": {
        target: "https://cal.syoboi.jp",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/syoboiapi/, ""), // /syoboiapiを削除してルーティングする
      },
    },
    port: 5173,
  },
});

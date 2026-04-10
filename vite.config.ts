import { defineConfig } from "vite";
import path from 'path'

export default defineConfig({
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    alias: {
      "@webgl": path.resolve(__dirname, "./src/webgl/index.ts"),
      "@world": path.resolve(__dirname, "./src/webgl/world/index.ts"),
    },
  },
});
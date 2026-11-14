import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        inicio: fileURLToPath(new URL('./index.html', import.meta.url)),
        tul: fileURLToPath(new URL('./tul/index.html', import.meta.url)),
        temporizador: fileURLToPath(new URL('./temporizador/index.html', import.meta.url)),
      },
    },
  },
  resolve: {
    alias: {
      "@fechitat/brand": fileURLToPath(new URL("./src/shared/brand.ts", import.meta.url)),
      "@fechitat/ui": fileURLToPath(new URL("./src/shared/ui.tsx", import.meta.url)),
    },
  },
  server: {
    port: 3002,
  },
});

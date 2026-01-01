import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  root: "src/client",
  plugins: [tailwindcss(), react()],
  server: {
    port : 4500,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },

  build: {
    outDir: '../../dist',
    emptyOutDir: true
  },
  
});

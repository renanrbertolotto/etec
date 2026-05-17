import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy evita erro de CORS em desenvolvimento
    proxy: {
      "/ETEC": "http://localhost:3000",
    },
  },
});
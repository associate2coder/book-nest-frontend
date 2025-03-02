import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allows external access
    allowedHosts: [
      "driven-truly-mule.ngrok-free.app", // Explicitly allow Ngrok domain
      "localhost",
      "127.0.0.1"
    ],
    cors: true, // Enable CORS for external access
    strictPort: true, // Ensure the port is always the same
    hmr: {
      clientPort: 443, // Ensure HMR works with Ngrok over HTTPS
    },
  },
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/shared/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@styles/reset";
          @use "@styles/variables" as vars;
          @use "@styles/mixins" as mixins;
          @import "@styles/typography";
        `,
      },
    },
  },
})

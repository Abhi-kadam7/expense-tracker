import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://expense-tracker-1-2me3.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

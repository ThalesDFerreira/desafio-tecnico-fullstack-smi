import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './dist',
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  esbuild: {
    loader: "jsx",
    include: /\/src\/.*\.js$/,
    exclude: [],
  },
  base: './',
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: 'http://0.0.0.0:3000',
  },
});

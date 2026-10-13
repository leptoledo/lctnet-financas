import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_APP_BASE || '/app/',
  resolve: {
    alias: {
      '@financas/core': path.resolve(__dirname, '../../packages/core/src'),
      '@financas/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist/app',
    emptyOutDir: true,
    sourcemap: false
  }
});

import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    host: '0.0.0.0',
    port: 25567,
  },
  build: {
    target: 'esnext',
  },
});

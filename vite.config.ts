import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@utils': resolve(__dirname, 'utils'),
      '@public': resolve(__dirname, 'public'),
      '@assets': resolve(__dirname, 'assets')
    }
  },
  build: {
    copyPublicDir: false,
    rollupOptions: {
      input: {
        popup: 'src/popup/popup.html',
        sidepanel: 'src/sidepanel/sidepanel.html',
        main: 'src/main.ts',
        background: 'src/background.ts'
      }
    }
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'manifest.json',
          dest: '' // dist
        },
        {
          src: 'public/*',
          dest: 'public' // dist/public
        }
      ]
    })
  ]
});

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
    rollupOptions: {
      input: {
        'src/popup/popup': resolve(__dirname, 'src/popup/popup.html'),
        'src/sidepanel/sidepanel': resolve(__dirname, 'src/sidepanel/sidepanel.html'),
        main: resolve(__dirname, 'src/main.ts'),
        background: resolve(__dirname, 'src/background.ts')
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/manifest.json',
          dest: '' // dist
        }
      ]
    })
  ]
});

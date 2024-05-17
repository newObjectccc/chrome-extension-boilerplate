import react from '@vitejs/plugin-react-swc';
import fg from 'fast-glob';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteChromeDevPlugin } from 'vite-plugin-chrome-launcher';
import manifest from './src/manifest.js';

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
        /**
         *  如果添加了新的页面，请记得在此添加入口文件，否则rollup不会进行对应入口的构建操作。
         */
        'src/popup/popup': resolve(__dirname, 'src/popup/popup.html'),
        'src/sidepanel/sidepanel': resolve(__dirname, 'src/sidepanel/sidepanel.html'),
        'src/content/content': resolve(__dirname, 'src/content/content.ts'),
        'src/background/background': resolve(__dirname, 'src/background/background.ts')
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  },
  plugins: [
    react(),
    viteChromeDevPlugin({
      navigateUrl: 'https://baidu.com'
    }),
    generateManifest()
  ]
});

function generateManifest() {
  return {
    name: 'generate-manifest',
    async closeBundle() {
      const contentAssets = await fg('dist/src/content/*.js');
      manifest.content_scripts[0].js = contentAssets.map((item) => item.replace('dist/', ''));
      writeFileSync('dist/manifest.json', JSON.stringify(manifest, null, 2));
    }
  };
}

// https://github.com/GoogleChrome/chrome-launcher
import * as ChromeLauncher from 'chrome-launcher';
import CDP from 'chrome-remote-interface';
import { resolve } from 'path';

interface IViteChromeDevHelperPlugin {
  /**
   * @description 设置chrome调试端口，若非冲突不用修改
   * @default 9222
   */
  port?: number;
  /**
   * @description 设置加载插件的路径，相对于vite.config.ts文件所在目录
   * @default 'dist'
   */
  loadPath?: string;
  /**
   * @description 设置打开chrome后要加载页面
   * @default 'chrome://extensions'
   */
  navigateUrl?: string;
  /**
   * @description 设置 serve 或 build，建议 build 配合 vite build --watch 使用，默认值为 build
   * @default 'build'
   */
  apply?: 'serve' | 'build';
}

export const viteChromeDevPlugin = (
  userConfig: IViteChromeDevHelperPlugin = {
    navigateUrl: 'chrome://extensions',
    apply: 'build',
    loadPath: 'dist'
  }
) => {
  const innerConfig: IViteChromeDevHelperPlugin = userConfig;
  let chrome: ChromeLauncher.LaunchedChrome | null = null;

  const runLauncher = async () => {
    const rewriteDefaultFlags = ChromeLauncher.Launcher.defaultFlags()
      .filter((flag) => flag !== '--disable-extensions')
      .concat([`--load-extension=${innerConfig.loadPath}`]);

    const launchOptions = {
      ignoreDefaultFlags: true,
      port: innerConfig.port ?? 9222,
      // https://peter.sh/experiments/chromium-command-line-switches/
      chromeFlags: rewriteDefaultFlags
    };
    if (chrome) {
      await chrome.kill();
      chrome = null;
    }
    chrome = await ChromeLauncher.launch(launchOptions);
  };

  const goToChromeExtensionCtlPage = async () => {
    let client;
    try {
      client = await CDP();
      const { Network, Page } = client;
      await Network.enable();
      await Page.enable();
      await Page.navigate({ url: innerConfig.navigateUrl! });
      await Page.loadEventFired();
    } catch (err) {
      console.error(err);
    } finally {
      if (client) {
        await client.close();
      }
    }
  };

  return {
    name: 'vite-chrome-launcher-plugin',
    sequential: true,
    order: 'post',
    apply: innerConfig.apply,
    configResolved(config: { root: string }) {
      innerConfig.loadPath = resolve(config.root, innerConfig.loadPath!);
    },
    async buildStart() {
      if (innerConfig.apply === 'build') return;
      await runLauncher();
      await goToChromeExtensionCtlPage();
    },
    async closeBundle() {
      if (innerConfig.apply === 'serve') return;
      await runLauncher();
      await goToChromeExtensionCtlPage();
    }
  };
};

// https://github.com/GoogleChrome/chrome-launcher
import * as ChromeLauncher from 'chrome-launcher';
import CDP from 'chrome-remote-interface';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const extPath = resolve(__dirname, 'dist');

const rewriteDefaultFlags = ChromeLauncher.Launcher.defaultFlags()
  .filter((flag) => flag !== '--disable-extensions')
  .concat([`--load-extension=${extPath}`]);

const launchOptions = {
  ignoreDefaultFlags: true,
  port: 9222,
  // https://peter.sh/experiments/chromium-command-line-switches/
  chromeFlags: rewriteDefaultFlags
};
ChromeLauncher.launch(launchOptions).then((chrome) => {
  console.log('🚀 ~ ChromeLauncher.launch ~ chrome:', chrome);
  goToChromeExtensionCtlPage();
});

async function goToChromeExtensionCtlPage() {
  let client;
  try {
    // connect to endpoint
    client = await CDP();
    // extract domains
    const { Network, Page } = client;
    // setup handlers
    // Network.requestWillBeSent((params) => {
    //   console.log(params.request.url);
    // });
    // enable events then start!
    await Network.enable();
    await Page.enable();
    await Page.navigate({ url: 'chrome://extensions' });
    await Page.loadEventFired();
  } catch (err) {
    console.error(err);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

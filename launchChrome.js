// https://github.com/GoogleChrome/chrome-launcher
import * as ChromeLauncher from 'chrome-launcher';
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
  // https://peter.sh/experiments/chromium-command-line-switches/
  chromeFlags: rewriteDefaultFlags
};
ChromeLauncher.launch(launchOptions);

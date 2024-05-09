// https://github.com/GoogleChrome/chrome-launcher
import * as chromeLauncher from 'chrome-launcher';

console.log(chromeLauncher.getChromePath());

const launchOptions = {};
chromeLauncher.launch(launchOptions);

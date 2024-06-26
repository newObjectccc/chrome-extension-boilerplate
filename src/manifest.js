const manifest = {
  name: 'Minimal Manifest',
  version: '1.0.0',
  description: 'A basic example extension with only required keys',
  action: {
    default_popup: 'src/popup/popup.html'
  },
  background: {
    service_worker: 'src/background/background.js'
  },
  content_scripts: [
    {
      js: [],
      matches: ['<all_urls>']
    }
  ],
  host_permissions: ['http://*/*', 'https://*/*'],
  icons: {
    48: 'icon-48.png',
    128: 'icon-128.png'
  },
  manifest_version: 3,
  permissions: ['sidePanel', 'tabs', 'scripting'],
  side_panel: {
    default_path: 'src/sidepanel/sidepanel.html'
  }
};

export default manifest;

import { Download } from './types';

export const extensions: Download[] = [
  {
    id: 'hieudoanm-ext',
    label: '@hieudoanm/ext',
    url: 'https://github.com/hieudoanm/hieudoanm.github.io/releases/tag/extensions-browser-latest',
    emoji: '🚫',
    color: '#ef4444',
    description: 'AdsBlocker',
    downloads: [
      {
        label: 'Download CRX',
        url: 'https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-latest/hieudoanm-extension.crx',
      },
      {
        label: 'Download XPI',
        url: 'https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-latest/hieudoanm-extension.xpi',
      },
      {
        label: 'Download ZIP',
        url: 'https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-latest/hieudoanm-extension.zip',
      },
    ],
  },
];

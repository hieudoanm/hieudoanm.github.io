import { Download } from './types';

export const clis: Download[] = [
  {
    id: 'bash',
    label: 'bash',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/bash',
    emoji: '🐚',
    color: '#4ade80',
    description: 'Aliases',
    downloads: [
      {
        label: 'Download bash',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/bash/download/bash/dist',
      },
    ],
  },
  {
    id: 'hieudoanm',
    label: 'hieudoanm',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/hieudoanm',
    emoji: '👨‍💻',
    color: '#1f2937',
    description: 'CLI',
    downloads: [
      {
        label: 'Download bin.go',
        url: 'https://github.com/hieudoanm/hieudoanm.github.io/releases/tag/cli-latest',
      },
      {
        label: 'Download bin.rs',
        url: 'https://github.com/hieudoanm/hieudoanm.github.io/releases/tag/cli-latest',
      },
      {
        label: 'Download bin.swift',
        url: 'https://github.com/hieudoanm/hieudoanm.github.io/releases/tag/cli-latest',
      },
    ],
  },
  {
    id: 'gh',
    label: 'gh',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/gh',
    emoji: '🐙',
    color: '#24292f',
    description: 'GitHub CLI',
    downloads: [
      {
        label: 'Download BIN',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/gh/bin',
      },
    ],
  },
];

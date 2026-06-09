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
        label: 'Download BIN',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/bash/download/bash/dist',
      },
    ],
  },
  {
    id: 'hieudoanm.go',
    label: 'hieudoanm.go',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/hieudoanm/cobra.go',
    emoji: '👨‍💻',
    color: '#1f2937',
    description: 'Go',
    downloads: [
      {
        label: 'Download BIN',
        url: 'https://github.com/hieudoanm/hieudoanm.github.io/releases/tag/cli-latest',
      },
    ],
  },
  {
    id: 'hieudoanm.rs',
    label: 'hieudoanm.rs',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/hieudoanm/clap.rs',
    emoji: '👨‍💻',
    color: '#1f2937',
    description: 'Rust',
    downloads: [
      {
        label: 'Download BIN',
        url: 'https://github.com/hieudoanm/hieudoanm.github.io/releases/tag/cli-latest',
      },
    ],
  },
  {
    id: 'hieudoanm.swift',
    label: 'hieudoanm.swift',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/hieudoanm/swift',
    emoji: '👨‍💻',
    color: '#1f2937',
    description: 'Swift',
    downloads: [
      {
        label: 'Download BIN',
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

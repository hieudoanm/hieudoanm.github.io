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
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/hieudoanm/go',
    emoji: '👨‍💻',
    color: '#1f2937',
    description: 'Go',
    downloads: [
      {
        label: 'Download BIN',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/hieudoanm/rust/bin/hieudoanm',
      },
    ],
  },
  {
    id: 'hieudoanm.rs',
    label: 'hieudoanm.rs',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/hieudoanm/rust',
    emoji: '👨‍💻',
    color: '#1f2937',
    description: 'Rust',
    downloads: [
      {
        label: 'Download BIN',
        url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/hieudoanm/rust/bin/hieudoanm',
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

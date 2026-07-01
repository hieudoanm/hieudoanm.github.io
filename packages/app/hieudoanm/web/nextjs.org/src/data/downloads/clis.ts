import { PiCodeSimple, PiTerminal } from 'react-icons/pi';
import { Download } from './types';

export const clis: Download[] = [
  {
    id: 'bash',
    label: 'bash',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/bash',
    icon: PiTerminal,
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
    icon: PiCodeSimple,
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
];

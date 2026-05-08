import { Download } from './types';

export const clis: Download[] = [
  {
    id: 'bash',
    label: 'bash',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/bash',
    emoji: '🐚',
    color: '#4ade80',
    description: 'Aliases',
  },
  {
    id: 'cobra.md',
    label: 'cobra.md',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/go/cobra/cobra.md',
    emoji: '🐍',
    color: '#3b82f6',
    description: 'Markdown',
  },
  {
    id: 'hieudoanm',
    label: 'hieudoanm',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/go/cobra/hieudoanm',
    emoji: '👨‍💻',
    color: '#1f2937',
    description: 'Skills',
  },
  {
    id: 'gh',
    label: 'gh',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/go/gh',
    emoji: '🐙',
    color: '#24292f',
    description: 'GitHub CLI',
  },
];

type CLI = {
  id: string;
  name: string;
  href: string;
  emoji: string;
  color: string;
  description: string;
};

export const clis: CLI[] = [
  {
    id: 'bash',
    name: 'bash',
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/bash',
    emoji: '🐚',
    color: '#4ade80',
    description: 'Bash Skills',
  },
  {
    id: 'cobra.md',
    name: 'cobra.md',
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/go/cobra.md',
    emoji: '🐍',
    color: '#3b82f6',
    description: 'Cobra Markdown Documentation',
  },
  {
    id: 'gh',
    name: 'gh',
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/go/gh',
    emoji: '🐙',
    color: '#24292f',
    description: 'GitHub CLI Extensions',
  },
  {
    id: 'hieudoanm',
    name: 'hieudoanm',
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/cli/go/hieudoanm',
    emoji: '👨‍💻',
    color: '#1f2937',
    description: 'All Terminal Skills',
  },
];

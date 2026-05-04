type Package = {
  id: string;
  name: string;
  href: string;
  emoji: string;
  color: string;
  description: string;
};

export const packages: Package[] = [
  {
    id: 'browser',
    name: '@hieudoanm/browser',
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/browser',
    emoji: '🌐',
    color: '#3b82f6',
    description: 'Browser Core',
  },
  {
    id: 'chess-elo',
    name: '@chess/elo',
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/chess/elo',
    emoji: '♞',
    color: '#1f2937',
    description: 'Chess Elo Calculator',
  },
];

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
    id: 'browser-native',
    name: '@browser/native',
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/browser/native',
    emoji: '🌐',
    color: '#3b82f6',
    description: 'Browser Native',
  },
  {
    id: 'browser-react',
    name: '@browser/react',
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/browser/react',
    emoji: '🌐',
    color: '#3b82f6',
    description: 'Browser Native',
  },
  {
    id: 'chess-elo',
    name: '@chess/elo',
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/chess/elo',
    emoji: '♞',
    color: '#1f2937',
    description: 'Chess Elo Calculator',
  },
  {
    id: 'simple-upload-react',
    name: '@simple-upload/react',
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/simple/upload/frontend/react',
    emoji: '📤',
    color: '#3b82f6',
    description: 'Simple Upload - React',
  },
  {
    id: 'simple-upload-solid',
    name: '@simple-upload/solid',
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/simple/upload/frontend/solid',
    emoji: '📤',
    color: '#3b82f6',
    description: 'Simple Upload - Solid',
  },
  {
    id: 'simple-upload-server',
    name: '@simple-upload/server',
    href: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/simple/upload/server',
    emoji: '📤',
    color: '#3b82f6',
    description: 'Simple Upload - Server',
  },
];

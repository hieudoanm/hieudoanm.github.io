import { Download } from './types';

export const packages: Download[] = [
  {
    id: 'browser-native',
    label: '@browser/native',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/browser/native',
    emoji: '🌐',
    color: '#3b82f6',
    description: 'Native',
  },
  {
    id: 'browser-react',
    label: '@browser/react',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/browser/react',
    emoji: '🌐',
    color: '#3b82f6',
    description: 'React',
  },
  {
    id: 'chess-elo',
    label: '@chess/elo',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/chess/elo',
    emoji: '♞',
    color: '#1f2937',
    description: 'Elo',
  },
  {
    id: 'simple-upload-react',
    label: 'SUS3 React',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/simple/upload/frontend/react',
    emoji: '📤',
    color: '#3b82f6',
    description: '@simple-upload/react',
  },
  {
    id: 'simple-upload-solid',
    label: 'SUS3 Solid',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/simple/upload/frontend/solid',
    emoji: '📤',
    color: '#3b82f6',
    description: '@simple-upload/solid',
  },
  {
    id: 'simple-upload-server',
    label: 'SUS3 Server',
    url: 'https://github.com/hieudoanm/hieudoanm/tree/master/packages/modules/simple/upload/server',
    emoji: '📤',
    color: '#3b82f6',
    description: '@simple-upload/server',
  },
];

import { Download } from './types';

export const ides: Download[] = [
  {
    id: 'cursor',
    label: 'Cursor',
    url: 'https://cursor.com',
    emoji: '🧠',
    color: '#7c3aed',
    description: 'AI-first code editor built on VS Code.',
    downloads: [{ label: 'Download', url: 'https://cursor.com/download' }],
  },
  {
    id: 'antigravity',
    label: 'AntiGravity',
    url: 'https://antigravity.google',
    emoji: '🛰️',
    color: '#4285f4',
    description: 'Experimental AI-powered IDE by Google.',
    downloads: [
      { label: 'Download', url: 'https://antigravity.google/download' },
    ],
  },
  {
    id: 'zed',
    label: 'Zed',
    url: 'https://zed.dev',
    emoji: '⚡',
    color: '#7c3aed',
    description: 'A high-performance code editor by the Zed team.',
    downloads: [{ label: 'Download', url: 'https://zed.dev/download' }],
  },
];

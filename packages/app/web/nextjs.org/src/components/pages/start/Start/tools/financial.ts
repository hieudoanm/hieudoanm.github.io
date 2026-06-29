import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Inflation',
    description: 'Calculator',
    tags: ['finance', 'money', 'financial', 'math', 'arithmetic'],
    emoji: '💰',
    color: '#f59e0b',
    onClick: open('inflation'),
  },
  {
    label: 'Split Bill',
    description: 'Calculator',
    tags: ['finance', 'money', 'financial', 'math', 'arithmetic'],
    emoji: '💵',
    color: '#10b981',
    onClick: open('split-bill'),
  },
  {
    label: 'Tax',
    description: 'Vietnam PIT',
    tags: ['finance', 'money', 'financial', 'calculator'],
    emoji: '🇻🇳',
    color: '#ef4444',
    onClick: open('tax'),
  },
];

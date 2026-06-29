import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Elo',
    description: 'Calculator',
    tags: ['finance', 'money', 'financial', 'math', 'arithmetic'],
    emoji: '♟️',
    color: '#f59e0b',
    onClick: open('elo'),
  },
  {
    label: 'Inflation',
    description: 'Calculator',
    tags: ['finance', 'money', 'financial', 'math', 'arithmetic'],
    emoji: '💰',
    color: '#f59e0b',
    onClick: open('inflation'),
  },
  {
    label: 'Tax',
    description: 'Vietnam PIT',
    tags: ['finance', 'money', 'financial', 'calculator'],
    emoji: '🇻🇳',
    color: '#ef4444',
    onClick: open('tax'),
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
    label: 'Days Count',
    description: 'Date Difference',
    tags: ['finance', 'money', 'financial', 'calculator'],
    emoji: '📅',
    color: '#3b82f6',
    onClick: open('days-count'),
  },
];

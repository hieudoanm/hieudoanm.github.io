import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Flag Guesser',
    description: 'Name the country',
    tags: ['game', 'fun', 'entertainment'],
    emoji: '🇺🇳',
    color: '#f59e0b',
    onClick: open('flag-guesser'),
  },
  {
    label: 'PD',
    description: '',
    tags: ['game', 'fun', 'entertainment'],
    emoji: '⚖️',
    color: '#f59e0b',
    onClick: open('pd'),
  },
  {
    label: 'Pokedex',
    description: 'Pokemon',
    tags: ['game', 'fun', 'entertainment'],
    emoji: '📕',
    color: '#f59e0b',
    onClick: open('pokedex'),
  },
];

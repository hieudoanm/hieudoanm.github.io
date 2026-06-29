import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
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

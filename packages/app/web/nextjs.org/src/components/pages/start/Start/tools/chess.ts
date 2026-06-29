import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Chess Clock',
    description: 'Chess Timer',
    tags: ['chess', 'board-game', 'clock', 'timer'],
    emoji: '♟️',
    color: '#8b5cf6',
    onClick: open('chess-clock'),
  },
  {
    label: 'Elo',
    description: 'Calculator',
    tags: ['chess', 'rating', 'calculator'],
    emoji: '♟️',
    color: '#f59e0b',
    onClick: open('elo'),
  },
];

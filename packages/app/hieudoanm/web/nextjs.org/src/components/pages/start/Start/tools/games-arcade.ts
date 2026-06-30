import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Dino Run',
    description: 'Infinite runner',
    tags: ['game', 'fun', 'entertainment'],
    emoji: '🦖',
    color: '#f59e0b',
    onClick: open('dino-run'),
  },
  {
    label: 'RPS',
    description: 'Rock Paper Scissors',
    tags: ['game', 'fun', 'entertainment'],
    emoji: '✂️',
    color: '#f59e0b',
    onClick: open('rps'),
  },
  {
    label: 'Snake',
    description: '12×12 grid',
    tags: ['game', 'fun', 'entertainment'],
    emoji: '🐍',
    color: '#f59e0b',
    onClick: open('snake'),
  },
  {
    label: 'T3',
    description: 'Tic-Tac-Toe',
    tags: ['game', 'fun', 'entertainment'],
    emoji: '❌',
    color: '#f59e0b',
    onClick: open('t3'),
  },
];

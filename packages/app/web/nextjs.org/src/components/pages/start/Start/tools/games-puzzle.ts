import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: '2048',
    description: 'Merge tiles',
    tags: ['game', 'fun', 'entertainment'],
    emoji: '🔢',
    color: '#f59e0b',
    onClick: open('game2048'),
  },
  {
    label: 'Sudoku',
    description: '4×4 & 9×9',
    tags: ['game', 'fun', 'entertainment'],
    emoji: '🧩',
    color: '#f59e0b',
    onClick: open('sudoku'),
  },
  {
    label: 'Towers',
    description: 'Towers of Hanoi',
    tags: ['game', 'fun', 'entertainment'],
    emoji: '🗼',
    color: '#f59e0b',
    onClick: open('towers'),
  },
];

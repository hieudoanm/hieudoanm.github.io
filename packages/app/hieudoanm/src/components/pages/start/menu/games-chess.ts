import { PiGameController } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Board',
    description: 'Chess board with analysis, engine, and openings browser',
    tags: ['games-chess', 'board-game', 'analysis', 'engine'],
    icon: PiGameController,
    onClick: open('chess-board'),
  },
  {
    label: 'Insights',
    description:
      'Player distribution by title and rating with percentile comparisons',
    tags: ['games-chess', 'stats', 'rating', 'percentile'],
    icon: PiGameController,
    onClick: open('chess-stats'),
  },
  {
    label: 'Chess Clock',
    description: 'Chess Timer',
    tags: ['games-chess', 'board-game', 'clock', 'timer'],
    icon: PiGameController,
    onClick: open('chess-clock'),
  },
  {
    label: 'Elo',
    description: 'Calculator',
    tags: ['games-chess', 'rating', 'calculator'],
    icon: PiGameController,
    onClick: open('chess-elo'),
  },
];

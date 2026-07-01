import { PiBugDroid, PiGameController, PiScissors, PiX } from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: 'Dino Run',
    description: 'Infinite runner',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiGameController,
    onClick: open('dino-run'),
  },
  {
    label: 'RPS',
    description: 'Rock Paper Scissors',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiScissors,
    onClick: open('rps'),
  },
  {
    label: 'Snake',
    description: '12×12 grid',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiBugDroid,
    onClick: open('snake'),
  },
  {
    label: 'T3',
    description: 'Tic-Tac-Toe',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiX,
    onClick: open('t3'),
  },
];

import {
  PiBuilding,
  PiHurricane,
  PiLamp,
  PiNumberSquareOne,
  PiPuzzlePiece,
  PiSnowflake,
} from 'react-icons/pi';
import { Tool } from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { ModalId } from '../types';

export const make = (open: (id: ModalId) => () => void): Tool[] => [
  {
    label: '2048',
    description: 'Merge tiles',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiNumberSquareOne,
    onClick: open('game2048'),
  },
  {
    label: 'Lights Out',
    description: 'Toggle all lights off',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiLamp,
    onClick: open('lights-out'),
  },
  {
    label: 'Maze',
    description: 'Gen & solve',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiHurricane,
    onClick: open('maze'),
  },
  {
    label: 'Sliding Puzzle',
    description: 'Upload & slide tiles',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiSnowflake,
    onClick: open('sliding-puzzle'),
  },
  {
    label: 'Sudoku',
    description: '4×4 & 9×9',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiPuzzlePiece,
    onClick: open('sudoku'),
  },
  {
    label: 'Towers',
    description: 'Towers of Hanoi',
    tags: ['game', 'fun', 'entertainment'],
    icon: PiBuilding,
    onClick: open('towers'),
  },
];

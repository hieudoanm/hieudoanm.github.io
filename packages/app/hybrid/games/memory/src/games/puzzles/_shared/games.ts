import type { GameItem } from '@/components/templates/GamesTemplate';
import { PiGridFour, PiImage, PiLightbulb, PiStack } from 'react-icons/pi';

export const PUZZLE_GAMES: GameItem[] = [
  {
    name: '2048',
    description: 'Slide tiles and merge to reach 2048',
    icon: PiGridFour,
    href: '/puzzles/game2048/',
  },
  {
    name: 'Lights Out',
    description: 'Toggle cells to turn off every light',
    icon: PiLightbulb,
    href: '/puzzles/lights-out/',
  },
  {
    name: 'Sliding Puzzle',
    description: 'Reassemble an image by sliding tiles',
    icon: PiImage,
    href: '/puzzles/sliding-puzzle/',
  },
  {
    name: 'Towers',
    description: 'Move the whole tower to the last peg',
    icon: PiStack,
    href: '/puzzles/towers/',
  },
];

import type { GameItem } from '@/components/templates/GamesTemplate';
import { PiGridFour, PiImage } from 'react-icons/pi';

export const PUZZLE_GAMES: GameItem[] = [
  {
    name: '2048',
    description: 'Slide tiles and merge to reach 2048',
    icon: PiGridFour,
    href: '/puzzles/game2048/',
  },
  {
    name: 'Sliding Puzzle',
    description: 'Reassemble an image by sliding tiles',
    icon: PiImage,
    href: '/puzzles/sliding-puzzle/',
  },
];

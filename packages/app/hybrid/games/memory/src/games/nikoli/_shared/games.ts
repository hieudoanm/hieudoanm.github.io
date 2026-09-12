import type { GameItem } from '@/components/templates/GamesTemplate';
import {
  PiCircle,
  PiDotsNine,
  PiGridNine,
  PiPaintBucket,
  PiRows,
  PiSquaresFour,
  PiTable,
} from 'react-icons/pi';

export const NIKOLI_GAMES: GameItem[] = [
  {
    name: 'Sudoku',
    description: 'Fill each row, column and box with digits 1–9',
    icon: PiGridNine,
    href: '/nikoli/sudoku/',
  },
  {
    name: 'Nurikabe',
    description: 'Paint islands of white cells around each number',
    icon: PiPaintBucket,
    href: '/nikoli/nurikabe/',
  },
  {
    name: 'Masyu',
    description: 'Draw a single loop through all pearls',
    icon: PiCircle,
    href: '/nikoli/masyu/',
  },
  {
    name: 'Shikaku',
    description: 'Divide the grid into numbered rectangles',
    icon: PiSquaresFour,
    href: '/nikoli/shikaku/',
  },
  {
    name: 'Fillomino',
    description: 'Fill regions so each matches its number',
    icon: PiTable,
    href: '/nikoli/fillomino/',
  },
  {
    name: 'Norinori',
    description: 'Shade two cells in every domino region',
    icon: PiDotsNine,
    href: '/nikoli/norinori/',
  },
  {
    name: 'Heyawake',
    description: 'Shade rooms to match clues and avoid 2×2',
    icon: PiRows,
    href: '/nikoli/heyawake/',
  },
];

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

const BASE = '/psychology/cognitive/reasoning/nikoli';

export const NIKOLI_GAMES: GameItem[] = [
  {
    name: 'Sudoku',
    description: 'Fill each row, column and box with digits 1–9',
    icon: PiGridNine,
    href: `${BASE}/sudoku/`,
  },
  {
    name: 'Nurikabe',
    description: 'Paint islands of white cells around each number',
    icon: PiPaintBucket,
    href: `${BASE}/nurikabe/`,
  },
  {
    name: 'Masyu',
    description: 'Draw a single loop through all pearls',
    icon: PiCircle,
    href: `${BASE}/masyu/`,
  },
  {
    name: 'Shikaku',
    description: 'Divide the grid into numbered rectangles',
    icon: PiSquaresFour,
    href: `${BASE}/shikaku/`,
  },
  {
    name: 'Fillomino',
    description: 'Fill regions so each matches its number',
    icon: PiTable,
    href: `${BASE}/fillomino/`,
  },
  {
    name: 'Norinori',
    description: 'Shade two cells in every domino region',
    icon: PiDotsNine,
    href: `${BASE}/norinori/`,
  },
  {
    name: 'Heyawake',
    description: 'Shade rooms to match clues and avoid 2×2',
    icon: PiRows,
    href: `${BASE}/heyawake/`,
  },
];

import type { GameItem } from '@/components/templates/GamesTemplate';
import {
  PiArrowUUpLeft,
  PiBird,
  PiDiceFive,
  PiGridNine,
  PiNumberThree,
  PiWarning,
} from 'react-icons/pi';

export const TIC_TAC_TOE_GAMES: GameItem[] = [
  {
    name: 'Classic',
    description: 'X and O on a 3×3 grid — line up three to win.',
    icon: PiGridNine,
    href: '/tic-tac-toe/classic/',
  },
  {
    name: 'Duck',
    description: 'Place your mark, then move the duck to block your opponent.',
    icon: PiBird,
    href: '/tic-tac-toe/duck/',
  },
  {
    name: 'Notakto',
    description: 'Everyone plays X — complete a row of three and you lose.',
    icon: PiWarning,
    href: '/tic-tac-toe/notakto/',
  },
  {
    name: 'Reverse',
    description: 'Misere rules: avoid making three in a row at all costs.',
    icon: PiArrowUUpLeft,
    href: '/tic-tac-toe/reverse/',
  },
  {
    name: 'T3',
    description: 'Max three marks each — the fourth erases your oldest.',
    icon: PiNumberThree,
    href: '/tic-tac-toe/t3/',
  },
  {
    name: 'Wild',
    description: 'Pick X or O every turn — either mark can win the game.',
    icon: PiDiceFive,
    href: '/tic-tac-toe/wild/',
  },
];

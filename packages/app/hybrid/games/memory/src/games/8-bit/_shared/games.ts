import type { GameItem } from '@/components/templates/GamesTemplate';
import {
  PiBugBeetle,
  PiFeather,
  PiHandFist,
  PiMapTrifold,
} from 'react-icons/pi';

export const EIGHT_BIT_GAMES: GameItem[] = [
  {
    name: 'Maze',
    description: 'Random maze with BFS solver',
    icon: PiMapTrifold,
    href: '/8-bit/maze/',
  },
  {
    name: 'Snake',
    description: 'Classic snake on a 12×12 grid',
    icon: PiBugBeetle,
    href: '/8-bit/snake/',
  },
  {
    name: 'Dino Run',
    description: 'Infinite runner',
    icon: PiFeather,
    href: '/8-bit/dino-run/',
  },
  {
    name: 'Rock Paper Scissors',
    description: 'Versus the computer',
    icon: PiHandFist,
    href: '/8-bit/rock-paper-scissors/',
  },
];

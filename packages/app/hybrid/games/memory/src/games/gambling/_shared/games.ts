import type { GameItem } from '@/components/templates/GamesTemplate';
import {
  PiCards,
  PiChartLineUp,
  PiClockCountdown,
  PiCoins,
  PiCrown,
  PiDiceFive,
  PiDiceSix,
  PiNumberCircleFour,
  PiPokerChip,
  PiStack,
} from 'react-icons/pi';

export const GAMBLING_GAMES: GameItem[] = [
  {
    name: 'Baccarat',
    description: 'Player, banker or tie — full third-card rules',
    icon: PiCards,
    href: '/gambling/baccarat/',
  },
  {
    name: 'Card Counter',
    description: 'Hi-Lo card counting with a 52-card deck',
    icon: PiStack,
    href: '/gambling/card-counter/',
  },
  {
    name: 'Poker Odds',
    description: 'Monte Carlo Texas Hold’em equity',
    icon: PiPokerChip,
    href: '/gambling/poker-odds/',
  },
  {
    name: 'Over Under Seven',
    description: 'Two dice betting under, over or 7',
    icon: PiDiceSix,
    href: '/gambling/over-under-seven/',
  },
  {
    name: 'Slot Machine',
    description: 'Three reels, six symbols',
    icon: PiCoins,
    href: '/gambling/slot-machine/',
  },
  {
    name: 'Roulette',
    description: 'Single-zero wheel betting',
    icon: PiClockCountdown,
    href: '/gambling/roulette/',
  },
  {
    name: 'Craps',
    description: 'Pass line, come-out and point rolls',
    icon: PiDiceFive,
    href: '/gambling/craps/',
  },
  {
    name: 'War',
    description: 'Higher card takes the stake',
    icon: PiCrown,
    href: '/gambling/war/',
  },
  {
    name: 'Keno',
    description: 'Pick up to five spots from eighty',
    icon: PiNumberCircleFour,
    href: '/gambling/keno/',
  },
  {
    name: 'Hi-Lo',
    description: 'Higher or lower? Build 2:1 streaks',
    icon: PiChartLineUp,
    href: '/gambling/hi-lo/',
  },
];

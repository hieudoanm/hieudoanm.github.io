import type { AuctionFormat, Bot } from './types';

export const PLAYER_ID = 'player';

export const BOTS: Bot[] = [
  { id: 'owl', name: 'Owl', emoji: '🦉', shading: 1 },
  { id: 'fox', name: 'Fox', emoji: '🦊', shading: 0.88 },
  { id: 'mouse', name: 'Mouse', emoji: '🐭', shading: 0.75 },
];

export interface FormatMeta {
  id: AuctionFormat;
  label: string;
  emoji: string;
  description: string;
}

export const FORMATS: Record<
  AuctionFormat,
  { label: string; emoji: string; description: string }
> = {
  english: {
    label: 'English',
    emoji: '🔨',
    description: 'Highest bid wins and pays its own bid.',
  },
  dutch: {
    label: 'Dutch',
    emoji: '⏱️',
    description: 'Highest bid wins, but bidders shade to avoid overpaying.',
  },
  'first-price': {
    label: 'First Price',
    emoji: '🤫',
    description: 'Sealed bid; highest wins, pays its own bid.',
  },
  vickrey: {
    label: 'Vickrey',
    emoji: '✉️',
    description: 'Sealed bid; highest wins, pays the second-highest bid.',
  },
};

export const TOTAL_ROUNDS = 5;

export const MIN_VALUE = 50;
export const MAX_VALUE = 150;
export const NOISE = 25;

export const FORMAT_ORDER: AuctionFormat[] = [
  'english',
  'dutch',
  'first-price',
  'vickrey',
];

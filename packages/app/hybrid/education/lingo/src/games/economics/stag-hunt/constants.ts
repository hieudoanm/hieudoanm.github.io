import type { Move, PartnerId } from './types';

export const PAYOFFS: Record<Move, Record<Move, [number, number]>> = {
  stag: { stag: [4, 4], hare: [0, 3] },
  hare: { stag: [3, 0], hare: [3, 3] },
};

export const TOTAL_ROUNDS = 8;

export interface PartnerMeta {
  id: PartnerId;
  name: string;
  emoji: string;
  description: string;
}

export const PARTNERS: PartnerMeta[] = [
  {
    id: 'fellow-hunter',
    name: 'Fellow Hunter',
    emoji: '🦌',
    description: 'Always plays Stag.',
  },
  {
    id: 'hare-seeker',
    name: 'Hare Seeker',
    emoji: '🐇',
    description: 'Always plays Hare.',
  },
  {
    id: 'mimic',
    name: 'Mimic',
    emoji: '🪞',
    description: 'Copies your previous move (starts with Stag).',
  },
  {
    id: 'grudger',
    name: 'Grudger',
    emoji: '😐',
    description: 'Plays Stag until you play Hare once, then Hare forever.',
  },
];

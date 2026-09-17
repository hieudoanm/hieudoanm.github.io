import type { Move } from './types';

export const payoffs = (mine: Move, theirs: Move): [number, number] => {
  if (mine === 'stag' && theirs === 'stag') return [4, 4];
  if (mine === 'stag' && theirs === 'hare') return [0, 3];
  if (mine === 'hare' && theirs === 'stag') return [3, 0];
  return [3, 3];
};

export const fellowHunter = (): Move => 'stag';

export const hareSeeker = (): Move => 'hare';

export const mimicMove = (playerHistory: Move[]): Move =>
  playerHistory.length === 0 ? 'stag' : playerHistory[playerHistory.length - 1];

export const grudgerMove = (playerHistory: Move[]): Move =>
  playerHistory.includes('hare') ? 'hare' : 'stag';

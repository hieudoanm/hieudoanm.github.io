import { MOVES } from './constants';
import type { BotId, Move, Outcome } from './types';

export const beats = (move: Move): Move => {
  switch (move) {
    case 'rock':
      return 'paper';
    case 'paper':
      return 'scissors';
    case 'scissors':
      return 'rock';
  }
};

export const outcome = (mine: Move, theirs: Move): Outcome => {
  if (mine === theirs) return 'draw';
  return beats(theirs) === mine ? 'win' : 'lose';
};

export const scoreFor = (kind: Outcome): number => {
  switch (kind) {
    case 'win':
      return 1;
    case 'lose':
      return -1;
    case 'draw':
      return 0;
  }
};

const CYCLER_ORDER: Move[] = ['rock', 'paper', 'scissors'];

export const cyclerRound = (round: number): Move =>
  CYCLER_ORDER[(round - 1) % CYCLER_ORDER.length];

export const mirrorMove = (playerHistory: Move[]): Move => {
  const last = playerHistory[playerHistory.length - 1];
  return last ?? 'rock';
};

export const randomizerMove = (random: number): Move => {
  if (random < 0.5) return 'rock';
  if (random < 0.75) return 'paper';
  return 'scissors';
};

export const statisticianMove = (playerHistory: Move[]): Move => {
  if (playerHistory.length === 0) return 'rock';
  const counts: Record<Move, number> = { rock: 0, paper: 0, scissors: 0 };
  playerHistory.forEach((move) => {
    counts[move] += 1;
  });
  const mostFrequent = [...MOVES].reduce((best, move) =>
    counts[move] > counts[best] ? move : best
  );
  return beats(mostFrequent);
};

export const botMove = (
  id: BotId,
  round: number,
  playerHistory: Move[]
): Move => {
  switch (id) {
    case 'cycler':
      return cyclerRound(round);
    case 'mirror':
      return mirrorMove(playerHistory);
    case 'randomizer':
      return randomizerMove(Math.random());
    case 'statistician':
      return statisticianMove(playerHistory);
  }
};

export const exploitableHint = (id: BotId): string | null => {
  switch (id) {
    case 'cycler':
      return 'Cycler repeats a pattern — can you exploit it?';
    case 'mirror':
      return 'Mirror copies your last move — can you trick it?';
    case 'statistician':
      return 'Statistician chases your habits — can you feint?';
    default:
      return null;
  }
};

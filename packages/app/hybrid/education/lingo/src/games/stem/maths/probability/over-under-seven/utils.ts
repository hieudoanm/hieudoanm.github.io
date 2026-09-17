import { rollDie } from '../_shared/dice';
import type { Bet, RoundOutcome } from './types';

export const INITIAL_CREDITS = 200;
export const BET_AMOUNT = 10;

export const roll = (): number => rollDie();

export const getPayout = (bet: Bet): number => (bet === 'seven' ? 50 : 20);

export const playRound = (
  bet: Bet,
  dice: [number, number] = [roll(), roll()]
): RoundOutcome => {
  const total = dice[0] + dice[1];

  if (bet === 'under' && total < 7)
    return { dice, won: getPayout('under'), result: 'win' };
  if (bet === 'over' && total > 7)
    return { dice, won: getPayout('over'), result: 'win' };
  if (bet === 'seven' && total === 7)
    return { dice, won: getPayout('seven'), result: 'win' };
  return { dice, won: 0, result: 'lose' };
};

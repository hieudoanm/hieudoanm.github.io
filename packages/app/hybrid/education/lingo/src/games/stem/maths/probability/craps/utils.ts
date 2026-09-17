import { STAKE, type ComeOutOutcome, type RollOutcome } from './types';

export const rollDie = (): number => Math.floor(Math.random() * 6) + 1;

export const rollDice = (): [number, number] => [rollDie(), rollDie()];

/** Come-out roll: 7/11 win, 2/3/12 craps, anything else sets the point. */
export const comeOutResult = (total: number): ComeOutOutcome => {
  if (total === 7 || total === 11) return 'win';
  if (total === 2 || total === 3 || total === 12) return 'craps';
  return 'point';
};

export const playComeOut = (
  dice: [number, number] = rollDice()
): RollOutcome => {
  const total = dice[0] + dice[1];
  const outcome = comeOutResult(total);
  if (outcome === 'win')
    return { dice, total, phase: 'result', won: STAKE * 2 };
  return {
    dice,
    total,
    phase: outcome === 'craps' ? 'result' : 'point',
    won: 0,
  };
};

export const playPoint = (
  point: number,
  dice: [number, number] = rollDice()
): RollOutcome => {
  const total = dice[0] + dice[1];
  if (total === point) return { dice, total, phase: 'result', won: STAKE * 2 };
  if (total === 7) return { dice, total, phase: 'result', won: 0 };
  return { dice, total, phase: 'point', won: 0 };
};

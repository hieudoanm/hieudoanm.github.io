export type Bet = 'under' | 'over' | 'seven';
export type Phase = 'bet' | 'roll' | 'result';

export type Result = 'win' | 'lose';

export const DICE_FACES: Record<number, string> = {
  1: '⚀',
  2: '⚁',
  3: '⚂',
  4: '⚃',
  5: '⚄',
  6: '⚅',
};

export const INITIAL_CREDITS = 200;
export const BET_AMOUNT = 10;

export const roll = () => Math.floor(Math.random() * 6) + 1;

export const getPayout = (bet: Bet): number => (bet === 'seven' ? 50 : 20);

export interface RoundOutcome {
  dice: [number, number];
  won: number;
  result: Result;
}

export const playRound = (bet: Bet): RoundOutcome => {
  const d1 = roll();
  const d2 = roll();
  const total = d1 + d2;

  if (bet === 'under' && total < 7)
    return { dice: [d1, d2], won: getPayout('under'), result: 'win' };
  if (bet === 'over' && total > 7)
    return { dice: [d1, d2], won: getPayout('over'), result: 'win' };
  if (bet === 'seven' && total === 7)
    return { dice: [d1, d2], won: getPayout('seven'), result: 'win' };

  return { dice: [d1, d2], won: 0, result: 'lose' };
};

import type { BetDef, RouletteBet, SpinOutcome } from './types';

/** European single-zero wheel. */
export const WHEEL_SIZE = 37;

export const RED_NUMBERS: readonly number[] = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
];

export const BET_DEFS: BetDef[] = [
  { id: 'red', label: 'Red', payout: 2 },
  { id: 'black', label: 'Black', payout: 2 },
  { id: 'even', label: 'Even', payout: 2 },
  { id: 'odd', label: 'Odd', payout: 2 },
  { id: 'low', label: '1–18', payout: 2 },
  { id: 'high', label: '19–36', payout: 2 },
  { id: 'zero', label: '0', payout: 36 },
];

export const INITIAL_CREDITS = 200;
export const BET_AMOUNT = 10;

export const spinNumber = (): number => Math.floor(Math.random() * WHEEL_SIZE);

export const isRed = (value: number): boolean => RED_NUMBERS.includes(value);

export const betWins = (bet: RouletteBet, value: number): boolean => {
  if (value === 0) return bet === 'zero';
  switch (bet) {
    case 'red':
      return isRed(value);
    case 'black':
      return !isRed(value);
    case 'even':
      return value % 2 === 0;
    case 'odd':
      return value % 2 === 1;
    case 'low':
      return value <= 18;
    case 'high':
      return value >= 19;
    case 'zero':
      return false;
  }
};

export const payoutFor = (bet: RouletteBet): number => {
  const def = BET_DEFS.find((candidate) => candidate.id === bet);
  return def ? def.payout : 0;
};

export const playSpin = (bet: RouletteBet, number?: number): SpinOutcome => {
  const landed = number ?? spinNumber();
  const won = betWins(bet, landed) ? BET_AMOUNT * payoutFor(bet) : 0;
  return { number: landed, won };
};

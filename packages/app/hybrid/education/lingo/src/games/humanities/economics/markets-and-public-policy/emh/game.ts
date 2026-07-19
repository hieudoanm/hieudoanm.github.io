import { RETURNS, START_WEALTH, TIPS } from './constants';
import type { Position } from './types';

export const positionForTip = (tip: number): Position =>
  tip >= 1 ? 'in' : 'cash';

export const applyReturn = (wealth: number, returnPct: number): number =>
  wealth * (1 + returnPct / 100);

export const wealthAfter = (
  decisions: Position[],
  returns: number[] = RETURNS,
  start: number = START_WEALTH
): number =>
  decisions.reduce(
    (wealth, decision, index) =>
      decision === 'in' ? applyReturn(wealth, returns[index]) : wealth,
    start
  );

export const buyAndHoldWealth = (
  returns: number[] = RETURNS,
  start: number = START_WEALTH
): number =>
  wealthAfter(
    returns.map(() => 'in' as Position),
    returns,
    start
  );

export const coinFlipWealth = (
  returns: number[] = RETURNS,
  start: number = START_WEALTH
): number =>
  wealthAfter(
    returns.map((_, index) => (index % 2 === 0 ? 'in' : 'cash') as Position),
    returns,
    start
  );

export const tipStrategyWealth = (
  returns: number[] = RETURNS,
  tips: number[] = TIPS,
  start: number = START_WEALTH
): number => wealthAfter(tips.map(positionForTip), returns, start);

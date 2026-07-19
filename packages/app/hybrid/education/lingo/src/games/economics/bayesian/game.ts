import { DOORS } from './constants';
import type { Door, Tally } from './types';

export const revealGoat = (
  prize: Door,
  picked: Door,
  rand: () => number = Math.random
): Door => {
  const candidates = DOORS.filter((door) => door !== prize && door !== picked);
  return candidates[Math.floor(rand() * candidates.length)];
};

export const wouldWin = (
  prize: Door,
  picked: Door,
  switched: boolean
): boolean => (switched ? picked !== prize : picked === prize);

export const nextPrize = (rand: () => number = Math.random): Door =>
  DOORS[Math.floor(rand() * DOORS.length) % DOORS.length];

export const updateTally = (
  tally: Tally,
  prize: Door,
  picked: Door
): Tally => ({
  switchWins: tally.switchWins + (picked !== prize ? 1 : 0),
  stayWins: tally.stayWins + (picked === prize ? 1 : 0),
  total: tally.total + 1,
});

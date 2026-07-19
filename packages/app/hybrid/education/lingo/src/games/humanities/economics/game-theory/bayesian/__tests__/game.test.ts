import { nextPrize, revealGoat, updateTally, wouldWin } from '../game';
import { TOTAL_TRIALS } from '../constants';
import type { Door, Tally } from '../types';

const zeroTally = (): Tally => ({ switchWins: 0, stayWins: 0, total: 0 });

describe('revealGoat', () => {
  it('reveals a goat that is neither the prize nor the picked door', () => {
    expect(revealGoat(0, 1, () => 0)).toBe(2);
    expect(revealGoat(0, 2, () => 0.5)).toBe(1);
  });

  it('chooses randomly between the two goats when both are unpicked', () => {
    expect(revealGoat(0, 0, () => 0)).toBe(1);
    expect(revealGoat(0, 0, () => 0.999)).toBe(2);
  });
});

describe('wouldWin', () => {
  it('staying wins only when the first pick hides the prize', () => {
    expect(wouldWin(0, 0, false)).toBe(true);
    expect(wouldWin(0, 1, false)).toBe(false);
  });

  it('switching wins only when the first pick was wrong', () => {
    expect(wouldWin(1, 0, true)).toBe(true);
    expect(wouldWin(1, 1, true)).toBe(false);
  });

  it('holds for every prize and pick combination', () => {
    const cycle = [0, 1, 2] as const;
    for (const prize of cycle) {
      for (const picked of cycle) {
        expect(wouldWin(prize, picked, true)).toBe(prize !== picked);
        expect(wouldWin(prize, picked, false)).toBe(prize === picked);
      }
    }
  });
});

describe('nextPrize', () => {
  it('maps a random draw onto one of the three doors', () => {
    expect(nextPrize(() => 0)).toBe(0);
    expect(nextPrize(() => 0.999)).toBe(2);
  });
});

describe('updateTally', () => {
  it('records switch and stay outcomes on the same trial', () => {
    const next = updateTally(zeroTally(), 0, 1);
    expect(next.switchWins).toBe(1);
    expect(next.stayWins).toBe(0);
    expect(next.total).toBe(1);
  });

  it('keeps tallies complementary across mixed trials', () => {
    let tally = updateTally(zeroTally(), 0, 1);
    tally = updateTally(tally, 0, 0);
    tally = updateTally(tally, 2, 1);
    expect(tally.switchWins + tally.stayWins).toBe(tally.total);
  });

  it('splits 2/3 vs 1/3 across a mirrored three-trial sequence', () => {
    let tally = zeroTally();
    for (const prize of [1, 2, 0] as const) {
      tally = updateTally(tally, prize, 0);
    }
    expect(tally.switchWins).toBe(2);
    expect(tally.stayWins).toBe(1);
    expect(tally.total).toBe(3);
  });

  it('yields ~2/3 switching and ~1/3 staying wins over 20 trials', () => {
    const cycle = [0, 1, 2] as const;
    const prizes: Door[] = Array.from(
      { length: TOTAL_TRIALS },
      (_, i) => cycle[i % cycle.length]
    );
    let tally = zeroTally();
    for (const prize of prizes) {
      tally = updateTally(tally, prize, 0);
    }
    expect(tally.switchWins + tally.stayWins).toBe(TOTAL_TRIALS);
    expect(tally.switchWins).toBe(13);
    expect(tally.stayWins).toBe(7);
  });
});

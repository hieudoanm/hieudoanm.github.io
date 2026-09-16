import { GAMES } from '../constants';
import {
  bestResponses,
  getPayoffs,
  isNashEquilibrium,
  mixedEquilibrium,
  playerBestResponses,
} from '../game';
import type { Col, Row } from '../types';

describe('bestResponses', () => {
  const bos = GAMES['battle-of-the-sexes'];
  const sh = GAMES['stag-hunt'];
  const mp = GAMES['matching-pennies'];

  it('returns all best-response columns for Battle of the Sexes Up', () => {
    expect(bestResponses(bos, 'Up')).toEqual(['Left']);
  });

  it('returns all best-response columns for Battle of the Sexes Down', () => {
    expect(bestResponses(bos, 'Down')).toEqual(['Right']);
  });

  it('returns Left as the only best response for Stag Hunt Up', () => {
    expect(bestResponses(sh, 'Up')).toEqual(['Left']);
  });

  it('returns Right as the only best response for Matching Pennies Up', () => {
    expect(bestResponses(mp, 'Up')).toEqual(['Right']);
  });

  it('returns Left as the only best response for Matching Pennies Down', () => {
    expect(bestResponses(mp, 'Down')).toEqual(['Left']);
  });
});

describe('playerBestResponses', () => {
  const bos = GAMES['battle-of-the-sexes'];

  it('returns Up as the only best response to Left', () => {
    expect(playerBestResponses(bos, 'Left')).toEqual(['Up']);
  });

  it('returns Down as the only best response to Right', () => {
    expect(playerBestResponses(bos, 'Right')).toEqual(['Down']);
  });
});

describe('isNashEquilibrium', () => {
  const bos = GAMES['battle-of-the-sexes'];
  const sh = GAMES['stag-hunt'];
  const mp = GAMES['matching-pennies'];

  it('identifies (Up, Left) as a NE in Battle of the Sexes', () => {
    expect(isNashEquilibrium(bos, 'Up', 'Left')).toBe(true);
  });

  it('identifies (Down, Right) as a NE in Battle of the Sexes', () => {
    expect(isNashEquilibrium(bos, 'Down', 'Right')).toBe(true);
  });

  it('identifies (Up, Right) as not a NE in Battle of the Sexes', () => {
    expect(isNashEquilibrium(bos, 'Up', 'Right')).toBe(false);
  });

  it('identifies (Up, Left) as a NE in Stag Hunt', () => {
    expect(isNashEquilibrium(sh, 'Up', 'Left')).toBe(true);
  });

  it('identifies (Down, Right) as a NE in Stag Hunt', () => {
    expect(isNashEquilibrium(sh, 'Down', 'Right')).toBe(true);
  });

  it('returns false for any pure profile in Matching Pennies', () => {
    expect(isNashEquilibrium(mp, 'Up', 'Left')).toBe(false);
    expect(isNashEquilibrium(mp, 'Up', 'Right')).toBe(false);
    expect(isNashEquilibrium(mp, 'Down', 'Left')).toBe(false);
    expect(isNashEquilibrium(mp, 'Down', 'Right')).toBe(false);
  });
});

describe('mixedEquilibrium', () => {
  it('returns the mixed equilibrium string for matching-pennies', () => {
    expect(mixedEquilibrium('matching-pennies')).toBe('Play each action 50/50');
  });

  it('returns null for battle-of-the-sexes', () => {
    expect(mixedEquilibrium('battle-of-the-sexes')).toBeNull();
  });

  it('returns null for stag-hunt', () => {
    expect(mixedEquilibrium('stag-hunt')).toBeNull();
  });
});

describe('getPayoffs', () => {
  it('returns correct payoff pairs', () => {
    const bos = GAMES['battle-of-the-sexes'];
    expect(getPayoffs(bos, 'Up', 'Left')).toEqual([3, 2]);
    expect(getPayoffs(bos, 'Down', 'Right')).toEqual([2, 3]);
    expect(getPayoffs(bos, 'Up', 'Right')).toEqual([0, 0]);
  });
});

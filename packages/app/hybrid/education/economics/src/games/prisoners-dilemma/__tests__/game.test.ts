import { chooseOpponent, formatScore, pickStrategy } from '../utils/game';
import { STRATEGIES } from '../constants';
import type { Move, Round } from '../types';

describe('pickStrategy', () => {
  it('returns a valid strategy id', () => {
    const strategy = pickStrategy();
    expect(STRATEGIES.map((s) => s.id)).toContain(strategy);
  });
});

describe('chooseOpponent', () => {
  const history: Round[] = [
    { round: 1, player: 'cooperate', opponent: 'defect', pScore: 0, oScore: 3 },
    { round: 2, player: 'defect', opponent: 'cooperate', pScore: 3, oScore: 0 },
  ];

  it('always cooperates or always defects for fixed strategies', () => {
    expect(chooseOpponent('alwayscooperate', history, ['defect'])).toBe(
      'cooperate'
    );
    expect(chooseOpponent('alwaysdefect', history, ['cooperate'])).toBe(
      'defect'
    );
  });

  it('mirrors the last player move with tit for tat', () => {
    expect(chooseOpponent('titfortat', [], [])).toBe('cooperate');
    expect(chooseOpponent('titfortat', history, ['defect'])).toBe('defect');
    expect(chooseOpponent('titfortat', history, ['cooperate'])).toBe(
      'cooperate'
    );
  });

  it('defects forever once grim trigger is provoked', () => {
    expect(chooseOpponent('grimtrigger', [], [])).toBe('cooperate');
    expect(chooseOpponent('grimtrigger', history, ['cooperate'])).toBe(
      'cooperate'
    );
    expect(
      chooseOpponent('grimtrigger', history, ['cooperate', 'defect'])
    ).toBe('defect');
  });

  it('randomizes moves', () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.4);
    expect(chooseOpponent('random', [], [])).toBe('cooperate');
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.6);
    expect(chooseOpponent('random', [], [])).toBe('defect');
  });
});

describe('formatScore', () => {
  it('formats a score in years', () => {
    expect(formatScore(7)).toBe('7yr');
  });
});

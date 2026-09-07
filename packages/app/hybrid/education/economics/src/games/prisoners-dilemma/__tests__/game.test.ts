import { chooseOpponent, formatScore, pickStrategy } from '../game';
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
    expect(chooseOpponent('always-cooperate', history, ['defect'])).toBe(
      'cooperate'
    );
    expect(chooseOpponent('always-defect', history, ['cooperate'])).toBe(
      'defect'
    );
  });

  it('mirrors the last player move with tit for tat', () => {
    expect(chooseOpponent('tit-for-tat', [], [])).toBe('cooperate');
    expect(chooseOpponent('tit-for-tat', history, ['defect'])).toBe('defect');
    expect(chooseOpponent('tit-for-tat', history, ['cooperate'])).toBe(
      'cooperate'
    );
  });

  it('defects first then mirrors with hard tit for tat', () => {
    expect(chooseOpponent('hard-tit-for-tat', [], [])).toBe('defect');
    expect(chooseOpponent('hard-tit-for-tat', history, ['cooperate'])).toBe(
      'cooperate'
    );
  });

  it('retaliates only after two consecutive defections', () => {
    expect(chooseOpponent('tit-for-two-tats', [], [])).toBe('cooperate');
    expect(chooseOpponent('tit-for-two-tats', history, ['defect'])).toBe(
      'cooperate'
    );
    expect(
      chooseOpponent('tit-for-two-tats', history, ['defect', 'defect'])
    ).toBe('defect');
    expect(
      chooseOpponent('tit-for-two-tats', history, ['defect', 'cooperate'])
    ).toBe('cooperate');
  });

  it('defects forever once grim trigger is provoked', () => {
    expect(chooseOpponent('grim-trigger', [], [])).toBe('cooperate');
    expect(chooseOpponent('grim-trigger', history, ['cooperate'])).toBe(
      'cooperate'
    );
    expect(
      chooseOpponent('grim-trigger', history, ['cooperate', 'defect'])
    ).toBe('defect');
  });

  it('repeats after mutual rounds and shifts otherwise with pavlov', () => {
    const mutual: Round[] = [
      {
        round: 1,
        player: 'cooperate',
        opponent: 'cooperate',
        pScore: 1,
        oScore: 1,
      },
      { round: 2, player: 'defect', opponent: 'defect', pScore: 2, oScore: 2 },
    ];
    expect(chooseOpponent('pavlov', [], [])).toBe('cooperate');
    expect(chooseOpponent('pavlov', mutual, ['cooperate'])).toBe('cooperate');
    expect(chooseOpponent('pavlov', history, ['defect'])).toBe('defect');
  });

  it('alternates between cooperate and defect', () => {
    expect(chooseOpponent('alternator', [], [])).toBe('cooperate');
    expect(chooseOpponent('alternator', [history[0]], ['cooperate'])).toBe(
      'defect'
    );
    expect(chooseOpponent('alternator', history, ['cooperate', 'defect'])).toBe(
      'cooperate'
    );
  });

  it('randomizes moves', () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.4);
    expect(chooseOpponent('random', [], [])).toBe('cooperate');
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.6);
    expect(chooseOpponent('random', [], [])).toBe('defect');
  });
});

describe('STRATEGIES', () => {
  it('contains 32 bots with unique ids and behaviours', () => {
    const ids = STRATEGIES.map((s) => s.id);
    const behaviors = STRATEGIES.map((s) => s.behavior);
    expect(ids).toHaveLength(32);
    expect(new Set(ids).size).toBe(32);
    expect(new Set(behaviors).size).toBe(32);
  });

  it('every bot produces a valid move on an empty board', () => {
    STRATEGIES.forEach((s) => {
      expect(['cooperate', 'defect']).toContain(chooseOpponent(s.id, [], []));
    });
  });

  it('classifies every bot as cooperate, defect or other', () => {
    const stances = STRATEGIES.map((s) => s.stance);
    expect(new Set(stances)).toEqual(new Set(['cooperate', 'defect', 'other']));
    expect(stances).toHaveLength(32);
  });
});

describe('formatScore', () => {
  it('formats a score in years', () => {
    expect(formatScore(7)).toBe('7yr');
  });
});

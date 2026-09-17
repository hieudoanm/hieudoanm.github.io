import { PAYOFFS } from '../constants';
import {
  lessonFor,
  mutualCooperations,
  nextMove,
  payoff,
  playerDefections,
  scoreRow,
} from '../game';
import type { RoundEntry } from '../types';

const historyOf = (actions: Array<'C' | 'D'>): RoundEntry[] =>
  actions.map((playerAction, index) => ({
    round: index + 1,
    playerAction,
    opponentAction: 'C',
    payoff: 3,
    cumulative: 0,
  }));

describe('payoff', () => {
  it('awards the four classic payoff cells', () => {
    expect(payoff('C', 'C')).toBe(PAYOFFS.mutualCooperate);
    expect(payoff('D', 'C')).toBe(PAYOFFS.tempt);
    expect(payoff('C', 'D')).toBe(PAYOFFS.sucker);
    expect(payoff('D', 'D')).toBe(PAYOFFS.mutualDefect);
  });
});

describe('nextMove', () => {
  it('tit for tat opens with cooperate and mirrors the last move', () => {
    expect(nextMove('tit-for-tat', [])).toBe('C');
    expect(nextMove('tit-for-tat', historyOf(['C']))).toBe('C');
    expect(nextMove('tit-for-tat', historyOf(['C', 'C', 'D']))).toBe('D');
  });

  it('grim trigger defects forever after the first defection', () => {
    expect(nextMove('grim-trigger', [])).toBe('C');
    expect(nextMove('grim-trigger', historyOf(['D']))).toBe('D');
    expect(nextMove('grim-trigger', historyOf(['D', 'C', 'C']))).toBe('D');
  });

  it('forgiving tit for tat forgives one defection but punishes a second', () => {
    expect(nextMove('forgiving-tit-for-tat', [])).toBe('C');
    expect(nextMove('forgiving-tit-for-tat', historyOf(['D']))).toBe('C');
    expect(nextMove('forgiving-tit-for-tat', historyOf(['D', 'D']))).toBe('D');
    expect(nextMove('forgiving-tit-for-tat', historyOf(['D', 'C', 'D']))).toBe(
      'D'
    );
  });

  it('always defect defects every round', () => {
    expect(nextMove('always-defect', [])).toBe('D');
    expect(nextMove('always-defect', historyOf(['C', 'C']))).toBe('D');
  });

  it('random cooperates on a low roll and defects on a high roll', () => {
    expect(nextMove('random', [], () => 0)).toBe('C');
    expect(nextMove('random', [], () => 0.5)).toBe('D');
  });

  it('mostly cooperate cooperates on a 0.89 roll but not on 0.91', () => {
    expect(nextMove('mostly-cooperate', [], () => 0.89)).toBe('C');
    expect(nextMove('mostly-cooperate', [], () => 0.91)).toBe('D');
  });
});

describe('scoreRow', () => {
  it('logs a round with its payoff and cumulative total', () => {
    expect(scoreRow('C', 'C', 3, 6)).toEqual({
      round: 3,
      playerAction: 'C',
      opponentAction: 'C',
      payoff: 3,
      cumulative: 9,
    });
  });
});

describe('history tallies', () => {
  const history: RoundEntry[] = [
    {
      round: 1,
      playerAction: 'C',
      opponentAction: 'C',
      payoff: 3,
      cumulative: 3,
    },
    {
      round: 2,
      playerAction: 'D',
      opponentAction: 'C',
      payoff: 5,
      cumulative: 8,
    },
    {
      round: 3,
      playerAction: 'C',
      opponentAction: 'D',
      payoff: 0,
      cumulative: 8,
    },
    {
      round: 4,
      playerAction: 'C',
      opponentAction: 'C',
      payoff: 3,
      cumulative: 11,
    },
  ];

  it('counts player defections', () => {
    expect(playerDefections(history)).toBe(1);
  });

  it('counts mutual cooperation rounds', () => {
    expect(mutualCooperations(history)).toBe(2);
  });
});

describe('lessonFor', () => {
  it('shows that cooperation beats defection against tit for tat', () => {
    const lesson = lessonFor('tit-for-tat');
    expect(lesson).toContain('30');
    expect(lesson).toContain('14');
  });

  it('returns a lesson for every strategy', () => {
    const ids = [
      'tit-for-tat',
      'grim-trigger',
      'forgiving-tit-for-tat',
      'random',
      'always-defect',
      'mostly-cooperate',
    ] as const;
    for (const id of ids) {
      expect(lessonFor(id).length).toBeGreaterThan(10);
    }
  });
});

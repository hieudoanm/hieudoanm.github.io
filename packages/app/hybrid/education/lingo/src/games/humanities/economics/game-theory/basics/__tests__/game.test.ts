import { GAMES } from '../constants';
import {
  bestResponseSummary,
  buildReview,
  cellLabel,
  dominantStrategy,
  dominantStrategyOf,
  findNash,
  gameById,
  hasPureNash,
  isCellNash,
  nashSummary,
  payoffAt,
  quizFeedback,
  randomGame,
  rowBestResponses,
} from '../game';
import type { GameId } from '../types';

describe('gameById', () => {
  it('returns a preset game by id', () => {
    expect(gameById('pd')?.name).toBe("Prisoner's Dilemma");
  });

  it('returns undefined for an unknown id', () => {
    expect(gameById('unknown' as GameId)).toBeUndefined();
  });

  it('provides all six presets', () => {
    expect(GAMES.map((g) => g.id)).toEqual([
      'pd',
      'stag-hunt',
      'chicken',
      'coordination',
      'matching-pennies',
      'harmony',
    ]);
  });
});

describe('payoffAt', () => {
  it('returns the payoff pair at a cell', () => {
    const game = gameById('pd')!;
    expect(payoffAt(game, 1, 1)).toEqual([1, 1]);
    expect(payoffAt(game, 0, 1)).toEqual([0, 5]);
  });
});

describe('rowBestResponses', () => {
  it('prefers Defect against any column in the prisoner dilemma', () => {
    const game = gameById('pd')!;
    expect(rowBestResponses(game, 0)).toEqual([1]);
    expect(rowBestResponses(game, 1)).toEqual([1]);
  });
});

describe('findNash', () => {
  it.each([
    ['pd', [[1, 1]]],
    [
      'stag-hunt',
      [
        [0, 0],
        [1, 1],
      ],
    ],
    [
      'chicken',
      [
        [0, 1],
        [1, 0],
      ],
    ],
    [
      'coordination',
      [
        [0, 0],
        [1, 1],
      ],
    ],
    ['matching-pennies', []],
    ['harmony', [[0, 0]]],
  ] as [GameId, [number, number][]][])(
    '%s has the expected pure-strategy equilibria',
    (id, expected) => {
      const game = gameById(id)!;
      expect(findNash(game)).toEqual(
        expected.map(([row, col]) => ({ row, col }))
      );
    }
  );
});

describe('hasPureNash and isCellNash', () => {
  it('detects presence of any pure equilibria', () => {
    expect(hasPureNash(gameById('matching-pennies')!)).toBe(false);
    expect(hasPureNash(gameById('stag-hunt')!)).toBe(true);
  });

  it('detects whether a single cell is an equilibrium', () => {
    const game = gameById('pd')!;
    expect(isCellNash(game, 1, 1)).toBe(true);
    expect(isCellNash(game, 0, 0)).toBe(false);
  });
});

describe('dominantStrategy', () => {
  it('flags Defect as dominant in the prisoner dilemma', () => {
    const game = gameById('pd')!;
    expect(dominantStrategy(game, 'row', 1)).toBe(true);
    expect(dominantStrategy(game, 'col', 1)).toBe(true);
    expect(dominantStrategy(game, 'row', 0)).toBe(false);
  });

  it('finds no dominant strategies in matching pennies', () => {
    const game = gameById('matching-pennies')!;
    expect(dominantStrategy(game, 'row', 0)).toBe(false);
    expect(dominantStrategy(game, 'row', 1)).toBe(false);
  });
});

describe('dominantStrategyOf', () => {
  it('returns the dominant strategy label or null', () => {
    const pd = gameById('pd')!;
    expect(dominantStrategyOf(pd, 'row')?.label).toBe('Defect');
    expect(dominantStrategyOf(pd, 'col')?.label).toBe('Defect');
    expect(dominantStrategyOf(gameById('stag-hunt')!, 'row')).toBeNull();
  });
});

describe('buildReview', () => {
  it('describes the Defect-Defect equilibrium', () => {
    const review = buildReview(gameById('pd')!, 1, 1);
    expect(review.payoffA).toBe(1);
    expect(review.payoffB).toBe(1);
    expect(review.isNash).toBe(true);
    expect(review.nashCount).toBe(1);
    expect(review.rowDominant?.label).toBe('Defect');
    expect(review.rowBestIsOwn).toBe(true);
  });

  it('shows Row can improve against Cooperate', () => {
    const review = buildReview(gameById('pd')!, 0, 0);
    expect(review.payoffA).toBe(3);
    expect(review.isNash).toBe(false);
    expect(review.rowBestIsOwn).toBe(false);
    expect(review.rowBestToCol.row).toBe(1);
  });
});

describe('cellLabel', () => {
  it('formats a strategy pair', () => {
    expect(cellLabel(gameById('stag-hunt')!, 0, 0)).toBe('(Stag, Stag)');
    expect(cellLabel(gameById('chicken')!, 1, 0)).toBe('(Dare, Swerve)');
  });
});

describe('nashSummary', () => {
  it('describes a unique equilibrium', () => {
    const game = gameById('pd')!;
    expect(nashSummary(game, findNash(game))).toContain('(Defect, Defect)');
  });

  it('describes the absence of a pure equilibrium', () => {
    const game = gameById('matching-pennies')!;
    expect(nashSummary(game, [])).toContain('no pure-strategy');
  });
});

describe('bestResponseSummary', () => {
  it('names a better row strategy when the picked one is not a best response', () => {
    const review = buildReview(gameById('pd')!, 0, 0);
    expect(bestResponseSummary(review, gameById('pd')!)).toContain('Defect');
  });
});

describe('quizFeedback', () => {
  it('congratulates a correct equilibrium guess', () => {
    const game = gameById('harmony')!;
    expect(quizFeedback(game, { row: 0, col: 0 })).toContain('Correct');
  });

  it('explains why a guessed cell fails', () => {
    const game = gameById('pd')!;
    expect(quizFeedback(game, { row: 0, col: 0 })).toContain(
      'not a pure-strategy'
    );
  });

  it('handles games without any pure equilibrium', () => {
    const game = gameById('matching-pennies')!;
    expect(quizFeedback(game, { row: 0, col: 0 })).toContain('must randomize');
  });
});

describe('randomGame', () => {
  it('generates a deterministic challenge when randomness is fixed', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.999);
    const game = randomGame();
    expect(game.id).toBe('challenge');
    expect(game.name).toBe('Random Challenge');
    expect(game.rowStrategies[0].label).toBe('Attack');
    expect(game.payoffs[0][0][0]).toBe(4);
    jest.restoreAllMocks();
  });
});

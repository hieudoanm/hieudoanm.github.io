import { MOVES } from '../constants';
import {
  beats,
  botMove,
  cyclerRound,
  exploitableHint,
  mirrorMove,
  outcome,
  randomizerMove,
  scoreFor,
  statisticianMove,
} from '../game';
import type { Move, Outcome } from '../types';

describe('outcome', () => {
  it('declares a draw when moves match', () => {
    expect(outcome('rock', 'rock')).toBe('draw');
    expect(outcome('paper', 'paper')).toBe('draw');
    expect(outcome('scissors', 'scissors')).toBe('draw');
  });

  it('declares a win when mine beats theirs', () => {
    expect(outcome('rock', 'scissors')).toBe('win');
    expect(outcome('paper', 'rock')).toBe('win');
    expect(outcome('scissors', 'paper')).toBe('win');
  });

  it('declares a loss otherwise', () => {
    expect(outcome('rock', 'paper')).toBe('lose');
    expect(outcome('paper', 'scissors')).toBe('lose');
    expect(outcome('scissors', 'rock')).toBe('lose');
  });
});

describe('scoreFor', () => {
  it('is strictly zero-sum', () => {
    expect(scoreFor('win')).toBe(1);
    expect(scoreFor('lose')).toBe(-1);
    expect(scoreFor('draw')).toBe(0);
  });

  it('player score plus opponent score is zero', () => {
    const kinds: Outcome[] = ['win', 'lose', 'draw'];
    kinds.forEach((kind) => {
      expect(scoreFor(kind) + scoreFor(opposite(kind))).toBe(0);
    });
  });
});

describe('beats', () => {
  it('returns the move that defeats the given move', () => {
    expect(beats('rock')).toBe('paper');
    expect(beats('paper')).toBe('scissors');
    expect(beats('scissors')).toBe('rock');
  });

  it('is the relationship used by outcome', () => {
    MOVES.forEach((mine) => {
      expect(outcome(beats(mine), mine)).toBe('win');
    });
  });
});

describe('cyclerRound', () => {
  it('cycles rock paper scissors from round one', () => {
    const expected: Move[] = [
      'rock',
      'paper',
      'scissors',
      'rock',
      'paper',
      'scissors',
    ];
    expected.forEach((move, i) => {
      expect(cyclerRound(i + 1)).toBe(move);
    });
  });
});

describe('mirrorMove', () => {
  it('returns the player last move', () => {
    expect(mirrorMove(['rock', 'paper'])).toBe('paper');
    expect(mirrorMove(['scissors'])).toBe('scissors');
  });

  it('falls back to rock on an empty history', () => {
    expect(mirrorMove([])).toBe('rock');
  });
});

describe('randomizerMove', () => {
  it('maps random values to the specified distribution', () => {
    expect(randomizerMove(0)).toBe('rock');
    expect(randomizerMove(0.49)).toBe('rock');
    expect(randomizerMove(0.5)).toBe('paper');
    expect(randomizerMove(0.74)).toBe('paper');
    expect(randomizerMove(0.75)).toBe('scissors');
    expect(randomizerMove(0.999)).toBe('scissors');
  });
});

describe('statisticianMove', () => {
  it('plays the move that beats the most frequent player move', () => {
    expect(statisticianMove(['rock', 'rock', 'paper'])).toBe('paper');
    expect(statisticianMove(['paper', 'scissors', 'paper'])).toBe('scissors');
    expect(statisticianMove(['scissors', 'scissors', 'rock'])).toBe('rock');
  });

  it('ties resolve to rock', () => {
    expect(statisticianMove(['rock', 'paper'])).toBe('paper');
  });

  it('plays rock on an empty history', () => {
    expect(statisticianMove([])).toBe('rock');
  });
});

describe('botMove', () => {
  it('dispatches each strategy to its move function', () => {
    expect(botMove('cycler', 1, [])).toBe('rock');
    expect(botMove('mirror', 2, ['scissors'])).toBe('scissors');
    expect(botMove('statistician', 3, ['paper', 'paper'])).toBe('scissors');
  });

  it('uses a mockable random for the randomizer', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.1);
    expect(botMove('randomizer', 1, [])).toBe('rock');
    jest.spyOn(Math, 'random').mockReturnValue(0.6);
    expect(botMove('randomizer', 1, [])).toBe('paper');
    jest.spyOn(Math, 'random').mockReturnValue(0.9);
    expect(botMove('randomizer', 1, [])).toBe('scissors');
    jest.restoreAllMocks();
  });
});

describe('exploitableHint', () => {
  it('returns a hint for patterned bots', () => {
    expect(exploitableHint('cycler')).toMatch(/pattern/i);
    expect(exploitableHint('mirror')).toMatch(/copies/i);
    expect(exploitableHint('statistician')).toMatch(/habit/i);
  });

  it('returns null for random bots', () => {
    expect(exploitableHint('randomizer')).toBeNull();
  });
});

const opposite = (kind: Outcome): Outcome =>
  kind === 'win' ? 'lose' : kind === 'lose' ? 'win' : 'draw';

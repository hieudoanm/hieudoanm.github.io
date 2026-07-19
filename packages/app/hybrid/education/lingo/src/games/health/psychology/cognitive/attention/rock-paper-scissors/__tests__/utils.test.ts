import {
  CHOICES,
  COUNTERED_BY,
  HOTKEYS,
  HOTKEY_BY_INDEX,
  LABELS,
  GLYPHS,
  LAPSE_MS,
  MIN_REACTION_MS,
} from '../constants';
import {
  accuracyReading,
  canRespond,
  counterFor,
  createTrial,
  driftOf,
  formatMs,
  formatPercent,
  isCorrect,
  mean,
  median,
  paceReading,
  randomChoice,
  reading,
  summarize,
} from '../utils';
import { Choice, Trial } from '../types';

const trial = (overrides: Partial<Trial> = {}): Trial => ({
  index: 0,
  bot: 'rock',
  human: 'paper',
  reactionMs: 500,
  correct: true,
  anticipatory: false,
  lapse: false,
  ...overrides,
});

describe('counterFor', () => {
  it('maps each move to the one that beats it', () => {
    expect(counterFor('rock')).toBe('paper');
    expect(counterFor('paper')).toBe('scissors');
    expect(counterFor('scissors')).toBe('rock');
  });

  it('reads straight off the COUNTERED_BY table', () => {
    CHOICES.forEach((choice) => {
      expect(counterFor(choice)).toBe(COUNTERED_BY[choice]);
    });
  });

  it('never answers with the move itself', () => {
    CHOICES.forEach((choice) => {
      expect(counterFor(choice)).not.toBe(choice);
    });
  });
});

describe('isCorrect', () => {
  it('accepts the counter', () => {
    expect(isCorrect('paper', 'rock')).toBe(true);
    expect(isCorrect('rock', 'scissors')).toBe(true);
    expect(isCorrect('scissors', 'paper')).toBe(true);
  });

  it('rejects the loser and the tie', () => {
    expect(isCorrect('rock', 'rock')).toBe(false);
    expect(isCorrect('scissors', 'rock')).toBe(false);
    expect(isCorrect('paper', 'paper')).toBe(false);
  });
});

describe('createTrial', () => {
  it('records the reaction time', () => {
    expect(createTrial(0, 'rock', 'paper', 1000, 1420).reactionMs).toBe(420);
  });

  it('marks a correct counter', () => {
    const result = createTrial(0, 'rock', 'paper', 0, 500);

    expect(result.correct).toBe(true);
    expect(result.anticipatory).toBe(false);
    expect(result.lapse).toBe(false);
  });

  it('marks a wrong counter', () => {
    expect(createTrial(0, 'rock', 'scissors', 0, 500).correct).toBe(false);
  });

  it('flags a response faster than the perception floor', () => {
    const result = createTrial(0, 'rock', 'paper', 0, MIN_REACTION_MS - 1);

    expect(result.anticipatory).toBe(true);
    expect(result.correct).toBe(false);
  });

  it('allows a response exactly on the floor', () => {
    const result = createTrial(0, 'rock', 'paper', 0, MIN_REACTION_MS);

    expect(result.anticipatory).toBe(false);
    expect(result.correct).toBe(true);
  });

  it('flags an attention lapse', () => {
    expect(createTrial(0, 'rock', 'paper', 0, LAPSE_MS + 1).lapse).toBe(true);
    expect(createTrial(0, 'rock', 'paper', 0, LAPSE_MS).lapse).toBe(false);
  });

  it('never records a negative reaction time', () => {
    expect(createTrial(0, 'rock', 'paper', 900, 400).reactionMs).toBe(0);
  });

  it('keeps the index it was given', () => {
    expect(createTrial(7, 'rock', 'paper', 0, 500).index).toBe(7);
  });
});

describe('mean and median', () => {
  it('averages values', () => {
    expect(mean([100, 200, 300])).toBe(200);
  });

  it('rounds the average', () => {
    expect(mean([100, 101])).toBe(101);
  });

  it('returns zero for an empty list', () => {
    expect(mean([])).toBe(0);
    expect(median([])).toBe(0);
  });

  it('takes the middle of an odd list', () => {
    expect(median([300, 100, 200])).toBe(200);
  });

  it('averages the middle pair of an even list', () => {
    expect(median([100, 200, 300, 400])).toBe(250);
  });
});

describe('driftOf', () => {
  it('needs at least two trials', () => {
    expect(driftOf([trial()])).toBe(0);
  });

  it('is positive when the second half is slower', () => {
    const trials = [
      trial({ reactionMs: 400 }),
      trial({ reactionMs: 400 }),
      trial({ reactionMs: 700 }),
      trial({ reactionMs: 700 }),
    ];

    expect(driftOf(trials)).toBe(300);
  });

  it('is negative when the second half is faster', () => {
    const trials = [
      trial({ reactionMs: 700 }),
      trial({ reactionMs: 700 }),
      trial({ reactionMs: 400 }),
      trial({ reactionMs: 400 }),
    ];

    expect(driftOf(trials)).toBe(-300);
  });

  it('is zero when speed is held', () => {
    const trials = Array.from({ length: 6 }, () => trial());

    expect(driftOf(trials)).toBe(0);
  });
});

describe('summarize', () => {
  it('returns an empty summary with no trials', () => {
    expect(summarize([])).toEqual({
      trials: 0,
      correct: 0,
      accuracy: 0,
      meanMs: 0,
      medianMs: 0,
      bestMs: 0,
      lapses: 0,
      anticipatories: 0,
      driftMs: 0,
    });
  });

  it('aggregates accuracy, speed, lapses, and drift', () => {
    const trials = [
      trial({ index: 0, reactionMs: 400, correct: true }),
      trial({ index: 1, reactionMs: 600, correct: true }),
      trial({
        index: 2,
        reactionMs: LAPSE_MS + 200,
        correct: false,
        lapse: true,
      }),
      trial({
        index: 3,
        reactionMs: MIN_REACTION_MS / 2,
        correct: false,
        anticipatory: true,
      }),
    ];
    const summary = summarize(trials);

    expect(summary.trials).toBe(4);
    expect(summary.correct).toBe(2);
    expect(summary.accuracy).toBe(0.5);
    expect(summary.bestMs).toBe(60);
    expect(summary.medianMs).toBe(500);
    expect(summary.lapses).toBe(1);
    expect(summary.anticipatories).toBe(1);
  });
});

describe('formatting', () => {
  it('shows milliseconds below a second', () => {
    expect(formatMs(0)).toBe('0ms');
    expect(formatMs(999)).toBe('999ms');
  });

  it('shows seconds above a second', () => {
    expect(formatMs(1000)).toBe('1.00s');
    expect(formatMs(2500)).toBe('2.50s');
  });

  it('rounds percentages', () => {
    expect(formatPercent(0)).toBe('0%');
    expect(formatPercent(0.667)).toBe('67%');
    expect(formatPercent(1)).toBe('100%');
  });
});

describe('readings', () => {
  it('has no pace reading without data', () => {
    expect(paceReading(0)).toBe('');
  });

  it('describes fast, typical, and slow paces', () => {
    expect(paceReading(300)).toMatch(/fast/i);
    expect(paceReading(600)).toMatch(/typical/i);
    expect(paceReading(1200)).toMatch(/slow/i);
  });

  it('describes the accuracy trade', () => {
    expect(accuracyReading(1)).toMatch(/Almost no errors/i);
    expect(accuracyReading(0.85)).toMatch(/good balance/i);
    expect(accuracyReading(0.4)).toMatch(/Rushing/i);
  });

  it('asks the player to start with no trials', () => {
    expect(reading(summarize([]))).toMatch(/Press start/i);
  });

  it('calls out clean responses', () => {
    const trials = Array.from({ length: 6 }, (_, index) =>
      trial({ index, reactionMs: 500, correct: true })
    );

    expect(reading(summarize(trials))).toMatch(/clean/i);
  });

  it('calls out anticipation', () => {
    const trials = Array.from({ length: 6 }, (_, index) =>
      trial({
        index,
        reactionMs: 500,
        correct: false,
        anticipatory: index === 0,
      })
    );

    expect(reading(summarize(trials))).toMatch(/void/i);
  });

  it('calls out lapses', () => {
    const trials = Array.from({ length: 6 }, (_, index) =>
      trial({ index, reactionMs: 500, correct: true, lapse: index < 2 })
    );

    expect(reading(summarize(trials))).toMatch(/lapse/i);
  });

  it('reports vigilance decay from positive drift', () => {
    const trials = Array.from({ length: 6 }, (_, index) =>
      trial({ index, reactionMs: index < 3 ? 400 : 600, correct: true })
    );

    expect(reading(summarize(trials))).toMatch(/decays/i);
  });

  it('reports held speed from flat drift', () => {
    const trials = Array.from({ length: 6 }, (_, index) =>
      trial({ index, reactionMs: 500, correct: true })
    );

    expect(reading(summarize(trials))).toMatch(/did not decay much/i);
  });

  it('skips the drift note for a short block', () => {
    const trials = [trial({ reactionMs: 400 }), trial({ reactionMs: 900 })];

    expect(reading(summarize(trials))).not.toMatch(/decay/i);
  });
});

describe('canRespond', () => {
  it('only accepts a response while awaiting', () => {
    expect(canRespond('awaiting')).toBe(true);
    expect(canRespond('idle')).toBe(false);
    expect(canRespond('feedback')).toBe(false);
    expect(canRespond('done')).toBe(false);
  });
});

describe('choice metadata', () => {
  it('offers the three classic moves', () => {
    expect(CHOICES).toEqual(['rock', 'paper', 'scissors']);
  });

  it('labels, glyphs, and hotkeys every move', () => {
    CHOICES.forEach((choice: Choice) => {
      expect(LABELS[choice]).toBeTruthy();
      expect(GLYPHS[choice]).toBeTruthy();
      expect(HOTKEYS[choice]).toBeTruthy();
    });
  });

  it('maps hotkeys back to moves', () => {
    expect(HOTKEY_BY_INDEX['1']).toBe('rock');
    expect(HOTKEY_BY_INDEX['2']).toBe('paper');
    expect(HOTKEY_BY_INDEX['3']).toBe('scissors');
    expect(HOTKEY_BY_INDEX['9']).toBeUndefined();
  });

  it('picks uniformly at random', () => {
    const spy = jest.spyOn(Math, 'random');

    spy.mockReturnValue(0);
    expect(randomChoice()).toBe('rock');
    spy.mockReturnValue(0.5);
    expect(randomChoice()).toBe('paper');
    spy.mockReturnValue(0.99);
    expect(randomChoice()).toBe('scissors');
    spy.mockRestore();
  });
});

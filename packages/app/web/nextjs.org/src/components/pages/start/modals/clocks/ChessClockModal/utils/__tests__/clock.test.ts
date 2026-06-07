import { toTime, fmt, initClock, delayFor, formatElapsed } from '../clock';
import { ONE_SECOND } from '../../constants';
import { ChessClockSide, DelayType, Stage } from '../../types';

beforeEach(() => {
  jest.spyOn(Date, 'now').mockReturnValue(1000000);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('toTime', () => {
  it('returns remaining time', () => {
    expect(toTime(5000, 999000)).toBe(4000);
  });

  it('returns 0 when time has expired', () => {
    expect(toTime(5000, 990000)).toBe(0);
  });
});

describe('fmt', () => {
  it('formats 0ms as 0:00', () => {
    expect(fmt(0)).toBe('0:00');
  });

  it('formats 1000ms as 0:01', () => {
    expect(fmt(1000)).toBe('0:01');
  });

  it('formats 59000ms as 0:59', () => {
    expect(fmt(59000)).toBe('0:59');
  });

  it('formats 60000ms as 1:00', () => {
    expect(fmt(60000)).toBe('1:00');
  });

  it('formats 61000ms as 1:01', () => {
    expect(fmt(61000)).toBe('1:01');
  });
});

describe('initClock', () => {
  it('initializes a clock state from preset and start side', () => {
    const preset = {
      label: 'Test',
      p1: 600000,
      p2: 300000,
      delayType: 'fischer' as DelayType,
      delaySeconds: 5,
      increment: 3,
    };
    const side: ChessClockSide = 'player2';
    const state = initClock(preset, side);
    expect(state.player1).toBe(600000);
    expect(state.player2).toBe(300000);
    expect(state.turn).toBe('player2');
    expect(state.stage).toBe('preview');
    expect(state.delayType).toBe('fischer');
    expect(state.delaySeconds).toBe(5);
    expect(state.increment).toBe(3);
    expect(state.ticker).toBeNull();
    expect(state.p1Moves).toBe(0);
    expect(state.p2Moves).toBe(0);
    expect(state.hist).toEqual([]);
    expect(state.startTime).toBeNull();
    expect(state.endTime).toBeNull();
    expect(state.winner).toBeNull();
  });
});

describe('delayFor', () => {
  const base: ClockState = {
    player1: 600000,
    player2: 600000,
    turn: 'player1',
    stage: 'running',
    delayType: 'delay',
    delaySeconds: 5,
    increment: 0,
    ticker: null,
    p1Moves: 0,
    p2Moves: 0,
    p1Delay: 0,
    p2Delay: 0,
    hist: [],
    startTime: null,
    endTime: null,
    winner: null,
  };

  it('returns 0 for delayType none', () => {
    expect(delayFor('player1', { ...base, delayType: 'none' })).toBe(0);
  });

  it('returns delaySeconds * ONE_SECOND for delay type', () => {
    expect(
      delayFor('player1', { ...base, delayType: 'delay', delaySeconds: 3 })
    ).toBe(3 * ONE_SECOND);
  });

  it('returns min(delay, remaining) for bronstein', () => {
    expect(
      delayFor('player1', {
        ...base,
        delayType: 'bronstein',
        delaySeconds: 3,
        player1: 2000,
      })
    ).toBe(2000);
  });

  it('returns full delay for bronstein when enough time', () => {
    expect(
      delayFor('player1', {
        ...base,
        delayType: 'bronstein',
        delaySeconds: 3,
        player1: 10000,
      })
    ).toBe(3 * ONE_SECOND);
  });

  it('returns 0 for unknown delay type', () => {
    expect(
      delayFor('player1', { ...base, delayType: 'unknown' as DelayType })
    ).toBe(0);
  });
});

describe('formatElapsed', () => {
  it('returns 0:00 when start is null', () => {
    expect(formatElapsed(null)).toBe('0:00');
  });

  it('formats elapsed time when start is provided', () => {
    jest.spyOn(Date, 'now').mockReturnValue(1065000);
    expect(formatElapsed(1000000)).toBe('1:05');
  });
});

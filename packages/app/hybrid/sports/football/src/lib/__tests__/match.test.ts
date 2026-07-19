import {
  addCard,
  addConcede,
  addGoal,
  defaultMatch,
  formatEventMinute,
  loadMatch,
  matchMinute,
  MAX_SUBSTITUTIONS,
  recordSubstitution,
  saveMatch,
  setAddedTime,
  substitutionsRemaining,
  tick,
  undoConcede,
  undoGoal,
  whistle,
} from '@/lib/match';
import { fullMatchSeconds, matchPhase } from '@/lib/clock';

describe('tick', () => {
  it('advances the clock one second while running', () => {
    const match = { ...defaultMatch(), running: true, elapsed: 119 };
    const next = tick(match);
    expect(next.elapsed).toBe(120);
    expect(next.running).toBe(true);
  });

  it('does not advance while paused', () => {
    const match = { ...defaultMatch(), elapsed: 42 };
    expect(tick(match).elapsed).toBe(42);
  });

  it('stops at full time', () => {
    const match = {
      ...defaultMatch(),
      running: true,
      elapsed: fullMatchSeconds() - 1,
    };
    const next = tick(match);
    expect(next.elapsed).toBe(fullMatchSeconds());
    expect(next.running).toBe(false);
  });
});

describe('whistle', () => {
  it('pauses and records a half-time whistle at 45 minutes', () => {
    const match = { ...defaultMatch(), running: true, elapsed: 45 * 60 };
    const next = tick(match);
    expect(next.running).toBe(false);
    expect(next.events).toHaveLength(1);
    expect(next.events[0]).toMatchObject({
      type: 'half-time-whistle',
      minute: 45,
    });
  });

  it('records a full-time whistle at 90 minutes', () => {
    const match = {
      ...defaultMatch(),
      running: true,
      elapsed: 90 * 60 + 15 * 60,
    };
    const next = tick(match);
    expect(next.events).toHaveLength(1);
    expect(next.events[0]).toMatchObject({
      type: 'full-time-whistle',
      minute: 90,
    });
  });

  it('does not whistle twice for the same half', () => {
    const whistled = whistle(defaultMatch(), 'half-time');
    const next = tick({ ...whistled, running: true, elapsed: 45 * 60 + 1 });
    expect(next.events).toHaveLength(1);
  });
});

describe('matchMinute', () => {
  it('reports the first-half minute', () => {
    const match = { ...defaultMatch(), elapsed: 23 * 60 + 15 };
    expect(matchMinute(match)).toEqual({ minute: 23, added: 0 });
  });

  it('clamps to 45 minutes and applies added time at the break', () => {
    const match = { ...defaultMatch(), elapsed: 45 * 60 + 10, addedTime: 2 };
    expect(matchMinute(match)).toEqual({ minute: 45, added: 2 });
  });

  it('reports second-half minutes from 45 onward', () => {
    const match = { ...defaultMatch(), elapsed: 61 * 60 };
    expect(matchPhase(match.elapsed)).toBe('second-half');
    expect(matchMinute(match)).toEqual({ minute: 46, added: 0 });
  });

  it('clamps to 90 minutes with added time at full time', () => {
    const match = {
      ...defaultMatch(),
      elapsed: fullMatchSeconds(),
      addedTime: 4,
    };
    expect(matchMinute(match)).toEqual({ minute: 90, added: 4 });
  });
});

describe('formatEventMinute', () => {
  it('formats plain minutes with an apostrophe', () => {
    expect(formatEventMinute(23, 0)).toBe("23'");
  });

  it('formats added time with a plus', () => {
    expect(formatEventMinute(90, 4)).toBe("90+4'");
  });
});

describe('score tracking', () => {
  it('adds a goal and records a goal event tied to the clock', () => {
    const match = { ...defaultMatch(), elapsed: 12 * 60 };
    const next = addGoal(match);
    expect(next.goalsFor).toBe(1);
    expect(next.events[0]).toMatchObject({
      type: 'goal',
      minute: 12,
      added: 0,
    });
  });

  it('adds a conceded goal and records a concede event', () => {
    const next = addConcede({ ...defaultMatch(), elapsed: 30 * 60 });
    expect(next.goalsAgainst).toBe(1);
    expect(next.events[0]).toMatchObject({ type: 'concede', minute: 30 });
  });

  it('never decrements the score below zero', () => {
    const match = { ...defaultMatch(), goalsFor: 1, goalsAgainst: 2 };
    expect(undoGoal(match).goalsFor).toBe(0);
    expect(undoGoal(undoGoal(match)).goalsFor).toBe(0);
    expect(undoConcede(match).goalsAgainst).toBe(1);
  });
});

describe('cards', () => {
  it('records a yellow card with the current minute', () => {
    const match = { ...defaultMatch(), elapsed: 40 * 60 };
    const next = addCard(match, 'yellow');
    expect(next.events[0]).toMatchObject({
      type: 'yellow-card',
      minute: 40,
    });
  });

  it('records a red card with added time at full time', () => {
    const match = {
      ...defaultMatch(),
      elapsed: fullMatchSeconds(),
      addedTime: 3,
    };
    const next = addCard(match, 'red');
    expect(next.events[0]).toMatchObject({
      type: 'red-card',
      minute: 90,
      added: 3,
    });
  });
});

describe('substitutions', () => {
  it('records a substitution and counts it toward the limit', () => {
    const next = recordSubstitution(defaultMatch(), 'Salah');
    expect(next.substitutions).toBe(1);
    expect(next.events[0]).toMatchObject({
      type: 'substitution',
      playerName: 'Salah',
    });
  });

  it('caps the count at the maximum and warns via remaining', () => {
    let match = defaultMatch();
    for (let i = 0; i < MAX_SUBSTITUTIONS + 2; i += 1) {
      match = recordSubstitution(match);
    }
    expect(match.substitutions).toBe(MAX_SUBSTITUTIONS);
    expect(substitutionsRemaining(match)).toBe(0);
  });
});

describe('added time', () => {
  it('sets added time within the allowed range', () => {
    expect(setAddedTime(defaultMatch(), 3).addedTime).toBe(3);
    expect(setAddedTime(defaultMatch(), -1).addedTime).toBe(0);
    expect(setAddedTime(defaultMatch(), 99).addedTime).toBe(9);
  });
});

describe('persistence', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('round-trips match state through localStorage', () => {
    const match = {
      ...defaultMatch(),
      goalsFor: 2,
      goalsAgainst: 1,
      addedTime: 4,
    };
    saveMatch(match);
    expect(loadMatch()).toEqual(match);
  });

  it('returns null when storage holds junk', () => {
    window.localStorage.setItem('football:match:v1', '{not json');
    expect(loadMatch()).toBeNull();
    window.localStorage.setItem(
      'football:match:v1',
      JSON.stringify({ nope: true })
    );
    expect(loadMatch()).toBeNull();
  });
});

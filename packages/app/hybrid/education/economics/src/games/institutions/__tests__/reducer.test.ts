import { createInitialState, gameReducer } from '../reducer';
import { runSimulation } from '../game';
import type { Institutions } from '../types';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    runSimulation: jest.fn((institutions: Institutions) => ({
      years: [],
      gdpPerCapita: 1500,
      growthPct: 50,
      investmentRate: 20,
      tfp: 120,
    })),
  };
});

describe('institutions reducer', () => {
  it('selects a preset and loads its institutions', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SELECT_PRESET',
      preset: 'inclusive',
    });
    expect(state.preset).toBe('inclusive');
    expect(state.institutions.propertyRights).toBe(80);
  });

  it('updates a single institution slider in the configure phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_PRESET',
      preset: 'inclusive',
    });
    state = gameReducer(state, {
      type: 'SET_INSTITUTION',
      which: 'stability',
      value: 40,
    });
    expect(state.institutions.stability).toBe(40);
  });

  it('ignores slider changes outside the configure phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_PRESET',
      preset: 'inclusive',
    });
    state = gameReducer(state, { type: 'SIMULATE' });
    const before = state;
    const next = gameReducer(state, {
      type: 'SET_INSTITUTION',
      which: 'stability',
      value: 10,
    });
    expect(next).toBe(before);
  });

  it('simulates and records a hit against the target', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_PRESET',
      preset: 'inclusive',
    });
    state = gameReducer(state, { type: 'SIMULATE' });
    expect(state.phase).toBe('result');
    expect(state.success).toBe(true);
    expect(state.roundsWon).toBe(1);
  });

  it('advances rounds with fixed targets', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SELECT_PRESET', preset: 'inclusive' });
    state = gameReducer(state, { type: 'SIMULATE' });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('configure');
    expect(state.round).toBe(2);
    expect(state.success).toBe(false);
  });

  it('resets to the initial state', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_PRESET',
      preset: 'inclusive',
    });
    state = gameReducer(state, { type: 'RESET' });
    expect(state.round).toBe(1);
    expect(state.preset).toBeNull();
    expect(state.roundsWon).toBe(0);
  });
});

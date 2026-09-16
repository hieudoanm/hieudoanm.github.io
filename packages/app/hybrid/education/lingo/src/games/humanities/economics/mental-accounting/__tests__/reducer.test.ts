import { FRAMER_CATEGORIES, SCENARIOS, WIND_FALL_AMOUNT } from '../constants';
import { createInitialState, gameReducer } from '../reducer';

const validSplit = (): Record<string, number> => {
  const record: Record<string, number> = {};
  FRAMER_CATEGORIES.forEach((category, i) => {
    record[category.id] = i === 1 ? WIND_FALL_AMOUNT : 0;
  });
  return record;
};

const playScenarios = (state = createInitialState()) => {
  let current = state;
  for (let i = 0; i < SCENARIOS.length; i++) {
    current = gameReducer(current, { type: 'PICK_CHOICE', choice: 'a' });
    current = gameReducer(current, { type: 'NEXT' });
  }
  return current;
};

describe('mental accounting reducer', () => {
  it('starts on the first scenario unanswered', () => {
    const state = createInitialState();
    expect(state.phase).toBe('scenario');
    expect(state.index).toBe(0);
    expect(state.revealed).toBe(false);
    expect(state.answers).toEqual([]);
    expect(state.allocations).toEqual({});
  });

  it('records a pick and reveals the rational answer', () => {
    const state = gameReducer(createInitialState(), {
      type: 'PICK_CHOICE',
      choice: 'b',
    });
    expect(state.revealed).toBe(true);
    expect(state.answers[0]).toBe('b');
  });

  it('ignores a second pick after the first reveal', () => {
    let state = gameReducer(createInitialState(), {
      type: 'PICK_CHOICE',
      choice: 'a',
    });
    state = gameReducer(state, { type: 'PICK_CHOICE', choice: 'b' });
    expect(state.answers[0]).toBe('a');
  });

  it('ignores NEXT before a choice is made', () => {
    const state = gameReducer(createInitialState(), { type: 'NEXT' });
    expect(state.index).toBe(0);
    expect(state.revealed).toBe(false);
    expect(state.phase).toBe('scenario');
  });

  it('advances through every scenario then reaches the framer round', () => {
    const state = playScenarios();
    expect(state.index).toBe(SCENARIOS.length - 1);
    expect(state.phase).toBe('framer');
    expect(state.answers).toHaveLength(SCENARIOS.length);
  });

  it('locks the windfall split and finishes the game', () => {
    let state = playScenarios();
    state = gameReducer(state, { type: 'ALLOCATE', allocations: validSplit() });
    expect(state.phase).toBe('done');
    expect(state.allocations).toEqual(validSplit());
  });

  it('rejects an allocation that does not sum to the windfall', () => {
    let state = playScenarios();
    const short = validSplit();
    short[FRAMER_CATEGORIES[0]!.id] = WIND_FALL_AMOUNT - 50;
    state = gameReducer(state, { type: 'ALLOCATE', allocations: short });
    expect(state.phase).toBe('framer');
    expect(state.allocations).toEqual({});
  });

  it('ignores scenario actions in the framer phase', () => {
    let state = playScenarios();
    state = gameReducer(state, { type: 'PICK_CHOICE', choice: 'a' });
    expect(state.phase).toBe('framer');
    const framer = gameReducer(state, { type: 'NEXT' });
    expect(framer.phase).toBe('framer');
  });

  it('resets to the initial state', () => {
    const finished = gameReducer(playScenarios(), {
      type: 'ALLOCATE',
      allocations: validSplit(),
    });
    const state = gameReducer(finished, { type: 'RESET' });
    expect(state.phase).toBe('scenario');
    expect(state.index).toBe(0);
    expect(state.answers).toEqual([]);
    expect(state.allocations).toEqual({});
  });
});

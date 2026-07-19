import { createInitialState, gameReducer } from '../reducer';
import type { StudyId } from '../types';

describe('rcts reducer', () => {
  it('submits a study and reveals its result', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SUBMIT',
      studyId: 'B',
      estimate: 0.31,
    });
    expect(state.phase).toBe('reveal');
    expect(state.chosenStudy).toBe('B');
    expect(state.result?.correctStudy).toBe(true);
    expect(state.result?.correctEstimate).toBe(true);
    expect(state.result?.points).toBe(3);
    expect(state.result?.diff).toBeCloseTo(0.31);
  });

  it('scores zero for a non-randomized study', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SUBMIT',
      studyId: 'A',
      estimate: 0.3,
    });
    expect(state.result?.correctStudy).toBe(false);
    expect(state.result?.points).toBe(0);
  });

  it('ignores submissions after the choose phase', () => {
    const initial = gameReducer(createInitialState(), {
      type: 'SUBMIT',
      studyId: 'B',
      estimate: 0.31,
    });
    const next = gameReducer(initial, {
      type: 'SUBMIT',
      studyId: 'A',
      estimate: 0.1,
    });
    expect(next.result).toBe(initial.result);
  });

  it('ignores NEXT_ROUND before any submission', () => {
    const state = gameReducer(createInitialState(), { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
  });

  it('advances rounds and completes the game', () => {
    const randomized: StudyId[] = ['B', 'A', 'B', 'A'];
    let state = createInitialState();
    for (const id of randomized) {
      state = gameReducer(state, {
        type: 'SUBMIT',
        studyId: id,
        estimate: 0.4,
      });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(4);
    expect(state.score).toBe(4);
  });

  it('resets to the initial state', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SUBMIT',
      studyId: 'B',
      estimate: 0.31,
    });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    const reset = gameReducer(state, { type: 'RESET' });
    expect(reset.phase).toBe('choose');
    expect(reset.round).toBe(1);
    expect(reset.results).toEqual([]);
  });
});

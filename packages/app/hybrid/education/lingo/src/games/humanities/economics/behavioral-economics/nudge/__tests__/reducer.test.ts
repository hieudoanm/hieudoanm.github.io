import { TOTAL_ROUNDS } from '../constants';
import { createInitialState, gameReducer } from '../reducer';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    buildReport: (
      round: number,
      domain: {
        id: string;
        target: number;
        mechanism: string;
        mechanismText: string;
      },
      design: string,
      inertia: number
    ) => {
      const participation = design === 'opt-in' ? 40 : 90;
      return {
        round,
        domainId: domain.id,
        design,
        inertia,
        participation,
        target: domain.target,
        hitTarget: participation >= domain.target,
        recommendedDesign: 'opt-out',
        recommendedParticipation: 90,
        mechanism: domain.mechanism,
        mechanismText: domain.mechanismText,
      };
    },
    computeSimulator: (defaultRate: number) => ({
      defaultRate,
      employees: 100,
      savers: defaultRate > 0 ? 92 : 42,
      target: 85,
      hitTarget: defaultRate > 0,
    }),
  };
});

const toSimulator = () => {
  let state = createInitialState();
  for (let i = 0; i < TOTAL_ROUNDS; i++) {
    state = gameReducer(state, {
      type: 'CHECK_DESIGN',
      design: 'opt-out',
      inertia: 50,
    });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
  }
  return state;
};

describe('nudge reducer', () => {
  it('starts fresh on the first design scenario', () => {
    const state = createInitialState();
    expect(state.phase).toBe('design');
    expect(state.roundIndex).toBe(0);
    expect(state.targetHits).toBe(0);
  });

  it('checks a design and reveals the participation report', () => {
    const state = gameReducer(createInitialState(), {
      type: 'CHECK_DESIGN',
      design: 'opt-out',
      inertia: 50,
    });
    expect(state.phase).toBe('reveal');
    expect(state.report?.domainId).toBe('retirement');
    expect(state.report?.participation).toBe(90);
    expect(state.report?.hitTarget).toBe(true);
    expect(state.targetHits).toBe(1);
  });

  it('ignores checks outside the design phase', () => {
    const state = gameReducer(createInitialState(), {
      type: 'CHECK_DESIGN',
      design: 'opt-out',
      inertia: 50,
    });
    const next = gameReducer(state, {
      type: 'CHECK_DESIGN',
      design: 'opt-in',
      inertia: 0,
    });
    expect(next.report?.design).toBe('opt-out');
  });

  it('requires a report before advancing rounds', () => {
    const state = gameReducer(createInitialState(), { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('design');
  });

  it('advances through all six design scenarios into the simulator', () => {
    const state = toSimulator();
    expect(state.phase).toBe('simulator');
    expect(state.reports).toHaveLength(TOTAL_ROUNDS);
    expect(state.targetHits).toBe(TOTAL_ROUNDS);
  });

  it('scores the simulator once per check', () => {
    let state = toSimulator();
    state = gameReducer(state, { type: 'CHECK_SIM', defaultRate: 3 });
    expect(state.simulator?.savers).toBe(92);
    expect(state.targetHits).toBe(TOTAL_ROUNDS + 1);
    const before = state.targetHits;
    const next = gameReducer(state, { type: 'CHECK_SIM', defaultRate: 3 });
    expect(next.targetHits).toBe(before);
  });

  it('ignores the simulator outside the simulator phase', () => {
    const state = gameReducer(createInitialState(), {
      type: 'CHECK_SIM',
      defaultRate: 3,
    });
    expect(state.simulator).toBeNull();
  });

  it('unscores the previous attempt when the simulator is retried', () => {
    let state = toSimulator();
    state = gameReducer(state, { type: 'CHECK_SIM', defaultRate: 3 });
    state = gameReducer(state, { type: 'RESET_SIM' });
    expect(state.simulator).toBeNull();
    expect(state.targetHits).toBe(TOTAL_ROUNDS);
    state = gameReducer(state, { type: 'CHECK_SIM', defaultRate: 0 });
    expect(state.simulator?.savers).toBe(42);
    expect(state.simulator?.hitTarget).toBe(false);
    expect(state.targetHits).toBe(TOTAL_ROUNDS);
  });

  it('reaches the done phase only after a scored simulator', () => {
    const before = gameReducer(toSimulator(), { type: 'FINISH' });
    expect(before.phase).toBe('simulator');
    let state = gameReducer(toSimulator(), {
      type: 'CHECK_SIM',
      defaultRate: 3,
    });
    state = gameReducer(state, { type: 'FINISH' });
    expect(state.phase).toBe('done');
  });

  it('resets to the initial state', () => {
    const state = gameReducer(toSimulator(), { type: 'RESET' });
    expect(state).toEqual(createInitialState());
  });
});

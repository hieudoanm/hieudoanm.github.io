import {
  intervalMsForMinutes,
  newMonitor,
  removeMonitor,
  toggleMonitor,
  updateMonitor,
} from '@/lib/monitor';

const runSummary = {
  id: 'r1',
  collectionId: 'c1',
  collectionName: 'Users API',
  startedAt: 1,
  finishedAt: 2,
  durationMs: 1,
  iterations: 1,
  totalRequests: 2,
  passed: 1,
  failed: 1,
  testPassed: 0,
  testFailed: 0,
  results: [],
};

describe('newMonitor', () => {
  it('creates a stopped monitor with no prior run', () => {
    const monitor = newMonitor('Users check', 'c1', 60000);
    expect(monitor).toMatchObject({
      name: 'Users check',
      collectionId: 'c1',
      intervalMs: 60000,
      running: false,
      lastRunAt: null,
      lastResult: null,
    });
  });
});

describe('toggleMonitor', () => {
  it('flips the running flag of the matching monitor', () => {
    const monitor = newMonitor('A', 'c1', 60000);
    const [toggled] = toggleMonitor([monitor], monitor.id);
    expect(toggled.running).toBe(true);
    const [untoggled] = toggleMonitor([toggled], monitor.id);
    expect(untoggled.running).toBe(false);
  });

  it('leaves other monitors untouched', () => {
    const a = newMonitor('A', 'c1', 60000);
    const b = newMonitor('B', 'c2', 60000);
    const next = toggleMonitor([a, b], a.id);
    expect(next[0].running).toBe(true);
    expect(next[1].running).toBe(false);
  });
});

describe('updateMonitor', () => {
  it('merges a patch into the matching monitor', () => {
    const monitor = newMonitor('A', 'c1', 60000);
    const [updated] = updateMonitor([monitor], monitor.id, {
      lastRunAt: 42,
      lastResult: runSummary,
    });
    expect(updated.lastRunAt).toBe(42);
    expect(updated.lastResult?.passed).toBe(1);
  });
});

describe('removeMonitor', () => {
  it('removes the matching monitor', () => {
    const a = newMonitor('A', 'c1', 60000);
    const b = newMonitor('B', 'c2', 60000);
    expect(removeMonitor([a, b], a.id)).toEqual([b]);
  });
});

describe('intervalMsForMinutes', () => {
  it('converts minutes to milliseconds', () => {
    expect(intervalMsForMinutes(5)).toBe(300000);
  });

  it('clamps to at least one minute', () => {
    expect(intervalMsForMinutes(0)).toBe(60000);
  });
});

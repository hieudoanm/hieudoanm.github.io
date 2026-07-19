import { findFormation } from '@/lib/formations';
import {
  filledSlots,
  formationStrength,
  roleCoverage,
  teamStats,
} from '@/lib/stats';
import { makePlayer, makeSquad } from '@/test/fixtures';

describe('stats', () => {
  const formation = () => {
    const f = findFormation('442');
    if (!f) throw new Error('442 missing');
    return f;
  };

  it('reports role coverage for every role', () => {
    const squad = makeSquad({
      formationId: '442',
      players: [makePlayer({ id: 'p1', role: 'GK' })],
      assignments: { '442-0-0': ['p1'] },
    });
    const coverage = roleCoverage(squad, formation());
    expect(coverage).toEqual([
      { role: 'GK', filled: 1, total: 1 },
      { role: 'DEF', filled: 0, total: 4 },
      { role: 'MID', filled: 0, total: 4 },
      { role: 'FWD', filled: 0, total: 2 },
    ]);
  });

  it('counts only slots with at least one player as filled', () => {
    const squad = makeSquad({
      formationId: '442',
      players: [makePlayer({ id: 'p1', role: 'GK' })],
      assignments: { '442-0-0': ['p1', 'p2'], '442-3-9': [] },
    });
    expect(filledSlots(squad, formation())).toBe(1);
  });

  it('computes formation strength as the share of filled slots', () => {
    const squad = makeSquad({
      formationId: '442',
      players: [makePlayer({ id: 'p1', role: 'GK' })],
      assignments: { '442-0-0': ['p1'] },
    });
    expect(formationStrength(squad, formation())).toBe(9);
    expect(formationStrength(squad, { ...formation(), slots: [] })).toBe(0);
  });

  it('builds a team stats summary including unassigned players', () => {
    const squad = makeSquad({
      formationId: '442',
      players: [
        makePlayer({ id: 'p1', role: 'GK' }),
        makePlayer({ id: 'p2', name: 'Bob', role: 'FWD' }),
      ],
      assignments: { '442-0-0': ['p1'] },
    });
    const stats = teamStats(squad, formation());
    expect(stats.filled).toBe(1);
    expect(stats.total).toBe(11);
    expect(stats.unassigned).toBe(1);
    expect(stats.strength).toBe(9);
    expect(stats.coverage).toHaveLength(4);
  });
});

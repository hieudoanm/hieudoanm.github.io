import { findFormation } from '@/lib/formations';
import { formationFit, shiftLine, suggestFormations } from '@/lib/tactics';
import { makeSquad } from '@/test/fixtures';

const formation442 = findFormation('442');
if (!formation442) throw new Error('442 missing');

describe('shiftLine', () => {
  it('rotates a line to the left', () => {
    const squad = makeSquad({
      assignments: {
        '442-1-1': ['pA'],
        '442-1-4': ['pB'],
        '442-3-9': ['pC'],
      },
    });
    const next = shiftLine(squad, formation442, 1, 'left');
    expect(next.assignments).toEqual({
      '442-1-4': ['pA'],
      '442-1-3': ['pB'],
      '442-3-9': ['pC'],
    });
  });

  it('rotates a line to the right', () => {
    const squad = makeSquad({
      assignments: { '442-1-1': ['pA'], '442-1-4': ['pB'] },
    });
    const next = shiftLine(squad, formation442, 1, 'right');
    expect(next.assignments['442-1-1']).toEqual(['pB']);
    expect(next.assignments['442-1-2']).toEqual(['pA']);
  });

  it('leaves untouched lines intact', () => {
    const squad = makeSquad({ assignments: { '442-0-0': ['pGK'] } });
    const next = shiftLine(squad, formation442, 2, 'left');
    expect(next.assignments['442-0-0']).toEqual(['pGK']);
    expect(Object.keys(next.assignments)).toHaveLength(1);
  });

  it('no-ops on a single-slot line', () => {
    const squad = makeSquad({ assignments: { '442-0-0': ['pGK'] } });
    expect(shiftLine(squad, formation442, 0, 'left').assignments).toEqual({
      '442-0-0': ['pGK'],
    });
  });

  it('no-ops on an unknown line index', () => {
    expect(
      shiftLine(makeSquad(), formation442, 9, 'right').assignments
    ).toEqual({});
  });
});

describe('formationFit', () => {
  it('counts how many starters cover each slot by role', () => {
    const squad = makeSquad({
      formationId: '433',
      players: [
        { id: 'p1', name: 'GK', number: 1, role: 'GK' },
        { id: 'p2', name: 'D', number: 2, role: 'DEF' },
        { id: 'p3', name: 'D', number: 3, role: 'DEF' },
        { id: 'p4', name: 'D', number: 4, role: 'DEF' },
        { id: 'p5', name: 'D', number: 5, role: 'DEF' },
        { id: 'p6', name: 'M', number: 6, role: 'MID' },
        { id: 'p7', name: 'M', number: 7, role: 'MID' },
        { id: 'p8', name: 'M', number: 8, role: 'MID' },
        { id: 'p9', name: 'M', number: 9, role: 'MID' },
        { id: 'p10', name: 'F', number: 10, role: 'FWD' },
        { id: 'p11', name: 'F', number: 11, role: 'FWD' },
      ],
    });
    const fit = formationFit(squad, findFormation('433') ?? formation442);
    expect(fit.filled).toBe(10);
    expect(fit.total).toBe(11);
  });

  it('excludes bench players from coverage', () => {
    const squad = makeSquad({
      players: [
        { id: 'p1', name: 'GK', number: 1, role: 'GK', bench: true },
        { id: 'p2', name: 'D', number: 2, role: 'DEF' },
        { id: 'p3', name: 'D', number: 3, role: 'DEF' },
      ],
    });
    const fit = formationFit(squad, formation442);
    expect(fit.filled).toBe(2);
  });
});

describe('suggestFormations', () => {
  it('returns the best-fitting formations sorted by coverage', () => {
    const squad = makeSquad({
      players: [
        { id: 'p1', name: 'GK', number: 1, role: 'GK' },
        { id: 'p2', name: 'D', number: 2, role: 'DEF' },
        { id: 'p3', name: 'D', number: 3, role: 'DEF' },
        { id: 'p4', name: 'M', number: 4, role: 'MID' },
      ],
    });
    const suggestions = suggestFormations(squad, 5);
    expect(suggestions).toHaveLength(3);
    for (let i = 1; i < suggestions.length; i += 1) {
      expect(suggestions[i - 1].filled).toBeGreaterThanOrEqual(
        suggestions[i].filled
      );
    }
  });

  it('prefers formations that use every player when possible', () => {
    const squad = makeSquad({
      players: [
        { id: 'p1', name: 'GK', number: 1, role: 'GK' },
        { id: 'p2', name: 'D', number: 2, role: 'DEF' },
        { id: 'p3', name: 'D', number: 3, role: 'DEF' },
        { id: 'p4', name: 'M', number: 4, role: 'MID' },
        { id: 'p5', name: 'M', number: 5, role: 'MID' },
      ],
    });
    const [best] = suggestFormations(squad, 5);
    expect(best.formation.id).toBe('5-2-2');
    expect(best.filled).toBe(5);
  });
});

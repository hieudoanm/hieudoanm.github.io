import {
  FORMATIONS,
  buildFormation,
  defaultFormationFor,
  findFormation,
  formationGroup,
  formationGroupsFor,
  formationsFor,
  groupSlotsByLine,
  pitchPosition,
} from '@/lib/formations';
import { FormationSize } from '@/types/football';

describe('formations', () => {
  it('exposes the expected known formations', () => {
    const ids = FORMATIONS.map((f) => f.id);
    expect(ids).toContain('442');
    expect(ids).toContain('4231');
    expect(ids).toContain('433');
    expect(ids).toContain('352');
  });

  it('includes the extended formation catalogue', () => {
    const ids = FORMATIONS.map((f) => f.id);
    for (const id of [
      '451',
      '4141',
      '4312',
      '41212',
      '4321',
      '4222',
      '3412',
      '3142',
      '3331',
      '3241',
      '3421',
      '3322',
      '361',
      '541',
      '5221',
      '5212',
      '5311',
      '523',
      '7-1-4-1',
      '7-1-3-2',
      '7-2-4-0',
      '7-3-3-0',
      '7-4-2-0',
      '7-4-1-1',
      '5-1-1-2',
      '5-2-0-2',
      '5-3-0-1',
    ]) {
      expect(ids).toContain(id);
    }
  });

  it('sizes every formation to its declared size', () => {
    for (const formation of FORMATIONS) {
      expect(formation.slots).toHaveLength(formation.size);
    }
  });

  it('gives every slot a unique id, a label, and a shirt number', () => {
    for (const formation of FORMATIONS) {
      const ids = formation.slots.map((slot) => slot.id);
      expect(new Set(ids).size).toBe(ids.length);
      for (const slot of formation.slots) {
        expect(slot.label.length).toBeGreaterThan(0);
        expect(slot.number).toBeGreaterThan(0);
      }
    }
  });

  it('numbers the goalkeeper as shirt 1 on every formation', () => {
    for (const formation of FORMATIONS) {
      const gk = formation.slots.find((slot) => slot.label === 'GK');
      expect(gk?.number).toBe(1);
    }
  });

  it('builds a formation from a def with explicit numbers', () => {
    const formation = buildFormation({
      id: 't',
      name: 'Test',
      size: 5,
      lines: [['gk'], ['st']],
      numbers: [1, 9],
    });
    expect(formation.slots[1]).toEqual(
      expect.objectContaining({ label: 'ST', number: 9, line: 1 })
    );
  });

  it('falls back to sequential numbers when a def has none', () => {
    const formation = buildFormation({
      id: 't',
      name: 'Test',
      size: 5,
      lines: [['gk'], ['st']],
    });
    expect(formation.slots.map((slot) => slot.number)).toEqual([1, 2]);
  });

  it('filters formations by size', () => {
    for (const size of [5, 7, 11] as FormationSize[]) {
      const filtered = formationsFor(size);
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.every((f) => f.size === size)).toBe(true);
    }
  });

  it('groups 11-a-side formations by their defensive line', () => {
    for (const id of [
      '442',
      '4231',
      '433',
      '451',
      '4141',
      '4312',
      '41212',
      '4321',
      '4222',
    ]) {
      expect(findFormation(id)?.group).toBe('Back 4');
    }
    for (const id of [
      '352',
      '343',
      '3412',
      '3142',
      '3331',
      '3241',
      '3421',
      '3322',
      '361',
    ]) {
      expect(findFormation(id)?.group).toBe('Back 3');
    }
    for (const id of ['532', '541', '5221', '5212', '5311', '523']) {
      expect(findFormation(id)?.group).toBe('Back 5');
    }
  });

  it('groups small-sided formations by size', () => {
    expect(
      formationGroup({ id: 't', name: 'T', size: 7, lines: [['gk'], ['cb']] })
    ).toBe('7-a-side');
    expect(
      formationGroup({ id: 't', name: 'T', size: 5, lines: [['gk'], ['cb']] })
    ).toBe('5-a-side');
  });

  it('lists the groups for a size in def order', () => {
    expect(formationGroupsFor(11)).toEqual(['Back 4', 'Back 3', 'Back 5']);
    expect(formationGroupsFor(7)).toEqual(['7-a-side']);
    expect(formationGroupsFor(5)).toEqual(['5-a-side']);
  });

  it('returns the first formation of a size as the default', () => {
    expect(defaultFormationFor(11).id).toBe('442');
    expect(defaultFormationFor(7).size).toBe(7);
    expect(defaultFormationFor(5).size).toBe(5);
  });

  it('finds a formation by id and null for unknown ids', () => {
    expect(findFormation('442')?.name).toBe('4-4-2');
    expect(findFormation('nope')).toBeNull();
    expect(findFormation(null)).toBeNull();
  });

  it('groups slots into lines preserving order', () => {
    const lines = groupSlotsByLine(FORMATIONS[0].slots);
    expect(lines.map((line) => line[0].label)).toEqual([
      'GK',
      'RB',
      'RM',
      'ST',
    ]);
  });

  it('positions slots symmetrically within their line', () => {
    const formation = findFormation('442');
    if (!formation) throw new Error('442 missing');
    const lines = groupSlotsByLine(formation.slots);
    for (const line of lines) {
      const positions = line.map((slot) =>
        pitchPosition(slot, line, lines.length)
      );
      expect(positions[0].x).toBeCloseTo(line.length / (line.length + 1));
      expect(positions[positions.length - 1].x).toBeCloseTo(
        1 / (line.length + 1)
      );
    }
    const gk = formation.slots[0];
    expect(pitchPosition(gk, lines[0], lines.length).y).toBeCloseTo(
      1 - 1 / (lines.length + 1)
    );
  });

  it('places right-side roles on the right side of the pitch', () => {
    const formation = findFormation('442');
    if (!formation) throw new Error('442 missing');
    const lines = groupSlotsByLine(formation.slots);
    const xOf = (label: string): number => {
      for (const line of lines) {
        const slot = line.find((item) => item.label === label);
        if (slot) return pitchPosition(slot, line, lines.length).x;
      }
      throw new Error(`no slot labeled ${label}`);
    };
    expect(xOf('RB')).toBeGreaterThan(xOf('LB'));
    expect(xOf('RM')).toBeGreaterThan(xOf('LM'));
  });

  it('keeps positions inside the pitch bounds', () => {
    for (const formation of FORMATIONS) {
      const lines = groupSlotsByLine(formation.slots);
      for (const line of lines) {
        for (const slot of line) {
          const { x, y } = pitchPosition(slot, line, lines.length);
          expect(x).toBeGreaterThan(0);
          expect(x).toBeLessThan(1);
          expect(y).toBeGreaterThan(0);
          expect(y).toBeLessThan(1);
        }
      }
    }
  });
});

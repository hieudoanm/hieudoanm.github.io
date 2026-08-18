import { roleClasses, slotRole } from '@/lib/pitch';

describe('pitch', () => {
  it('maps slot labels to player roles', () => {
    expect(slotRole('GK')).toBe('GK');
    expect(slotRole('CB')).toBe('DEF');
    expect(slotRole('LB')).toBe('DEF');
    expect(slotRole('RWB')).toBe('DEF');
    expect(slotRole('CM')).toBe('MID');
    expect(slotRole('LW')).toBe('MID');
    expect(slotRole('ST')).toBe('FWD');
    expect(slotRole('unknown')).toBe('FWD');
  });

  it('returns badge classes per role', () => {
    for (const role of ['GK', 'DEF', 'MID', 'FWD'] as const) {
      expect(roleClasses(role).length).toBeGreaterThan(0);
    }
  });
});

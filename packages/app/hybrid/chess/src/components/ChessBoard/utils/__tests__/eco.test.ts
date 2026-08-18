import { ecoGroups, ecoSubgroups, ecoOpenings, replayPGN } from '../eco';

describe('eco.ts', () => {
  it('ecoGroups contains at least one group', () => {
    expect(ecoGroups.length).toBeGreaterThan(0);
  });

  it('ecoSubgroups returns subgroups for a group', () => {
    const group = ecoGroups[0]!;
    const subgroups = ecoSubgroups(group);
    expect(Array.isArray(subgroups)).toBe(true);
  });

  it('ecoOpenings returns openings for a group and subgroup', () => {
    const group = ecoGroups[0]!;
    const subgroups = ecoSubgroups(group);
    const openings = ecoOpenings(group, subgroups[0] ?? '');
    expect(Array.isArray(openings)).toBe(true);
  });

  it('replayPGN returns null for invalid pgn', () => {
    expect(replayPGN('')).toBeNull();
    expect(replayPGN('invalid')).toBeNull();
  });

  it('replayPGN replays a valid pgn', () => {
    const pgn = `[Event "Test"]
[Result "*"]

1. e4 e5 2. Nf3 *`;
    const result = replayPGN(pgn);
    expect(result).not.toBeNull();
  });

  it('downloadGIF is a function', async () => {
    const { downloadGIF } = await import('../eco');
    expect(typeof downloadGIF).toBe('function');
  });
});

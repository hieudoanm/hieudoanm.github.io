import { ecoGroups, ecoOpenings, ecoSubgroups, replayPGN } from '../eco';

describe('eco utils', () => {
  it('returns sorted opening groups', () => {
    expect(ecoGroups.length).toBeGreaterThan(10);
    expect([...ecoGroups].sort()).toEqual(ecoGroups);
  });

  it('returns subgroups for a group', () => {
    const group = ecoGroups[0];
    const subs = ecoSubgroups(group);
    expect(subs.length).toBeGreaterThan(0);
  });

  it('returns openings for a group/subgroup', () => {
    const group = ecoGroups[0];
    const subgroup = ecoSubgroups(group)[0];
    const openings = ecoOpenings(group, subgroup);
    expect(openings.length).toBeGreaterThan(0);
    expect(openings[0].group).toBe(group);
    expect(openings[0].subgroup ?? '').toBe(subgroup);
  });

  it('returns empty openings for unknown group', () => {
    expect(ecoOpenings('Nope', 'Nope')).toEqual([]);
  });
});

describe('replayPGN', () => {
  it('replays a valid PGN', () => {
    const game = replayPGN('1. e4 e5 2. Nf3');
    expect(game).not.toBeNull();
    expect(game?.turn).toBe('b');
  });

  it('returns null for invalid PGN', () => {
    expect(replayPGN('not a pgn')).toBeNull();
  });
});

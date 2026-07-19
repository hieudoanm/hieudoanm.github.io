import { filterPlayers, sortPlayers } from '@/lib/roster';
import { makePlayer } from '@/test/fixtures';

const roster = [
  makePlayer({ id: 'p1', name: 'Ada', number: 10, role: 'MID' }),
  makePlayer({ id: 'p2', name: 'Bob', number: 1, role: 'GK' }),
  makePlayer({ id: 'p3', name: 'Cara', number: 3, role: 'DEF' }),
  makePlayer({ id: 'p4', name: 'Dan', number: 11, role: 'FWD' }),
];

describe('sortPlayers', () => {
  it('sorts by name alphabetically', () => {
    expect(sortPlayers(roster, 'name').map((p) => p.name)).toEqual([
      'Ada',
      'Bob',
      'Cara',
      'Dan',
    ]);
  });

  it('sorts by shirt number ascending', () => {
    expect(sortPlayers(roster, 'number').map((p) => p.number)).toEqual([
      1, 3, 10, 11,
    ]);
  });

  it('sorts by role in GK/DEF/MID/FWD order', () => {
    expect(sortPlayers(roster, 'role').map((p) => p.role)).toEqual([
      'GK',
      'DEF',
      'MID',
      'FWD',
    ]);
  });

  it('breaks role ties by name', () => {
    const players = [
      makePlayer({ id: 'p1', name: 'Zara', role: 'FWD' }),
      makePlayer({ id: 'p2', name: 'Ada', role: 'FWD' }),
    ];
    expect(sortPlayers(players, 'role').map((p) => p.name)).toEqual([
      'Ada',
      'Zara',
    ]);
  });

  it('does not mutate the input array', () => {
    const original = [...roster];
    sortPlayers(roster, 'number');
    expect(roster.map((p) => p.number)).toEqual(original.map((p) => p.number));
  });
});

describe('filterPlayers', () => {
  it('matches names case-insensitively', () => {
    const result = filterPlayers(roster, 'aDa');
    expect(result.map((p) => p.name)).toEqual(['Ada']);
  });

  it('matches a full shirt number', () => {
    const result = filterPlayers(roster, '11');
    expect(result.map((p) => p.name)).toEqual(['Dan']);
  });

  it('does not match a number as a substring', () => {
    const result = filterPlayers(roster, '1');
    expect(result.map((p) => p.name)).toEqual(['Bob']);
  });

  it('returns all players for an empty query', () => {
    expect(filterPlayers(roster, '')).toHaveLength(4);
    expect(filterPlayers(roster, '   ')).toHaveLength(4);
  });

  it('returns no players when nothing matches', () => {
    expect(filterPlayers(roster, 'zzz')).toEqual([]);
  });
});

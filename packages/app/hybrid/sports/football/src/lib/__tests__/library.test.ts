import {
  addSquadToLibrary,
  createSquad,
  duplicateSquad,
  removeSquadFromLibrary,
  renameSquad,
  setActiveSquad,
} from '@/lib/library';
import { SquadLibrary } from '@/types/football';
import { makeSquad } from '@/test/fixtures';

const makeLibrary = (overrides: Partial<SquadLibrary> = {}): SquadLibrary => ({
  activeId: 's1',
  squads: [
    makeSquad({ id: 's1', name: 'First' }),
    makeSquad({ id: 's2', name: 'Second' }),
  ],
  ...overrides,
});

describe('library', () => {
  it('creates a squad with a trimmed name and a default of My Squad', () => {
    expect(createSquad('  Team A ').name).toBe('Team A');
    expect(createSquad('   ').name).toBe('My Squad');
    expect(createSquad('Team A').id).toEqual(expect.any(String));
  });

  it('adds a squad and makes it active', () => {
    const next = addSquadToLibrary(makeLibrary(), 'Third');
    expect(next.squads).toHaveLength(3);
    expect(next.activeId).toBe(next.squads[2].id);
  });

  it('duplicates a squad with fresh ids and remapped assignments', () => {
    const library = makeLibrary({
      squads: [
        makeSquad({
          id: 's1',
          name: 'First',
          players: [
            { id: 'p1', name: 'Ada', number: 10, role: 'MID' },
            { id: 'p2', name: 'Bob', number: 9, role: 'FWD' },
          ],
          assignments: { '442-1-2': ['p1'], '442-3-9': ['p2'] },
        }),
      ],
    });
    const next = duplicateSquad(library, 's1');
    expect(next.squads).toHaveLength(2);
    const copy = next.squads[1];
    expect(copy.id).not.toBe('s1');
    expect(copy.name).toBe('First (Copy)');
    expect(copy.players[0].id).not.toBe('p1');
    expect(copy.players[0].name).toBe('Ada');
    const assigned = Object.values(copy.assignments).flat();
    expect(assigned).toEqual([copy.players[0].id, copy.players[1].id]);
    expect(next.activeId).toBe(copy.id);
  });

  it('renames a squad and ignores empty names', () => {
    const squads = renameSquad(makeLibrary().squads, 's1', 'Renamed');
    expect(squads[0].name).toBe('Renamed');
    expect(renameSquad(squads, 's1', '   ')[0].name).toBe('Renamed');
  });

  it('removes a squad and switches the active id', () => {
    const next = removeSquadFromLibrary(makeLibrary(), 's1');
    expect(next?.squads.map((s) => s.id)).toEqual(['s2']);
    expect(next?.activeId).toBe('s2');
  });

  it('removing the last squad returns null', () => {
    const single = makeLibrary({ squads: [makeSquad({ id: 's1' })] });
    expect(removeSquadFromLibrary(single, 's1')).toBeNull();
  });

  it('keeps the active id when removing an inactive squad', () => {
    const next = removeSquadFromLibrary(makeLibrary(), 's2');
    expect(next?.activeId).toBe('s1');
  });

  it('sets the active squad', () => {
    expect(setActiveSquad(makeLibrary(), 's2').activeId).toBe('s2');
  });

  it('duplicateSquad returns library unchanged when squad not found', () => {
    const library = makeLibrary();
    const result = duplicateSquad(library, 'nonexistent');
    expect(result).toBe(library);
  });

  it('duplicateSquad handles squads with lineups', () => {
    const library = makeLibrary({
      squads: [
        makeSquad({
          id: 's1',
          name: 'First',
          players: [{ id: 'p1', name: 'Ada', number: 10, role: 'MID' }],
          assignments: { '442-0-0': ['p1'] },
          lineups: [
            {
              id: 'l1',
              name: 'Plan A',
              formationId: '442',
              assignments: { '442-0-0': ['p1'] },
            },
          ],
        }),
      ],
    });
    const next = duplicateSquad(library, 's1');
    const copy = next.squads[1];
    expect(copy.lineups).toHaveLength(1);
    expect(copy.lineups[0].name).toBe('Plan A');
    expect(copy.lineups[0].assignments).toEqual({
      '442-0-0': [expect.any(String)],
    });
  });

  it('duplicateSquad handles empty assignments', () => {
    const library = makeLibrary({
      squads: [
        makeSquad({
          id: 's1',
          name: 'First',
          players: [{ id: 'p1', name: 'Ada', number: 10, role: 'MID' }],
          assignments: {},
        }),
      ],
    });
    const next = duplicateSquad(library, 's1');
    expect(next.squads[1].assignments).toEqual({});
  });
});

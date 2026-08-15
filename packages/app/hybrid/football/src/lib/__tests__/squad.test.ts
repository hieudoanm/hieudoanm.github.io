import {
  addPlayer,
  applyPreferredPosition,
  assignPlayer,
  autoAssignPlayer,
  benchPlayers,
  clearSlot,
  defaultSquad,
  findDuplicateNumbers,
  loadOrCreateSquad,
  loadOrCreateSquadLibrary,
  loadSquad,
  loadSquadLibrary,
  markBench,
  markStarter,
  newPlayer,
  removePlayer,
  replacePlayers,
  resetAssignments,
  samplePlayers,
  saveSquad,
  saveSquadLibrary,
  slotPlayers,
  substitutePlayer,
  swapSlotPlayers,
  toggleAssignment,
  toggleBench,
  toggleLeadership,
  unassignPlayer,
  unassignedPlayers,
  updatePlayer,
} from '@/lib/squad';
import { Player, Squad } from '@/types/football';

const STORAGE_KEY = 'football:squad:v1';
const LIBRARY_KEY = 'football:squad-library:v1';

const makePlayer = (overrides: Partial<Player> = {}): Player => ({
  id: 'p1',
  name: 'Ada',
  number: 10,
  role: 'MID',
  ...overrides,
});

const makeSquad = (overrides: Partial<Squad> = {}): Squad => ({
  id: 's1',
  name: 'Test',
  formationId: '442',
  players: [],
  assignments: {},
  ...overrides,
});

describe('squad', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('creates a player with a unique id', () => {
    const a = newPlayer('Ada', 10, 'MID');
    const b = newPlayer('Bob', 9, 'FWD');
    expect(a).toMatchObject({ name: 'Ada', number: 10, role: 'MID' });
    expect(a.id).not.toBe(b.id);
  });

  it('returns a fixed set of sample players', () => {
    expect(samplePlayers()).toHaveLength(11);
    expect(samplePlayers()[0].role).toBe('GK');
  });

  it('creates an empty default squad with the 4-4-2 formation', () => {
    expect(defaultSquad()).toEqual({
      id: expect.any(String),
      name: 'My Squad',
      formationId: '442',
      players: [],
      assignments: {},
    });
  });

  it('creates a player with an optional position', () => {
    const player = newPlayer('Ada', 10, 'MID', 'LCM');
    expect(player.position).toBe('LCM');
  });

  it('prefers the players position label when auto-assigning', () => {
    const squad = makeSquad({ formationId: '433' });
    const player = newPlayer('Bob', 7, 'DEF', 'RW');
    expect(autoAssignPlayer(squad, player).assignments['433-3-8']).toEqual([
      player.id,
    ]);
  });

  it('falls back to role when the position label has no free slot', () => {
    const squad = makeSquad({ formationId: '433' });
    const player = newPlayer('Bob', 6, 'MID', 'RCM');
    expect(autoAssignPlayer(squad, player).assignments['433-2-5']).toEqual([
      player.id,
    ]);
  });

  it('reports duplicate shirt numbers', () => {
    const squad = makeSquad({
      players: [
        makePlayer({ id: 'p1', number: 7 }),
        makePlayer({ id: 'p2', number: 7 }),
        makePlayer({ id: 'p3', number: 4 }),
        makePlayer({ id: 'p4', number: 7 }),
      ],
    });
    expect(findDuplicateNumbers(squad.players)).toEqual([7]);
  });

  it('replaces players and re-runs auto-assignment', () => {
    const squad = makeSquad();
    const next = replacePlayers(squad, [
      newPlayer('Ada', 10, 'MID'),
      newPlayer('Bob', 9, 'FWD'),
    ]);
    expect(next.players).toHaveLength(2);
    expect(next.assignments['442-2-5']).toEqual([next.players[0].id]);
  });

  it('adds a player with a trimmed name', () => {
    const squad = addPlayer(makeSquad(), '  Ada  ', 10, 'MID');
    expect(squad.players).toHaveLength(1);
    expect(squad.players[0].name).toBe('Ada');
  });

  it('auto-assigns a new player to the first empty matching slot', () => {
    const squad = addPlayer(makeSquad(), 'Ada', 10, 'FWD');
    expect(squad.assignments['442-3-9']).toEqual([squad.players[0].id]);
  });

  it('keeps auto-assigning players of the same role until slots are full', () => {
    const withGk = addPlayer(makeSquad(), 'Ada', 1, 'GK');
    expect(Object.keys(withGk.assignments)).toEqual(['442-0-0']);
    const withSecondGk = addPlayer(withGk, 'Bob', 1, 'GK');
    expect(withSecondGk.assignments).toEqual(withGk.assignments);
  });

  it('does not auto-assign a player when all matching slots are full', () => {
    const squad = makeSquad({
      players: [
        makePlayer({ id: 'p1' }),
        makePlayer({ id: 'p2' }),
        makePlayer({ id: 'p3' }),
        makePlayer({ id: 'p4' }),
      ],
      assignments: {
        '442-1-1': ['p1'],
        '442-1-2': ['p2'],
        '442-1-3': ['p3'],
        '442-1-4': ['p4'],
      },
    });
    const next = autoAssignPlayer(squad, makePlayer({ id: 'p5', role: 'DEF' }));
    expect(next.assignments).toEqual(squad.assignments);
  });

  it('ignores an unknown formation when auto-assigning', () => {
    const squad = makeSquad({ formationId: '0-0-0' });
    expect(autoAssignPlayer(squad, makePlayer())).toBe(squad);
  });

  it('ignores adding a player with an empty name', () => {
    const squad = makeSquad();
    expect(addPlayer(squad, '   ', 10, 'MID')).toBe(squad);
  });

  it('updates a player by id', () => {
    const squad = makeSquad({ players: [makePlayer()] });
    const next = updatePlayer(squad, 'p1', { number: 7 });
    expect(next.players[0].number).toBe(7);
    expect(next.players[0].name).toBe('Ada');
  });

  it('applies the preferred position for an unassigned player', () => {
    const squad = makeSquad({
      formationId: '433',
      players: [makePlayer({ id: 'p1', role: 'DEF' })],
    });
    const next = applyPreferredPosition(
      updatePlayer(squad, 'p1', { position: 'RW' }),
      'p1'
    );
    expect(next.assignments['433-3-8']).toEqual(['p1']);
  });

  it('does not move an already-assigned player to a new preferred position', () => {
    const squad = makeSquad({
      formationId: '433',
      players: [makePlayer({ id: 'p1', role: 'DEF' })],
      assignments: { '433-1-1': ['p1'] },
    });
    const next = applyPreferredPosition(
      updatePlayer(squad, 'p1', { position: 'RW' }),
      'p1'
    );
    expect(next.assignments['433-1-1']).toEqual(['p1']);
    expect(next.assignments['433-3-8']).toBeUndefined();
  });

  it('ignores an unassigned player without a preferred position', () => {
    const squad = makeSquad({ players: [makePlayer({ id: 'p1' })] });
    expect(applyPreferredPosition(squad, 'p1')).toBe(squad);
  });

  it('removes a player and their assignments', () => {
    const squad = makeSquad({
      players: [makePlayer(), makePlayer({ id: 'p2', name: 'Bob' })],
      assignments: { '442-0-0': ['p1'] },
    });
    const next = removePlayer(squad, 'p1');
    expect(next.players.map((p) => p.id)).toEqual(['p2']);
    expect(next.assignments).toEqual({});
  });

  it('assigns a player to a slot and stays idempotent', () => {
    const squad = makeSquad({ players: [makePlayer()] });
    const once = assignPlayer(squad, 's', 'p1');
    expect(once.assignments.s).toEqual(['p1']);
    expect(assignPlayer(once, 's', 'p1')).toBe(once);
  });

  it('unassigns a player and drops the empty slot key', () => {
    const squad = makeSquad({
      players: [makePlayer(), makePlayer({ id: 'p2', name: 'Bob' })],
      assignments: { s: ['p1', 'p2'] },
    });
    const next = unassignPlayer(squad, 's', 'p1');
    expect(next.assignments.s).toEqual(['p2']);
    const last = unassignPlayer(next, 's', 'p2');
    expect(last.assignments.s).toBeUndefined();
  });

  it('toggles assignment on and off', () => {
    const squad = makeSquad({ players: [makePlayer()] });
    const on = toggleAssignment(squad, 's', 'p1');
    expect(on.assignments.s).toEqual(['p1']);
    const off = toggleAssignment(on, 's', 'p1');
    expect(off.assignments.s).toBeUndefined();
  });

  it('clears a single slot and resets all assignments', () => {
    const squad = makeSquad({ assignments: { a: ['p1'], b: ['p2'] } });
    expect(clearSlot(squad, 'a').assignments).toEqual({ b: ['p2'] });
    expect(resetAssignments(squad).assignments).toEqual({});
  });

  it('swaps players between two slots', () => {
    const squad = makeSquad({
      players: [makePlayer(), makePlayer({ id: 'p2', name: 'Bob' })],
      assignments: { a: ['p1'], b: ['p2'] },
    });
    const next = swapSlotPlayers(squad, 'a', 'b');
    expect(next.assignments.a).toEqual(['p2']);
    expect(next.assignments.b).toEqual(['p1']);
  });

  it('moves players when the target slot is empty', () => {
    const squad = makeSquad({
      players: [makePlayer()],
      assignments: { a: ['p1'] },
    });
    const next = swapSlotPlayers(squad, 'a', 'b');
    expect(next.assignments.a).toBeUndefined();
    expect(next.assignments.b).toEqual(['p1']);
  });

  it('moves a source slot without players into an empty target', () => {
    const squad = makeSquad({ assignments: { b: ['p2'] } });
    const next = swapSlotPlayers(squad, 'a', 'b');
    expect(next.assignments.a).toEqual(['p2']);
    expect(next.assignments.b).toBeUndefined();
  });

  it('ignores swapping a slot with itself', () => {
    const squad = makeSquad({ assignments: { a: ['p1'] } });
    expect(swapSlotPlayers(squad, 'a', 'a')).toBe(squad);
  });

  it('resolves slot players from ids and skips unknown ids', () => {
    const squad = makeSquad({
      players: [makePlayer()],
      assignments: { s: ['p1', 'missing'] },
    });
    expect(slotPlayers(squad, 's').map((p) => p.id)).toEqual(['p1']);
  });

  it('reports unassigned players', () => {
    const squad = makeSquad({
      players: [makePlayer(), makePlayer({ id: 'p2', name: 'Bob' })],
      assignments: { s: ['p1'] },
    });
    expect(unassignedPlayers(squad).map((p) => p.id)).toEqual(['p2']);
  });

  it('lists bench players', () => {
    const squad = makeSquad({
      players: [
        makePlayer({ id: 'p1' }),
        makePlayer({ id: 'p2', name: 'Bob', bench: true }),
      ],
    });
    expect(benchPlayers(squad).map((p) => p.id)).toEqual(['p2']);
  });

  it('marks a player as benched and clears their assignments', () => {
    const squad = makeSquad({
      players: [
        makePlayer(),
        makePlayer({ id: 'p2', name: 'Bob', bench: true }),
      ],
      assignments: { s: ['p1'] },
    });
    const next = markBench(squad, 'p1');
    expect(next.players[0].bench).toBe(true);
    expect(next.players[1].bench).toBe(true);
    expect(next.assignments).toEqual({});
  });

  it('ignores marking an already-benched player', () => {
    const squad = makeSquad({
      players: [makePlayer({ bench: true })],
    });
    expect(markBench(squad, 'p1')).toBe(squad);
  });

  it('marks a benched player as a starter and auto-assigns them', () => {
    const squad = makeSquad({
      players: [
        makePlayer({ id: 'p0', name: 'Cid', role: 'DEF', bench: true }),
        makePlayer({ role: 'GK', bench: true }),
      ],
    });
    const next = markStarter(squad, 'p1');
    expect(next.players.find((p) => p.id === 'p1')?.bench).toBe(false);
    expect(next.players.find((p) => p.id === 'p0')?.bench).toBe(true);
    expect(next.assignments['442-0-0']).toEqual(['p1']);
  });

  it('ignores marking a starter as a starter', () => {
    const squad = makeSquad({ players: [makePlayer()] });
    expect(markStarter(squad, 'p1')).toBe(squad);
  });

  it('toggles a player between the pitch and the bench', () => {
    const squad = makeSquad({ players: [makePlayer()] });
    expect(toggleBench(squad, 'p1').players[0].bench).toBe(true);
    const benched = toggleBench(squad, 'p1');
    expect(toggleBench(benched, 'p1').players[0].bench).toBe(false);
  });

  it('ignores toggling an unknown player', () => {
    const squad = makeSquad();
    expect(toggleBench(squad, 'missing')).toBe(squad);
  });

  it('does not auto-assign a benched player', () => {
    const squad = makeSquad({
      players: [makePlayer({ bench: true })],
    });
    expect(autoAssignPlayer(squad, squad.players[0]).assignments).toEqual({});
  });

  it('clears the bench flag when a player is assigned to a slot', () => {
    const squad = makeSquad({ players: [makePlayer({ bench: true })] });
    const next = assignPlayer(squad, 's', 'p1');
    expect(next.players[0].bench).toBe(false);
  });

  it('does not apply a preferred position for a benched player', () => {
    const squad = makeSquad({
      formationId: '433',
      players: [makePlayer({ role: 'DEF', bench: true })],
    });
    const next = applyPreferredPosition(
      updatePlayer(squad, 'p1', { position: 'RW' }),
      'p1'
    );
    expect(next.assignments).toEqual({});
  });

  it('substitutes a bench player into a slot and benches the outgoing player', () => {
    const squad = makeSquad({
      players: [
        makePlayer({ id: 'p1', name: 'Ada' }),
        makePlayer({ id: 'p2', name: 'Bob', bench: true }),
      ],
      assignments: { s: ['p1'] },
    });
    const next = substitutePlayer(squad, 's', 'p2');
    expect(next.assignments.s).toEqual(['p2']);
    expect(next.players.find((p) => p.id === 'p1')?.bench).toBe(true);
    expect(next.players.find((p) => p.id === 'p2')?.bench).toBe(false);
  });

  it('ignores substituting a player who is not on the bench', () => {
    const squad = makeSquad({ players: [makePlayer()] });
    expect(substitutePlayer(squad, 's', 'p1')).toBe(squad);
  });

  it('substitutes into an empty slot with no outgoing players', () => {
    const squad = makeSquad({
      players: [makePlayer({ id: 'p2', name: 'Bob', bench: true })],
    });
    const next = substitutePlayer(squad, 's', 'p2');
    expect(next.assignments.s).toEqual(['p2']);
    expect(next.players[0].bench).toBe(false);
  });

  it('saves and loads a squad from storage', () => {
    const squad = makeSquad({ players: [makePlayer()] });
    saveSquad(squad);
    expect(loadSquad()).toEqual(squad);
  });

  it('returns null when nothing is stored or storage is corrupt', () => {
    expect(loadSquad()).toBeNull();
    window.localStorage.setItem(STORAGE_KEY, '{not json');
    expect(loadSquad()).toBeNull();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ nope: true }));
    expect(loadSquad()).toBeNull();
  });

  it('falls back to the default formation when stored formation is unknown', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(makeSquad({ formationId: '0-0-0' }))
    );
    expect(loadSquad()?.formationId).toBe('442');
  });

  it('creates a squad on load or defaults', () => {
    expect(loadOrCreateSquad().formationId).toBe('442');
    saveSquad(makeSquad({ name: 'Stored' }));
    expect(loadOrCreateSquad().name).toBe('Stored');
  });

  it('tolerates storage failures on save and load', () => {
    const setItem = jest
      .spyOn(window.localStorage, 'setItem')
      .mockImplementation(() => {
        throw new Error('quota');
      });
    const getItem = jest
      .spyOn(window.localStorage, 'getItem')
      .mockImplementation(() => {
        throw new Error('denied');
      });
    expect(() => saveSquad(makeSquad())).not.toThrow();
    expect(loadSquad()).toBeNull();
    setItem.mockRestore();
    getItem.mockRestore();
  });

  it('saves and loads a squad library', () => {
    const library = {
      activeId: 's1',
      squads: [makeSquad(), makeSquad({ id: 's2', name: 'Second' })],
    };
    saveSquadLibrary(library);
    expect(loadSquadLibrary()).toEqual(library);
  });

  it('returns null when the library is missing or corrupt', () => {
    expect(loadSquadLibrary()).toBeNull();
    window.localStorage.setItem(LIBRARY_KEY, '{not json');
    expect(loadSquadLibrary()).toBeNull();
    window.localStorage.setItem(LIBRARY_KEY, JSON.stringify({ nope: true }));
    expect(loadSquadLibrary()).toBeNull();
  });

  it('migrates a legacy single-squad value into a library', () => {
    const legacy = {
      name: 'Legacy',
      formationId: '442',
      players: [],
      assignments: {},
    } as unknown as Squad;
    saveSquad(legacy);
    const library = loadOrCreateSquadLibrary();
    expect(library.squads).toHaveLength(1);
    expect(library.squads[0].name).toBe('Legacy');
    expect(library.squads[0].id).toEqual(expect.any(String));
  });

  it('keeps the stored library over a legacy value', () => {
    saveSquadLibrary({
      activeId: 's2',
      squads: [makeSquad({ id: 's2', name: 'Newer' })],
    });
    saveSquad(makeSquad({ name: 'Legacy' }));
    expect(loadOrCreateSquadLibrary().squads[0].name).toBe('Newer');
  });

  it('creates a fresh library with one empty squad when nothing is stored', () => {
    const library = loadOrCreateSquadLibrary();
    expect(library.squads).toHaveLength(1);
    expect(library.squads[0].players).toEqual([]);
    expect(library.activeId).toBe(library.squads[0].id);
  });

  it('falls back to the default formation for stored library squads', () => {
    saveSquadLibrary({
      activeId: 's1',
      squads: [makeSquad({ id: 's1', formationId: '0-0-0' })],
    });
    expect(loadSquadLibrary()?.squads[0].formationId).toBe('442');
  });

  it('sets a captain and clears it from other players', () => {
    const squad = makeSquad({
      players: [
        makePlayer({ id: 'p1' }),
        makePlayer({ id: 'p2', captain: true }),
      ],
    });
    const next = toggleLeadership(squad, 'p1', 'captain');
    expect(next.players[0].captain).toBe(true);
    expect(next.players[1].captain).toBe(false);
  });

  it('sets a vice-captain and clears it from other players', () => {
    const squad = makeSquad({
      players: [
        makePlayer({ id: 'p1', viceCaptain: true }),
        makePlayer({ id: 'p2' }),
      ],
    });
    const next = toggleLeadership(squad, 'p2', 'vice');
    expect(next.players[0].viceCaptain).toBe(false);
    expect(next.players[1].viceCaptain).toBe(true);
  });

  it('clears leadership when the same role is toggled again', () => {
    const squad = makeSquad({
      players: [makePlayer({ id: 'p1', captain: true })],
    });
    expect(toggleLeadership(squad, 'p1', 'captain').players[0].captain).toBe(
      false
    );
  });

  it('clears the other leadership role when switching roles', () => {
    const squad = makeSquad({
      players: [makePlayer({ id: 'p1', viceCaptain: true })],
    });
    const next = toggleLeadership(squad, 'p1', 'captain');
    expect(next.players[0].captain).toBe(true);
    expect(next.players[0].viceCaptain).toBe(false);
  });

  it('ignores leadership changes for a missing player', () => {
    const squad = makeSquad({
      players: [makePlayer({ id: 'p1' })],
    });
    expect(toggleLeadership(squad, 'missing', 'captain')).toBe(squad);
  });

  it('clears captain and vice-captain flags together', () => {
    const squad = makeSquad({
      players: [makePlayer({ id: 'p1', captain: true, viceCaptain: true })],
    });
    const next = toggleLeadership(squad, 'p1', 'captain');
    expect(next.players[0].captain).toBe(false);
    expect(next.players[0].viceCaptain).toBe(false);
  });

  it('updates player notes through updatePlayer', () => {
    const squad = makeSquad({ players: [makePlayer({ id: 'p1' })] });
    const next = updatePlayer(squad, 'p1', { notes: 'Fit for Sunday' });
    expect(next.players[0].notes).toBe('Fit for Sunday');
  });
});

import {
  CaptainRole,
  Player,
  PlayerRole,
  Squad,
  SquadLibrary,
} from '@/types/football';
import { defaultFormationFor, findFormation } from '@/lib/formations';
import { slotRole } from '@/lib/pitch';

const STORAGE_KEY = 'football:squad:v1';
const LIBRARY_KEY = 'football:squad-library:v1';

export const DEFAULT_PRIMARY_COLOR = '#dc2626';

export const uid = (): string => Math.random().toString(36).slice(2, 10);

export const newPlayer = (
  name: string,
  number: number,
  role: PlayerRole,
  position?: string
): Player => ({ id: uid(), name, number, role, position });

export const samplePlayers = (): Player[] => [
  newPlayer('Alisson', 1, 'GK'),
  newPlayer('Trent', 2, 'DEF'),
  newPlayer('Virgil', 4, 'DEF'),
  newPlayer('Ibrahima', 5, 'DEF'),
  newPlayer('Andy', 26, 'DEF'),
  newPlayer('Mohamed', 11, 'FWD'),
  newPlayer('Dominik', 10, 'MID'),
  newPlayer('Alexis', 8, 'MID'),
  newPlayer('Luis', 7, 'FWD'),
  newPlayer('Darwin', 9, 'FWD'),
  newPlayer('Cody', 18, 'FWD'),
];

export const defaultSquad = (): Squad => ({
  id: uid(),
  name: 'My Squad',
  formationId: defaultFormationFor(11).id,
  players: [],
  assignments: {},
  presets: [],
  lineups: [],
  mirrored: false,
  primaryColor: DEFAULT_PRIMARY_COLOR,
});

export const withFormation = (squad: Squad): Squad => {
  const defaults: Squad = {
    ...squad,
    presets: squad.presets ?? [],
    lineups: squad.lineups ?? [],
    mirrored: squad.mirrored ?? false,
    primaryColor: squad.primaryColor ?? DEFAULT_PRIMARY_COLOR,
  };
  const formation = findFormation(squad.formationId);
  if (!formation) {
    return {
      ...defaults,
      formationId: defaultFormationFor(11).id,
      assignments: {},
    };
  }
  return defaults;
};

export const addPlayer = (
  squad: Squad,
  name: string,
  number: number,
  role: PlayerRole,
  position?: string
): Squad => {
  if (name.trim() === '') return squad;
  const player = newPlayer(name.trim(), number, role, position);
  return autoAssignPlayer(
    { ...squad, players: [...squad.players, player] },
    player
  );
};

export const autoAssignPlayer = (squad: Squad, player: Player): Squad => {
  if (player.bench === true) return squad;
  const formation = findFormation(squad.formationId);
  if (!formation) return squad;
  const free = (id: string): boolean =>
    (squad.assignments[id] ?? []).length === 0;
  if (player.position) {
    const preferred = formation.slots.find(
      (slot) => slot.label === player.position && free(slot.id)
    );
    if (preferred) return assignPlayer(squad, preferred.id, player.id);
  }
  const slot = formation.slots.find(
    (item) => slotRole(item.label) === player.role && free(item.id)
  );
  if (!slot) return squad;
  return assignPlayer(squad, slot.id, player.id);
};

export const findDuplicateNumbers = (players: Player[]): number[] => {
  const counts = new Map<number, number>();
  for (const player of players) {
    counts.set(player.number, (counts.get(player.number) ?? 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([number]) => number)
    .sort((a, b) => a - b);
};

export const replacePlayers = (squad: Squad, players: Player[]): Squad => {
  let next: Squad = { ...squad, players, assignments: {} };
  for (const player of players) {
    next = autoAssignPlayer(next, player);
  }
  return next;
};

export const updatePlayer = (
  squad: Squad,
  playerId: string,
  patch: Partial<
    Pick<Player, 'name' | 'number' | 'role' | 'position' | 'notes'>
  >
): Squad => ({
  ...squad,
  players: squad.players.map((player) =>
    player.id === playerId ? { ...player, ...patch } : player
  ),
});

export const applyPreferredPosition = (
  squad: Squad,
  playerId: string
): Squad => {
  const player = squad.players.find((item) => item.id === playerId);
  if (!player || !player.position || player.bench === true) return squad;
  const assigned = Object.values(squad.assignments).some((ids) =>
    ids.includes(playerId)
  );
  if (assigned) return squad;
  return autoAssignPlayer(squad, player);
};

export const removePlayer = (squad: Squad, playerId: string): Squad => {
  const assignments: Record<string, string[]> = {};
  for (const [slotId, ids] of Object.entries(squad.assignments)) {
    const next = ids.filter((id) => id !== playerId);
    if (next.length > 0) assignments[slotId] = next;
  }
  return {
    ...squad,
    players: squad.players.filter((player) => player.id !== playerId),
    assignments,
  };
};

export const assignPlayer = (
  squad: Squad,
  slotId: string,
  playerId: string
): Squad => {
  const current = squad.assignments[slotId] ?? [];
  if (current.includes(playerId)) return squad;
  return {
    ...squad,
    players: squad.players.map((player) =>
      player.id === playerId ? { ...player, bench: false } : player
    ),
    assignments: { ...squad.assignments, [slotId]: [...current, playerId] },
  };
};

export const unassignPlayer = (
  squad: Squad,
  slotId: string,
  playerId: string
): Squad => {
  const current = squad.assignments[slotId] ?? [];
  const next = current.filter((id) => id !== playerId);
  return {
    ...squad,
    assignments:
      next.length === 0
        ? withoutKey(squad.assignments, slotId)
        : { ...squad.assignments, [slotId]: next },
  };
};

export const toggleAssignment = (
  squad: Squad,
  slotId: string,
  playerId: string
): Squad => {
  const current = squad.assignments[slotId] ?? [];
  return current.includes(playerId)
    ? unassignPlayer(squad, slotId, playerId)
    : assignPlayer(squad, slotId, playerId);
};

export const clearSlot = (squad: Squad, slotId: string): Squad => ({
  ...squad,
  assignments: withoutKey(squad.assignments, slotId),
});

export const swapSlotPlayers = (
  squad: Squad,
  fromSlotId: string,
  toSlotId: string
): Squad => {
  if (fromSlotId === toSlotId) return squad;
  const from = squad.assignments[fromSlotId] ?? [];
  const to = squad.assignments[toSlotId] ?? [];
  const assignments = { ...squad.assignments };
  if (to.length === 0) {
    delete assignments[fromSlotId];
  } else {
    assignments[fromSlotId] = to;
  }
  if (from.length === 0) {
    delete assignments[toSlotId];
  } else {
    assignments[toSlotId] = from;
  }
  return { ...squad, assignments };
};

export const resetAssignments = (squad: Squad): Squad => ({
  ...squad,
  assignments: {},
});

export const slotPlayers = (squad: Squad, slotId: string): Player[] =>
  (squad.assignments[slotId] ?? [])
    .map((id) => squad.players.find((player) => player.id === id))
    .filter((player): player is Player => player !== undefined);

export const unassignedPlayers = (squad: Squad): Player[] =>
  squad.players.filter(
    (player) =>
      !Object.values(squad.assignments).some((ids) => ids.includes(player.id))
  );

export const benchPlayers = (squad: Squad): Player[] =>
  squad.players.filter((player) => player.bench === true);

export const starterPlayers = (squad: Squad): Player[] =>
  squad.players.filter((player) => player.bench !== true);

export const setPrimaryColor = (squad: Squad, color: string): Squad => ({
  ...squad,
  primaryColor: color,
});

export const markBench = (squad: Squad, playerId: string): Squad => {
  const player = squad.players.find((item) => item.id === playerId);
  if (!player || player.bench === true) return squad;
  const assignments: Record<string, string[]> = {};
  for (const [slotId, ids] of Object.entries(squad.assignments)) {
    const next = ids.filter((id) => id !== playerId);
    if (next.length > 0) assignments[slotId] = next;
  }
  return {
    ...squad,
    players: squad.players.map((item) =>
      item.id === playerId ? { ...item, bench: true } : item
    ),
    assignments,
  };
};

export const markStarter = (squad: Squad, playerId: string): Squad => {
  const player = squad.players.find((item) => item.id === playerId);
  if (!player || player.bench !== true) return squad;
  return autoAssignPlayer(
    {
      ...squad,
      players: squad.players.map((item) =>
        item.id === playerId ? { ...item, bench: false } : item
      ),
    },
    { ...player, bench: false }
  );
};

export const toggleBench = (squad: Squad, playerId: string): Squad => {
  const player = squad.players.find((item) => item.id === playerId);
  if (!player) return squad;
  return player.bench === true
    ? markStarter(squad, playerId)
    : markBench(squad, playerId);
};

export const substitutePlayer = (
  squad: Squad,
  slotId: string,
  benchPlayerId: string
): Squad => {
  const benchPlayer = squad.players.find((item) => item.id === benchPlayerId);
  if (!benchPlayer || benchPlayer.bench !== true) return squad;
  const outgoing = squad.assignments[slotId] ?? [];
  const outgoingIds = new Set(outgoing);
  const players = squad.players.map((item) => {
    if (item.id === benchPlayerId) return { ...item, bench: false };
    if (outgoingIds.has(item.id)) return { ...item, bench: true };
    return item;
  });
  return {
    ...squad,
    players,
    assignments: {
      ...squad.assignments,
      [slotId]: [benchPlayerId],
    },
  };
};

export const setLeadership = (
  squad: Squad,
  playerId: string,
  role: CaptainRole
): Squad => {
  const player = squad.players.find((item) => item.id === playerId);
  if (!player) return squad;
  const players = squad.players.map((item) => {
    if (item.id === playerId) {
      return {
        ...item,
        captain: role === 'captain',
        viceCaptain: role === 'vice',
      };
    }
    return role === 'captain'
      ? { ...item, captain: false }
      : { ...item, viceCaptain: false };
  });
  return { ...squad, players };
};

export const clearLeadership = (squad: Squad, playerId: string): Squad => {
  const player = squad.players.find((item) => item.id === playerId);
  if (!player) return squad;
  return {
    ...squad,
    players: squad.players.map((item) =>
      item.id === playerId
        ? { ...item, captain: false, viceCaptain: false }
        : item
    ),
  };
};

export const toggleLeadership = (
  squad: Squad,
  playerId: string,
  role: CaptainRole
): Squad => {
  const player = squad.players.find((item) => item.id === playerId);
  if (!player) return squad;
  const active = role === 'captain' ? player.captain : player.viceCaptain;
  return active === true
    ? clearLeadership(squad, playerId)
    : setLeadership(squad, playerId, role);
};

export const saveSquad = (squad: Squad): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(squad));
  } catch {
    // storage unavailable — ignore
  }
};

export const loadSquad = (): Squad | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isSquad(parsed)) return null;
    return withFormation(parsed);
  } catch {
    return null;
  }
};

export const loadOrCreateSquad = (): Squad => loadSquad() ?? defaultSquad();

export const saveSquadLibrary = (library: SquadLibrary): void => {
  try {
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
  } catch {
    // storage unavailable — ignore
  }
};

export const loadSquadLibrary = (): SquadLibrary | null => {
  try {
    const raw = localStorage.getItem(LIBRARY_KEY);
    if (raw === null) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isSquadLibrary(parsed)) return null;
    return {
      activeId: parsed.activeId,
      squads: parsed.squads.map(withFormation),
    };
  } catch {
    return null;
  }
};

export const loadOrCreateSquadLibrary = (): SquadLibrary => {
  const existing = loadSquadLibrary();
  if (existing !== null && existing.squads.length > 0) return existing;
  const legacy = loadSquad();
  if (legacy !== null) {
    const migrated: Squad = {
      ...legacy,
      id: legacy.id ?? uid(),
      name: legacy.name ?? 'My Squad',
    };
    const library: SquadLibrary = { activeId: migrated.id, squads: [migrated] };
    saveSquadLibrary(library);
    return library;
  }
  const fresh = defaultSquad();
  return { activeId: fresh.id, squads: [fresh] };
};

const withoutKey = (
  record: Record<string, string[]>,
  key: string
): Record<string, string[]> => {
  const next = { ...record };
  delete next[key];
  return next;
};

export const isSquad = (value: unknown): value is Squad => {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Partial<Squad>;
  return (
    typeof candidate.formationId === 'string' &&
    Array.isArray(candidate.players) &&
    typeof candidate.assignments === 'object' &&
    candidate.assignments !== null &&
    !Array.isArray(candidate.assignments)
  );
};

export const isSquadLibrary = (value: unknown): value is SquadLibrary => {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Partial<SquadLibrary>;
  return (
    typeof candidate.activeId === 'string' &&
    Array.isArray(candidate.squads) &&
    candidate.squads.every(isSquad)
  );
};

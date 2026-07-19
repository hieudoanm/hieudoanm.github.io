import { Squad, SquadLibrary } from '@/types/football';
import { defaultSquad, uid } from '@/lib/squad';

export const createSquad = (name: string): Squad => ({
  ...defaultSquad(),
  id: uid(),
  name: name.trim() === '' ? 'My Squad' : name.trim(),
});

export const addSquadToLibrary = (
  library: SquadLibrary,
  name: string
): SquadLibrary => {
  const squad = createSquad(name);
  return { activeId: squad.id, squads: [...library.squads, squad] };
};

export const duplicateSquad = (
  library: SquadLibrary,
  id: string
): SquadLibrary => {
  const squad = library.squads.find((item) => item.id === id);
  if (!squad) return library;
  const players = squad.players.map((player) => ({ ...player, id: uid() }));
  const idMap = new Map(
    squad.players.map((player, index) => [player.id, players[index].id])
  );
  const assignments: Record<string, string[]> = {};
  for (const [slotId, playerIds] of Object.entries(squad.assignments)) {
    assignments[slotId] = playerIds
      .map((playerId) => idMap.get(playerId))
      .filter((playerId): playerId is string => playerId !== undefined);
  }
  const lineups = squad.lineups.map((lineup) => {
    const lineupAssignments: Record<string, string[]> = {};
    for (const [slotId, playerIds] of Object.entries(lineup.assignments)) {
      lineupAssignments[slotId] = playerIds
        .map((playerId) => idMap.get(playerId))
        .filter((playerId): playerId is string => playerId !== undefined);
    }
    return { ...lineup, assignments: lineupAssignments };
  });
  const copy: Squad = {
    ...squad,
    id: uid(),
    name: `${squad.name} (Copy)`,
    players,
    assignments,
    lineups,
  };
  const index = library.squads.findIndex((item) => item.id === id);
  const squads = [...library.squads];
  squads.splice(index + 1, 0, copy);
  return { ...library, activeId: copy.id, squads };
};

export const renameSquad = (
  squads: Squad[],
  id: string,
  name: string
): Squad[] =>
  squads.map((squad) =>
    squad.id === id
      ? { ...squad, name: name.trim() === '' ? squad.name : name.trim() }
      : squad
  );

export const removeSquadFromLibrary = (
  library: SquadLibrary,
  id: string
): SquadLibrary | null => {
  const squads = library.squads.filter((squad) => squad.id !== id);
  if (squads.length === 0) return null;
  const activeId = library.activeId === id ? squads[0].id : library.activeId;
  return { activeId, squads };
};

export const setActiveSquad = (
  library: SquadLibrary,
  id: string
): SquadLibrary => ({ ...library, activeId: id });

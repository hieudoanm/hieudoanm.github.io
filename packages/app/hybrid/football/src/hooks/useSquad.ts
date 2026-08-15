'use client';

import { Formation, FormationSize } from '@/types/football';
import { PlayerRole } from '@/types/football';
import { EXAMPLE_SQUADS, loadExampleSquad } from '@/lib/examples';
import { ExampleSquadMeta } from '@/lib/examples';
import { defaultFormationFor, findFormation } from '@/lib/formations';
import {
  addPlayer,
  applyPreferredPosition,
  clearSlot,
  defaultSquad,
  loadOrCreateSquadLibrary,
  removePlayer,
  replacePlayers,
  resetAssignments,
  saveSquadLibrary,
  substitutePlayer,
  swapSlotPlayers,
  toggleAssignment,
  toggleBench,
  toggleLeadership,
  updatePlayer,
} from '@/lib/squad';
import {
  addSquadToLibrary,
  duplicateSquad,
  removeSquadFromLibrary,
  renameSquad,
  setActiveSquad,
} from '@/lib/library';
import {
  CaptainRole,
  ExampleStatus,
  Player,
  Squad,
  SquadLibrary,
} from '@/types/football';
import { squadFromUrl } from '@/lib/share';
import { useCallback, useEffect, useState } from 'react';

const updateActiveSquad = (
  library: SquadLibrary,
  update: (squad: Squad) => Squad
): SquadLibrary => ({
  ...library,
  squads: library.squads.map((squad) =>
    squad.id === library.activeId ? update(squad) : squad
  ),
});

export interface SquadController {
  library: SquadLibrary;
  squad: Squad;
  formation: Formation;
  selectedSlotId: string | null;
  exampleStatus: ExampleStatus;
  examples: ExampleSquadMeta[];
  exampleId: string;
  selectSlot: (slotId: string | null) => void;
  selectFormation: (formationId: string) => void;
  selectSize: (size: FormationSize) => void;
  selectExample: (exampleId: string) => void;
  setActiveSquad: (id: string) => void;
  addSquad: (name: string) => void;
  renameSquad: (id: string, name: string) => void;
  duplicateSquad: (id: string) => void;
  removeSquad: (id: string) => void;
  addPlayer: (
    name: string,
    number: number,
    role: PlayerRole,
    position?: string
  ) => void;
  updatePlayer: (playerId: string, patch: Partial<Player>) => void;
  removePlayer: (playerId: string) => void;
  replacePlayers: (players: Player[]) => void;
  toggleAssignment: (slotId: string, playerId: string) => void;
  toggleBench: (playerId: string) => void;
  toggleLeadership: (playerId: string, role: CaptainRole) => void;
  substitutePlayer: (slotId: string, benchPlayerId: string) => void;
  swapSlots: (fromSlotId: string, toSlotId: string) => void;
  clearSlot: (slotId: string) => void;
  resetAssignments: () => void;
  replaceSquad: (squad: Squad) => void;
  loadExample: () => Promise<void>;
}

export const useSquad = (): SquadController => {
  const [library, setLibrary] = useState<SquadLibrary>(() =>
    loadOrCreateSquadLibrary()
  );
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [exampleStatus, setExampleStatus] = useState<ExampleStatus>('idle');
  const [exampleId, setExampleId] = useState<string>(EXAMPLE_SQUADS[0].id);

  useEffect(() => {
    saveSquadLibrary(library);
  }, [library]);

  useEffect(() => {
    const shared = squadFromUrl(window.location.search);
    if (shared) {
      setLibrary((current) =>
        updateActiveSquad(current, () => ({
          ...shared,
          id: current.activeId,
          name:
            current.squads.find((item) => item.id === current.activeId)?.name ??
            shared.name,
        }))
      );
      setSelectedSlotId(null);
    }
  }, []);

  const squad =
    library.squads.find((item) => item.id === library.activeId) ??
    library.squads[0] ??
    defaultSquad();

  const selectSlot = useCallback((slotId: string | null) => {
    setSelectedSlotId(slotId);
  }, []);

  const selectFormation = useCallback((formationId: string) => {
    setLibrary((current) =>
      updateActiveSquad(current, (active) => ({
        ...active,
        formationId,
        assignments: {},
      }))
    );
    setSelectedSlotId(null);
  }, []);

  const selectSize = useCallback((size: FormationSize) => {
    setLibrary((current) =>
      updateActiveSquad(current, (active) => ({
        ...active,
        formationId: defaultFormationFor(size).id,
        assignments: {},
      }))
    );
    setSelectedSlotId(null);
  }, []);

  const addPlayerHandler = useCallback(
    (name: string, number: number, role: PlayerRole, position?: string) => {
      setLibrary((current) =>
        updateActiveSquad(current, (active) =>
          addPlayer(active, name, number, role, position)
        )
      );
    },
    []
  );

  const updatePlayerHandler = useCallback(
    (playerId: string, patch: Partial<Player>) => {
      setLibrary((current) =>
        updateActiveSquad(current, (active) =>
          applyPreferredPosition(
            updatePlayer(active, playerId, patch),
            playerId
          )
        )
      );
    },
    []
  );

  const removePlayerHandler = useCallback((playerId: string) => {
    setLibrary((current) =>
      updateActiveSquad(current, (active) => removePlayer(active, playerId))
    );
  }, []);

  const replacePlayersHandler = useCallback((players: Player[]) => {
    setLibrary((current) =>
      updateActiveSquad(current, (active) => replacePlayers(active, players))
    );
    setSelectedSlotId(null);
  }, []);

  const toggleAssignmentHandler = useCallback(
    (slotId: string, playerId: string) => {
      setLibrary((current) =>
        updateActiveSquad(current, (active) =>
          toggleAssignment(active, slotId, playerId)
        )
      );
    },
    []
  );

  const clearSlotHandler = useCallback((slotId: string) => {
    setLibrary((current) =>
      updateActiveSquad(current, (active) => clearSlot(active, slotId))
    );
  }, []);

  const swapSlotsHandler = useCallback(
    (fromSlotId: string, toSlotId: string) => {
      setLibrary((current) =>
        updateActiveSquad(current, (active) =>
          swapSlotPlayers(active, fromSlotId, toSlotId)
        )
      );
    },
    []
  );

  const replaceSquadHandler = useCallback((incoming: Squad) => {
    setLibrary((current) =>
      updateActiveSquad(current, () => ({
        ...incoming,
        id: current.activeId,
        name:
          current.squads.find((item) => item.id === current.activeId)?.name ??
          incoming.name,
      }))
    );
    setSelectedSlotId(null);
  }, []);

  const resetAssignmentsHandler = useCallback(() => {
    setLibrary((current) =>
      updateActiveSquad(current, (active) => resetAssignments(active))
    );
  }, []);

  const selectExample = useCallback((id: string) => {
    setExampleId(id);
    setExampleStatus('idle');
  }, []);

  const loadExample = useCallback(async () => {
    setExampleStatus('loading');
    const example = await loadExampleSquad(exampleId);
    if (example) {
      setLibrary((current) =>
        updateActiveSquad(current, () => ({
          ...example,
          id: current.activeId,
          name:
            current.squads.find((item) => item.id === current.activeId)?.name ??
            example.name,
        }))
      );
      setSelectedSlotId(null);
      setExampleStatus('ready');
    } else {
      setExampleStatus('error');
    }
  }, [exampleId]);

  const setActiveSquadHandler = useCallback((id: string) => {
    setLibrary((current) => setActiveSquad(current, id));
    setSelectedSlotId(null);
  }, []);

  const addSquadHandler = useCallback((name: string) => {
    setLibrary((current) => addSquadToLibrary(current, name));
    setSelectedSlotId(null);
  }, []);

  const renameSquadHandler = useCallback((id: string, name: string) => {
    setLibrary((current) => ({
      ...current,
      squads: renameSquad(current.squads, id, name),
    }));
  }, []);

  const duplicateSquadHandler = useCallback((id: string) => {
    setLibrary((current) => duplicateSquad(current, id));
    setSelectedSlotId(null);
  }, []);

  const removeSquadHandler = useCallback((id: string) => {
    setLibrary((current) => removeSquadFromLibrary(current, id) ?? current);
    setSelectedSlotId(null);
  }, []);

  const toggleBenchHandler = useCallback((playerId: string) => {
    setLibrary((current) =>
      updateActiveSquad(current, (active) => toggleBench(active, playerId))
    );
  }, []);

  const toggleLeadershipHandler = useCallback(
    (playerId: string, role: CaptainRole) => {
      setLibrary((current) =>
        updateActiveSquad(current, (active) =>
          toggleLeadership(active, playerId, role)
        )
      );
    },
    []
  );

  const substitutePlayerHandler = useCallback(
    (slotId: string, benchPlayerId: string) => {
      setLibrary((current) =>
        updateActiveSquad(current, (active) =>
          substitutePlayer(active, slotId, benchPlayerId)
        )
      );
    },
    []
  );

  const formation = findFormation(squad.formationId) ?? defaultFormationFor(11);

  return {
    library,
    squad,
    formation,
    selectedSlotId,
    exampleStatus,
    examples: EXAMPLE_SQUADS,
    exampleId,
    selectSlot,
    selectFormation,
    selectSize,
    selectExample,
    setActiveSquad: setActiveSquadHandler,
    addSquad: addSquadHandler,
    renameSquad: renameSquadHandler,
    duplicateSquad: duplicateSquadHandler,
    removeSquad: removeSquadHandler,
    addPlayer: addPlayerHandler,
    updatePlayer: updatePlayerHandler,
    removePlayer: removePlayerHandler,
    replacePlayers: replacePlayersHandler,
    toggleAssignment: toggleAssignmentHandler,
    toggleBench: toggleBenchHandler,
    toggleLeadership: toggleLeadershipHandler,
    substitutePlayer: substitutePlayerHandler,
    swapSlots: swapSlotsHandler,
    clearSlot: clearSlotHandler,
    resetAssignments: resetAssignmentsHandler,
    replaceSquad: replaceSquadHandler,
    loadExample,
  };
};

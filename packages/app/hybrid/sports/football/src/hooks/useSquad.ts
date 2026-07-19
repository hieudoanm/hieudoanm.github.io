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
  setPrimaryColor,
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
  addFormationPreset,
  applyLineup,
  removeFormationPreset,
  removeLineup,
  renameLineup,
  saveLineup,
  toggleMirrored,
} from '@/lib/planning';
import { shiftLine, ShiftDirection } from '@/lib/tactics';
import {
  CaptainRole,
  ExampleStatus,
  Player,
  Squad,
  SquadLibrary,
} from '@/types/football';
import {
  addShareHistory,
  decodeShare,
  ShareMode,
  squadFromDeepLink,
} from '@/lib/share';
import { isDesktop, onDeepLink, takePendingDeepLinks } from '@/lib/desktop';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  addPreset: (name: string) => void;
  removePreset: (presetId: string) => void;
  saveLineup: (name: string) => void;
  applyLineup: (lineupId: string) => void;
  renameLineup: (lineupId: string, name: string) => void;
  removeLineup: (lineupId: string) => void;
  toggleMirrored: () => void;
  shiftLine: (lineIndex: number, direction: ShiftDirection) => void;
  setPrimaryColor: (color: string) => void;
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

  const applyShared = useCallback(
    (shared: { squad: Squad; mode: ShareMode }, url: string) => {
      setLibrary((current) =>
        updateActiveSquad(current, () => ({
          ...shared.squad,
          id: current.activeId,
          name:
            current.squads.find((item) => item.id === current.activeId)?.name ??
            shared.squad.name,
        }))
      );
      addShareHistory({
        mode: shared.mode,
        name: shared.squad.name,
        url,
      });
      setSelectedSlotId(null);
    },
    []
  );

  useEffect(() => {
    const shared = decodeShare(
      new URLSearchParams(window.location.search).get('squad') ?? ''
    );
    if (shared) {
      applyShared(shared, window.location.href);
    }
  }, [applyShared]);

  useEffect(() => {
    if (!isDesktop()) return;
    const applied = new Set<string>();
    let unlisten: (() => void) | undefined;
    let cancelled = false;
    const handleUrl = (url: string): void => {
      if (applied.has(url)) return;
      applied.add(url);
      const shared = squadFromDeepLink(url);
      if (shared) applyShared(shared, url);
    };
    void onDeepLink(handleUrl).then((stop) => {
      if (cancelled) stop();
      else unlisten = stop;
    });
    void takePendingDeepLinks().then((urls) => {
      for (const url of urls) handleUrl(url);
    });
    return () => {
      cancelled = true;
      unlisten?.();
    };
  }, [applyShared]);

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

  const addPresetHandler = useCallback((name: string) => {
    setLibrary((current) =>
      updateActiveSquad(current, (active) => addFormationPreset(active, name))
    );
  }, []);

  const removePresetHandler = useCallback((presetId: string) => {
    setLibrary((current) =>
      updateActiveSquad(current, (active) =>
        removeFormationPreset(active, presetId)
      )
    );
  }, []);

  const saveLineupHandler = useCallback((name: string) => {
    setLibrary((current) =>
      updateActiveSquad(current, (active) => saveLineup(active, name))
    );
  }, []);

  const applyLineupHandler = useCallback((lineupId: string) => {
    setLibrary((current) =>
      updateActiveSquad(current, (active) => applyLineup(active, lineupId))
    );
    setSelectedSlotId(null);
  }, []);

  const renameLineupHandler = useCallback((lineupId: string, name: string) => {
    setLibrary((current) =>
      updateActiveSquad(current, (active) =>
        renameLineup(active, lineupId, name)
      )
    );
  }, []);

  const removeLineupHandler = useCallback((lineupId: string) => {
    setLibrary((current) =>
      updateActiveSquad(current, (active) => removeLineup(active, lineupId))
    );
  }, []);

  const toggleMirroredHandler = useCallback(() => {
    setLibrary((current) =>
      updateActiveSquad(current, (active) => toggleMirrored(active))
    );
  }, []);

  const shiftLineHandler = useCallback(
    (lineIndex: number, direction: ShiftDirection) => {
      setLibrary((current) =>
        updateActiveSquad(current, (active) => {
          const formation =
            findFormation(active.formationId) ?? defaultFormationFor(11);
          return shiftLine(active, formation, lineIndex, direction);
        })
      );
    },
    []
  );

  const setPrimaryColorHandler = useCallback((color: string) => {
    setLibrary((current) =>
      updateActiveSquad(current, (active) => setPrimaryColor(active, color))
    );
  }, []);

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
    addPreset: addPresetHandler,
    removePreset: removePresetHandler,
    saveLineup: saveLineupHandler,
    applyLineup: applyLineupHandler,
    renameLineup: renameLineupHandler,
    removeLineup: removeLineupHandler,
    toggleMirrored: toggleMirroredHandler,
    shiftLine: shiftLineHandler,
    setPrimaryColor: setPrimaryColorHandler,
  };
};

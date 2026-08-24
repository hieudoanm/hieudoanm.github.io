import { act, renderHook, waitFor } from '@testing-library/react';
import { isDesktop, onDeepLink, takePendingDeepLinks } from '@/lib/desktop';
import { encodeSquad } from '@/lib/share';
import { useSquad } from '@/hooks/useSquad';
import { makeSquad } from '@/test/fixtures';

jest.mock('@/lib/desktop', () => ({
  isDesktop: jest.fn(),
  onDeepLink: jest.fn(),
  takePendingDeepLinks: jest.fn(),
}));

const mockIsDesktop = isDesktop as jest.Mock;
const mockOnDeepLink = onDeepLink as jest.Mock;
const mockTakePendingDeepLinks = takePendingDeepLinks as jest.Mock;

const deepLinkFor = (name: string): string =>
  `football://squad?squad=${encodeSquad(
    makeSquad({
      name,
      players: [{ id: 'p1', name, number: 10, role: 'MID' as const }],
    })
  )}`;

const captureHandler = (): ((url: string) => Promise<void>) => {
  let handler: ((url: string) => void) | undefined;
  mockOnDeepLink.mockImplementation(async (callback: (url: string) => void) => {
    handler = callback;
    return jest.fn();
  });
  return async (url: string): Promise<void> => {
    await waitFor(() => expect(handler).toBeDefined());
    await act(async () => {
      handler!(url);
    });
  };
};

describe('useSquad deep links', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    mockIsDesktop.mockReturnValue(false);
    mockOnDeepLink.mockImplementation(async () => jest.fn());
    mockTakePendingDeepLinks.mockResolvedValue([]);
  });

  it('imports a pending deep link while running in Tauri', async () => {
    mockIsDesktop.mockReturnValue(true);
    mockTakePendingDeepLinks.mockResolvedValue([deepLinkFor('Pending')]);
    const { result } = renderHook(() => useSquad());
    await waitFor(() => expect(result.current.squad.players).toHaveLength(1));
    expect(result.current.squad.players[0]).toMatchObject({
      name: 'Pending',
      number: 10,
    });
  });

  it('imports a squad from a live deep-link event', async () => {
    mockIsDesktop.mockReturnValue(true);
    const fire = captureHandler();
    const { result } = renderHook(() => useSquad());
    await fire(deepLinkFor('Live'));
    expect(result.current.squad.players).toHaveLength(1);
    expect(result.current.squad.players[0].name).toBe('Live');
  });

  it('skips duplicate deep links', async () => {
    mockIsDesktop.mockReturnValue(true);
    const fire = captureHandler();
    const { result } = renderHook(() => useSquad());
    const url = deepLinkFor('Twice');
    await fire(url);
    await fire(url);
    expect(result.current.squad.players).toHaveLength(1);
  });

  it('ignores deep links without a squad param', async () => {
    mockIsDesktop.mockReturnValue(true);
    const fire = captureHandler();
    const { result } = renderHook(() => useSquad());
    await fire('football://squad?other=1');
    expect(result.current.squad.players).toHaveLength(0);
  });

  it('does not listen for deep links in the browser', async () => {
    mockIsDesktop.mockReturnValue(false);
    renderHook(() => useSquad());
    await waitFor(() => expect(mockOnDeepLink).not.toHaveBeenCalled());
    expect(mockTakePendingDeepLinks).not.toHaveBeenCalled();
  });
});

describe('useSquad handlers', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    mockIsDesktop.mockReturnValue(false);
    mockOnDeepLink.mockImplementation(async () => jest.fn());
    mockTakePendingDeepLinks.mockResolvedValue([]);
  });

  it('clearSlot clears a slot assignment', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.addPlayer('Player 1', 10, 'MID');
    });
    await waitFor(() => expect(result.current.squad.players).toHaveLength(1));
    const pid = result.current.squad.players[0].id;
    const formation = result.current.formation;
    act(() => {
      result.current.toggleAssignment(formation.slots[0].id, pid);
    });
    await waitFor(() => {
      expect(result.current.squad.assignments[formation.slots[0].id]).toContain(pid);
    });
    act(() => {
      result.current.clearSlot(formation.slots[0].id);
    });
    await waitFor(() => {
      expect(result.current.squad.assignments[formation.slots[0].id] ?? []).toHaveLength(0);
    });
  });

  it('swapSlots swaps players between two slots', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.addPlayer('Player 1', 10, 'MID');
    });
    act(() => {
      result.current.addPlayer('Player 2', 9, 'FWD');
    });
    await waitFor(() => expect(result.current.squad.players).toHaveLength(2));
    const [pid1, pid2] = result.current.squad.players.map((p) => p.id);
    const formation = result.current.formation;
    act(() => {
      result.current.toggleAssignment(formation.slots[0].id, pid1);
    });
    act(() => {
      result.current.toggleAssignment(formation.slots[1].id, pid2);
    });
    await waitFor(() => {
      expect(result.current.squad.assignments[formation.slots[0].id]).toContain(pid1);
      expect(result.current.squad.assignments[formation.slots[1].id]).toContain(pid2);
    });
    act(() => {
      result.current.swapSlots(formation.slots[0].id, formation.slots[1].id);
    });
    await waitFor(() => {
      expect(result.current.squad.assignments[formation.slots[0].id]).toContain(pid2);
      expect(result.current.squad.assignments[formation.slots[1].id]).toContain(pid1);
    });
  });

  it('replaceSquad replaces the current squad', async () => {
    const { result } = renderHook(() => useSquad());
    const newSquad = makeSquad({
      name: 'New Squad',
      players: [{ id: 'p1', name: 'New Player', number: 10, role: 'MID' }],
    });
    act(() => {
      result.current.replaceSquad(newSquad);
    });
    await waitFor(() => {
      expect(result.current.squad.players).toHaveLength(1);
    });
  });

  it('resetAssignments clears all assignments', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.addPlayer('Player 1', 10, 'MID');
    });
    await waitFor(() => expect(result.current.squad.players).toHaveLength(1));
    const pid = result.current.squad.players[0].id;
    const formation = result.current.formation;
    act(() => {
      result.current.toggleAssignment(formation.slots[0].id, pid);
    });
    await waitFor(() => {
      expect(result.current.squad.assignments[formation.slots[0].id]).toHaveLength(1);
    });
    act(() => {
      result.current.resetAssignments();
    });
    await waitFor(() => {
      expect(result.current.squad.assignments).toEqual({});
    });
  });

  it('toggleLeadership toggles captain role', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.addPlayer('Player 1', 10, 'MID');
    });
    await waitFor(() => expect(result.current.squad.players).toHaveLength(1));
    const pid = result.current.squad.players[0].id;
    act(() => {
      result.current.toggleLeadership(pid, 'captain');
    });
    await waitFor(() => {
      expect(result.current.squad.players.find((p) => p.id === pid)?.captain).toBe(true);
    });
    act(() => {
      result.current.toggleLeadership(pid, 'captain');
    });
    await waitFor(() => {
      expect(result.current.squad.players.find((p) => p.id === pid)?.captain).toBe(false);
    });
  });

  it('toggleBench toggles bench status', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.addPlayer('Player 1', 10, 'MID');
    });
    await waitFor(() => expect(result.current.squad.players).toHaveLength(1));
    const pid = result.current.squad.players[0].id;
    act(() => {
      result.current.toggleBench(pid);
    });
    await waitFor(() => {
      expect(result.current.squad.players.find((p) => p.id === pid)?.bench).toBe(true);
    });
    act(() => {
      result.current.toggleBench(pid);
    });
    await waitFor(() => {
      expect(result.current.squad.players.find((p) => p.id === pid)?.bench).toBe(false);
    });
  });

  it('setPrimaryColor updates the primary color', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.setPrimaryColor('#0000ff');
    });
    await waitFor(() => {
      expect(result.current.squad.primaryColor).toBe('#0000ff');
    });
  });

  it('toggleMirrored toggles the mirrored flag', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.toggleMirrored();
    });
    await waitFor(() => {
      expect(result.current.squad.mirrored).toBe(true);
    });
    act(() => {
      result.current.toggleMirrored();
    });
    await waitFor(() => {
      expect(result.current.squad.mirrored).toBe(false);
    });
  });

  it('shiftLine shifts a line in the formation', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.addPlayer('Player 1', 10, 'MID');
    });
    act(() => {
      result.current.addPlayer('Player 2', 9, 'FWD');
    });
    act(() => {
      result.current.shiftLine(0, 'left');
    });
    await waitFor(() => {
      expect(result.current.squad).toBeDefined();
    });
  });

  it('substitutePlayer substitutes a bench player into a slot', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.addPlayer('Player 1', 10, 'MID');
    });
    act(() => {
      result.current.addPlayer('Player 2', 9, 'FWD');
    });
    await waitFor(() => expect(result.current.squad.players).toHaveLength(2));
    const [pid1, pid2] = result.current.squad.players.map((p) => p.id);
    const formation = result.current.formation;
    act(() => {
      result.current.toggleAssignment(formation.slots[0].id, pid1);
    });
    await waitFor(() => {
      expect(result.current.squad.assignments[formation.slots[0].id]).toContain(pid1);
    });
    act(() => {
      result.current.toggleBench(pid2);
    });
    await waitFor(() => {
      expect(result.current.squad.players.find((p) => p.id === pid2)?.bench).toBe(true);
    });
    act(() => {
      result.current.substitutePlayer(formation.slots[0].id, pid2);
    });
    await waitFor(() => {
      expect(result.current.squad.assignments[formation.slots[0].id]).toContain(pid2);
    });
  });

  it('updatePlayer patches a player field', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.addPlayer('Player 1', 10, 'MID');
    });
    await waitFor(() => expect(result.current.squad.players).toHaveLength(1));
    const pid = result.current.squad.players[0].id;
    act(() => {
      result.current.updatePlayer(pid, { number: 7, name: 'Renamed' });
    });
    await waitFor(() => {
      const p = result.current.squad.players.find((x) => x.id === pid);
      expect(p?.number).toBe(7);
      expect(p?.name).toBe('Renamed');
    });
  });

  it('removePlayer removes a player from the squad', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.addPlayer('Player 1', 10, 'MID');
    });
    act(() => {
      result.current.addPlayer('Player 2', 9, 'FWD');
    });
    await waitFor(() => expect(result.current.squad.players).toHaveLength(2));
    const pid = result.current.squad.players[0].id;
    act(() => {
      result.current.removePlayer(pid);
    });
    await waitFor(() => {
      expect(result.current.squad.players).toHaveLength(1);
    });
  });

  it('replacePlayers replaces all players', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.addPlayer('Player 1', 10, 'MID');
    });
    await waitFor(() => expect(result.current.squad.players).toHaveLength(1));
    const replacement = [
      { id: 'new1', name: 'New 1', number: 1, role: 'GK' as const },
      { id: 'new2', name: 'New 2', number: 2, role: 'DEF' as const },
    ];
    act(() => {
      result.current.replacePlayers(replacement);
    });
    await waitFor(() => {
      expect(result.current.squad.players).toHaveLength(2);
      expect(result.current.squad.players[0].name).toBe('New 1');
    });
  });

  it('selectFormation changes the formation and clears assignments', async () => {
    const { result } = renderHook(() => useSquad());
    const initialFormation = result.current.squad.formationId;
    act(() => {
      result.current.selectFormation('433');
    });
    await waitFor(() => {
      expect(result.current.squad.formationId).toBe('433');
      expect(result.current.squad.assignments).toEqual({});
    });
    expect(result.current.squad.formationId).not.toBe(initialFormation);
  });

  it('selectSize changes the formation size', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.selectSize(7);
    });
    await waitFor(() => {
      expect(result.current.squad.formationId).toBeDefined();
      expect(result.current.squad.assignments).toEqual({});
    });
  });

  it('selectSlot sets and clears the selected slot', async () => {
    const { result } = renderHook(() => useSquad());
    expect(result.current.selectedSlotId).toBeNull();
    act(() => {
      result.current.selectSlot('some-slot');
    });
    await waitFor(() => {
      expect(result.current.selectedSlotId).toBe('some-slot');
    });
    act(() => {
      result.current.selectSlot(null);
    });
    await waitFor(() => {
      expect(result.current.selectedSlotId).toBeNull();
    });
  });

  it('addSquad adds a new squad and selects it', async () => {
    const { result } = renderHook(() => useSquad());
    const prevCount = result.current.library.squads.length;
    act(() => {
      result.current.addSquad('My New Squad');
    });
    await waitFor(() => {
      expect(result.current.library.squads).toHaveLength(prevCount + 1);
    });
  });

  it('renameSquad renames a squad', async () => {
    const { result } = renderHook(() => useSquad());
    const squadId = result.current.library.activeId;
    act(() => {
      result.current.renameSquad(squadId, 'Renamed Squad');
    });
    await waitFor(() => {
      const s = result.current.library.squads.find((x) => x.id === squadId);
      expect(s?.name).toBe('Renamed Squad');
    });
  });

  it('duplicateSquad duplicates the active squad', async () => {
    const { result } = renderHook(() => useSquad());
    const prevCount = result.current.library.squads.length;
    act(() => {
      result.current.duplicateSquad(result.current.library.activeId);
    });
    await waitFor(() => {
      expect(result.current.library.squads).toHaveLength(prevCount + 1);
    });
  });

  it('removeSquad removes a squad', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.addSquad('Squad To Remove');
    });
    await waitFor(() => {
      expect(result.current.library.squads.length).toBeGreaterThan(1);
    });
    const extraSquadId = result.current.library.squads[result.current.library.squads.length - 1].id;
    act(() => {
      result.current.removeSquad(extraSquadId);
    });
    await waitFor(() => {
      expect(result.current.library.squads.find((s) => s.id === extraSquadId)).toBeUndefined();
    });
  });

  it('setActiveSquad switches the active squad', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.addSquad('Second Squad');
    });
    await waitFor(() => {
      expect(result.current.library.squads.length).toBeGreaterThan(1);
    });
    const secondId = result.current.library.squads[result.current.library.squads.length - 1].id;
    act(() => {
      result.current.setActiveSquad(secondId);
    });
    await waitFor(() => {
      expect(result.current.library.activeId).toBe(secondId);
    });
  });

  it('addPreset saves a formation preset', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.addPreset('My Plan');
    });
    await waitFor(() => {
      expect(result.current.squad.presets.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('removePreset removes a formation preset', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.addPreset('My Plan');
    });
    await waitFor(() => {
      expect(result.current.squad.presets.length).toBeGreaterThanOrEqual(1);
    });
    const presetId = result.current.squad.presets[0].id;
    act(() => {
      result.current.removePreset(presetId);
    });
    await waitFor(() => {
      expect(result.current.squad.presets.find((p) => p.id === presetId)).toBeUndefined();
    });
  });

  it('saveLineup saves the current lineup', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.saveLineup('Plan A');
    });
    await waitFor(() => {
      expect(result.current.squad.lineups.length).toBeGreaterThanOrEqual(1);
      expect(result.current.squad.lineups[0].name).toBe('Plan A');
    });
  });

  it('applyLineup restores a saved lineup', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.saveLineup('Plan A');
    });
    await waitFor(() => {
      expect(result.current.squad.lineups).toHaveLength(1);
    });
    const lineupId = result.current.squad.lineups[0].id;
    act(() => {
      result.current.selectFormation('433');
    });
    await waitFor(() => {
      expect(result.current.squad.formationId).toBe('433');
    });
    act(() => {
      result.current.applyLineup(lineupId);
    });
    await waitFor(() => {
      expect(result.current.squad.formationId).toBe('442');
    });
  });

  it('renameLineup renames a lineup', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.saveLineup('Plan A');
    });
    await waitFor(() => {
      expect(result.current.squad.lineups).toHaveLength(1);
    });
    const lineupId = result.current.squad.lineups[0].id;
    act(() => {
      result.current.renameLineup(lineupId, 'Plan B');
    });
    await waitFor(() => {
      expect(result.current.squad.lineups[0].name).toBe('Plan B');
    });
  });

  it('removeLineup removes a lineup', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.saveLineup('Plan A');
    });
    await waitFor(() => {
      expect(result.current.squad.lineups).toHaveLength(1);
    });
    const lineupId = result.current.squad.lineups[0].id;
    act(() => {
      result.current.removeLineup(lineupId);
    });
    await waitFor(() => {
      expect(result.current.squad.lineups).toHaveLength(0);
    });
  });

  it('selectExample sets the example id', async () => {
    const { result } = renderHook(() => useSquad());
    expect(result.current.exampleId).toBeDefined();
    act(() => {
      result.current.selectExample('custom-id');
    });
    await waitFor(() => {
      expect(result.current.exampleId).toBe('custom-id');
    });
  });

  it('toggleLeadership with vice role', async () => {
    const { result } = renderHook(() => useSquad());
    act(() => {
      result.current.addPlayer('Player 1', 10, 'MID');
    });
    await waitFor(() => expect(result.current.squad.players).toHaveLength(1));
    const pid = result.current.squad.players[0].id;
    act(() => {
      result.current.toggleLeadership(pid, 'vice');
    });
    await waitFor(() => {
      expect(result.current.squad.players.find((p) => p.id === pid)?.viceCaptain).toBe(true);
    });
    act(() => {
      result.current.toggleLeadership(pid, 'vice');
    });
    await waitFor(() => {
      expect(result.current.squad.players.find((p) => p.id === pid)?.viceCaptain).toBe(false);
    });
  });
});

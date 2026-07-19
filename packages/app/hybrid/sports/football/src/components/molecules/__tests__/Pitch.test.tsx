import { fireEvent, render, screen, within } from '@testing-library/react';
import { Pitch } from '@/components/molecules/Pitch';
import { findFormation } from '@/lib/formations';
import { makePlayer, makeSquad } from '@/test/fixtures';

describe('Pitch', () => {
  it('renders a marker for every formation slot', () => {
    const formation = findFormation('442');
    if (!formation) throw new Error('missing 442');
    const squad = makeSquad({ formationId: formation.id });
    render(
      <Pitch
        formation={formation}
        selectedSlotId={null}
        onSelectSlot={jest.fn()}
        getSlotPlayers={(slotId) => slotPlayersFrom(squad, slotId)}
      />
    );
    expect(screen.getByLabelText('Position GK 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Position ST 9')).toBeInTheDocument();
    expect(screen.getByLabelText('Position ST 10')).toBeInTheDocument();
  });

  it('calls onSelectSlot when a marker is clicked', () => {
    const formation = findFormation('442');
    if (!formation) throw new Error('missing 442');
    const onSelectSlot = jest.fn();
    render(
      <Pitch
        formation={formation}
        selectedSlotId={null}
        onSelectSlot={onSelectSlot}
        getSlotPlayers={() => []}
      />
    );
    fireEvent.click(screen.getByLabelText('Position GK 1'));
    expect(onSelectSlot).toHaveBeenCalledWith(formation.slots[0].id);
  });

  it('marks the selected slot as pressed', () => {
    const formation = findFormation('442');
    if (!formation) throw new Error('missing 442');
    render(
      <Pitch
        formation={formation}
        selectedSlotId={formation.slots[0].id}
        onSelectSlot={jest.fn()}
        getSlotPlayers={() => []}
      />
    );
    expect(screen.getByLabelText('Position GK 1')).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('falls back to the slot number on the marker badge when no player is assigned', () => {
    const formation = findFormation('442');
    if (!formation) throw new Error('missing 442');
    render(
      <Pitch
        formation={formation}
        selectedSlotId={null}
        onSelectSlot={jest.fn()}
        getSlotPlayers={() => []}
      />
    );
    const marker = screen.getByLabelText('Position GK 1');
    expect(within(marker).getByText('1')).toBeInTheDocument();
  });

  it('uses the player shirt number on the marker badge', () => {
    const formation = findFormation('442');
    if (!formation) throw new Error('missing 442');
    const squad = makeSquad({
      formationId: formation.id,
      players: [makePlayer({ id: 'p1', name: 'Ada', number: 7 })],
      assignments: { [formation.slots[0].id]: ['p1'] },
    });
    render(
      <Pitch
        formation={formation}
        selectedSlotId={null}
        onSelectSlot={jest.fn()}
        getSlotPlayers={(slotId) => slotPlayersFrom(squad, slotId)}
      />
    );
    const marker = screen.getByLabelText('Position GK 1');
    expect(within(marker).getByText('7')).toBeInTheDocument();
  });

  it('uses the player shirt number in the selection panel', () => {
    const formation = findFormation('442');
    if (!formation) throw new Error('missing 442');
    const squad = makeSquad({
      formationId: formation.id,
      players: [makePlayer({ id: 'p1', name: 'Ada', number: 7 })],
      assignments: { [formation.slots[0].id]: ['p1'] },
    });
    render(
      <Pitch
        formation={formation}
        selectedSlotId={formation.slots[0].id}
        onSelectSlot={jest.fn()}
        getSlotPlayers={(slotId) => slotPlayersFrom(squad, slotId)}
      />
    );
    expect(screen.getByText('shirt #7')).toBeInTheDocument();
  });

  it('falls back to the slot number in the selection panel', () => {
    const formation = findFormation('442');
    if (!formation) throw new Error('missing 442');
    render(
      <Pitch
        formation={formation}
        selectedSlotId={formation.slots[0].id}
        onSelectSlot={jest.fn()}
        getSlotPlayers={() => []}
      />
    );
    expect(screen.getByText('shirt #1')).toBeInTheDocument();
  });

  it('shows the names of assigned players', () => {
    const formation = findFormation('442');
    if (!formation) throw new Error('missing 442');
    const squad = makeSquad({
      formationId: formation.id,
      players: [makePlayer({ id: 'p1', name: 'Ada' })],
      assignments: { [formation.slots[0].id]: ['p1'] },
    });
    render(
      <Pitch
        formation={formation}
        selectedSlotId={null}
        onSelectSlot={jest.fn()}
        getSlotPlayers={(slotId) => slotPlayersFrom(squad, slotId)}
      />
    );
    expect(screen.getByText('Ada')).toBeInTheDocument();
  });

  it('swaps players between positions on drop', () => {
    const formation = findFormation('442');
    if (!formation) throw new Error('missing 442');
    const onSwapSlots = jest.fn();
    render(
      <Pitch
        formation={formation}
        selectedSlotId={null}
        onSelectSlot={jest.fn()}
        onSwapSlots={onSwapSlots}
        getSlotPlayers={(slotId) =>
          slotId === formation.slots[0].id ? [makePlayer()] : []
        }
      />
    );
    const source = screen.getByLabelText('Position GK 1');
    const target = screen.getByLabelText('Position ST 9');
    fireEvent.dragStart(source, { dataTransfer: {} });
    fireEvent.drop(target, { dataTransfer: {} });
    expect(onSwapSlots).toHaveBeenCalledWith(
      formation.slots[0].id,
      formation.slots[9].id
    );
  });

  it('does not swap onto the same position', () => {
    const formation = findFormation('442');
    if (!formation) throw new Error('missing 442');
    const onSwapSlots = jest.fn();
    render(
      <Pitch
        formation={formation}
        selectedSlotId={null}
        onSelectSlot={jest.fn()}
        onSwapSlots={onSwapSlots}
        getSlotPlayers={(slotId) =>
          slotId === formation.slots[0].id ? [makePlayer()] : []
        }
      />
    );
    const source = screen.getByLabelText('Position GK 1');
    fireEvent.dragStart(source, { dataTransfer: {} });
    fireEvent.drop(source, { dataTransfer: {} });
    expect(onSwapSlots).not.toHaveBeenCalled();
  });

  it('shows a drag hint when swapping is enabled', () => {
    const formation = findFormation('442');
    if (!formation) throw new Error('missing 442');
    render(
      <Pitch
        formation={formation}
        selectedSlotId={null}
        onSelectSlot={jest.fn()}
        onSwapSlots={jest.fn()}
        getSlotPlayers={() => []}
      />
    );
    expect(screen.getByText(/drag a player marker/)).toBeInTheDocument();
  });

  it('applies the team colour to the marker badges', () => {
    const formation = findFormation('442');
    if (!formation) throw new Error('missing 442');
    const { container } = render(
      <Pitch
        formation={formation}
        selectedSlotId={null}
        onSelectSlot={jest.fn()}
        getSlotPlayers={() => []}
        teamColor="#2563eb"
      />
    );
    const badges = container.querySelectorAll('span[aria-hidden="true"]');
    const coloured = Array.from(badges).find(
      (badge) => badge.textContent?.trim() === '1'
    );
    expect(coloured).toBeDefined();
    expect((coloured as HTMLElement).style.backgroundColor).toBe(
      'rgb(37, 99, 235)'
    );
  });
});

const slotPlayersFrom = (squad: ReturnType<typeof makeSquad>, slotId: string) =>
  (squad.assignments[slotId] ?? [])
    .map((id) => squad.players.find((player) => player.id === id))
    .filter((player) => player !== undefined);

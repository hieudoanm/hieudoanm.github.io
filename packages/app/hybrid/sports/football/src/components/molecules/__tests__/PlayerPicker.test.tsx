import { fireEvent, render, screen } from '@testing-library/react';
import { PlayerPicker } from '@/components/molecules/PlayerPicker';
import { makePlayer, makeSquad } from '@/test/fixtures';
import { FormationSlot } from '@/types/football';

const slot: FormationSlot = { id: '442-3-9', label: 'ST', number: 9, line: 3 };

describe('PlayerPicker', () => {
  it('shows the position label and assigned count', () => {
    render(
      <PlayerPicker
        slot={slot}
        assigned={[makePlayer()]}
        allPlayers={[makePlayer()]}
        onToggle={jest.fn()}
        onClear={jest.fn()}
      />
    );
    expect(screen.getByText('ST')).toBeInTheDocument();
    expect(screen.getByText('shirt #9')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('lists every squad player as a toggle', () => {
    render(
      <PlayerPicker
        slot={slot}
        assigned={[]}
        allPlayers={[
          makePlayer({ id: 'p1', name: 'Ada' }),
          makePlayer({ id: 'p2', name: 'Bob' }),
        ]}
        onToggle={jest.fn()}
        onClear={jest.fn()}
      />
    );
    const ada = screen.getByLabelText('Assign Ada');
    expect(ada).not.toBeChecked();
    expect(screen.getByLabelText('Assign Bob')).toBeInTheDocument();
  });

  it('checks players already assigned to the slot', () => {
    render(
      <PlayerPicker
        slot={slot}
        assigned={[makePlayer({ id: 'p1', name: 'Ada' })]}
        allPlayers={[
          makePlayer({ id: 'p1', name: 'Ada' }),
          makePlayer({ id: 'p2', name: 'Bob' }),
        ]}
        onToggle={jest.fn()}
        onClear={jest.fn()}
      />
    );
    expect(screen.getByLabelText('Assign Ada')).toBeChecked();
  });

  it('toggles an assignment', () => {
    const onToggle = jest.fn();
    render(
      <PlayerPicker
        slot={slot}
        assigned={[]}
        allPlayers={[makePlayer({ id: 'p1', name: 'Ada' })]}
        onToggle={onToggle}
        onClear={jest.fn()}
      />
    );
    fireEvent.click(screen.getByLabelText('Assign Ada'));
    expect(onToggle).toHaveBeenCalledWith(slot.id, 'p1');
  });

  it('unassigns and clears via buttons', () => {
    const onToggle = jest.fn();
    const onClear = jest.fn();
    render(
      <PlayerPicker
        slot={slot}
        assigned={[makePlayer({ id: 'p1', name: 'Ada' })]}
        allPlayers={[makePlayer({ id: 'p1', name: 'Ada' })]}
        onToggle={onToggle}
        onClear={onClear}
      />
    );
    fireEvent.click(screen.getByLabelText('Unassign Ada'));
    expect(onToggle).toHaveBeenCalledWith(slot.id, 'p1');
    fireEvent.click(screen.getByText('Clear position'));
    expect(onClear).toHaveBeenCalledWith(slot.id);
  });

  it('shows a hint when the squad has no players', () => {
    const squad = makeSquad();
    render(
      <PlayerPicker
        slot={slot}
        assigned={[]}
        allPlayers={squad.players}
        onToggle={jest.fn()}
        onClear={jest.fn()}
      />
    );
    expect(screen.getByText(/No players in the squad yet/)).toBeInTheDocument();
  });

  it('swaps the assigned players with a chosen position', () => {
    const onSwap = jest.fn();
    render(
      <PlayerPicker
        slot={slot}
        assigned={[makePlayer()]}
        allPlayers={[makePlayer()]}
        slots={[slot, { id: '442-3-10', label: 'ST', number: 10, line: 3 }]}
        onToggle={jest.fn()}
        onClear={jest.fn()}
        onSwap={onSwap}
      />
    );
    fireEvent.change(screen.getByLabelText('Swap with position'), {
      target: { value: '442-3-10' },
    });
    fireEvent.click(screen.getByLabelText('Swap players'));
    expect(onSwap).toHaveBeenCalledWith(slot.id, '442-3-10');
  });

  it('hides the swap control when there is only one position', () => {
    render(
      <PlayerPicker
        slot={slot}
        assigned={[makePlayer()]}
        allPlayers={[makePlayer()]}
        slots={[slot]}
        onToggle={jest.fn()}
        onClear={jest.fn()}
        onSwap={jest.fn()}
      />
    );
    expect(screen.queryByLabelText('Swap players')).not.toBeInTheDocument();
  });

  it('does not render swap controls without a callback', () => {
    render(
      <PlayerPicker
        slot={slot}
        assigned={[makePlayer()]}
        allPlayers={[makePlayer()]}
        onToggle={jest.fn()}
        onClear={jest.fn()}
      />
    );
    expect(screen.queryByLabelText('Swap players')).not.toBeInTheDocument();
  });

  it('brings a bench player on for the selected slot', () => {
    const onSubstitute = jest.fn();
    render(
      <PlayerPicker
        slot={slot}
        assigned={[makePlayer({ id: 'p1', name: 'Ada' })]}
        allPlayers={[makePlayer({ id: 'p1', name: 'Ada' })]}
        benchPlayers={[makePlayer({ id: 'p2', name: 'Bob', bench: true })]}
        onToggle={jest.fn()}
        onClear={jest.fn()}
        onSubstitute={onSubstitute}
      />
    );
    fireEvent.click(screen.getByLabelText('Bring on Bob'));
    expect(onSubstitute).toHaveBeenCalledWith(slot.id, 'p2');
  });

  it('hides the bench list when there are no bench players', () => {
    render(
      <PlayerPicker
        slot={slot}
        assigned={[]}
        allPlayers={[makePlayer()]}
        onToggle={jest.fn()}
        onClear={jest.fn()}
        onSubstitute={jest.fn()}
      />
    );
    expect(screen.queryByText('Bring on')).not.toBeInTheDocument();
  });
});

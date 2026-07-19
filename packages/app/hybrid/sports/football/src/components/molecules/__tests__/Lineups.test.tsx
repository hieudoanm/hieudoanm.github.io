import { fireEvent, render, screen } from '@testing-library/react';
import { Lineups } from '@/components/molecules/Lineups';
import { makeSquad } from '@/test/fixtures';

describe('Lineups', () => {
  it('shows a hint when no lineups are saved', () => {
    render(
      <Lineups
        squad={makeSquad()}
        onSave={jest.fn()}
        onApply={jest.fn()}
        onRename={jest.fn()}
        onRemove={jest.fn()}
      />
    );
    expect(screen.getByText(/No lineups saved yet/)).toBeInTheDocument();
  });

  it('saves the current lineup', () => {
    const onSave = jest.fn();
    render(
      <Lineups
        squad={makeSquad()}
        onSave={onSave}
        onApply={jest.fn()}
        onRename={jest.fn()}
        onRemove={jest.fn()}
      />
    );
    fireEvent.change(screen.getByLabelText('Lineup name'), {
      target: { value: 'Plan A' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save lineup' }));
    expect(onSave).toHaveBeenCalledWith('Plan A');
  });

  it('lists lineups with formation and slot count', () => {
    render(
      <Lineups
        squad={makeSquad({
          lineups: [
            {
              id: 'lu1',
              name: 'Plan A',
              formationId: '433',
              assignments: { '433-0-0': ['p1'] },
            },
          ],
        })}
        onSave={jest.fn()}
        onApply={jest.fn()}
        onRename={jest.fn()}
        onRemove={jest.fn()}
      />
    );
    expect(screen.getByText('Plan A')).toBeInTheDocument();
    expect(screen.getByText(/4-3-3/)).toBeInTheDocument();
    expect(screen.getByText(/1 slots/)).toBeInTheDocument();
  });

  it('applies a saved lineup', () => {
    const onApply = jest.fn();
    render(
      <Lineups
        squad={makeSquad({
          lineups: [
            {
              id: 'lu1',
              name: 'Plan A',
              formationId: '442',
              assignments: {},
            },
          ],
        })}
        onSave={jest.fn()}
        onApply={onApply}
        onRename={jest.fn()}
        onRemove={jest.fn()}
      />
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Apply lineup Plan A' })
    );
    expect(onApply).toHaveBeenCalledWith('lu1');
  });

  it('renames a lineup inline', () => {
    const onRename = jest.fn();
    render(
      <Lineups
        squad={makeSquad({
          lineups: [
            {
              id: 'lu1',
              name: 'Plan A',
              formationId: '442',
              assignments: {},
            },
          ],
        })}
        onSave={jest.fn()}
        onApply={jest.fn()}
        onRename={onRename}
        onRemove={jest.fn()}
      />
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Rename lineup Plan A' })
    );
    fireEvent.change(screen.getByLabelText('Rename lineup Plan A'), {
      target: { value: 'Plan B' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save lineup name' }));
    expect(onRename).toHaveBeenCalledWith('lu1', 'Plan B');
  });

  it('removes a saved lineup', () => {
    const onRemove = jest.fn();
    render(
      <Lineups
        squad={makeSquad({
          lineups: [
            {
              id: 'lu1',
              name: 'Plan A',
              formationId: '442',
              assignments: {},
            },
          ],
        })}
        onSave={jest.fn()}
        onApply={jest.fn()}
        onRename={jest.fn()}
        onRemove={onRemove}
      />
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove lineup Plan A' })
    );
    expect(onRemove).toHaveBeenCalledWith('lu1');
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { TeamSheet } from '@/components/molecules/TeamSheet';
import { findFormation } from '@/lib/formations';
import { makeSquad } from '@/test/fixtures';

const makeProps = (
  overrides: Partial<Parameters<typeof TeamSheet>[0]> = {}
) => {
  const formation = findFormation('442');
  if (!formation) throw new Error('missing 442');
  return {
    squad: makeSquad({
      name: 'Rovers FC',
      players: [{ id: 'p1', name: 'Ada', number: 10, role: 'MID' }],
    }),
    formation,
    opponent: '',
    date: '',
    onOpponentChange: jest.fn(),
    onDateChange: jest.fn(),
    onPrint: jest.fn(),
    ...overrides,
  };
};

describe('TeamSheet', () => {
  it('calls onOpponentChange when the opponent is typed', () => {
    const props = makeProps();
    render(<TeamSheet {...props} />);
    fireEvent.change(screen.getByLabelText('Opponent'), {
      target: { value: 'United' },
    });
    expect(props.onOpponentChange).toHaveBeenCalledWith('United');
  });

  it('calls onDateChange when the date changes', () => {
    const props = makeProps();
    render(<TeamSheet {...props} />);
    fireEvent.change(screen.getByLabelText('Match date'), {
      target: { value: '2026-08-15' },
    });
    expect(props.onDateChange).toHaveBeenCalledWith('2026-08-15');
  });

  it('prints the team sheet', () => {
    const props = makeProps();
    render(<TeamSheet {...props} />);
    fireEvent.click(screen.getByLabelText('Print team sheet'));
    expect(props.onPrint).toHaveBeenCalled();
  });

  it('disables printing when there are no players', () => {
    const props = makeProps({ squad: makeSquad({ name: 'Empty' }) });
    render(<TeamSheet {...props} />);
    expect(screen.getByLabelText('Print team sheet')).toBeDisabled();
  });

  it('shows a live preview with the typed values', () => {
    const props = makeProps({ opponent: 'United', date: '2026-08-15' });
    render(<TeamSheet {...props} />);
    expect(screen.getByText('Rovers FC')).toBeInTheDocument();
    expect(screen.getByText('vs United')).toBeInTheDocument();
  });
});

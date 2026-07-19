import { fireEvent, render, screen } from '@testing-library/react';
import { RosterImport } from '@/components/molecules/RosterImport';

describe('RosterImport', () => {
  it('parses pasted roster lines and calls onImport', () => {
    const onImport = jest.fn();
    render(<RosterImport onImport={onImport} />);
    fireEvent.change(screen.getByLabelText('Roster text'), {
      target: { value: 'Ada,10,MID\nBob,7,FWD' },
    });
    fireEvent.click(screen.getByLabelText('Import roster'));
    expect(onImport).toHaveBeenCalledTimes(1);
    const players = onImport.mock.calls[0][0] as Array<{
      name: string;
      number: number;
      role: string;
    }>;
    expect(players).toHaveLength(2);
    expect(players[0]).toMatchObject({ name: 'Ada', number: 10, role: 'MID' });
  });

  it('reports when no valid lines were found', () => {
    render(<RosterImport onImport={jest.fn()} />);
    fireEvent.change(screen.getByLabelText('Roster text'), {
      target: { value: 'not-a-valid-line' },
    });
    fireEvent.click(screen.getByLabelText('Import roster'));
    expect(
      screen.getByText('No valid roster lines found.')
    ).toBeInTheDocument();
  });

  it('disables the import button when the textarea is empty', () => {
    render(<RosterImport onImport={jest.fn()} />);
    expect(screen.getByLabelText('Import roster')).toBeDisabled();
  });

  it('clears the textarea after a successful import', () => {
    const onImport = jest.fn();
    render(<RosterImport onImport={onImport} />);
    fireEvent.change(screen.getByLabelText('Roster text'), {
      target: { value: 'Ada,10,MID' },
    });
    fireEvent.click(screen.getByLabelText('Import roster'));
    expect(screen.getByLabelText('Roster text')).toHaveValue('');
    expect(screen.getByText('Imported 1 player.')).toBeInTheDocument();
  });
});

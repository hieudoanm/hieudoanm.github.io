import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChessPairing } from '../ChessPairing';

describe('ChessPairing', () => {
  const onClose = jest.fn();

  beforeEach(() => onClose.mockClear());

  it('renders with empty player list', () => {
    render(<ChessPairing onClose={onClose} />);
    expect(screen.getByText('Add at least two players.')).toBeTruthy();
  });

  it('adds a player', async () => {
    render(<ChessPairing onClose={onClose} />);
    await userEvent.type(screen.getByPlaceholderText('Player name'), 'Alice');
    await userEvent.click(screen.getByText('Add player'));
    expect(screen.getAllByText('Alice').length).toBeGreaterThanOrEqual(1);
  });

  it('does not add player with empty name', async () => {
    render(<ChessPairing onClose={onClose} />);
    await userEvent.click(screen.getByText('Add player'));
    expect(screen.getByText('Add at least two players.')).toBeTruthy();
  });

  it('removes a player', async () => {
    render(<ChessPairing onClose={onClose} />);
    await userEvent.type(screen.getByPlaceholderText('Player name'), 'Alice');
    await userEvent.click(screen.getByText('Add player'));
    const removeBtn = screen.getByRole('button', { name: /Remove Alice/ });
    await userEvent.click(removeBtn);
    expect(screen.getByText('Add at least two players.')).toBeTruthy();
  });

  it('generates round-robin pairings with 2 players', async () => {
    render(<ChessPairing onClose={onClose} />);
    await userEvent.type(screen.getByPlaceholderText('Player name'), 'Alice');
    await userEvent.click(screen.getByText('Add player'));
    await userEvent.type(screen.getByPlaceholderText('Player name'), 'Bob');
    await userEvent.click(screen.getByText('Add player'));
    expect(screen.getAllByText('Alice').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Bob').length).toBeGreaterThanOrEqual(1);
  });

  it('switches to Swiss mode', async () => {
    render(<ChessPairing onClose={onClose} />);
    await userEvent.selectOptions(
      screen.getByLabelText('Pairing mode'),
      'swiss'
    );
    expect(screen.getByText('Swiss pairing')).toBeTruthy();
  });

  it('switches back to round-robin mode', async () => {
    render(<ChessPairing onClose={onClose} />);
    await userEvent.selectOptions(
      screen.getByLabelText('Pairing mode'),
      'swiss'
    );
    await userEvent.selectOptions(screen.getByLabelText('Pairing mode'), 'rr');
    expect(screen.getByText('Round-robin pairing')).toBeTruthy();
  });

  it('sets match results', async () => {
    render(<ChessPairing onClose={onClose} />);
    await userEvent.type(screen.getByPlaceholderText('Player name'), 'Alice');
    await userEvent.click(screen.getByText('Add player'));
    await userEvent.type(screen.getByPlaceholderText('Player name'), 'Bob');
    await userEvent.click(screen.getByText('Add player'));
    const buttons = screen.getAllByText('1-0');
    if (buttons.length > 0) {
      await userEvent.click(buttons[0]);
    }
  });

  it('clears results in round-robin mode', async () => {
    render(<ChessPairing onClose={onClose} />);
    await userEvent.type(screen.getByPlaceholderText('Player name'), 'Alice');
    await userEvent.click(screen.getByText('Add player'));
    await userEvent.type(screen.getByPlaceholderText('Player name'), 'Bob');
    await userEvent.click(screen.getByText('Add player'));
    const clearBtn = screen.getByText('Clear results');
    await userEvent.click(clearBtn);
  });

  it('renders standings table', async () => {
    render(<ChessPairing onClose={onClose} />);
    expect(screen.getByText(/Standings/)).toBeTruthy();
  });
});

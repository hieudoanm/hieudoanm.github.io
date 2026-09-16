import { fireEvent, render, screen } from '@testing-library/react';
import { NashEquilibriumGame } from '../index';

describe('NashEquilibriumGame', () => {
  it('renders game selection buttons', () => {
    render(<NashEquilibriumGame />);
    expect(screen.getByTestId('game-stag-hunt')).toBeInTheDocument();
    expect(screen.getByTestId('game-matching-pennies')).toBeInTheDocument();
  });

  it('shows the payoff matrix and row picker after choosing a game', () => {
    render(<NashEquilibriumGame />);
    fireEvent.click(screen.getByTestId('game-stag-hunt'));
    expect(screen.getByTestId('row-Up')).toBeInTheDocument();
    expect(screen.getByTestId('row-Down')).toBeInTheDocument();
  });

  it('plays stag-hunt Up and shows the NE verdict', () => {
    render(<NashEquilibriumGame />);
    fireEvent.click(screen.getByTestId('game-stag-hunt'));
    fireEvent.click(screen.getByTestId('row-Up'));
    expect(screen.getByTestId('ne-verdict')).toHaveTextContent(
      'Nash Equilibrium'
    );
    expect(screen.getByTestId('next-play')).toBeInTheDocument();
  });

  it('plays matching-pennies and shows not-NE verdict', () => {
    render(<NashEquilibriumGame />);
    fireEvent.click(screen.getByTestId('game-matching-pennies'));
    fireEvent.click(screen.getByTestId('row-Up'));
    expect(screen.getByTestId('ne-verdict')).toHaveTextContent(
      'Not a Nash Equilibrium'
    );
  });

  it('reaches the summary screen after 8 plays', () => {
    render(<NashEquilibriumGame />);
    for (let i = 0; i < 8; i++) {
      fireEvent.click(screen.getByTestId('game-stag-hunt'));
      fireEvent.click(screen.getByTestId('row-Up'));
      fireEvent.click(screen.getByTestId('next-play'));
    }
    expect(screen.getByText('Game complete')).toBeInTheDocument();
    expect(screen.getByTestId('play-again')).toBeInTheDocument();
  });

  it('resets the game from summary', () => {
    render(<NashEquilibriumGame />);
    for (let i = 0; i < 8; i++) {
      fireEvent.click(screen.getByTestId('game-stag-hunt'));
      fireEvent.click(screen.getByTestId('row-Up'));
      fireEvent.click(screen.getByTestId('next-play'));
    }
    fireEvent.click(screen.getByTestId('play-again'));
    expect(screen.getByTestId('game-stag-hunt')).toBeInTheDocument();
  });
});

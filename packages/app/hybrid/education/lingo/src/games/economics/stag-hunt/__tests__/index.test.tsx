import { fireEvent, render, screen } from '@testing-library/react';
import { StagHuntGame } from '../index';

describe('StagHuntGame', () => {
  it('renders the partner selector on initial load', () => {
    render(<StagHuntGame />);
    expect(screen.getByText('Choose your partner:')).toBeInTheDocument();
    expect(screen.getByTestId('partner-fellow-hunter')).toBeInTheDocument();
    expect(screen.getByTestId('partner-hare-seeker')).toBeInTheDocument();
    expect(screen.getByTestId('partner-mimic')).toBeInTheDocument();
    expect(screen.getByTestId('partner-grudger')).toBeInTheDocument();
  });

  it('shows move buttons after selecting a partner', () => {
    render(<StagHuntGame />);
    fireEvent.click(screen.getByTestId('partner-fellow-hunter'));
    expect(screen.getByTestId('move-stag')).toBeInTheDocument();
    expect(screen.getByTestId('move-hare')).toBeInTheDocument();
  });

  it('reveals the round result after making a move', () => {
    render(<StagHuntGame />);
    fireEvent.click(screen.getByTestId('partner-fellow-hunter'));
    fireEvent.click(screen.getByTestId('move-stag'));
    expect(screen.getAllByText('🦌 Stag')).toHaveLength(2);
    expect(screen.getAllByText(/\+4/).length).toBeGreaterThan(0);
    expect(
      screen.getByRole('button', { name: /Next Round/ })
    ).toBeInTheDocument();
  });

  it('reaches results screen after all rounds', () => {
    render(<StagHuntGame />);
    fireEvent.click(screen.getByTestId('partner-fellow-hunter'));
    for (let round = 0; round < 8; round++) {
      fireEvent.click(screen.getByTestId('move-stag'));
      fireEvent.click(
        screen.getByRole('button', { name: /Next Round|See Results/ })
      );
    }
    expect(screen.getByText('Game Results')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('resets the game when Play Again is clicked', () => {
    render(<StagHuntGame />);
    fireEvent.click(screen.getByTestId('partner-fellow-hunter'));
    for (let round = 0; round < 8; round++) {
      fireEvent.click(screen.getByTestId('move-stag'));
      fireEvent.click(
        screen.getByRole('button', { name: /Next Round|See Results/ })
      );
    }
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(screen.getByText('Choose your partner:')).toBeInTheDocument();
  });
});

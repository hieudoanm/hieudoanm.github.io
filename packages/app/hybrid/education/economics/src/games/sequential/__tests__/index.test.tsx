import { fireEvent, render, screen } from '@testing-library/react';
import { BackwardInductionGame } from '../index';

const playEnter = () => {
  fireEvent.click(screen.getByTestId('choose-enter'));
  fireEvent.click(screen.getByTestId('reveal'));
};

describe('BackwardInductionGame', () => {
  it('renders the choose phase with Enter and Out buttons', () => {
    render(<BackwardInductionGame />);
    expect(screen.getByText('You are the Entrant.')).toBeInTheDocument();
    expect(screen.getByTestId('choose-enter')).toBeInTheDocument();
    expect(screen.getByTestId('choose-out')).toBeInTheDocument();
  });

  it('shows a Reveal button after choosing Enter', () => {
    render(<BackwardInductionGame />);
    fireEvent.click(screen.getByTestId('choose-enter'));
    expect(screen.getByRole('button', { name: 'Reveal' })).toBeInTheDocument();
  });

  it('reveals the rollback annotation and SPNE verdict after Enter', () => {
    render(<BackwardInductionGame />);
    playEnter();
    expect(screen.getByText('Subgame-perfect move!')).toBeInTheDocument();
    expect(screen.getByText('+6')).toBeInTheDocument();
    expect(screen.getByTestId('rollback-annotation')).toBeInTheDocument();
    expect(screen.getByTestId('game-tree')).toBeInTheDocument();
  });

  it('shows Out path as not SPNE after Reveal', () => {
    render(<BackwardInductionGame />);
    fireEvent.click(screen.getByTestId('choose-out'));
    fireEvent.click(screen.getByTestId('reveal'));
    expect(screen.getByText('Not the SPNE choice')).toBeInTheDocument();
    expect(screen.getByText('+4')).toBeInTheDocument();
    expect(screen.getByTestId('rollback-annotation')).toBeInTheDocument();
  });

  it('advances through all rounds to the summary', () => {
    render(<BackwardInductionGame />);
    for (let i = 0; i < 5; i++) {
      playEnter();
      fireEvent.click(screen.getByTestId('next-round'));
    }
    expect(screen.getByText('Game Complete')).toBeInTheDocument();
    expect(screen.getByTestId('done-phase')).toBeInTheDocument();
    expect(screen.getByText('Play Again')).toBeInTheDocument();
  });

  it('resets the game from the summary screen', () => {
    render(<BackwardInductionGame />);
    for (let i = 0; i < 5; i++) {
      playEnter();
      fireEvent.click(screen.getByTestId('next-round'));
    }
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByText('You are the Entrant.')).toBeInTheDocument();
  });
});

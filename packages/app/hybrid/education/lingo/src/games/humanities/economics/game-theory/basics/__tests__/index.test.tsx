import { fireEvent, render, screen } from '@testing-library/react';
import { MatrixGame } from '../index';

describe('MatrixGame', () => {
  it('offers the six presets plus a challenge', () => {
    render(<MatrixGame />);
    expect(screen.getByTestId('game-select')).toBeInTheDocument();
    expect(screen.getByTestId('game-pd')).toBeInTheDocument();
    expect(screen.getByTestId('game-stag-hunt')).toBeInTheDocument();
    expect(screen.getByTestId('game-chicken')).toBeInTheDocument();
    expect(screen.getByTestId('game-coordination')).toBeInTheDocument();
    expect(screen.getByTestId('game-matching-pennies')).toBeInTheDocument();
    expect(screen.getByTestId('game-harmony')).toBeInTheDocument();
    expect(screen.getByTestId('game-challenge')).toBeInTheDocument();
  });

  it('loads a preset and renders the matrix and action pickers', () => {
    render(<MatrixGame />);
    fireEvent.click(screen.getByTestId('game-pd'));
    expect(screen.getByTestId('matrix')).toBeInTheDocument();
    expect(screen.getByTestId('row-action')).toBeInTheDocument();
    expect(screen.getByTestId('col-action')).toBeInTheDocument();
    expect(screen.getByTestId('cell-0-0')).toBeInTheDocument();
  });

  it('reveals the payoff pair once both actions are chosen', () => {
    render(<MatrixGame />);
    fireEvent.click(screen.getByTestId('game-pd'));
    fireEvent.click(screen.getByTestId('row-action-1'));
    fireEvent.click(screen.getByTestId('col-action-1'));
    expect(screen.getByTestId('review')).toBeInTheDocument();
    expect(screen.getByTestId('payoff-a')).toHaveTextContent('1');
    expect(screen.getByTestId('payoff-b')).toHaveTextContent('1');
    expect(screen.getByText(/Nash equilibrium/)).toBeInTheDocument();
  });

  it('scores a correct answer in quiz mode', () => {
    render(<MatrixGame />);
    fireEvent.click(screen.getByTestId('game-pd'));
    fireEvent.click(screen.getByTestId('start-quiz'));
    expect(screen.getByText('Find the NE')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('cell-1-1'));
    expect(screen.getByText(/Correct/)).toBeInTheDocument();
    expect(screen.getByText(/1 found in 1 tries/)).toBeInTheDocument();
  });

  it('marks a wrong quiz guess as a miss', () => {
    render(<MatrixGame />);
    fireEvent.click(screen.getByTestId('game-pd'));
    fireEvent.click(screen.getByTestId('start-quiz'));
    fireEvent.click(screen.getByTestId('cell-0-0'));
    expect(screen.getByText(/not a pure-strategy/)).toBeInTheDocument();
    expect(screen.getByText(/0 found in 1 tries/)).toBeInTheDocument();
  });

  it('resets back to the preset picker', () => {
    render(<MatrixGame />);
    fireEvent.click(screen.getByTestId('game-pd'));
    fireEvent.click(screen.getByTestId('reset-game'));
    expect(screen.getByTestId('game-select')).toBeInTheDocument();
  });
});

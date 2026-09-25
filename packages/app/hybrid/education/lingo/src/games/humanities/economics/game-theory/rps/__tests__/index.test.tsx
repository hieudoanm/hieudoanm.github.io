import { fireEvent, render, screen } from '@testing-library/react';
import { RpsGame } from '../index';
import { TOTAL_ROUNDS } from '../constants';
import type { Move } from '../types';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    botMove: (_id: unknown, _round: number, _history: Move[]) => 'scissors',
  };
});

const oneRound = (move: Move = 'rock'): void => {
  fireEvent.click(screen.getByTestId('bot-cycler'));
  fireEvent.click(screen.getByTestId(`move-${move}`));
};

const finishMatch = (move: Move = 'rock'): void => {
  fireEvent.click(screen.getByTestId('bot-cycler'));
  for (let round = 0; round < TOTAL_ROUNDS; round++) {
    fireEvent.click(screen.getByTestId(`move-${move}`));
    fireEvent.click(
      screen.getByRole('button', { name: /Next Round|See Results/ })
    );
  }
};

describe('RpsGame', () => {
  it('renders the strategy selector in the initial state', () => {
    render(<RpsGame />);
    expect(screen.getByText(/Pick a bot strategy:/)).toBeInTheDocument();
    expect(screen.getByTestId('bot-cycler')).toBeInTheDocument();
    expect(screen.getByTestId('bot-mirror')).toBeInTheDocument();
    expect(screen.getByTestId('bot-randomizer')).toBeInTheDocument();
    expect(screen.getByTestId('bot-statistician')).toBeInTheDocument();
  });

  it('shows move buttons after choosing a bot', () => {
    render(<RpsGame />);
    fireEvent.click(screen.getByTestId('bot-statistician'));
    expect(screen.getByTestId('move-rock')).toBeInTheDocument();
    expect(screen.getByTestId('move-paper')).toBeInTheDocument();
    expect(screen.getByTestId('move-scissors')).toBeInTheDocument();
  });

  it('reveals the result after playing a round', () => {
    render(<RpsGame />);
    oneRound('rock');
    expect(screen.getByText('You win +1')).toBeInTheDocument();
    expect(screen.getByText(/vs/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next Round' })
    ).toBeInTheDocument();
  });

  it('shows an exploitable hint after the first round', () => {
    render(<RpsGame />);
    oneRound();
    expect(screen.getByText(/pattern/i)).toBeInTheDocument();
  });

  it('reaches the results screen after all rounds', () => {
    render(<RpsGame />);
    finishMatch();
    expect(screen.getByText('Match over')).toBeInTheDocument();
    expect(screen.getByText(/your net score/i)).toBeInTheDocument();
    expect(screen.getByText(/zero-sum/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('shows See Results on the final reveal', () => {
    render(<RpsGame />);
    fireEvent.click(screen.getByTestId('bot-cycler'));
    for (let round = 0; round < TOTAL_ROUNDS - 1; round++) {
      fireEvent.click(screen.getByTestId('move-rock'));
      fireEvent.click(screen.getByRole('button', { name: 'Next Round' }));
    }
    fireEvent.click(screen.getByTestId('move-rock'));
    expect(
      screen.getByRole('button', { name: 'See Results' })
    ).toBeInTheDocument();
  });

  it('restarts from the results screen via Play Again', () => {
    render(<RpsGame />);
    finishMatch();
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(screen.getByText(/Pick a bot strategy:/)).toBeInTheDocument();
    expect(screen.queryByText('Match over')).toBeNull();
  });
});

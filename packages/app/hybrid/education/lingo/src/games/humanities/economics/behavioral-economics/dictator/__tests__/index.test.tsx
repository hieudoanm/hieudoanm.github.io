import { fireEvent, render, screen } from '@testing-library/react';
import { TOTAL_ROUNDS } from '../constants';
import { DictatorGame } from '../index';

const playRound = (give: number = 30) => {
  fireEvent.change(screen.getByTestId('give-slider'), {
    target: { value: String(give) },
  });
  fireEvent.click(screen.getByTestId('submit-give'));
};

const playFullGame = () => {
  for (let round = 0; round < TOTAL_ROUNDS; round++) {
    playRound();
    fireEvent.click(screen.getByTestId('next-round'));
  }
};

const expectRoundHeader = (round: number) => {
  expect(
    screen.getByText(
      (_, element) =>
        element?.textContent === `Round ${round} / ${TOTAL_ROUNDS}`
    )
  ).toBeInTheDocument();
};

describe('DictatorGame', () => {
  it('renders the choice screen', () => {
    render(<DictatorGame />);
    expectRoundHeader(1);
    expect(screen.getByTestId('give-slider')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Give' })).toBeInTheDocument();
  });

  it('reveals all four giving amounts after the player gives', () => {
    render(<DictatorGame />);
    playRound();
    expect(screen.getByText(/everyone's giving/)).toBeInTheDocument();
    expect(screen.getByText('Selfish Sam')).toBeInTheDocument();
    expect(screen.getByText('Fair Fanta')).toBeInTheDocument();
    expect(screen.getByText('Generous Gita')).toBeInTheDocument();
    expect(screen.getByText('$70')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next Round' })
    ).toBeInTheDocument();
  });

  it('reaches the results screen after all rounds', () => {
    render(<DictatorGame />);
    playFullGame();
    expect(screen.getByText(/Your average giving:/)).toBeInTheDocument();
    expect(screen.getByText(/AI benchmark:/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('restarts the game from the results screen', () => {
    render(<DictatorGame />);
    playFullGame();
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expectRoundHeader(1);
    expect(screen.getByTestId('give-slider')).toBeInTheDocument();
  });
});

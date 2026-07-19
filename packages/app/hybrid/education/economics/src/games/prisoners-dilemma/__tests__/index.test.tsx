import { fireEvent, render, screen } from '@testing-library/react';
import { PrisonerDilemma } from '../index';
import { TOTAL_ROUNDS } from '../constants';

jest.mock('../utils/game', () => {
  const actual = jest.requireActual('../utils/game');
  return { ...actual, pickStrategy: () => 'alwayscooperate' };
});

const renderGame = (): void => {
  render(<PrisonerDilemma />);
};

describe('PrisonerDilemma', () => {
  it('renders the payoff table and move buttons in the choose phase', () => {
    renderGame();
    expect(screen.getByText(/Round/)).toBeInTheDocument();
    expect(screen.getByText('1yr, 1yr')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Cooperate/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Defect/i })).toBeInTheDocument();
  });

  it('plays a round and shows the reveal with history', () => {
    renderGame();
    fireEvent.click(screen.getByRole('button', { name: /Defect/i }));
    expect(screen.getByText('VS')).toBeInTheDocument();
    expect(screen.getByText('+3 / +0')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next Round' })
    ).toBeInTheDocument();
  });

  it('scores mutual cooperation', () => {
    renderGame();
    fireEvent.click(screen.getByRole('button', { name: /Cooperate/i }));
    expect(screen.getByText('+1 / +1')).toBeInTheDocument();
  });

  it('finishes the match after all rounds and shows results', () => {
    renderGame();
    for (let round = 0; round < TOTAL_ROUNDS; round++) {
      fireEvent.click(screen.getByRole('button', { name: /Defect/i }));
      fireEvent.click(screen.getByRole('button', { name: /Next|Results/i }));
    }
    expect(screen.getByText('Bot won!')).toBeInTheDocument();
    expect(screen.getAllByText('30yr').length).toBe(2);
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/#(\d+)/).length).toBe(TOTAL_ROUNDS);
  });

  it('supports keyboard controls for moves, continue and reset', () => {
    const { container } = render(<PrisonerDilemma />);
    const board = container.firstElementChild as HTMLElement;
    const roundNumber = (): string =>
      container.querySelector('strong')?.textContent ?? '';

    fireEvent.keyDown(board, { key: 'c' });
    expect(screen.getByText('+1 / +1')).toBeInTheDocument();

    fireEvent.keyDown(board, { key: 'Enter' });
    expect(roundNumber()).toBe('2');

    fireEvent.keyDown(board, { key: 'd' });
    expect(screen.getByText('+3 / +0')).toBeInTheDocument();

    fireEvent.keyDown(board, { key: 'r' });
    expect(roundNumber()).toBe('1');
    expect(
      screen.getByRole('button', { name: /Cooperate/i })
    ).toBeInTheDocument();
  });

  it('restarts from the results screen via Play Again', () => {
    renderGame();
    for (let round = 0; round < TOTAL_ROUNDS; round++) {
      fireEvent.click(screen.getByRole('button', { name: /Cooperate/i }));
      fireEvent.click(screen.getByRole('button', { name: /Next|Results/i }));
    }
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(screen.getByRole('button', { name: /Cooperate/i }));
    expect(screen.queryByText('Bot won!')).toBeNull();
  });

  it('shows See Results on the final reveal', () => {
    renderGame();
    for (let round = 0; round < TOTAL_ROUNDS - 1; round++) {
      fireEvent.click(screen.getByRole('button', { name: /Cooperate/i }));
      fireEvent.click(screen.getByRole('button', { name: 'Next Round' }));
    }
    fireEvent.click(screen.getByRole('button', { name: /Cooperate/i }));
    expect(
      screen.getByRole('button', { name: 'See Results' })
    ).toBeInTheDocument();
  });
});

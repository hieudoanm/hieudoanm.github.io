import { fireEvent, render, screen } from '@testing-library/react';
import { PublicGoodsGame } from '../index';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    cooperateContribution: () => 100,
    freeRiderContribution: () => 0,
    conditionalContribution: () => 50,
    payoff: () => 50,
  };
});

const contribute = (value: string) => {
  fireEvent.change(screen.getByTestId('contribution-input'), {
    target: { value },
  });
  fireEvent.click(screen.getByTestId('contribute'));
};

const playRounds = (n: number, value = '100') => {
  for (let i = 0; i < n; i++) {
    contribute(value);
    fireEvent.click(
      screen.getByRole('button', { name: /Next Round|See Results/ })
    );
  }
};

describe('PublicGoodsGame', () => {
  it('renders the initial choose screen', () => {
    render(<PublicGoodsGame />);
    expect(
      screen.getByText(/How much will you contribute/)
    ).toBeInTheDocument();
    expect(screen.getByTestId('contribute')).toBeInTheDocument();
  });

  it('reveals contributions and payoffs after submitting', () => {
    render(<PublicGoodsGame />);
    contribute('100');
    expect(screen.getByText('Round 1 contribution')).toBeInTheDocument();
    expect(screen.getByText('Payoffs this round')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next Round' })
    ).toBeInTheDocument();
  });

  it('allows a zero contribution (free riding)', () => {
    render(<PublicGoodsGame />);
    contribute('0');
    expect(screen.getByText('Round 1 contribution')).toBeInTheDocument();
  });

  it('reaches the results screen after five rounds', () => {
    render(<PublicGoodsGame />);
    playRounds(5);
    expect(screen.getByText('Results')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
    expect(screen.getByText(/Rank/)).toBeInTheDocument();
    expect(screen.getByText(/public goods dilemma/)).toBeInTheDocument();
  });

  it('restarts the game from the results screen', () => {
    render(<PublicGoodsGame />);
    playRounds(5);
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(
      screen.getByText(/How much will you contribute/)
    ).toBeInTheDocument();
    expect(screen.queryByText('Results')).toBeNull();
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { OrderBookGame } from '../index';
import * as game from '../game';
import { TOTAL_ROUNDS } from '../constants';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return { ...actual, sampleStep: jest.fn(() => 1) };
});

const mockStep = (step: 1 | -1): void => {
  (game.sampleStep as jest.Mock).mockReturnValue(step);
};

const findByTextContent = (text: string): HTMLElement =>
  screen.getByText((content, element) => element?.textContent === text);

const finishGame = (): void => {
  for (let round = 0; round < TOTAL_ROUNDS; round++) {
    fireEvent.click(screen.getByTestId('action-buy-ask'));
    fireEvent.click(
      screen.getByRole('button', { name: /Next Round|See Results/ })
    );
  }
};

describe('OrderBookGame', () => {
  beforeEach(() => {
    mockStep(1);
  });

  it('renders the book and four actions in the choose phase', () => {
    render(<OrderBookGame />);
    expect(findByTextContent('Round 1 / 10')).toBeInTheDocument();
    expect(screen.getByText('Best ask')).toBeInTheDocument();
    expect(screen.getByText('Best bid')).toBeInTheDocument();
    expect(screen.getByText('98')).toBeInTheDocument();
    expect(screen.getByText('102')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Buy at ask 102/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sell at bid 98/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Post bid 101/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Post ask 101/ })
    ).toBeInTheDocument();
  });

  it('fills a market buy at the ask and reveals the new mid', () => {
    render(<OrderBookGame />);
    fireEvent.click(screen.getByTestId('action-buy-ask'));
    expect(screen.getByText('Bought at the ask for $102')).toBeInTheDocument();
    expect(findByTextContent('Mid price: 100 → 101')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next Round' })
    ).toBeInTheDocument();
  });

  it('fills a market sell at the bid when the mid falls', () => {
    mockStep(-1);
    render(<OrderBookGame />);
    fireEvent.click(screen.getByTestId('action-sell-bid'));
    expect(screen.getByText('Sold at the bid for $98')).toBeInTheDocument();
    expect(findByTextContent('Mid price: 100 → 99')).toBeInTheDocument();
  });

  it('fills a posted bid when the mid rises to its price', () => {
    render(<OrderBookGame />);
    fireEvent.click(screen.getByTestId('action-post-bid'));
    expect(screen.getByText('Limit buy filled at $101')).toBeInTheDocument();
    expect(findByTextContent('Spread cost so far: $0')).toBeInTheDocument();
  });

  it('leaves a posted limit resting when the mid moves away', () => {
    mockStep(-1);
    render(<OrderBookGame />);
    fireEvent.click(screen.getByTestId('action-post-bid'));
    expect(screen.getByText('Limit order not filled')).toBeInTheDocument();
  });

  it('reaches the results screen after all rounds', () => {
    render(<OrderBookGame />);
    finishGame();
    expect(screen.getByText('Order book results')).toBeInTheDocument();
    expect(findByTextContent('Final P&L: $35')).toBeInTheDocument();
    expect(findByTextContent('Volume: 10 lots')).toBeInTheDocument();
    expect(findByTextContent('Spread cost: $20')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('restarts the game from the results screen', () => {
    render(<OrderBookGame />);
    finishGame();
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(findByTextContent('Round 1 / 10')).toBeInTheDocument();
    expect(screen.queryByText('Order book results')).toBeNull();
  });
});

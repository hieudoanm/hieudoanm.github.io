import { fireEvent, render, screen } from '@testing-library/react';
import { AuctionGame } from '../index';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    sampleTrueValue: () => 100,
    sampleEstimate: (v: number) => v,
    planBids: () => [
      { botId: 'owl', estimate: 95, bid: 95 },
      { botId: 'fox', estimate: 80, bid: 70 },
      { botId: 'mouse', estimate: 70, bid: 53 },
    ],
  };
});

const playVickrey = () => {
  fireEvent.click(screen.getByTestId('format-vickrey'));
  return screen;
};

describe('AuctionGame', () => {
  it('lets the player pick a format', () => {
    render(<AuctionGame />);
    fireEvent.click(screen.getByTestId('format-english'));
    expect(screen.getByText(/Your private estimate/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Place Bid' })
    ).toBeInTheDocument();
  });

  it('reveals the auction outcome after a winning bid', () => {
    render(<AuctionGame />);
    fireEvent.click(screen.getByTestId('format-vickrey'));
    fireEvent.change(screen.getByTestId('bid-input'), {
      target: { value: '110' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Place Bid' }));
    expect(screen.getByText('You won the auction!')).toBeInTheDocument();
    expect(screen.getByText(/Your profit:/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next Round' })
    ).toBeInTheDocument();
  });

  it('rejects an empty or invalid bid', () => {
    render(<AuctionGame />);
    fireEvent.click(screen.getByTestId('format-vickrey'));
    fireEvent.click(screen.getByRole('button', { name: 'Place Bid' }));
    expect(screen.queryByText('You won the auction!')).toBeNull();
  });

  it('reaches the results screen after all rounds', () => {
    render(<AuctionGame />);
    for (let round = 0; round < 5; round++) {
      fireEvent.click(screen.getByTestId('format-vickrey'));
      fireEvent.change(screen.getByTestId('bid-input'), {
        target: { value: '110' },
      });
      fireEvent.click(screen.getByRole('button', { name: 'Place Bid' }));
      fireEvent.click(
        screen.getByRole('button', { name: /Next Round|See Results/ })
      );
    }
    expect(screen.getByText('Auction results')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('restarts the game from the results screen', () => {
    render(<AuctionGame />);
    for (let round = 0; round < 5; round++) {
      fireEvent.click(screen.getByTestId('format-vickrey'));
      fireEvent.click(screen.getByRole('button', { name: 'Place Bid' }));
      fireEvent.click(
        screen.getByRole('button', { name: /Next Round|See Results/ })
      );
    }
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(screen.getByText('Choose an auction format:')).toBeInTheDocument();
  });
});

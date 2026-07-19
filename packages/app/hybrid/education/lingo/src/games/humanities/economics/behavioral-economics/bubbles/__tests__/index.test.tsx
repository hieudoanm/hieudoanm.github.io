import { fireEvent, render, screen, within } from '@testing-library/react';
import { BubbleLabGame } from '../index';

const playRound = (action: 'buy' | 'sell' | 'hold') => {
  fireEvent.click(screen.getByTestId(action));
  fireEvent.click(screen.getByTestId('next'));
};

const playWholeEpisode = (action: 'buy' | 'sell' | 'hold') => {
  for (let round = 0; round < 8; round++) {
    playRound(action);
  }
};

describe('BubbleLabGame', () => {
  it('shows the board with price, value, cash, position and P/L', () => {
    render(<BubbleLabGame />);
    expect(screen.getByTestId('round')).toHaveTextContent('1');
    expect(screen.getByTestId('price')).toHaveTextContent('$33.00');
    expect(screen.getByTestId('value')).toHaveTextContent('$60.00');
    expect(screen.getByTestId('cash')).toHaveTextContent('$1,000.00');
    expect(screen.getByTestId('position')).toHaveTextContent('0');
    expect(screen.getByTestId('pnl')).toHaveTextContent('$0.00');
  });

  it('buys a unit and spends cash on the next round', () => {
    render(<BubbleLabGame />);
    fireEvent.click(screen.getByTestId('buy'));
    expect(screen.getByTestId('cash')).toHaveTextContent('$967.00');
    expect(screen.getByTestId('position')).toHaveTextContent('1');
  });

  it('locks in a profit when selling into the rise', () => {
    render(<BubbleLabGame />);
    playRound('buy');
    playRound('sell');
    expect(screen.getByTestId('position')).toHaveTextContent('0');
    expect(screen.getByTestId('cash')).toHaveTextContent('$1,009.00');
  });

  it('scores an episode and offers the next one', () => {
    render(<BubbleLabGame />);
    playWholeEpisode('hold');
    expect(
      screen.getByText('Episode 1 (value $60.00) complete.')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('next-episode'));
    expect(screen.getByTestId('round')).toHaveTextContent('1');
    expect(screen.getByTestId('value')).toHaveTextContent('$80.00');
  });

  it('reaches the results screen after both episodes', () => {
    render(<BubbleLabGame />);
    playWholeEpisode('hold');
    fireEvent.click(screen.getByTestId('next-episode'));
    playWholeEpisode('hold');
    expect(screen.getByText('Bubble Lab results')).toBeInTheDocument();
    expect(
      within(screen.getByTestId('results')).getByTestId('pnl')
    ).toHaveTextContent('$0.00');
  });

  it('restarts the game from the results screen', () => {
    render(<BubbleLabGame />);
    playWholeEpisode('hold');
    fireEvent.click(screen.getByTestId('next-episode'));
    playWholeEpisode('hold');
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('round')).toHaveTextContent('1');
    expect(screen.getByTestId('cash')).toHaveTextContent('$1,000.00');
  });
});

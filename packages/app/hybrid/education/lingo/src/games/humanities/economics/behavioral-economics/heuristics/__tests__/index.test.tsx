import { fireEvent, render, screen } from '@testing-library/react';
import { HeuristicsGame } from '../index';

const answer = (value: string) => {
  fireEvent.change(screen.getByTestId('guess-input'), {
    target: { value },
  });
  fireEvent.click(screen.getByTestId('submit-guess'));
};

const playThrough = () => {
  for (const guess of ['120', '500', '6', '2']) {
    answer(guess);
    fireEvent.click(screen.getByTestId('next-round'));
  }
  answer('40');
  answer('30');
  fireEvent.click(screen.getByTestId('next-round'));
  answer('50');
  fireEvent.click(screen.getByTestId('next-round'));
};

describe('HeuristicsGame', () => {
  it('renders the first anchored round', () => {
    render(<HeuristicsGame />);
    expect(
      screen.getByText('How many countries are in Africa?')
    ).toBeInTheDocument();
    expect(screen.getByTestId('anchor-panel')).toHaveTextContent(
      'A random number between 1 and 200: 120'
    );
  });

  it('reveals scored feedback after a guess', () => {
    render(<HeuristicsGame />);
    answer('54');
    expect(screen.getByTestId('feedback')).toHaveTextContent('+2 points');
    expect(screen.getByTestId('feedback')).toHaveTextContent(
      'The true answer is 54 countries'
    );
  });

  it('moves on to the next anchored round', () => {
    render(<HeuristicsGame />);
    answer('54');
    fireEvent.click(screen.getByTestId('next-round'));
    expect(screen.getByText(/Hurricane Sandy/)).toBeInTheDocument();
    expect(screen.getByTestId('anchor-panel')).toHaveTextContent('500');
  });

  it('drops the anchor banner on non-anchored rounds', () => {
    render(<HeuristicsGame />);
    answer('54');
    fireEvent.click(screen.getByTestId('next-round'));
    answer('233');
    fireEvent.click(screen.getByTestId('next-round'));
    expect(screen.queryByTestId('anchor-panel')).toBeNull();
  });

  it('shows the anchoring summary after all rounds', () => {
    render(<HeuristicsGame />);
    playThrough();
    const summary = screen.getByTestId('anchoring-summary');
    expect(summary).toHaveTextContent('166.5');
    expect(summary).toHaveTextContent(/control/);
    expect(screen.getByTestId('total-points')).toHaveTextContent('8');
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('restarts the game from the final report', () => {
    render(<HeuristicsGame />);
    playThrough();
    fireEvent.click(screen.getByTestId('play-again'));
    expect(
      screen.getByText('How many countries are in Africa?')
    ).toBeInTheDocument();
    expect(screen.getByTestId('total-points')).toHaveTextContent('0');
    expect(screen.getByTestId('round-progress')).toHaveTextContent(
      'Round 1 / 6'
    );
  });
});

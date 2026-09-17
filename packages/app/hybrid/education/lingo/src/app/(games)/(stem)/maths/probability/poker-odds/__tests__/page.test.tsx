import { render, screen } from '@testing-library/react';

import PokerOddsPage from '@/app/(games)/(stem)/maths/probability/poker-odds/page';

describe('PokerOddsPage', () => {
  it('names the game', () => {
    render(<PokerOddsPage />);

    expect(
      screen.getByRole('heading', { name: 'Poker Odds' })
    ).toBeInTheDocument();
  });

  it('describes what the simulation shows', () => {
    render(<PokerOddsPage />);

    expect(
      screen.getByText('Monte Carlo equity for a Texas Hold', { exact: false })
    ).toBeInTheDocument();
  });

  it('links back to the probability topic', () => {
    render(<PokerOddsPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Probability' })
    ).toHaveAttribute('href', '/maths/probability');
  });

  it('mounts the game inside the page', () => {
    render(<PokerOddsPage />);

    expect(screen.getByTestId('poker-players-3')).toBeInTheDocument();
  });
});

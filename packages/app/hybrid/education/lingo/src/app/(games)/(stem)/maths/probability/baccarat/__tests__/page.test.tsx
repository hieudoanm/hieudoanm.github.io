import { render, screen } from '@testing-library/react';

import BaccaratPage from '@/app/(games)/(stem)/maths/probability/baccarat/page';

describe('BaccaratPage', () => {
  it('names the game', () => {
    render(<BaccaratPage />);

    expect(
      screen.getByRole('heading', { name: 'Baccarat' })
    ).toBeInTheDocument();
  });

  it('describes what the simulation shows', () => {
    render(<BaccaratPage />);

    expect(
      screen.getByText('a payout table is only half of a bet', { exact: false })
    ).toBeInTheDocument();
  });

  it('links back to the probability topic', () => {
    render(<BaccaratPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Probability' })
    ).toHaveAttribute('href', '/maths/probability');
  });

  it('mounts the game inside the page', () => {
    render(<BaccaratPage />);

    expect(screen.getByTestId('baccarat-bet-player')).toBeInTheDocument();
  });
});

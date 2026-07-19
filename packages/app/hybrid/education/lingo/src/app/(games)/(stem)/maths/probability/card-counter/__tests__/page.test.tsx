import { render, screen } from '@testing-library/react';

import CardCounterPage from '@/app/(games)/(stem)/maths/probability/card-counter/page';

describe('CardCounterPage', () => {
  it('names the game', () => {
    render(<CardCounterPage />);

    expect(
      screen.getByRole('heading', { name: 'Card Counter' })
    ).toBeInTheDocument();
  });

  it('describes what the simulation shows', () => {
    render(<CardCounterPage />);

    expect(
      screen.getByText('Hi-Lo running count across a full deck', {
        exact: false,
      })
    ).toBeInTheDocument();
  });

  it('links back to the probability topic', () => {
    render(<CardCounterPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Probability' })
    ).toHaveAttribute('href', '/maths/probability');
  });

  it('mounts the game inside the page', () => {
    render(<CardCounterPage />);

    expect(screen.getByTestId('card-counter-deal')).toBeInTheDocument();
  });
});

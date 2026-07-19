import { render, screen } from '@testing-library/react';

import CrapsPage from '@/app/(games)/(stem)/maths/probability/craps/page';

describe('CrapsPage', () => {
  it('names the game', () => {
    render(<CrapsPage />);

    expect(screen.getByRole('heading', { name: 'Craps' })).toBeInTheDocument();
  });

  it('describes what the simulation shows', () => {
    render(<CrapsPage />);

    expect(
      screen.getByText(
        'the stated payout is honest and the edge hides in the rules',
        { exact: false }
      )
    ).toBeInTheDocument();
  });

  it('links back to the probability topic', () => {
    render(<CrapsPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Probability' })
    ).toHaveAttribute('href', '/maths/probability');
  });

  it('mounts the game inside the page', () => {
    render(<CrapsPage />);

    expect(screen.getByTestId('craps-roll')).toBeInTheDocument();
  });
});

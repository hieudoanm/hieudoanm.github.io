import { render, screen } from '@testing-library/react';

import OverUnderSevenPage from '@/app/(games)/(stem)/maths/probability/over-under-seven/page';

describe('OverUnderSevenPage', () => {
  it('names the game', () => {
    render(<OverUnderSevenPage />);

    expect(
      screen.getByRole('heading', { name: 'Over / Under Seven' })
    ).toBeInTheDocument();
  });

  it('describes what the simulation shows', () => {
    render(<OverUnderSevenPage />);

    expect(
      screen.getByText('2:1 is not the same thing as fifty-fifty', {
        exact: false,
      })
    ).toBeInTheDocument();
  });

  it('links back to the probability topic', () => {
    render(<OverUnderSevenPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Probability' })
    ).toHaveAttribute('href', '/maths/probability');
  });

  it('mounts the game inside the page', () => {
    render(<OverUnderSevenPage />);

    expect(screen.getByTestId('dice-bet-under')).toBeInTheDocument();
  });
});

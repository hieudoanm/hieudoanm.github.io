import { render, screen } from '@testing-library/react';

import RoulettePage from '@/app/(games)/(stem)/maths/probability/roulette/page';

describe('RoulettePage', () => {
  it('names the game', () => {
    render(<RoulettePage />);

    expect(
      screen.getByRole('heading', { name: 'Roulette' })
    ).toBeInTheDocument();
  });

  it('describes what the simulation shows', () => {
    render(<RoulettePage />);

    expect(
      screen.getByText(
        'the zero is what makes every outside bet a losing bet',
        { exact: false }
      )
    ).toBeInTheDocument();
  });

  it('links back to the probability topic', () => {
    render(<RoulettePage />);

    expect(
      screen.getByRole('link', { name: '← Back to Probability' })
    ).toHaveAttribute('href', '/maths/probability');
  });

  it('mounts the game inside the page', () => {
    render(<RoulettePage />);

    expect(screen.getByTestId('roulette-bet-red')).toBeInTheDocument();
  });
});

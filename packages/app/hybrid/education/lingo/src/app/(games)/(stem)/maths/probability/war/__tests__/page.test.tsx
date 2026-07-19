import { render, screen } from '@testing-library/react';

import WarPage from '@/app/(games)/(stem)/maths/probability/war/page';

describe('WarPage', () => {
  it('names the game', () => {
    render(<WarPage />);

    expect(screen.getByRole('heading', { name: 'War' })).toBeInTheDocument();
  });

  it('describes what the simulation shows', () => {
    render(<WarPage />);

    expect(
      screen.getByText('Higher card takes the pot', { exact: false })
    ).toBeInTheDocument();
  });

  it('links back to the probability topic', () => {
    render(<WarPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Probability' })
    ).toHaveAttribute('href', '/maths/probability');
  });

  it('mounts the game inside the page', () => {
    render(<WarPage />);

    expect(screen.getByTestId('war-play')).toBeInTheDocument();
  });
});

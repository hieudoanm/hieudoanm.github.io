import { render, screen } from '@testing-library/react';

import HiLoPage from '@/app/(games)/(stem)/maths/probability/hi-lo/page';

describe('HiLoPage', () => {
  it('names the game', () => {
    render(<HiLoPage />);

    expect(screen.getByRole('heading', { name: 'Hi-Lo' })).toBeInTheDocument();
  });

  it('describes what the simulation shows', () => {
    render(<HiLoPage />);

    expect(
      screen.getByText('odds that shift as the deck depletes', { exact: false })
    ).toBeInTheDocument();
  });

  it('links back to the probability topic', () => {
    render(<HiLoPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Probability' })
    ).toHaveAttribute('href', '/maths/probability');
  });

  it('mounts the game inside the page', () => {
    render(<HiLoPage />);

    expect(screen.getByTestId('hilo-higher')).toBeInTheDocument();
  });
});

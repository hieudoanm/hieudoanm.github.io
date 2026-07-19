import { render, screen } from '@testing-library/react';

import KenoPage from '@/app/(games)/(stem)/maths/probability/keno/page';

describe('KenoPage', () => {
  it('names the game', () => {
    render(<KenoPage />);

    expect(screen.getByRole('heading', { name: 'Keno' })).toBeInTheDocument();
  });

  it('describes what the simulation shows', () => {
    render(<KenoPage />);

    expect(
      screen.getByText('Pick up to five spots from eighty', { exact: false })
    ).toBeInTheDocument();
  });

  it('links back to the probability topic', () => {
    render(<KenoPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Probability' })
    ).toHaveAttribute('href', '/maths/probability');
  });

  it('mounts the game inside the page', () => {
    render(<KenoPage />);

    expect(screen.getByTestId('keno-auto')).toBeInTheDocument();
  });
});

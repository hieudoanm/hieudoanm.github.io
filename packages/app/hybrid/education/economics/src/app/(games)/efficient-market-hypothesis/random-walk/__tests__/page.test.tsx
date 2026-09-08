import RandomWalkPage from '@/app/(games)/efficient-market-hypothesis/random-walk/page';
import { render, screen } from '@testing-library/react';

describe('RandomWalkPage', () => {
  it('renders the random walk market game', () => {
    render(<RandomWalkPage />);
    expect(
      screen.getByRole('heading', { name: /Random Walk Market/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('emh-game')).toBeInTheDocument();
  });
});

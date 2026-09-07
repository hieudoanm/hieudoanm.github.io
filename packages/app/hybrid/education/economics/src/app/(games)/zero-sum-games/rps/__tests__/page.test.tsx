import RpsPage from '@/app/(games)/zero-sum-games/rps/page';
import { render, screen } from '@testing-library/react';

describe('RpsPage', () => {
  it('renders the rock-paper-scissors simulator', () => {
    render(<RpsPage />);
    expect(
      screen.getByRole('heading', { name: /Rock-Paper-Scissors/ })
    ).toBeInTheDocument();
    expect(screen.getByText(/Pick a bot strategy:/)).toBeInTheDocument();
  });
});

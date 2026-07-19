import { render, screen } from '@testing-library/react';
import WatchlistPage from '@/app/(templates)/mail/watchlist/page';

describe('WatchlistPage', () => {
  it('renders the WatchlistPage', () => {
    render(<WatchlistPage />);
    expect(
      screen.getByRole('heading', { name: 'Watchlist' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 symbols')).toBeInTheDocument();
  });
});

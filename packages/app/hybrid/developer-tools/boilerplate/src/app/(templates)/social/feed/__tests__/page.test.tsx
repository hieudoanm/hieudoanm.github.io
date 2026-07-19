import { render, screen } from '@testing-library/react';
import FeedPage from '@/app/(templates)/social/feed/page';

describe('FeedPage', () => {
  it('renders the feed page', () => {
    render(<FeedPage />);
    expect(screen.getByRole('heading', { name: 'Feed' })).toBeInTheDocument();
  });
});

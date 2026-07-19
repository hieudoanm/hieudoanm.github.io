import { render, screen } from '@testing-library/react';
import FavoritesPage from '@/app/(templates)/news/favorites/page';

describe('FavoritesPage', () => {
  it('renders the favorites page', () => {
    render(<FavoritesPage />);
    expect(
      screen.getByRole('heading', { name: 'Favorite Teams' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 favorite teams')).toBeInTheDocument();
  });
});

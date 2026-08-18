import { render, screen } from '@testing-library/react';
import CatalogPage from '@/app/(templates)/mail/catalog/page';

describe('CatalogPage', () => {
  it('renders the game catalog page', () => {
    render(<CatalogPage />);
    expect(
      screen.getByRole('heading', { name: 'Game Catalog' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 games')).toBeInTheDocument();
  });
});

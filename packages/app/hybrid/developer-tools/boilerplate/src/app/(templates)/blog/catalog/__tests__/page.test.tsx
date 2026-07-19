import { render, screen } from '@testing-library/react';
import CatalogPage from '@/app/(templates)/blog/catalog/page';

describe('CatalogPage', () => {
  it('renders the CourseCatalogPage', () => {
    render(<CatalogPage />);
    expect(screen.getByText('6 courses')).toBeInTheDocument();
  });
});

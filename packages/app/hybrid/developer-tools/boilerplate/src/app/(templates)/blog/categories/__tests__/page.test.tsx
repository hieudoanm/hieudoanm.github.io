import { render, screen } from '@testing-library/react';
import CategoriesPage from '@/app/(templates)/blog/categories/page';

describe('CategoriesPage', () => {
  it('renders the categories page', () => {
    render(<CategoriesPage />);
    expect(
      screen.getByRole('heading', { name: 'Categories' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Engineering/ })
    ).toBeInTheDocument();
  });
});

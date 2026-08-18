import { render, screen } from '@testing-library/react';
import NewsCategoriesPage from '@/app/(templates)/news/categories/page';

describe('NewsCategoriesPage', () => {
  it('renders the NewsCategoriesPage', () => {
    render(<NewsCategoriesPage />);
    expect(screen.getByText('6 categories')).toBeInTheDocument();
  });
});

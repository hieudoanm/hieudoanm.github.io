import { render, screen } from '@testing-library/react';
import PaginationPage from '@/app/(templates)/support/pagination/page';

describe('PaginationPage', () => {
  it('renders the pagination page', () => {
    render(<PaginationPage />);
    expect(
      screen.getByRole('heading', { name: 'Pagination' })
    ).toBeInTheDocument();
  });
});

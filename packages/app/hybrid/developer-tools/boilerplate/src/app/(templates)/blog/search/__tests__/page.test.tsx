import { render, screen } from '@testing-library/react';
import SearchPage from '@/app/(templates)/blog/search/page';

describe('SearchPage', () => {
  it('renders the search page', () => {
    render(<SearchPage />);
    expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByText('All posts')).toBeInTheDocument();
  });
});

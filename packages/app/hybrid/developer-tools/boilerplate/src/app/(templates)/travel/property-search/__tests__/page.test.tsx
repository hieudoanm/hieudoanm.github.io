import { render, screen } from '@testing-library/react';
import SearchPage from '@/app/(templates)/travel/property-search/page';

describe('SearchPage', () => {
  it('renders the search filters page', () => {
    render(<SearchPage />);
    expect(
      screen.getByRole('heading', { name: 'Search Filters' })
    ).toBeInTheDocument();
    expect(screen.getByText('Find your next property.')).toBeInTheDocument();
  });
});

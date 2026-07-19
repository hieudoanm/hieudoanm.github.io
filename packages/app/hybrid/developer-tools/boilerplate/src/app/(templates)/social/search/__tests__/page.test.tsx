import { render, screen } from '@testing-library/react';
import SearchPage from '@/app/(templates)/social/search/page';

describe('SearchPage', () => {
  it('renders the streaming search page', () => {
    render(<SearchPage />);
    expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByText('6 results')).toBeInTheDocument();
  });
});

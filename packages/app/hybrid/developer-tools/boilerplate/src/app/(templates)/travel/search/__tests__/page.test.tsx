import { render, screen } from '@testing-library/react';
import SearchPage from '@/app/(templates)/travel/search/page';

describe('SearchPage', () => {
  it('renders the booking search page', () => {
    render(<SearchPage />);
    expect(screen.getByText('4 results')).toBeInTheDocument();
  });
});

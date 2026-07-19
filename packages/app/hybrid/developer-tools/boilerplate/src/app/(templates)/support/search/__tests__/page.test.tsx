import { fireEvent, render, screen } from '@testing-library/react';
import SearchPage from '../page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/support/search',
}));

describe('SearchPage', () => {
  it('renders search and filters results', () => {
    render(<SearchPage />);
    expect(
      screen.getByPlaceholderText('Search pages, settings, and more...')
    ).toBeInTheDocument();
    fireEvent.change(
      screen.getByPlaceholderText('Search pages, settings, and more...'),
      {
        target: { value: 'pricing' },
      }
    );
    expect(screen.getByText('Pricing Plans')).toBeInTheDocument();
  });
});

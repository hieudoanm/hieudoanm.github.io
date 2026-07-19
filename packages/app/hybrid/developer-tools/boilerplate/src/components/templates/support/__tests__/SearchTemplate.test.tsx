import { fireEvent, render, screen } from '@testing-library/react';
import { SearchTemplate } from '../SearchTemplate';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('SearchTemplate', () => {
  it('shows recent searches when query is empty', () => {
    render(<SearchTemplate />);
    expect(screen.getByText('Recent searches')).toBeInTheDocument();
    expect(screen.getAllByText('Settings').length).toBeGreaterThan(0);
  });

  it('shows matching results for query', () => {
    render(<SearchTemplate />);
    fireEvent.change(
      screen.getByPlaceholderText('Search pages, settings, and more...'),
      {
        target: { value: 'Profile' },
      }
    );
    expect(screen.getByText('Profile Settings')).toBeInTheDocument();
    expect(screen.queryByText('Pricing Plans')).not.toBeInTheDocument();
  });

  it('shows no results state for unmatched query', () => {
    render(<SearchTemplate />);
    fireEvent.change(
      screen.getByPlaceholderText('Search pages, settings, and more...'),
      {
        target: { value: 'zzz' },
      }
    );
    expect(screen.getByText(/No results for/)).toBeInTheDocument();
  });

  it('clears query with clear button', () => {
    render(<SearchTemplate />);
    const input = screen.getByPlaceholderText(
      'Search pages, settings, and more...'
    );
    fireEvent.change(input, { target: { value: 'Store' } });
    fireEvent.click(screen.getByRole('button'));
    expect(input).toHaveValue('');
    expect(screen.getByText('Recent searches')).toBeInTheDocument();
  });
});

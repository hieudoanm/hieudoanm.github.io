import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';
import type { AppData } from '@/lib/downloads';

const mockApps: AppData[] = [
  {
    slug: 'test',
    label: 'Test App',
    primaryCategory: 'Utilities',
    secondaryCategory: 'Tools',
    section: 'hybrid',
    icon: 'PiPackage',
    href: '/app/test/',
    platforms: ['macos'],
    downloads: [],
    version: '1.0.0',
    lastUpdated: '2024-01-01',
    fileSize: '10 MB',
    screenshots: [],
  },
];

const defaultProps = {
  query: '',
  setQuery: jest.fn(),
  showSuggestions: false,
  setShowSuggestions: jest.fn(),
  suggestions: [],
  searchRef: { current: null },
};

describe('SearchBar', () => {
  it('renders search input', () => {
    render(<SearchBar {...defaultProps} />);
    expect(screen.getByPlaceholderText(/Search apps/)).toBeTruthy();
  });

  it('shows suggestions when provided', () => {
    render(
      <SearchBar
        {...defaultProps}
        suggestions={mockApps}
        showSuggestions={true}
      />
    );
    expect(screen.getByText('Test App')).toBeTruthy();
  });

  it('calls setQuery on input change', () => {
    const setQuery = jest.fn();
    render(<SearchBar {...defaultProps} setQuery={setQuery} />);
    fireEvent.change(screen.getByPlaceholderText(/Search apps/), {
      target: { value: 'test' },
    });
    expect(setQuery).toHaveBeenCalledWith('test');
  });
});

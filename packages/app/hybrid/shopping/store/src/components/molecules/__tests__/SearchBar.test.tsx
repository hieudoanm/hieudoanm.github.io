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

  it('highlights matching label in suggestions', () => {
    render(
      <SearchBar
        {...defaultProps}
        query="test"
        suggestions={mockApps}
        showSuggestions={true}
      />
    );
    const mark = screen.getByRole('mark');
    expect(mark).toHaveTextContent('Test');
  });

  it('shows recent searches when focused with empty query', () => {
    render(
      <SearchBar
        {...defaultProps}
        showSuggestions={true}
        history={[{ q: 'chess', ts: 1 }]}
      />
    );
    expect(screen.getByText('chess')).toBeTruthy();
    expect(screen.getByText('Recent searches')).toBeTruthy();
  });

  it('selecting a history entry sets the query', () => {
    const setQuery = jest.fn();
    const setShowSuggestions = jest.fn();
    render(
      <SearchBar
        {...defaultProps}
        setQuery={setQuery}
        setShowSuggestions={setShowSuggestions}
        showSuggestions={true}
        history={[{ q: 'chess', ts: 1 }]}
      />
    );
    fireEvent.click(screen.getByText('chess'));
    expect(setQuery).toHaveBeenCalledWith('chess');
    expect(setShowSuggestions).toHaveBeenCalledWith(true);
  });

  it('clears search history', () => {
    const onClearHistory = jest.fn();
    render(
      <SearchBar
        {...defaultProps}
        showSuggestions={true}
        history={[{ q: 'chess', ts: 1 }]}
        onClearHistory={onClearHistory}
      />
    );
    fireEvent.click(screen.getByLabelText('Clear search history'));
    expect(onClearHistory).toHaveBeenCalled();
  });

  it('submits the query on Enter', () => {
    const onSearch = jest.fn();
    render(<SearchBar {...defaultProps} query="chess" onSearch={onSearch} />);
    fireEvent.keyDown(screen.getByPlaceholderText(/Search apps/), {
      key: 'Enter',
    });
    expect(onSearch).toHaveBeenCalledWith('chess');
  });

  it('does not submit an empty query on Enter', () => {
    const onSearch = jest.fn();
    render(<SearchBar {...defaultProps} query="   " onSearch={onSearch} />);
    fireEvent.keyDown(screen.getByPlaceholderText(/Search apps/), {
      key: 'Enter',
    });
    expect(onSearch).not.toHaveBeenCalled();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GlobalSearchPanel } from '../GlobalSearchPanel';

jest.mock('../../utils/editor-languages', () => ({
  getFileIcon: jest.fn(() => null),
}));

describe('GlobalSearchPanel', () => {
  function makeProps(overrides = {}) {
    return {
      query: '',
      results: [],
      searching: false,
      onQueryChange: jest.fn(),
      onSearch: jest.fn(),
      onSelectFile: jest.fn(),
      onClose: jest.fn(),
      ...overrides,
    };
  }

  it('renders search input', () => {
    render(<GlobalSearchPanel {...makeProps()} />);
    expect(screen.getByPlaceholderText('Search files...')).toBeInTheDocument();
  });

  it('shows searching indicator', () => {
    render(<GlobalSearchPanel {...makeProps({ searching: true })} />);
    expect(screen.getByText('Searching...')).toBeInTheDocument();
  });

  it('shows no results message when query exists but no results', () => {
    render(
      <GlobalSearchPanel
        {...makeProps({ query: 'something', results: [], searching: false })}
      />
    );
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('renders search results', () => {
    const results = [
      { path: '/project/src/index.ts', line: 5, text: 'const x = 1' },
      { path: '/project/src/app.ts', line: 10, text: 'function foo()' },
    ];
    render(<GlobalSearchPanel {...makeProps({ results })} />);
    expect(screen.getByText('index.ts')).toBeInTheDocument();
    expect(screen.getByText('app.ts')).toBeInTheDocument();
    expect(screen.getByText('Ln 5')).toBeInTheDocument();
    expect(screen.getByText('Ln 10')).toBeInTheDocument();
    expect(screen.getByText('const x = 1')).toBeInTheDocument();
    expect(screen.getByText('function foo()')).toBeInTheDocument();
  });

  it('calls onSelectFile when a result is clicked', async () => {
    const onSelectFile = jest.fn();
    const results = [
      { path: '/project/src/index.ts', line: 1, text: 'content' },
    ];
    render(<GlobalSearchPanel {...makeProps({ results, onSelectFile })} />);
    await userEvent.click(screen.getByText('index.ts'));
    expect(onSelectFile).toHaveBeenCalledWith('/project/src/index.ts');
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = jest.fn();
    render(<GlobalSearchPanel {...makeProps({ onClose })} />);
    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[buttons.length - 1]);
    expect(onClose).toHaveBeenCalled();
  });

  describe('search triggers', () => {
    afterEach(() => {
      jest.useRealTimers();
    });

    it('debounces onSearch after typing', () => {
      jest.useFakeTimers();
      const onSearch = jest.fn();
      const onQueryChange = jest.fn();
      render(<GlobalSearchPanel {...makeProps({ onSearch, onQueryChange })} />);
      const input = screen.getByPlaceholderText('Search files...');
      fireEvent.change(input, { target: { value: 'react' } });
      expect(onQueryChange).toHaveBeenCalledWith('react');
      expect(onSearch).not.toHaveBeenCalled();
      jest.advanceTimersByTime(300);
      expect(onSearch).toHaveBeenCalledWith('react');
    });

    it('only searches the latest query when typing quickly', () => {
      jest.useFakeTimers();
      const onSearch = jest.fn();
      render(<GlobalSearchPanel {...makeProps({ onSearch })} />);
      const input = screen.getByPlaceholderText('Search files...');
      fireEvent.change(input, { target: { value: 'r' } });
      fireEvent.change(input, { target: { value: 're' } });
      jest.advanceTimersByTime(300);
      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith('re');
    });

    it('calls onSearch immediately on Enter', () => {
      const onSearch = jest.fn();
      render(
        <GlobalSearchPanel {...makeProps({ query: 'hooks', onSearch })} />
      );
      const input = screen.getByPlaceholderText('Search files...');
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(onSearch).toHaveBeenCalledWith('hooks');
    });

    it('calls onClose on Escape', () => {
      const onClose = jest.fn();
      render(<GlobalSearchPanel {...makeProps({ onClose })} />);
      const input = screen.getByPlaceholderText('Search files...');
      fireEvent.keyDown(input, { key: 'Escape' });
      expect(onClose).toHaveBeenCalled();
    });
  });
});

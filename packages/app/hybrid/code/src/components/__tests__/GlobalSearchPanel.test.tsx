import { render, screen } from '@testing-library/react';
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
});

import { fireEvent, render, screen } from '@testing-library/react';
import { SearchOverlay } from '../SearchOverlay';

const results = [
  { id: 'r1', label: 'Settings', description: 'General settings' },
];

describe('SearchOverlay', () => {
  it('renders nothing when closed', () => {
    render(<SearchOverlay open={false} onClose={jest.fn()} />);
    expect(screen.queryByTestId('search-overlay')).not.toBeInTheDocument();
  });

  it('renders results when open', () => {
    render(<SearchOverlay open onClose={jest.fn()} results={results} />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('General settings')).toBeInTheDocument();
  });

  it('fires onSearch while typing', () => {
    const onSearch = jest.fn();
    render(
      <SearchOverlay
        open
        onClose={jest.fn()}
        onSearch={onSearch}
        results={results}
      />
    );
    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'set' },
    });
    expect(onSearch).toHaveBeenCalledWith('set');
  });

  it('shows a no-results message for an unmatched query', () => {
    render(<SearchOverlay open onClose={jest.fn()} results={[]} />);
    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'xyz' },
    });
    expect(screen.getByText(/No results for “xyz”/)).toBeInTheDocument();
  });
});

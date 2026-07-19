import { fireEvent, render, screen } from '@testing-library/react';
import { StreamingSearchTemplate } from '../StreamingSearchTemplate';

describe('StreamingSearchTemplate', () => {
  it('renders all catalog results with type badges', () => {
    render(<StreamingSearchTemplate />);
    expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByText('6 results')).toBeInTheDocument();
    expect(screen.getByText('Neon Horizon')).toBeInTheDocument();
    expect(screen.getAllByText('Movie')).toHaveLength(3);
    expect(screen.getAllByText('Series')).toHaveLength(3);
  });

  it('filters results by search query', () => {
    render(<StreamingSearchTemplate />);
    fireEvent.change(screen.getByLabelText('Search titles'), {
      target: { value: 'neon' },
    });
    expect(screen.getByText('1 results')).toBeInTheDocument();
    expect(screen.getByText('Neon Horizon')).toBeInTheDocument();
    expect(screen.queryByText('The Last Signal')).not.toBeInTheDocument();
  });

  it('shows a no-results state for an unmatched query', () => {
    render(<StreamingSearchTemplate />);
    fireEvent.change(screen.getByLabelText('Search titles'), {
      target: { value: 'xyz' },
    });
    expect(screen.getByText('0 results')).toBeInTheDocument();
    expect(screen.getByText('No results for "xyz"')).toBeInTheDocument();
  });
});

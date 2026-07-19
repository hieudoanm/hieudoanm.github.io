import { fireEvent, render, screen } from '@testing-library/react';
import { MusicSearchTemplate } from '../MusicSearchTemplate';

describe('MusicSearchTemplate', () => {
  it('renders all results with a count', () => {
    render(<MusicSearchTemplate />);
    expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByLabelText('Search music')).toBeInTheDocument();
    expect(screen.getByText('5 results')).toBeInTheDocument();
    expect(screen.getByText('Golden Hour')).toBeInTheDocument();
    expect(screen.getByText('Aria Wells')).toBeInTheDocument();
  });

  it('filters results by title', () => {
    render(<MusicSearchTemplate />);
    fireEvent.change(screen.getByLabelText('Search music'), {
      target: { value: 'golden' },
    });
    expect(screen.getByText('1 results')).toBeInTheDocument();
    expect(screen.getByText('Golden Hour')).toBeInTheDocument();
    expect(screen.queryByText('City Lights')).not.toBeInTheDocument();
  });

  it('shows the no results state', () => {
    render(<MusicSearchTemplate />);
    fireEvent.change(screen.getByLabelText('Search music'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('0 results')).toBeInTheDocument();
    expect(screen.getByText('No results for "zzz"')).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { TvSeriesTemplate } from '../TvSeriesTemplate';

describe('TvSeriesTemplate', () => {
  it('renders series with seasons, episodes and rating', () => {
    render(<TvSeriesTemplate />);
    expect(screen.getByRole('heading', { name: 'Series' })).toBeInTheDocument();
    expect(screen.getByText('4 series')).toBeInTheDocument();
    expect(screen.getByText('Iron Sky')).toBeInTheDocument();
    expect(screen.getByText('3 seasons')).toBeInTheDocument();
    expect(screen.getByText('24 episodes')).toBeInTheDocument();
    expect(screen.getByText('4.7 rating')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'My list' })).toHaveLength(4);
  });

  it('adds a series to the list', () => {
    render(<TvSeriesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'My list' })[0]);
    expect(screen.getByRole('button', { name: 'Added' })).toBeInTheDocument();
    expect(screen.getAllByText('Added')).toHaveLength(2);
  });
});

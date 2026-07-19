import { render, screen } from '@testing-library/react';
import SeriesPage from '@/app/(templates)/media/series/page';

describe('SeriesPage', () => {
  it('renders the series page', () => {
    render(<SeriesPage />);
    expect(screen.getByRole('heading', { name: 'Series' })).toBeInTheDocument();
    expect(screen.getByText('4 series')).toBeInTheDocument();
  });
});

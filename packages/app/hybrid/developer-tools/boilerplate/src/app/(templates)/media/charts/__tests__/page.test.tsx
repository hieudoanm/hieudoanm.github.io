import { render, screen } from '@testing-library/react';
import ChartsPage from '@/app/(templates)/media/charts/page';

describe('ChartsPage', () => {
  it('renders the charts page', () => {
    render(<ChartsPage />);
    expect(screen.getByText('5 songs')).toBeInTheDocument();
  });
});

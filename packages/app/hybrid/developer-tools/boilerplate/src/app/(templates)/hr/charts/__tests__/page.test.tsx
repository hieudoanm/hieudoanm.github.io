import { render, screen } from '@testing-library/react';
import ChartsGalleryPage from '@/app/(templates)/hr/charts/page';

describe('ChartsGalleryPage', () => {
  it('renders the charts gallery page', () => {
    render(<ChartsGalleryPage />);
    expect(
      screen.getByRole('heading', { name: 'Charts gallery' })
    ).toBeInTheDocument();
  });
});

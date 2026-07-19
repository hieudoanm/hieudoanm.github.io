import { render, screen } from '@testing-library/react';
import MapPage from '@/app/(templates)/travel/map/page';

describe('MapPage', () => {
  it('renders the map view page', () => {
    render(<MapPage />);
    expect(
      screen.getByRole('heading', { name: 'Map View' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Explore neighborhoods by price.')
    ).toBeInTheDocument();
  });
});

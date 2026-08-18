import { fireEvent, render, screen } from '@testing-library/react';
import { MapViewTemplate } from '../MapViewTemplate';

describe('MapViewTemplate', () => {
  it('renders the map with neighborhoods', () => {
    render(<MapViewTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Map View' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Explore neighborhoods by price.')
    ).toBeInTheDocument();
    expect(screen.getByText('4 neighborhoods')).toBeInTheDocument();
    expect(screen.getByText('Maple Grove')).toBeInTheDocument();
    expect(screen.getByText('Riverside')).toBeInTheDocument();
    expect(screen.getByText('Downtown')).toBeInTheDocument();
    expect(screen.getByText('Birchwood Hills')).toBeInTheDocument();
    expect(screen.getByText('Avg. price $650K - $900K')).toBeInTheDocument();
    expect(screen.getByText('Standard view map area')).toBeInTheDocument();
    expect(screen.getByText('Map is closed')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Open map' })
    ).toBeInTheDocument();
  });

  it('toggles the map layer and open state', () => {
    render(<MapViewTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Satellite' }));
    expect(screen.getByText('Satellite view map area')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Standard' }));
    expect(screen.getByText('Standard view map area')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Open map' }));
    expect(screen.getByText('Map is open')).toBeInTheDocument();
  });
});

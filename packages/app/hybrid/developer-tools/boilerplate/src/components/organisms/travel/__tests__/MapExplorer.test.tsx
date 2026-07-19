import { fireEvent, render, screen } from '@testing-library/react';
import { MapExplorer } from '../MapExplorer';

const pins = [
  {
    id: 'p1',
    name: 'Cafe Hanoi',
    type: 'food' as const,
    coordinates: '21.0285, 105.8542',
  },
];

describe('MapExplorer', () => {
  it('renders the map area and pin count', () => {
    render(<MapExplorer pins={pins} />);
    expect(screen.getByText('Map area')).toBeInTheDocument();
    expect(screen.getByText('1 pins')).toBeInTheDocument();
  });

  it('renders pins with type badges and coordinates', () => {
    render(<MapExplorer pins={pins} />);
    expect(screen.getByText('Cafe Hanoi')).toBeInTheDocument();
    expect(screen.getByText('food')).toBeInTheDocument();
    expect(screen.getByText('21.0285, 105.8542')).toBeInTheDocument();
  });

  it('fires onSelect with the pin id', () => {
    const onSelect = jest.fn();
    render(<MapExplorer pins={pins} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Cafe Hanoi'));
    expect(onSelect).toHaveBeenCalledWith('p1');
  });
});

import { render, screen } from '@testing-library/react';
import { DestinationShowcase } from '../DestinationShowcase';

const destinations = [
  {
    id: 'd1',
    name: 'Kyoto',
    country: 'Japan',
    price: 1200,
    rating: 4.8,
    highlights: ['Temples', 'Gardens'],
  },
  {
    id: 'd2',
    name: 'Lisbon',
    country: 'Portugal',
    price: 900,
    rating: 4.6,
    highlights: ['Coast'],
  },
];

describe('DestinationShowcase', () => {
  it('renders destination names, countries and prices', () => {
    render(<DestinationShowcase destinations={destinations} />);
    expect(screen.getByText('Kyoto')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
    expect(screen.getByText('$1,200')).toBeInTheDocument();
    expect(screen.getByText('Lisbon')).toBeInTheDocument();
  });

  it('renders ratings and highlights', () => {
    render(<DestinationShowcase destinations={destinations} />);
    expect(screen.getAllByText(/★/).length).toBeGreaterThan(0);
    expect(screen.getByText('Temples')).toBeInTheDocument();
    expect(screen.getByText('Coast')).toBeInTheDocument();
  });
});

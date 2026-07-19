import { render, screen } from '@testing-library/react';
import { BrandSection } from '../BrandSection';

const brands = [
  { id: 'b1', name: 'Lumina', tagline: 'Lighting', featured: true },
  { id: 'b2', name: 'Nimbus' },
];

describe('BrandSection', () => {
  it('renders brand names and taglines', () => {
    render(<BrandSection brands={brands} />);
    expect(screen.getByText('Lumina')).toBeInTheDocument();
    expect(screen.getByText('Lighting')).toBeInTheDocument();
    expect(screen.getByText('Nimbus')).toBeInTheDocument();
  });

  it('marks featured brands', () => {
    render(<BrandSection brands={brands} />);
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });
});

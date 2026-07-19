import { render, screen } from '@testing-library/react';
import { Hemicycle } from '../Hemicycle';
import { Chamber } from '../../types';

const mockChamber: Chamber = {
  name: 'Test Chamber',
  totalSeats: 100,
  parties: [
    { name: 'Party A', abbreviation: 'A', color: '#ff0000', seats: 60 },
    { name: 'Party B', abbreviation: 'B', color: '#0000ff', seats: 40 },
  ],
};

describe('Hemicycle', () => {
  it('renders SVG element', () => {
    const { container } = render(<Hemicycle chamber={mockChamber} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders circles for each seat', () => {
    const { container } = render(<Hemicycle chamber={mockChamber} />);
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBe(100);
  });

  it('renders a horizontal line', () => {
    const { container } = render(<Hemicycle chamber={mockChamber} />);
    expect(container.querySelector('line')).toBeInTheDocument();
  });
});

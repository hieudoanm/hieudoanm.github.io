import { render, screen } from '@testing-library/react';
import { LocalGuides } from '../LocalGuides';

const guides = [
  {
    id: 'g1',
    name: 'Mai',
    city: 'Hanoi',
    languages: ['Vietnamese', 'English'],
    rating: 5,
    trips: 64,
  },
];

describe('LocalGuides', () => {
  it('renders guide names, cities and trip counts', () => {
    render(<LocalGuides guides={guides} />);
    expect(screen.getByText('Mai')).toBeInTheDocument();
    expect(screen.getByText('Hanoi')).toBeInTheDocument();
    expect(screen.getByText(/64 trips hosted/)).toBeInTheDocument();
  });

  it('renders languages spoken', () => {
    render(<LocalGuides guides={guides} />);
    expect(screen.getByText('Vietnamese')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { AdventureSection } from '../AdventureSection';

const activities = [
  {
    id: 'a1',
    name: 'Kayak tour',
    difficulty: 'easy' as const,
    price: 45,
    duration: '3 hours',
    rating: 4.8,
  },
  {
    id: 'a2',
    name: 'Peak climb',
    difficulty: 'hard' as const,
    price: 150,
    duration: '8 hours',
    rating: 4.9,
  },
];

describe('AdventureSection', () => {
  it('renders activity names, prices and durations', () => {
    render(<AdventureSection activities={activities} />);
    expect(screen.getByText('Kayak tour')).toBeInTheDocument();
    expect(screen.getByText('$45')).toBeInTheDocument();
    expect(screen.getByText('3 hours')).toBeInTheDocument();
    expect(screen.getByText('Peak climb')).toBeInTheDocument();
  });

  it('renders difficulty badges', () => {
    render(<AdventureSection activities={activities} />);
    expect(screen.getByText('easy')).toBeInTheDocument();
    expect(screen.getByText('hard')).toBeInTheDocument();
  });
});

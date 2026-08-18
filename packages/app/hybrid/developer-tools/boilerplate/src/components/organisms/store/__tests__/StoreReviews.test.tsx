import { render, screen } from '@testing-library/react';
import { StoreReviews } from '../StoreReviews';

const reviews = [
  {
    id: 'r1',
    author: 'Ana',
    rating: 5,
    title: 'Great quality',
    comment: 'Feels premium.',
    verified: true,
  },
  {
    id: 'r2',
    author: 'Ben',
    rating: 4,
    title: 'Good value',
    comment: 'Solid purchase.',
  },
];

describe('StoreReviews', () => {
  it('renders the average rating and review count', () => {
    render(<StoreReviews reviews={reviews} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders each review with its author', () => {
    render(<StoreReviews reviews={reviews} />);
    expect(screen.getByText('Great quality')).toBeInTheDocument();
    expect(screen.getByText('Ana')).toBeInTheDocument();
    expect(screen.getByText('Good value')).toBeInTheDocument();
  });

  it('marks verified reviews', () => {
    render(<StoreReviews reviews={reviews} />);
    expect(screen.getByText('Verified')).toBeInTheDocument();
  });

  it('shows an empty state when there are no reviews', () => {
    render(<StoreReviews reviews={[]} />);
    expect(screen.getByText('No reviews yet')).toBeInTheDocument();
  });
});

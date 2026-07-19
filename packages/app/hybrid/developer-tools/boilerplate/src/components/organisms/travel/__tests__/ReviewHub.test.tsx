import { render, screen } from '@testing-library/react';
import { ReviewHub } from '../ReviewHub';

const reviews = [
  {
    id: 'r1',
    author: 'Kim',
    rating: 5,
    destination: 'Osaka',
    title: 'Amazing food tour',
    comment: 'Best street food.',
  },
];

describe('ReviewHub', () => {
  it('renders the average rating and count', () => {
    render(<ReviewHub reviews={reviews} />);
    expect(screen.getByText('5.0')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders review titles and destinations', () => {
    render(<ReviewHub reviews={reviews} />);
    expect(screen.getByText('Amazing food tour')).toBeInTheDocument();
    expect(screen.getByText(/Kim · Osaka/)).toBeInTheDocument();
    expect(screen.getByText('Best street food.')).toBeInTheDocument();
  });

  it('shows an empty state when there are no reviews', () => {
    render(<ReviewHub reviews={[]} />);
    expect(screen.getByText('No reviews yet')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { ReviewCard } from '../ReviewCard';

describe('ReviewCard', () => {
  it('renders quote, author, and role', () => {
    render(<ReviewCard quote="Great product" author="Ada" role="Engineer" />);
    expect(screen.getByText(/Great product/)).toBeInTheDocument();
    expect(screen.getByText('Ada')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });

  it('renders the star rating', () => {
    render(<ReviewCard quote="Nice" author="Ada" rating={4} />);
    expect(
      screen.getByRole('img', { name: 'Rated 4 out of 5' })
    ).toBeInTheDocument();
  });

  it('clamps the rating to five stars', () => {
    render(<ReviewCard quote="Nice" author="Ada" rating={9} />);
    expect(
      screen.getByRole('img', { name: 'Rated 5 out of 5' })
    ).toBeInTheDocument();
  });

  it('renders initials when provided', () => {
    render(<ReviewCard quote="Nice" author="Ada Lovelace" initials="AL" />);
    expect(screen.getByText('AL')).toBeInTheDocument();
  });
});

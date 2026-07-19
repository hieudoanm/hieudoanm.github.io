import { render, screen } from '@testing-library/react';
import { StoreReviewCard } from '../StoreReviewCard';

describe('StoreReviewCard', () => {
  it('renders author initial, name and comment', () => {
    render(
      <StoreReviewCard author="Jane" rating={4} comment="Great quality!" />
    );
    expect(screen.getByText('J')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Great quality!')).toBeInTheDocument();
  });

  it('renders stars for the given rating', () => {
    render(<StoreReviewCard author="Jane" rating={4} comment="Nice" />);
    expect(screen.getByTestId('review-rating')).toHaveTextContent('★★★★');
    expect(screen.getByTestId('review-rating')).toHaveTextContent('☆');
  });

  it('shows verified badge and date when provided', () => {
    render(
      <StoreReviewCard
        author="Jane"
        rating={5}
        comment="Nice"
        verified
        date="Aug 2, 2026"
      />
    );
    expect(screen.getByText('Verified')).toBeInTheDocument();
    expect(screen.getByText('Aug 2, 2026')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import PerformanceReviewsPage from '@/app/(templates)/hr/reviews/page';

describe('PerformanceReviewsPage', () => {
  it('renders the PerformanceReviewsPage', () => {
    render(<PerformanceReviewsPage />);
    expect(screen.getByText('5 reviews')).toBeInTheDocument();
  });
});

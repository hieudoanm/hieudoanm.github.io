import { render, screen } from '@testing-library/react';
import { ReviewSummary } from '../ReviewSummary';

describe('ReviewSummary', () => {
  it('renders average, stars and review count', () => {
    render(<ReviewSummary average={4.4} count={128} />);
    expect(screen.getByTestId('review-average')).toHaveTextContent('4.4');
    expect(screen.getByText('128 reviews')).toBeInTheDocument();
  });

  it('renders a breakdown row per star level', () => {
    const breakdown = [
      { stars: 5, count: 80 },
      { stars: 4, count: 30 },
    ];
    render(<ReviewSummary average={4.6} count={110} breakdown={breakdown} />);
    expect(screen.getByTestId('review-breakdown')).toBeInTheDocument();
    expect(screen.getByText('5★')).toBeInTheDocument();
    expect(screen.getByText('4★')).toBeInTheDocument();
    expect(screen.getByTestId('review-bar-5')).toHaveAttribute('value', '80');
  });

  it('omits breakdown when not provided', () => {
    render(<ReviewSummary average={4} count={10} />);
    expect(screen.queryByTestId('review-breakdown')).not.toBeInTheDocument();
  });
});

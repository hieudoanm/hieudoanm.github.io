import { render, screen } from '@testing-library/react';
import { RatingCount } from '../RatingCount';

describe('RatingCount', () => {
  it('renders the rating with one decimal', () => {
    render(<RatingCount rating={4.5} count={120} />);
    expect(screen.getByTestId('rating-count')).toHaveTextContent('4.5');
  });

  it('renders the count in parentheses', () => {
    render(<RatingCount rating={4} count={120} />);
    expect(screen.getByTestId('rating-count')).toHaveTextContent('(120)');
  });

  it('renders a zero count', () => {
    render(<RatingCount rating={0} count={0} />);
    expect(screen.getByTestId('rating-count')).toHaveTextContent('(0)');
  });
});

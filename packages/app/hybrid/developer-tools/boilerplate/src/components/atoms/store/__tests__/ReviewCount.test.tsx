import { render, screen } from '@testing-library/react';
import { ReviewCount } from '../ReviewCount';

describe('ReviewCount', () => {
  it('renders the plural label for multiple reviews', () => {
    render(<ReviewCount count={128} />);
    expect(screen.getByTestId('review-count')).toHaveTextContent('128 reviews');
  });

  it('renders the singular label for one review', () => {
    render(<ReviewCount count={1} />);
    expect(screen.getByTestId('review-count')).toHaveTextContent('1 review');
  });

  it('renders a zero count', () => {
    render(<ReviewCount count={0} />);
    expect(screen.getByTestId('review-count')).toHaveTextContent('0 reviews');
  });
});

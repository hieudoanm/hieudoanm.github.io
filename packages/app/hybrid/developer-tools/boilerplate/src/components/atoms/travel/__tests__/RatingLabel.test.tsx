import { render, screen } from '@testing-library/react';
import { RatingLabel } from '../RatingLabel';

describe('RatingLabel', () => {
  it('renders the default label with the score', () => {
    render(<RatingLabel score={4.8} />);
    expect(screen.getByTestId('rating-label')).toHaveTextContent('Rating 4.8');
  });

  it('renders a custom label', () => {
    render(<RatingLabel score={4.2} label="Excellent" />);
    expect(screen.getByTestId('rating-label')).toHaveTextContent(
      'Excellent 4.2'
    );
  });

  it('applies the secondary badge class', () => {
    render(<RatingLabel score={5} />);
    expect(screen.getByTestId('rating-label')).toHaveClass('badge-secondary');
  });
});

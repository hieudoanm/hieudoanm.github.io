import { render, screen } from '@testing-library/react';
import { OnlineBadge } from '../OnlineBadge';

describe('OnlineBadge', () => {
  it('renders default online label', () => {
    render(<OnlineBadge />);
    expect(screen.getByTestId('online-badge')).toHaveTextContent('Online');
  });

  it('applies success badge class', () => {
    render(<OnlineBadge />);
    expect(screen.getByTestId('online-badge')).toHaveClass('badge-success');
  });

  it('renders name when provided', () => {
    render(<OnlineBadge name="Jane" />);
    expect(screen.getByTestId('online-badge')).toHaveTextContent(
      'Jane · Online'
    );
  });
});

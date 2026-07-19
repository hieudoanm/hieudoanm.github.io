import { render, screen } from '@testing-library/react';
import { UpdateBadge } from '../UpdateBadge';

describe('UpdateBadge', () => {
  it('renders default updated label', () => {
    render(<UpdateBadge />);
    expect(screen.getByTestId('update-badge')).toHaveTextContent('Updated');
  });

  it('applies success badge class', () => {
    render(<UpdateBadge />);
    expect(screen.getByTestId('update-badge')).toHaveClass('badge-success');
  });

  it('renders time when provided', () => {
    render(<UpdateBadge time="12:30 PM" />);
    expect(screen.getByTestId('update-badge')).toHaveTextContent('12:30 PM');
  });
});

import { render, screen } from '@testing-library/react';
import { BreakingBadge } from '../BreakingBadge';

describe('BreakingBadge', () => {
  it('renders default breaking label', () => {
    render(<BreakingBadge />);
    expect(screen.getByTestId('breaking-badge')).toHaveTextContent('Breaking');
  });

  it('applies error badge class', () => {
    render(<BreakingBadge />);
    expect(screen.getByTestId('breaking-badge')).toHaveClass('badge-error');
  });

  it('renders custom label', () => {
    render(<BreakingBadge label="Urgent" />);
    expect(screen.getByTestId('breaking-badge')).toHaveTextContent('Urgent');
  });
});

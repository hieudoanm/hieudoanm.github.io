import { render, screen } from '@testing-library/react';
import { AwardBadge } from '../AwardBadge';

describe('AwardBadge', () => {
  it('renders the award label', () => {
    render(<AwardBadge label="Top Performer" />);
    expect(screen.getByText('Top Performer')).toBeInTheDocument();
  });

  it('renders the default trophy icon', () => {
    render(<AwardBadge label="Best Team" />);
    expect(screen.getByText('🏅')).toBeInTheDocument();
  });

  it('applies the variant color class', () => {
    render(<AwardBadge label="Runner-up" variant="bronze" />);
    expect(screen.getByTestId('award-badge')).toHaveClass('badge-error');
  });

  it('renders a custom icon', () => {
    render(<AwardBadge label="MVP" icon="🌟" />);
    expect(screen.getByText('🌟')).toBeInTheDocument();
  });
});

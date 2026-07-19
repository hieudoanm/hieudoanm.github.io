import { render, screen } from '@testing-library/react';
import { LimitBadge } from '../LimitBadge';

describe('LimitBadge', () => {
  it('renders used and limit amounts', () => {
    render(<LimitBadge limit={1000} used={400} />);
    expect(screen.getByTestId('limit-badge')).toHaveTextContent(
      '$400 / $1,000'
    );
  });

  it('shows success when under the limit', () => {
    render(<LimitBadge limit={1000} used={400} />);
    expect(screen.getByTestId('limit-badge')).toHaveClass('badge-success');
  });

  it('shows error when the limit is exceeded', () => {
    render(<LimitBadge limit={1000} used={1200} />);
    expect(screen.getByTestId('limit-badge')).toHaveClass('badge-error');
  });

  it('defaults used to zero', () => {
    render(<LimitBadge limit={500} />);
    expect(screen.getByTestId('limit-badge')).toHaveTextContent('$0 / $500');
  });
});

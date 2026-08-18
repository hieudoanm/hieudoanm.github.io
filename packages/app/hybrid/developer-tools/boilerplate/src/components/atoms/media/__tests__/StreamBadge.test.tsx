import { render, screen } from '@testing-library/react';
import { StreamBadge } from '../StreamBadge';

describe('StreamBadge', () => {
  it('formats large counts compactly', () => {
    render(<StreamBadge count={1500000} />);
    expect(screen.getByTestId('stream-badge')).toHaveTextContent(
      '1.5M streams'
    );
  });

  it('renders plain counts below one thousand', () => {
    render(<StreamBadge count={950} />);
    expect(screen.getByTestId('stream-badge')).toHaveTextContent('950 streams');
  });

  it('applies the badge class', () => {
    render(<StreamBadge count={0} />);
    expect(screen.getByTestId('stream-badge')).toHaveClass('badge');
  });
});

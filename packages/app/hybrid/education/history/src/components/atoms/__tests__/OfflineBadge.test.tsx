import { render, screen } from '@testing-library/react';
import { OfflineBadge } from '../OfflineBadge';

describe('OfflineBadge', () => {
  it('renders nothing while online', () => {
    const { container } = render(<OfflineBadge />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows an offline badge when offline', () => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: false,
    });
    render(<OfflineBadge />);
    expect(screen.getByText('Offline')).toBeInTheDocument();
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: true,
    });
  });
});

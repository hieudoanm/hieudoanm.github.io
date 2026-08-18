import { fireEvent, render, screen } from '@testing-library/react';
import { Badge } from '../Badge';
import { OfflineBadge } from '../OfflineBadge';

describe('Badge', () => {
  it.each([
    ['info', 'badge-info'],
    ['success', 'badge-success'],
    ['warning', 'badge-warning'],
    ['error', 'badge-error'],
    ['neutral', 'badge-neutral'],
  ])('renders the %s variant', (variant, className) => {
    const { container } = render(<Badge variant={variant as 'info'}>x</Badge>);
    expect(container.firstChild).toHaveClass('badge', className);
  });

  it('defaults to neutral', () => {
    render(<Badge>plain</Badge>);
    expect(screen.getByText('plain')).toBeInTheDocument();
  });
});

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

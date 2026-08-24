import { fireEvent, render, screen } from '@testing-library/react';
import { Badge } from '../Badge';
import { Button } from '../Button';
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

describe('Button', () => {
  it('applies variant and size classes', () => {
    const { container, rerender } = render(
      <Button variant="outline" size="lg">
        big
      </Button>
    );
    expect(container.firstChild).toHaveClass('btn', 'btn-outline', 'btn-lg');

    rerender(
      <Button variant="ghost" size="sm">
        small
      </Button>
    );
    expect(screen.getByText('small')).toHaveClass('btn-sm');
  });

  it('forwards native props and handles clicks', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>go</Button>);
    fireEvent.click(screen.getByText('go'));
    expect(onClick).toHaveBeenCalled();
  });

  it('supports disabled state', () => {
    render(
      <Button disabled type="submit">
        blocked
      </Button>
    );
    expect((screen.getByText('blocked') as HTMLButtonElement).disabled).toBe(
      true
    );
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

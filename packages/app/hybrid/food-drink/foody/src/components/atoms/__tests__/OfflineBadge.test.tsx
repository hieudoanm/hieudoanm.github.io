import { render, screen } from '@testing-library/react';
import { OfflineBadge } from '../OfflineBadge';

const setOnline = (value: boolean) => {
  Object.defineProperty(navigator, 'onLine', {
    configurable: true,
    value,
  });
};

afterEach(() => {
  setOnline(true);
});

describe('OfflineBadge', () => {
  it('renders nothing while online', () => {
    setOnline(true);
    const { container } = render(<OfflineBadge />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows an offline badge when offline', () => {
    setOnline(false);
    render(<OfflineBadge />);
    expect(screen.getByText('Offline')).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { OfflineBanner } from '../OfflineBanner';

const setOnLine = (online: boolean) => {
  Object.defineProperty(navigator, 'onLine', {
    configurable: true,
    value: online,
  });
};

describe('OfflineBanner', () => {
  beforeEach(() => {
    setOnLine(true);
  });

  it('renders nothing when online', () => {
    render(<OfflineBanner />);
    expect(screen.queryByText(/You are offline/)).toBeNull();
  });

  it('renders the banner when offline', () => {
    setOnLine(false);
    render(<OfflineBanner />);
    expect(screen.getByText(/You are offline/)).toBeInTheDocument();
  });

  it('appears on the offline event', () => {
    render(<OfflineBanner />);
    fireEvent(window, new Event('offline'));
    expect(screen.getByText(/You are offline/)).toBeInTheDocument();
  });

  it('disappears on the online event', () => {
    setOnLine(false);
    render(<OfflineBanner />);
    fireEvent(window, new Event('online'));
    expect(screen.queryByText(/You are offline/)).toBeNull();
  });

  it('removes listeners on unmount', () => {
    const { unmount } = render(<OfflineBanner />);
    unmount();
    fireEvent(window, new Event('offline'));
    expect(screen.queryByText(/You are offline/)).toBeNull();
  });
});

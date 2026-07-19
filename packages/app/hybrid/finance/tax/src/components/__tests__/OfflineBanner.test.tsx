import { render, screen, fireEvent } from '@testing-library/react';
import OfflineBanner from '../OfflineBanner';

describe('OfflineBanner', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'onLine', { value: true, writable: true });
  });

  it('renders nothing when online', () => {
    const { container } = render(<OfflineBanner />);
    expect(container.firstChild).toBeNull();
  });

  it('renders banner when offline event fires', () => {
    render(<OfflineBanner />);
    fireEvent(window, new Event('offline'));
    expect(screen.getByText('You are offline')).toBeTruthy();
  });

  it('hides banner when online event fires', () => {
    Object.defineProperty(navigator, 'onLine', {
      value: false,
      writable: true,
    });
    render(<OfflineBanner />);
    expect(screen.getByText('You are offline')).toBeTruthy();

    Object.defineProperty(navigator, 'onLine', { value: true, writable: true });
    fireEvent(window, new Event('online'));
    expect(screen.queryByText('You are offline')).toBeNull();
  });

  it('renders when navigator.onLine is false initially', () => {
    Object.defineProperty(navigator, 'onLine', {
      value: false,
      writable: true,
    });
    render(<OfflineBanner />);
    expect(screen.getByText('You are offline')).toBeTruthy();
  });
});

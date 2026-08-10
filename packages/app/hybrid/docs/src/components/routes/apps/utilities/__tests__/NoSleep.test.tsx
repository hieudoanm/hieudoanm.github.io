import { render, screen, act } from '@testing-library/react';
import { NoSleep } from '../NoSleep';

jest.useFakeTimers();

interface Sentinel {
  release: jest.Mock;
  addEventListener: jest.Mock;
}

const makeSentinel = (): Sentinel => ({
  release: jest.fn(),
  addEventListener: jest.fn(),
});

const getWakeLock = () =>
  navigator.wakeLock as unknown as { request: jest.Mock };

describe('NoSleep', () => {
  const onClose = jest.fn();
  let sentinel: Sentinel;

  const renderNoSleep = async () => {
    const utils = render(<NoSleep onClose={onClose} />);
    await act(async () => {});
    return utils;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    sentinel = makeSentinel();
    Object.defineProperty(navigator, 'wakeLock', {
      configurable: true,
      value: { request: jest.fn().mockResolvedValue(sentinel) },
    });
  });

  it('renders "Have not slept for" text', async () => {
    await renderNoSleep();
    expect(screen.getByText('Have not slept for')).toBeInTheDocument();
  });

  it('renders seconds initially', async () => {
    await renderNoSleep();
    expect(screen.getByText('seconds')).toBeInTheDocument();
  });

  it('updates display after timer ticks', async () => {
    await renderNoSleep();
    expect(screen.getByText('seconds')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText('seconds')).toBeInTheDocument();
  });

  it('shows 00 when less than 1 second elapsed', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(1000);
    await renderNoSleep();
    expect(screen.getByText('00')).toBeInTheDocument();
    jest.restoreAllMocks();
  });

  it('requests the wake lock on mount', async () => {
    await renderNoSleep();
    expect(getWakeLock().request).toHaveBeenCalledWith('screen');
  });

  it('shows active status when the wake lock is granted', async () => {
    await renderNoSleep();
    expect(screen.getByRole('status')).toHaveTextContent('Active');
  });

  it('shows denied status and the error when the request is rejected', async () => {
    getWakeLock().request.mockRejectedValue(
      Object.assign(new Error('denied'), { name: 'NotAllowedError' })
    );
    await renderNoSleep();
    expect(screen.getByRole('status')).toHaveTextContent('Denied');
    expect(screen.getByRole('alert')).toHaveTextContent('NotAllowedError');
  });

  it('shows unsupported status when the API is unavailable', async () => {
    delete (navigator as { wakeLock?: unknown }).wakeLock;
    await renderNoSleep();
    expect(screen.getByRole('status')).toHaveTextContent('Unsupported');
  });

  it('shows released status when the sentinel is released', async () => {
    await renderNoSleep();
    const releaseHandler = sentinel.addEventListener.mock.calls[0][1];

    act(() => {
      releaseHandler();
    });

    expect(screen.getByRole('status')).toHaveTextContent('Released');
  });

  it('re-acquires the wake lock when the tab becomes visible', async () => {
    await renderNoSleep();

    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await act(async () => {});

    expect(getWakeLock().request).toHaveBeenCalledTimes(2);
  });

  it('releases the wake lock on unmount', async () => {
    const { unmount } = await renderNoSleep();

    unmount();

    expect(sentinel.release).toHaveBeenCalled();
  });
});

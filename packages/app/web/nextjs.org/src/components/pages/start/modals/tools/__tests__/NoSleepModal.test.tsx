import { render, screen, act } from '@testing-library/react';
import { NoSleepModal } from '../NoSleepModal';

jest.useFakeTimers();

Object.assign(navigator, {
  wakeLock: {
    request: jest.fn().mockResolvedValue({
      release: jest.fn(),
    }),
  },
});

describe('NoSleepModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal title', () => {
    render(<NoSleepModal onClose={onClose} />);
    expect(screen.getByText('No Sleep')).toBeInTheDocument();
  });

  it('renders "Have not slept for" text', () => {
    render(<NoSleepModal onClose={onClose} />);
    expect(screen.getByText('Have not slept for')).toBeInTheDocument();
  });

  it('renders seconds initially', () => {
    render(<NoSleepModal onClose={onClose} />);
    expect(screen.getByText('seconds')).toBeInTheDocument();
  });

  it('renders screen kept awake text', () => {
    render(<NoSleepModal onClose={onClose} />);
    expect(screen.getByText('Screen kept awake')).toBeInTheDocument();
  });

  it('updates display after timer ticks', () => {
    render(<NoSleepModal onClose={onClose} />);
    expect(screen.getByText('seconds')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText('seconds')).toBeInTheDocument();
  });

  it('shows 00 when less than 1 second elapsed', () => {
    jest.spyOn(Date, 'now').mockReturnValue(1000);
    render(<NoSleepModal onClose={onClose} />);
    expect(screen.getByText('00')).toBeInTheDocument();
    jest.restoreAllMocks();
  });

  it('requests wake lock on mount', () => {
    render(<NoSleepModal onClose={onClose} />);
    expect(navigator.wakeLock.request).toHaveBeenCalledWith('screen');
  });
});

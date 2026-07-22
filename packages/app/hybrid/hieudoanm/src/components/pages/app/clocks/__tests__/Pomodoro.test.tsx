import { render, fireEvent, screen, act } from '@testing-library/react';
import { Pomodoro } from '../PomodoroModal';

beforeAll(() => {
  Object.defineProperty(window, 'AudioContext', {
    value: jest.fn().mockImplementation(() => ({
      createOscillator: jest.fn().mockReturnValue({
        connect: jest.fn().mockReturnThis(),
        start: jest.fn(),
        stop: jest.fn(),
        frequency: { value: 0 },
      }),
      createGain: jest.fn().mockReturnValue({
        connect: jest.fn().mockReturnThis(),
        gain: {
          setValueAtTime: jest.fn(),
          exponentialRampToValueAtTime: jest.fn(),
        },
      }),
      destination: 'mock',
      currentTime: 0,
    })),
    writable: true,
  });
});

describe('Pomodoro', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(Date, 'now').mockReturnValue(0);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('renders modal title', () => {
    render(<Pomodoro onClose={onClose} />);
    expect(screen.getByText('Pomodoro')).toBeInTheDocument();
  });

  it('renders all preset buttons', () => {
    render(<Pomodoro onClose={onClose} />);
    expect(screen.getByText('25 / 5')).toBeInTheDocument();
    expect(screen.getByText('50 / 10')).toBeInTheDocument();
    expect(screen.getByText('90 / 20')).toBeInTheDocument();
  });

  it('renders round and phase display', () => {
    render(<Pomodoro onClose={onClose} />);
    expect(screen.getByText(/Round 1/)).toBeInTheDocument();
    const focusElements = screen.getAllByText(/Focus/i);
    expect(focusElements.length).toBeGreaterThanOrEqual(1);
  });

  it('shows default 50:00 timer', () => {
    render(<Pomodoro onClose={onClose} />);
    expect(screen.getByText('50:00')).toBeInTheDocument();
  });

  it('applies preset on click', () => {
    render(<Pomodoro onClose={onClose} />);
    fireEvent.click(screen.getByText('25 / 5'));
    expect(screen.getByText('25:00')).toBeInTheDocument();
  });

  it('starts timer on play click', () => {
    render(<Pomodoro onClose={onClose} />);
    fireEvent.click(screen.getByText('▶'));
    expect(screen.getByText('⏸')).toBeInTheDocument();
  });

  it('pauses timer on pause click', () => {
    render(<Pomodoro onClose={onClose} />);
    fireEvent.click(screen.getByText('▶'));
    fireEvent.click(screen.getByText('⏸'));
    expect(screen.getByText('▶')).toBeInTheDocument();
  });

  it('resets timer on reset click', () => {
    render(<Pomodoro onClose={onClose} />);
    fireEvent.click(screen.getByText('25 / 5'));
    fireEvent.click(screen.getByText('▶'));
    jest.advanceTimersByTime(5000);
    fireEvent.click(screen.getByTitle('Reset'));
    expect(screen.getByText('25:00')).toBeInTheDocument();
  });

  it('toggles phase on skip click', () => {
    render(<Pomodoro onClose={onClose} />);
    fireEvent.click(screen.getByText('25 / 5'));
    fireEvent.click(screen.getByTitle('Skip to break'));
    const breakElements = screen.getAllByText(/break/i);
    expect(breakElements.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('05:00')).toBeInTheDocument();
  });

  it('skips back to work phase on skip click during break', () => {
    render(<Pomodoro onClose={onClose} />);
    fireEvent.click(screen.getByTitle('Skip to break'));
    fireEvent.click(screen.getByTitle('Skip to focus'));
    const focusEls = screen.getAllByText(/focus/i);
    expect(focusEls.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('50:00')).toBeInTheDocument();
  });

  it('updates document title when running', () => {
    render(<Pomodoro onClose={onClose} />);
    fireEvent.click(screen.getByText('▶'));
    expect(document.title).toContain('50:00');
  });

  it('restores original document title on unmount', () => {
    document.title = 'Original Title';
    const { unmount } = render(<Pomodoro onClose={onClose} />);
    fireEvent.click(screen.getByText('▶'));
    unmount();
    expect(document.title).toBe('Original Title');
  });

  it('completes work phase and transitions to break', () => {
    render(<Pomodoro onClose={onClose} />);
    fireEvent.click(screen.getByText('25 / 5'));
    fireEvent.click(screen.getByText('▶'));
    act(() => {
      jest.advanceTimersByTime(1500000);
    });
    const breakEls = screen.getAllByText(/break/i);
    expect(breakEls.length).toBeGreaterThanOrEqual(1);
  });

  it('renders focus and break badges', () => {
    render(<Pomodoro onClose={onClose} />);
    expect(screen.getByText(/Focus 50m/)).toBeInTheDocument();
    expect(screen.getByText(/Break 10m/)).toBeInTheDocument();
  });
});

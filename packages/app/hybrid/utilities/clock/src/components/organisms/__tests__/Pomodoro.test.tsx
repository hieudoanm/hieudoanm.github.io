import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pomodoro } from '../Pomodoro';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

beforeAll(() => {
  const mockCtx = {
    createOscillator: jest.fn(() => ({
      connect: jest.fn(),
      frequency: { value: 0 },
      start: jest.fn(),
      stop: jest.fn(),
    })),
    createGain: jest.fn(() => ({
      connect: jest.fn(),
      gain: {
        setValueAtTime: jest.fn(),
        exponentialRampToValueAtTime: jest.fn(),
      },
    })),
    destination: {},
    currentTime: 0,
  };
  (global as Record<string, unknown>).AudioContext = jest.fn(() => mockCtx);
  (global as Record<string, unknown>).webkitAudioContext = jest.fn(
    () => mockCtx
  );
});

describe('Pomodoro', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the component', () => {
    render(<Pomodoro />);
    expect(screen.getByText(/Round/)).toBeInTheDocument();
  });

  it('shows default preset (50/10)', () => {
    render(<Pomodoro />);
    expect(screen.getByText('50:00')).toBeInTheDocument();
  });

  it('shows focus phase by default', () => {
    render(<Pomodoro />);
    expect(screen.getByText('focus')).toBeInTheDocument();
  });

  it('renders all preset buttons', () => {
    render(<Pomodoro />);
    expect(screen.getByText('25 / 5')).toBeInTheDocument();
    expect(screen.getByText('50 / 10')).toBeInTheDocument();
    expect(screen.getByText('90 / 20')).toBeInTheDocument();
  });

  it('switches preset when clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Pomodoro />);
    await user.click(screen.getByText('25 / 5'));
    expect(screen.getByText('25:00')).toBeInTheDocument();
  });

  it('starts and pauses timer', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Pomodoro />);
    await user.click(screen.getByText('▶'));
    expect(screen.getByText('⏸')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('49:59')).toBeInTheDocument();
  });

  it('resets timer', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Pomodoro />);
    await user.click(screen.getByText('▶'));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.getByText('49:57')).toBeInTheDocument();
    await user.click(screen.getByText('↺'));
    expect(screen.getByText('50:00')).toBeInTheDocument();
  });

  it('toggles phase', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Pomodoro />);
    await user.click(screen.getByText('⏭'));
    expect(screen.getByText('break')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  it('shows focus and break badges', () => {
    render(<Pomodoro />);
    expect(screen.getByText('Focus 50m')).toBeInTheDocument();
    expect(screen.getByText('Break 10m')).toBeInTheDocument();
  });

  it('completes work phase and switches to break', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Pomodoro />);
    await user.click(screen.getByText('25 / 5'));
    await user.click(screen.getByText('▶'));
    act(() => {
      jest.advanceTimersByTime(25 * 60 * 1000);
    });
    expect(screen.getByText('break')).toBeInTheDocument();
    expect(screen.getByText('05:00')).toBeInTheDocument();
  });

  it('updates document title while running', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Pomodoro />);
    await user.click(screen.getByText('▶'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(document.title).toContain('49:59');
  });

  it('shows break badge active during break phase', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Pomodoro />);
    await user.click(screen.getByText('⏭'));
    const breakBadge = screen.getByText('Break 10m');
    expect(breakBadge.className).toContain('badge-success');
  });
});

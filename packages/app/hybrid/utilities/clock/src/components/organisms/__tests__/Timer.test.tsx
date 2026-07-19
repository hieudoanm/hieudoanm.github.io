import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Timer } from '../Timer';

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

describe('Timer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the component', () => {
    render(<Timer />);
    expect(screen.getByText('05:00')).toBeInTheDocument();
  });

  it('renders all preset buttons', () => {
    render(<Timer />);
    expect(screen.getByText('1 min')).toBeInTheDocument();
    expect(screen.getAllByText('5 min').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('10 min')).toBeInTheDocument();
    expect(screen.getByText('15 min')).toBeInTheDocument();
    expect(screen.getByText('30 min')).toBeInTheDocument();
    expect(screen.getByText('60 min')).toBeInTheDocument();
  });

  it('switches preset when clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Timer />);
    await user.click(screen.getByText('10 min'));
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  it('starts and pauses timer', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Timer />);
    await user.click(screen.getByText('▶'));
    expect(screen.getByText('⏸')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('04:59')).toBeInTheDocument();
  });

  it('resets timer', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Timer />);
    await user.click(screen.getByText('▶'));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    await user.click(screen.getByText('↺'));
    expect(screen.getByText('05:00')).toBeInTheDocument();
  });

  it('shows remaining label', () => {
    render(<Timer />);
    expect(screen.getByText('remaining')).toBeInTheDocument();
  });

  it('shows preset badge', () => {
    render(<Timer />);
    const badges = screen.getAllByText('5 min');
    expect(badges.length).toBeGreaterThanOrEqual(2);
  });

  it('completes timer and shows done', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Timer />);
    await user.click(screen.getByText('1 min'));
    await user.click(screen.getByText('▶'));
    act(() => {
      jest.advanceTimersByTime(60 * 1000);
    });
    expect(screen.getByText('done')).toBeInTheDocument();
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('resets after completion when play is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Timer />);
    await user.click(screen.getByText('1 min'));
    await user.click(screen.getByText('▶'));
    act(() => {
      jest.advanceTimersByTime(60 * 1000);
    });
    expect(screen.getByText('done')).toBeInTheDocument();
    await user.click(screen.getByText('▶'));
    expect(screen.getByText('01:00')).toBeInTheDocument();
    expect(screen.getByText('remaining')).toBeInTheDocument();
  });

  it('updates document title while running', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Timer />);
    await user.click(screen.getByText('▶'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(document.title).toContain('4:59');
  });
});

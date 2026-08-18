import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Stopwatch } from '../Stopwatch';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Stopwatch', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.requestAnimationFrame = (cb) =>
      setTimeout(() => cb(Date.now()), 0) as unknown as number;
    global.cancelAnimationFrame = (id) =>
      clearTimeout(id as unknown as NodeJS.Timeout);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the component', () => {
    render(<Stopwatch />);
    expect(screen.getByText('00:00.00')).toBeInTheDocument();
  });

  it('starts and pauses stopwatch', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Stopwatch />);
    await user.click(screen.getByText('▶'));
    expect(screen.getByText('⏸')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    expect(screen.getByText('00:01.50')).toBeInTheDocument();
  });

  it('resets stopwatch', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Stopwatch />);
    await user.click(screen.getByText('▶'));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    await user.click(screen.getByText('⏸'));
    await user.click(screen.getByText('↺'));
    expect(screen.getByText('00:00.00')).toBeInTheDocument();
  });

  it('records laps', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Stopwatch />);
    await user.click(screen.getByText('▶'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await user.click(screen.getByText('🏁'));
    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('Lap')).toBeInTheDocument();
    expect(screen.getByText('Split')).toBeInTheDocument();
  });

  it('shows lap table with correct data', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<Stopwatch />);
    await user.click(screen.getByText('▶'));
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    await user.click(screen.getByText('🏁'));
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    await user.click(screen.getByText('🏁'));
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(3);
  });
});

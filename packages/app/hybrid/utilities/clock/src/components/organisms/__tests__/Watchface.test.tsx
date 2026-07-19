import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WatchFaces } from '../WatchFaces';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('WatchFaces', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the component', () => {
    render(<WatchFaces />);
    expect(screen.getByText('DOT')).toBeInTheDocument();
    expect(screen.getByText('MINIMAL')).toBeInTheDocument();
  });

  it('starts in dot mode', () => {
    render(<WatchFaces />);
    const dotBtn = screen.getByText('DOT');
    expect(dotBtn.className).toContain('btn-primary');
  });

  it('switches to minimal mode', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<WatchFaces />);
    await user.click(screen.getByText('MINIMAL'));
    const minimalBtn = screen.getByText('MINIMAL');
    expect(minimalBtn.className).toContain('btn-primary');
  });

  it('displays time in minimal mode', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<WatchFaces />);
    await user.click(screen.getByText('MINIMAL'));
    expect(screen.getAllByText(':').length).toBeGreaterThanOrEqual(2);
  });
});

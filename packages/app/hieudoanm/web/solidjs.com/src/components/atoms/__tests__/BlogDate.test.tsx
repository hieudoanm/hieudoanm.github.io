import { render, screen } from '@solidjs/testing-library';
import { BlogDate } from '../BlogDate';

describe('BlogDate', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-30T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders in short format by default', () => {
    render(() => <BlogDate date="2026-05-15" />);
    expect(screen.getByText('May 15, 2026')).toBeInTheDocument();
  });

  it('renders in long format', () => {
    render(() => <BlogDate date="2026-05-15" format="long" />);
    expect(screen.getByText('May 15, 2026')).toBeInTheDocument();
  });

  it('renders relative time for today', () => {
    render(() => <BlogDate date="2026-05-30" format="relative" />);
    expect(screen.getByText('Today')).toBeInTheDocument();
  });

  it('renders relative time for yesterday', () => {
    render(() => <BlogDate date="2026-05-29" format="relative" />);
    expect(screen.getByText('Yesterday')).toBeInTheDocument();
  });

  it('renders relative time for days ago', () => {
    render(() => <BlogDate date="2026-05-25" format="relative" />);
    expect(screen.getByText('5 days ago')).toBeInTheDocument();
  });

  it('renders as a time element with datetime attribute', () => {
    render(() => <BlogDate date="2026-05-15" />);
    const time = screen.getByText('May 15, 2026');
    expect(time.tagName).toBe('TIME');
    expect(time).toHaveAttribute('datetime', '2026-05-15');
  });
});

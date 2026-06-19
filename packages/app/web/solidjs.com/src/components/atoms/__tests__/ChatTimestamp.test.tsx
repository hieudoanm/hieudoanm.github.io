import { render, screen } from '@solidjs/testing-library';
import { ChatTimestamp } from '../ChatTimestamp';

describe('ChatTimestamp', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-30T14:30:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows only time for today timestamps', () => {
    const today = new Date('2026-05-30T10:15:00Z').getTime();
    render(() => <ChatTimestamp timestamp={today} />);
    expect(screen.getByText(/10:15|05:15/)).toBeInTheDocument();
  });

  it('shows date and time for past timestamps', () => {
    const past = new Date('2026-05-25T09:00:00Z').getTime();
    render(() => <ChatTimestamp timestamp={past} />);
    expect(screen.getByText(/May 25/)).toBeInTheDocument();
  });
});

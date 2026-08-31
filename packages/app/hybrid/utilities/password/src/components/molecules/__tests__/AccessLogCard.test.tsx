import { render, screen } from '@testing-library/react';
import { AccessLogCard } from '@/components/molecules/AccessLogCard';

describe('AccessLogCard', () => {
  it('renders access entries with action labels', () => {
    render(
      <AccessLogCard
        entries={[
          { action: 'view', timestamp: Date.now() - 1000 },
          { action: 'copy', timestamp: Date.now() - 1000, detail: 'Password' },
          { action: 'share', timestamp: Date.now() - 1000, detail: 'a@b.com' },
        ]}
      />
    );
    expect(screen.getByText('Access Log')).toBeInTheDocument();
    expect(screen.getByText(/^Viewed/)).toBeInTheDocument();
    expect(screen.getByText(/^Copied Password$/)).toBeInTheDocument();
    expect(screen.getByText(/^Shared with a@b\.com$/)).toBeInTheDocument();
  });

  it('shows the empty state', () => {
    render(<AccessLogCard entries={[]} />);
    expect(screen.getByText('No activity recorded yet')).toBeInTheDocument();
  });
});

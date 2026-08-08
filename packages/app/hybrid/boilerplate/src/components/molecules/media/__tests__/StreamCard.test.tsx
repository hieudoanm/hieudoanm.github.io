import { fireEvent, render, screen } from '@testing-library/react';
import { StreamCard } from '../StreamCard';

describe('StreamCard', () => {
  it('renders title, platform and status', () => {
    render(<StreamCard title="Coding" platform="Twitch" status="live" />);
    expect(screen.getByText('Coding')).toBeInTheDocument();
    expect(screen.getByText('Twitch')).toBeInTheDocument();
    expect(screen.getByText('live')).toBeInTheDocument();
  });

  it('shows a viewers badge when live with viewers', () => {
    render(
      <StreamCard
        title="Coding"
        platform="Twitch"
        status="live"
        viewers={500}
      />
    );
    expect(screen.getByText('👁 500')).toBeInTheDocument();
  });

  it('applies the correct status class per variant', () => {
    const { rerender } = render(
      <StreamCard title="Coding" platform="Twitch" status="live" />
    );
    expect(screen.getByText('live')).toHaveClass('badge-error');
    rerender(
      <StreamCard title="Coding" platform="Twitch" status="scheduled" />
    );
    expect(screen.getByText('scheduled')).toHaveClass('badge-warning');
    rerender(<StreamCard title="Coding" platform="Twitch" status="offline" />);
    expect(screen.getByText('offline')).toHaveClass('badge-neutral');
  });

  it('calls onWatch when clicked', () => {
    const onWatch = jest.fn();
    render(<StreamCard title="Coding" platform="Twitch" onWatch={onWatch} />);
    fireEvent.click(screen.getByTestId('stream-card'));
    expect(onWatch).toHaveBeenCalledTimes(1);
  });
});

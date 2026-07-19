import { fireEvent, render, screen } from '@testing-library/react';
import { VideoCard } from '../VideoCard';

describe('VideoCard', () => {
  it('renders title, channel, views and duration', () => {
    render(
      <VideoCard title="How to X" channel="Tech" views="10K" duration="12:30" />
    );
    expect(screen.getByText('How to X')).toBeInTheDocument();
    expect(screen.getByText('Tech · 10K views')).toBeInTheDocument();
    expect(screen.getByText('12:30')).toBeInTheDocument();
  });

  it('renders placeholder when no thumbnail', () => {
    render(
      <VideoCard title="How to X" channel="Tech" views="1K" duration="1:00" />
    );
    expect(screen.getByText('▶')).toBeInTheDocument();
  });

  it('calls onPlay when clicked', () => {
    const onPlay = jest.fn();
    render(
      <VideoCard
        title="How to X"
        channel="Tech"
        views="1K"
        duration="1:00"
        onPlay={onPlay}
      />
    );
    fireEvent.click(screen.getByTestId('video-card'));
    expect(onPlay).toHaveBeenCalledTimes(1);
  });
});

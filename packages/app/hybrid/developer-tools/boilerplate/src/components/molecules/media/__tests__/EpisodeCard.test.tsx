import { fireEvent, render, screen } from '@testing-library/react';
import { EpisodeCard } from '../EpisodeCard';

describe('EpisodeCard', () => {
  it('renders show, title and duration', () => {
    render(<EpisodeCard title="Episode 1" show="My Show" duration="45 min" />);
    expect(screen.getByText('My Show')).toBeInTheDocument();
    expect(screen.getByText('Episode 1')).toBeInTheDocument();
    expect(screen.getByText('45 min')).toBeInTheDocument();
  });

  it('renders a progress bar when progress is provided', () => {
    render(
      <EpisodeCard
        title="Episode 1"
        show="My Show"
        duration="45 min"
        progress={60}
      />
    );
    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '60');
  });

  it('calls onPlay when play button clicked', () => {
    const onPlay = jest.fn();
    render(
      <EpisodeCard
        title="Episode 1"
        show="My Show"
        duration="45 min"
        onPlay={onPlay}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Play episode' }));
    expect(onPlay).toHaveBeenCalledTimes(1);
  });
});

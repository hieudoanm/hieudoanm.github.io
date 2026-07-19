import { fireEvent, render, screen } from '@testing-library/react';
import { VideoStory } from '../VideoStory';

describe('VideoStory', () => {
  it('renders title, duration and channel', () => {
    render(
      <VideoStory
        title="Inside the summit"
        duration="4:32"
        channel="News Desk"
      />
    );
    expect(screen.getByText('Inside the summit')).toBeInTheDocument();
    expect(screen.getByText('4:32')).toBeInTheDocument();
    expect(screen.getByText('News Desk')).toBeInTheDocument();
  });

  it('renders views when provided', () => {
    render(<VideoStory title="Highlights" duration="1:10" views="12K views" />);
    expect(screen.getByText('12K views')).toBeInTheDocument();
  });

  it('renders a link when href is provided', () => {
    render(<VideoStory title="Report" duration="2:00" href="/video/report" />);
    expect(screen.getByRole('link', { name: 'Report' })).toHaveAttribute(
      'href',
      '/video/report'
    );
  });

  it('fires onPlay when the play button is clicked', () => {
    const onPlay = jest.fn();
    render(<VideoStory title="Live" duration="0:30" onPlay={onPlay} />);
    fireEvent.click(screen.getByRole('button', { name: 'Play video' }));
    expect(onPlay).toHaveBeenCalledTimes(1);
  });
});

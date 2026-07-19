import { fireEvent, render, screen } from '@testing-library/react';
import { VideoCatalog } from '../VideoCatalog';

const videos = [
  { id: 'v1', title: 'Night Sessions', category: 'Music', duration: 4200 },
  { id: 'v2', title: 'Studio Tour', category: 'Docs', duration: 900 },
];

describe('VideoCatalog', () => {
  it('renders video titles, categories and durations', () => {
    render(<VideoCatalog videos={videos} />);
    expect(screen.getByText('Night Sessions')).toBeInTheDocument();
    expect(screen.getByText('Docs')).toBeInTheDocument();
    expect(screen.getByText('1h 10m')).toBeInTheDocument();
    expect(screen.getByText('15m')).toBeInTheDocument();
  });

  it('uses the provided title heading', () => {
    render(<VideoCatalog videos={videos} title="Live sets" />);
    expect(
      screen.getByRole('heading', { name: 'Live sets' })
    ).toBeInTheDocument();
  });

  it('fires onPlay with the video id', () => {
    const onPlay = jest.fn();
    render(<VideoCatalog videos={videos} onPlay={onPlay} />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Play Night Sessions' })
    );
    expect(onPlay).toHaveBeenCalledWith('v1');
  });

  it('renders an empty grid for no videos', () => {
    render(<VideoCatalog videos={[]} />);
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { ReelsGrid } from '../ReelsGrid';

const reels = [
  {
    id: 'r1',
    title: 'Morning run',
    views: 1200,
    likes: 84,
    duration: '0:45',
  },
  {
    id: 'r2',
    title: 'Cooking pasta',
    views: 3400,
    likes: 210,
    duration: '1:20',
  },
];

describe('ReelsGrid', () => {
  it('renders each reel title and view count', () => {
    render(<ReelsGrid reels={reels} />);
    expect(screen.getByText('Morning run')).toBeInTheDocument();
    expect(screen.getByText(/1,200 views/)).toBeInTheDocument();
    expect(screen.getByText('Cooking pasta')).toBeInTheDocument();
  });

  it('fires onPlay with the reel id', () => {
    const onPlay = jest.fn();
    render(<ReelsGrid reels={reels} onPlay={onPlay} />);
    fireEvent.click(screen.getByText('Morning run'));
    expect(onPlay).toHaveBeenCalledWith('r1');
  });

  it('shows an empty state when there are no reels', () => {
    render(<ReelsGrid reels={[]} />);
    expect(screen.getByText('No reels available')).toBeInTheDocument();
  });
});

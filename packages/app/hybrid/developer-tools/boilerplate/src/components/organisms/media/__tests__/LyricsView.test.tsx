import { fireEvent, render, screen } from '@testing-library/react';
import { LyricsView } from '../LyricsView';

const lines = [
  { id: 'l1', time: 12, text: 'Driving through the night' },
  { id: 'l2', time: 18, text: 'Chasing every light' },
  { id: 'l3', time: 24, text: 'Neon in my eyes' },
];

describe('LyricsView', () => {
  it('renders lyric lines with timestamps', () => {
    render(<LyricsView lines={lines} />);
    expect(screen.getByText('Driving through the night')).toBeInTheDocument();
    expect(screen.getByText('0:12')).toBeInTheDocument();
    expect(screen.getByText('Neon in my eyes')).toBeInTheDocument();
  });

  it('highlights the active line by default', () => {
    render(<LyricsView lines={lines} activeIndex={1} />);
    expect(screen.getByTestId('lyric-l2')).toHaveClass('text-primary');
    expect(screen.getByTestId('lyric-l2')).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByTestId('lyric-l1')).not.toHaveClass('text-primary');
  });

  it('moves the highlight when a line is selected', () => {
    const onSelect = jest.fn();
    render(<LyricsView lines={lines} onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('lyric-l3'));
    expect(screen.getByTestId('lyric-l3')).toHaveClass('text-primary');
    expect(screen.getByTestId('lyric-l1')).not.toHaveClass('text-primary');
    expect(onSelect).toHaveBeenCalledWith(2);
  });

  it('shows an empty message when there are no lines', () => {
    render(<LyricsView lines={[]} />);
    expect(screen.getByText('No lyrics available.')).toBeInTheDocument();
  });
});

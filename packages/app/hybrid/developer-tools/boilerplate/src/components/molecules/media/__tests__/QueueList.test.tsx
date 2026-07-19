import { fireEvent, render, screen } from '@testing-library/react';
import { QueueList } from '../QueueList';

const tracks = [
  { id: '1', title: 'First', artist: 'A', duration: '3:00' },
  { id: '2', title: 'Second', artist: 'B', duration: '4:00' },
];

describe('QueueList', () => {
  it('renders all queued tracks', () => {
    render(<QueueList tracks={tracks} />);
    expect(screen.getAllByTestId('queue-track')).toHaveLength(2);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('highlights the current track', () => {
    render(<QueueList tracks={tracks} currentId="2" />);
    const rows = screen.getAllByTestId('queue-track');
    expect(rows[1]).toHaveClass('bg-primary/10');
    expect(rows[0]).not.toHaveClass('bg-primary/10');
  });

  it('calls onSelect with the track id', () => {
    const onSelect = jest.fn();
    render(<QueueList tracks={tracks} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('First'));
    expect(onSelect).toHaveBeenCalledWith('1');
  });

  it('renders nothing when empty', () => {
    render(<QueueList tracks={[]} />);
    expect(screen.getByTestId('queue-list')).toBeEmptyDOMElement();
  });
});

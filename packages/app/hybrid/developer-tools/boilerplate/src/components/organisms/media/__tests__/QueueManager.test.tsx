import { fireEvent, render, screen } from '@testing-library/react';
import { QueueManager } from '../QueueManager';

const items = [
  { id: 'q1', title: 'Horizon', artist: 'Mono Wave' },
  { id: 'q2', title: 'Pulse', artist: 'Blue Hour' },
  { id: 'q3', title: 'Echo', artist: 'Rae Silva' },
];

describe('QueueManager', () => {
  it('renders queued items in order', () => {
    render(<QueueManager items={items} />);
    expect(screen.getByText('Horizon')).toBeInTheDocument();
    expect(screen.getByText('Blue Hour')).toBeInTheDocument();
    expect(screen.getByText('Up next (3)')).toBeInTheDocument();
  });

  it('removes an item when the remove button is clicked', () => {
    const onRemove = jest.fn();
    render(<QueueManager items={items} onRemove={onRemove} />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove Horizon' }));
    expect(screen.queryByText('Horizon')).not.toBeInTheDocument();
    expect(onRemove).toHaveBeenCalledWith('q1');
  });

  it('reorders an item when move down is clicked', () => {
    const onMove = jest.fn();
    render(<QueueManager items={items} onMove={onMove} />);
    fireEvent.click(screen.getByRole('button', { name: 'Move Horizon down' }));
    expect(onMove).toHaveBeenCalledWith('q1', 'down');
    expect(screen.getByText('Up next (3)')).toBeInTheDocument();
  });

  it('clears the queue and shows the empty state', () => {
    const onClear = jest.fn();
    render(<QueueManager items={items} onClear={onClear} />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.getByText('Queue is empty')).toBeInTheDocument();
    expect(onClear).toHaveBeenCalled();
  });
});

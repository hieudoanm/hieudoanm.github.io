import { fireEvent, render, screen } from '@testing-library/react';
import { DownloadManager } from '../DownloadManager';

const downloads = [
  {
    id: 'dl1',
    title: 'Night Drive.mp3',
    size: '8.4 MB',
    progress: 45,
    status: 'downloading' as const,
  },
  {
    id: 'dl2',
    title: 'Static Coast.s01e01.mp4',
    size: '640 MB',
    progress: 100,
    status: 'complete' as const,
  },
];

describe('DownloadManager', () => {
  it('renders download titles, sizes and progress', () => {
    render(<DownloadManager downloads={downloads} />);
    expect(screen.getByText('Night Drive.mp3')).toBeInTheDocument();
    expect(screen.getByText('8.4 MB')).toBeInTheDocument();
    expect(screen.getByText('45%')).toBeInTheDocument();
    expect(screen.getByText('640 MB')).toBeInTheDocument();
  });

  it('shows status badges per item', () => {
    render(<DownloadManager downloads={downloads} />);
    expect(screen.getByTestId('status-dl1')).toHaveTextContent('downloading');
    expect(screen.getByTestId('status-dl2')).toHaveTextContent('complete');
    expect(screen.getByTestId('status-dl2')).toHaveClass('badge-success');
  });

  it('pauses and resumes a download', () => {
    const onPause = jest.fn();
    render(<DownloadManager downloads={downloads} onPause={onPause} />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Pause Night Drive.mp3' })
    );
    expect(screen.getByTestId('status-dl1')).toHaveTextContent('paused');
    expect(onPause).toHaveBeenCalledWith('dl1', true);
    fireEvent.click(
      screen.getByRole('button', { name: 'Resume Night Drive.mp3' })
    );
    expect(screen.getByTestId('status-dl1')).toHaveTextContent('downloading');
    expect(onPause).toHaveBeenCalledWith('dl1', false);
  });

  it('fires onCancel and shows an empty state for no downloads', () => {
    const onCancel = jest.fn();
    const { rerender } = render(
      <DownloadManager downloads={downloads} onCancel={onCancel} />
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Cancel Static Coast.s01e01.mp4' })
    );
    expect(onCancel).toHaveBeenCalledWith('dl2');
    rerender(<DownloadManager downloads={[]} />);
    expect(screen.getByText('No active downloads')).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { AttachmentViewer } from '../AttachmentViewer';

describe('AttachmentViewer', () => {
  const attachments = [
    { id: '1', name: 'report.pdf', size: '2 MB', type: 'application/pdf' },
    { id: '2', name: 'photo.png', size: '1 MB', type: 'image/png' },
  ];

  it('renders attachments with metadata', () => {
    render(<AttachmentViewer attachments={attachments} />);
    expect(screen.getByText('report.pdf')).toBeInTheDocument();
    expect(screen.getByText(/2 MB/)).toBeInTheDocument();
  });

  it('fires onDownload when Download is clicked', () => {
    const onDownload = jest.fn();
    render(
      <AttachmentViewer attachments={attachments} onDownload={onDownload} />
    );
    fireEvent.click(screen.getAllByText('Download')[1]);
    expect(onDownload).toHaveBeenCalledWith(attachments[1]);
  });

  it('shows an empty state when no attachments exist', () => {
    render(<AttachmentViewer attachments={[]} />);
    expect(screen.getByText('No attachments')).toBeInTheDocument();
  });
});

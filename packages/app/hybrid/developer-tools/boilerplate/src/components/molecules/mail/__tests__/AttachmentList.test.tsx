import { fireEvent, render, screen } from '@testing-library/react';
import { AttachmentList } from '../AttachmentList';

const attachments = [
  { id: '1', name: 'report.pdf', size: '2.1 MB', kind: 'PDF' },
  { id: '2', name: 'photo.jpg', size: '850 KB', kind: 'Image' },
];

describe('AttachmentList', () => {
  it('renders attachment names and sizes', () => {
    render(<AttachmentList attachments={attachments} />);
    expect(screen.getByText('report.pdf')).toBeInTheDocument();
    expect(screen.getByText('PDF · 2.1 MB')).toBeInTheDocument();
    expect(screen.getByText('photo.jpg')).toBeInTheDocument();
  });

  it('shows empty message when no attachments', () => {
    render(<AttachmentList attachments={[]} />);
    expect(screen.getByText('No attachments.')).toBeInTheDocument();
  });

  it('calls onDownload with the attachment id', () => {
    const onDownload = jest.fn();
    render(
      <AttachmentList attachments={attachments} onDownload={onDownload} />
    );
    fireEvent.click(screen.getAllByRole('button', { name: 'Download' })[0]);
    expect(onDownload).toHaveBeenCalledWith('1');
  });
});

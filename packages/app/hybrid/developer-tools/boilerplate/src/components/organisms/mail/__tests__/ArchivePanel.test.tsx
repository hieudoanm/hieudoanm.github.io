import { fireEvent, render, screen } from '@testing-library/react';
import { ArchivePanel } from '../ArchivePanel';

describe('ArchivePanel', () => {
  const emails = [
    {
      id: '1',
      from: 'Ada Lovelace',
      subject: 'Old proposal',
      archivedAt: '2026-07-01',
    },
  ];

  it('renders archived emails with archive date', () => {
    render(<ArchivePanel emails={emails} />);
    expect(screen.getByText('Old proposal')).toBeInTheDocument();
    expect(screen.getByText(/Archived 2026-07-01/)).toBeInTheDocument();
  });

  it('fires onRestore when Restore is clicked', () => {
    const onRestore = jest.fn();
    render(<ArchivePanel emails={emails} onRestore={onRestore} />);
    fireEvent.click(screen.getByText('Restore'));
    expect(onRestore).toHaveBeenCalledWith(emails[0]);
  });

  it('fires onDelete when Delete is clicked', () => {
    const onDelete = jest.fn();
    render(<ArchivePanel emails={emails} onDelete={onDelete} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith(emails[0]);
  });

  it('shows an empty state when the archive is empty', () => {
    render(<ArchivePanel emails={[]} />);
    expect(screen.getByText('Archive is empty')).toBeInTheDocument();
  });
});

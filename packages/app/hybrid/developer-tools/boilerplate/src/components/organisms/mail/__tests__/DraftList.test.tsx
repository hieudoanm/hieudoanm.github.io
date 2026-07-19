import { fireEvent, render, screen } from '@testing-library/react';
import { DraftList } from '../DraftList';

describe('DraftList', () => {
  const drafts = [
    {
      id: '1',
      to: 'ada@example.com',
      subject: 'Draft: Roadmap',
      preview: 'Here are the milestones…',
      updated: '2026-08-01',
    },
  ];

  it('renders drafts with recipient and preview', () => {
    render(<DraftList drafts={drafts} />);
    expect(screen.getByText('Draft: Roadmap')).toBeInTheDocument();
    expect(screen.getByText(/To ada@example.com/)).toBeInTheDocument();
  });

  it('fires onEdit when a draft is clicked', () => {
    const onEdit = jest.fn();
    render(<DraftList drafts={drafts} onEdit={onEdit} />);
    fireEvent.click(screen.getByText('Draft: Roadmap'));
    expect(onEdit).toHaveBeenCalledWith(drafts[0]);
  });

  it('fires onDelete when Delete is clicked', () => {
    const onDelete = jest.fn();
    render(<DraftList drafts={drafts} onDelete={onDelete} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith(drafts[0]);
  });

  it('shows an empty state when there are no drafts', () => {
    render(<DraftList drafts={[]} />);
    expect(screen.getByText('No drafts')).toBeInTheDocument();
  });
});

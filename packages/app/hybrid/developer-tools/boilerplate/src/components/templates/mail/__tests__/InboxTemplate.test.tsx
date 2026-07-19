import { fireEvent, render, screen } from '@testing-library/react';
import { InboxTemplate } from '../InboxTemplate';

describe('InboxTemplate', () => {
  it('renders all messages with the summary', () => {
    render(<InboxTemplate />);
    expect(screen.getByRole('heading', { name: 'Inbox' })).toBeInTheDocument();
    expect(screen.getByText('6 messages')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Build passed')).toBeInTheDocument();
    expect(screen.getByText('Recruiter')).toBeInTheDocument();
  });

  it('filters unread messages', () => {
    render(<InboxTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Unread' }));
    expect(screen.getByText('3 messages')).toBeInTheDocument();
    expect(screen.getByText('Build passed')).toBeInTheDocument();
    expect(screen.getByText('Payment received')).toBeInTheDocument();
    expect(screen.queryByText('This week in design')).not.toBeInTheDocument();
  });

  it('deletes selected messages', () => {
    render(<InboxTemplate />);
    const deleteButton = screen.getByRole('button', {
      name: 'Delete selected (0)',
    });
    expect(deleteButton).toBeDisabled();
    fireEvent.click(screen.getByLabelText('Select Build passed'));
    fireEvent.click(screen.getByLabelText('Select Payment received'));
    expect(
      screen.getByRole('button', { name: 'Delete selected (2)' })
    ).toBeEnabled();
    fireEvent.click(
      screen.getByRole('button', { name: 'Delete selected (2)' })
    );
    expect(screen.getByText('4 messages')).toBeInTheDocument();
    expect(screen.queryByText('Build passed')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Delete selected (0)' })
    ).toBeDisabled();
  });
});

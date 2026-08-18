import { fireEvent, render, screen } from '@testing-library/react';
import { InboxView } from '../InboxView';

describe('InboxView', () => {
  const emails = [
    {
      id: '1',
      from: 'Ada Lovelace',
      subject: 'Meeting notes',
      preview: 'Attached are the notes from today.',
      time: '9:00 AM',
      unread: true,
    },
    {
      id: '2',
      from: 'Grace Hopper',
      subject: 'Build status',
      preview: 'The pipeline is green.',
      time: '8:30 AM',
    },
  ];

  it('renders the email list with sender and subject', () => {
    render(<InboxView emails={emails} />);
    expect(screen.getAllByText('Ada Lovelace').length).toBeGreaterThan(0);
    expect(screen.getByText('Build status')).toBeInTheDocument();
  });

  it('shows the first email by default', () => {
    render(<InboxView emails={emails} />);
    expect(screen.getAllByText('Meeting notes').length).toBeGreaterThan(0);
    expect(
      screen.getAllByText('Attached are the notes from today.').length
    ).toBeGreaterThan(0);
  });

  it('selects an email row and updates the reader', () => {
    render(<InboxView emails={emails} />);
    fireEvent.click(screen.getByText('Build status'));
    expect(
      screen.getAllByText('The pipeline is green.').length
    ).toBeGreaterThan(0);
  });

  it('shows an empty state when the inbox is empty', () => {
    render(<InboxView emails={[]} />);
    expect(screen.getByText('Inbox is empty')).toBeInTheDocument();
    expect(screen.getByText('Select an email to read')).toBeInTheDocument();
  });
});

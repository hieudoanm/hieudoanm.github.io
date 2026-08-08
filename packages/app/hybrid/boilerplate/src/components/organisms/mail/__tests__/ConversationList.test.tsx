import { fireEvent, render, screen } from '@testing-library/react';
import { ConversationList } from '../ConversationList';

describe('ConversationList', () => {
  const conversations = [
    {
      id: '1',
      participants: 'Ada Lovelace',
      subject: 'Sprint planning',
      preview: 'Let us set the agenda.',
      lastTime: '10:00 AM',
      unread: true,
    },
    {
      id: '2',
      participants: 'Grace Hopper',
      subject: 'Bug triage',
      preview: 'Three issues to review.',
      lastTime: 'Yesterday',
    },
  ];

  it('renders conversations with participants and subjects', () => {
    render(<ConversationList conversations={conversations} />);
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('Bug triage')).toBeInTheDocument();
  });

  it('renders the conversation count', () => {
    render(<ConversationList conversations={conversations} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('fires onSelect when a conversation is clicked', () => {
    const onSelect = jest.fn();
    render(
      <ConversationList conversations={conversations} onSelect={onSelect} />
    );
    fireEvent.click(screen.getByText('Bug triage'));
    expect(onSelect).toHaveBeenCalledWith(conversations[1]);
  });

  it('shows an empty state when there are no conversations', () => {
    render(<ConversationList conversations={[]} />);
    expect(screen.getByText('No conversations')).toBeInTheDocument();
  });
});

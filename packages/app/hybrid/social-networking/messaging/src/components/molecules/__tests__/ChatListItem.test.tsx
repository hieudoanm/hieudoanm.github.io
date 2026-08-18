import { render, screen, fireEvent } from '@testing-library/react';
import { ChatListItem } from '@/components/molecules/ChatListItem';

const props = {
  id: 'c1',
  title: 'Alice',
  avatarColor: '#4da3ff',
  kind: 'direct' as const,
  online: true,
  preview: 'Hello there',
  lastMessageAt: 1000,
  unreadCount: 0,
  muted: false,
  selected: false,
  onSelect: jest.fn(),
};

describe('ChatListItem', () => {
  it('renders the title, preview and calls onSelect on click', () => {
    render(<ChatListItem {...props} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Hello there')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Open chat with Alice'));
    expect(props.onSelect).toHaveBeenCalledWith('c1');
  });

  it('shows an unread badge with the count', () => {
    render(<ChatListItem {...props} unreadCount={3} />);
    expect(screen.getByLabelText('3 unread messages')).toBeInTheDocument();
  });

  it('applies selected styles', () => {
    render(<ChatListItem {...props} selected />);
    expect(screen.getByLabelText('Open chat with Alice')).toHaveAttribute(
      'aria-current',
      'true'
    );
  });

  it('shows a muted icon when muted', () => {
    render(<ChatListItem {...props} muted />);
    expect(screen.getByLabelText('Muted')).toBeInTheDocument();
  });

  it('shows a no-messages preview when there is no preview', () => {
    render(<ChatListItem {...props} preview="" />);
    expect(screen.getByText('No messages yet')).toBeInTheDocument();
  });

  it('shows a group icon for groups', () => {
    const { container } = render(<ChatListItem {...props} kind="group" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});

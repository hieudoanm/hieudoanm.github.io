import { render, screen, fireEvent } from '@testing-library/react';
import { ChatHeader } from '@/components/molecules/ChatHeader';

const base = {
  title: 'Alice',
  avatarColor: '#4da3ff',
  kind: 'direct' as const,
  online: true,
  lastSeenAt: Date.now(),
  muted: false,
  secret: false,
  onNewChat: jest.fn(),
};

describe('ChatHeader', () => {
  it('shows the online status for direct chats', () => {
    render(<ChatHeader {...base} />);
    expect(screen.getByText('online')).toBeInTheDocument();
  });

  it('shows last seen for offline contacts', () => {
    render(
      <ChatHeader
        {...base}
        online={false}
        lastSeenAt={Date.now() - 5 * 60 * 1000}
      />
    );
    expect(screen.getByText(/last seen/)).toBeInTheDocument();
  });

  it('shows the member count for groups', () => {
    render(<ChatHeader {...base} kind="group" memberCount={4} />);
    expect(screen.getByText('4 members')).toBeInTheDocument();
  });

  it('shows a secret label for groups', () => {
    render(<ChatHeader {...base} kind="group" memberCount={4} secret />);
    expect(screen.getByText('4 members · secret')).toBeInTheDocument();
  });

  it('shows the muted icon when muted', () => {
    render(<ChatHeader {...base} muted />);
    expect(screen.getByLabelText('Muted')).toBeInTheDocument();
  });

  it('shows a secret chat indicator', () => {
    render(<ChatHeader {...base} secret />);
    expect(screen.getByLabelText('Secret chat')).toBeInTheDocument();
  });

  it('triggers onNewChat', () => {
    render(<ChatHeader {...base} />);
    fireEvent.click(screen.getByLabelText('New chat'));
    expect(base.onNewChat).toHaveBeenCalled();
  });

  it('renders a back button when onBack is provided', () => {
    const onBack = jest.fn();
    render(<ChatHeader {...base} onBack={onBack} />);
    fireEvent.click(screen.getByLabelText('Back'));
    expect(onBack).toHaveBeenCalled();
  });
});

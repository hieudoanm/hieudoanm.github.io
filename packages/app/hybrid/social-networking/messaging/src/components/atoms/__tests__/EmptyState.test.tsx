import { render, screen } from '@testing-library/react';
import { FaUserFriends } from 'react-icons/fa';
import { EmptyState } from '@/components/atoms/EmptyState';

describe('EmptyState', () => {
  it('renders title, description and an action', () => {
    render(
      <EmptyState
        icon={FaUserFriends}
        title="No chats"
        description="Start a conversation."
        action={<button type="button">Start</button>}
      />
    );
    expect(screen.getByText('No chats')).toBeInTheDocument();
    expect(screen.getByText('Start a conversation.')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('renders without an action', () => {
    render(
      <EmptyState
        icon={FaUserFriends}
        title="Empty"
        description="Nothing here"
      />
    );
    expect(screen.getByText('Empty')).toBeInTheDocument();
  });
});

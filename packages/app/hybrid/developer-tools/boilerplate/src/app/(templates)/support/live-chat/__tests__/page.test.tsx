import { render, screen } from '@testing-library/react';
import LiveChatPage from '@/app/(templates)/support/live-chat/page';

describe('LiveChatPage', () => {
  it('renders the LiveChatPage', () => {
    render(<LiveChatPage />);
    expect(screen.getByText('2 messages')).toBeInTheDocument();
  });
});

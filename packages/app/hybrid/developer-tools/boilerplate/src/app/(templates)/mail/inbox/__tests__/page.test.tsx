import { render, screen } from '@testing-library/react';
import InboxPage from '@/app/(templates)/mail/inbox/page';

describe('InboxPage', () => {
  it('renders the InboxPage', () => {
    render(<InboxPage />);
    expect(screen.getByText('6 messages')).toBeInTheDocument();
  });
});

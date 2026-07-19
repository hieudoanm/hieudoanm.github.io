import { render, screen } from '@testing-library/react';
import InboxPage from '@/app/(templates)/app/inbox/page';

describe('InboxPage', () => {
  it('renders the InboxPage', () => {
    render(<InboxPage />);
    expect(screen.getByText('Q3 planning')).toBeInTheDocument();
  });
});

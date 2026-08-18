import { render, screen } from '@testing-library/react';
import TicketDetailPage from '@/app/(templates)/support/ticket-detail/page';

describe('TicketDetailPage', () => {
  it('renders the TicketDetailPage', () => {
    render(<TicketDetailPage />);
    expect(screen.getByText('3 messages')).toBeInTheDocument();
  });
});

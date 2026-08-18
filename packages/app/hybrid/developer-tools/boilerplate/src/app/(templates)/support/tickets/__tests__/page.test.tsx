import { render, screen } from '@testing-library/react';
import TicketsPage from '@/app/(templates)/support/tickets/page';

describe('TicketsPage', () => {
  it('renders the TicketsPage', () => {
    render(<TicketsPage />);
    expect(screen.getByText('6 tickets')).toBeInTheDocument();
  });
});

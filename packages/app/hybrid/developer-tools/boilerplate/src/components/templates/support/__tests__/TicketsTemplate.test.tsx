import { fireEvent, render, screen, within } from '@testing-library/react';
import { TicketsTemplate } from '../TicketsTemplate';

describe('TicketsTemplate', () => {
  it('renders tickets with priority and status badges', () => {
    render(<TicketsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Support Tickets' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 tickets')).toBeInTheDocument();
    expect(screen.getByText('T-1001')).toBeInTheDocument();
    expect(screen.getByText('Cannot reset password')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Open')).toHaveLength(2);
    expect(within(table).getAllByText('Pending')).toHaveLength(1);
    expect(within(table).getAllByText('Resolved')).toHaveLength(1);
    expect(within(table).getAllByText('Closed')).toHaveLength(2);
  });

  it('claims an open ticket and moves it to pending', () => {
    render(<TicketsTemplate />);
    expect(screen.getAllByRole('button', { name: 'Claim' })).toHaveLength(2);
    fireEvent.click(screen.getAllByRole('button', { name: 'Claim' })[0]);
    expect(screen.getAllByRole('button', { name: 'Claim' })).toHaveLength(1);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Open')).toHaveLength(1);
    expect(within(table).getAllByText('Pending')).toHaveLength(2);
  });

  it('filters tickets by status', () => {
    render(<TicketsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Resolved' }));
    expect(screen.getByText('Login issue on mobile')).toBeInTheDocument();
    expect(screen.queryByText('Cannot reset password')).not.toBeInTheDocument();
    expect(screen.getByText('1 tickets')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByText('Cannot reset password')).toBeInTheDocument();
    expect(screen.queryByText('Login issue on mobile')).not.toBeInTheDocument();
  });
});

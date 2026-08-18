import { fireEvent, render, screen } from '@testing-library/react';
import { TicketDetailTemplate } from '../TicketDetailTemplate';

describe('TicketDetailTemplate', () => {
  it('renders the ticket conversation and summary', () => {
    render(<TicketDetailTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Ticket Detail' })
    ).toBeInTheDocument();
    expect(screen.getByText('Cannot reset password')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('3 messages')).toBeInTheDocument();
    expect(
      screen.getByText('Jane Doe: I cannot reset my password.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('You: Hi Jane, let me look into that.')
    ).toBeInTheDocument();
  });

  it('resolves the ticket', () => {
    render(<TicketDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Resolve ticket' }));
    expect(
      screen.queryByRole('button', { name: 'Resolve ticket' })
    ).not.toBeInTheDocument();
    expect(screen.getByText('Resolved')).toBeInTheDocument();
    expect(screen.queryByText('Open')).not.toBeInTheDocument();
  });

  it('sends a reply and ignores empty replies', () => {
    render(<TicketDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(screen.getByText('3 messages')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Reply to customer'), {
      target: { value: 'Let me reset that for you.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(
      screen.getByText('You: Let me reset that for you.')
    ).toBeInTheDocument();
    expect(screen.getByText('4 messages')).toBeInTheDocument();
  });
});

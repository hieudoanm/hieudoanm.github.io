import { render, screen } from '@testing-library/react';
import { SupportTicket } from '../SupportTicket';

describe('SupportTicket', () => {
  it('renders subject, customer, date and id', () => {
    render(
      <SupportTicket
        id="101"
        subject="Login broken"
        customer="Alice"
        priority="High"
        status="Open"
        date="Aug 8, 2026"
      />
    );
    expect(screen.getByText('Login broken')).toBeInTheDocument();
    expect(screen.getByText('Alice · Aug 8, 2026')).toBeInTheDocument();
    expect(screen.getByText('#101')).toBeInTheDocument();
  });

  it('applies the priority badge variant', () => {
    render(
      <SupportTicket
        id="1"
        subject="S"
        customer="C"
        priority="High"
        status="Open"
        date="D"
      />
    );
    expect(screen.getByText('High')).toHaveClass('badge-error');
  });

  it('renders the status badge', () => {
    render(
      <SupportTicket
        id="1"
        subject="S"
        customer="C"
        priority="Low"
        status="Resolved"
        date="D"
      />
    );
    expect(screen.getByText('Resolved')).toBeInTheDocument();
  });
});

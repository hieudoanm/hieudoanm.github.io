import { render, screen } from '@testing-library/react';
import { SupportInbox } from '../SupportInbox';

describe('SupportInbox', () => {
  it('renders tickets with priority and status', () => {
    render(
      <SupportInbox
        tickets={[
          {
            id: '1',
            subject: 'Login broken',
            customer: 'Jane',
            priority: 'high',
            status: 'open',
            updated: '2h ago',
          },
        ]}
      />
    );
    expect(screen.getByText('Support inbox')).toBeInTheDocument();
    expect(screen.getByText('Login broken')).toBeInTheDocument();
    expect(screen.getByText('high')).toBeInTheDocument();
    expect(screen.getByText('open')).toBeInTheDocument();
    expect(screen.getByText('2h ago')).toBeInTheDocument();
  });

  it('shows ticket count', () => {
    render(
      <SupportInbox
        tickets={[
          { id: '1', subject: 'A' },
          { id: '2', subject: 'B' },
        ]}
      />
    );
    expect(screen.getByText('2 tickets')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<SupportInbox tickets={[]} />);
    expect(screen.getByText('Inbox empty.')).toBeInTheDocument();
  });
});

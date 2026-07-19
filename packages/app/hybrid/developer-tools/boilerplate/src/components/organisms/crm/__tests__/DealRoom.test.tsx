import { render, screen } from '@testing-library/react';
import { DealRoom } from '../DealRoom';

describe('DealRoom', () => {
  it('renders deal details and formatting', () => {
    render(
      <DealRoom
        dealName="Acme expansion"
        company="Acme Corp"
        value={12000}
        stage="Negotiation"
        owner="Jane"
        expectedClose="Mar 2026"
      />
    );
    expect(screen.getByText('Acme expansion')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('$12,000')).toBeInTheDocument();
    expect(screen.getByText('Negotiation')).toBeInTheDocument();
    expect(screen.getByText('Mar 2026')).toBeInTheDocument();
  });

  it('renders contacts and activities', () => {
    render(
      <DealRoom
        dealName="Acme"
        contacts={[{ id: 'c', name: 'Bob', email: 'bob@acme.com' }]}
        activities={[{ id: 'x', text: 'Called client', time: '2h ago' }]}
      />
    );
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('bob@acme.com')).toBeInTheDocument();
    expect(screen.getByText('Called client')).toBeInTheDocument();
    expect(screen.getByText('2h ago')).toBeInTheDocument();
  });

  it('shows empty messages for missing data', () => {
    render(<DealRoom dealName="Acme" />);
    expect(screen.getByText('No contacts.')).toBeInTheDocument();
    expect(screen.getByText('No activity.')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { LeadCard } from '../LeadCard';

describe('LeadCard', () => {
  it('renders lead name, company, source and score', () => {
    render(
      <LeadCard name="Bob Jones" company="Acme" source="Website" score={75} />
    );
    expect(screen.getByText('Bob Jones')).toBeInTheDocument();
    expect(screen.getByText('Acme')).toBeInTheDocument();
    expect(screen.getByText('Website')).toBeInTheDocument();
    expect(screen.getByText('Score: 75')).toBeInTheDocument();
  });

  it('applies the status badge variant', () => {
    render(<LeadCard name="Bob" status="Qualified" />);
    expect(screen.getByText('Qualified')).toHaveClass('badge-success');
  });

  it('uses the default New status', () => {
    render(<LeadCard name="Bob" />);
    expect(screen.getByText('New')).toHaveClass('badge-info');
  });
});

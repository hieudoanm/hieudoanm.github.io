import { render, screen } from '@testing-library/react';
import { LeadStatus } from '../LeadStatus';

describe('LeadStatus', () => {
  it('renders the status label', () => {
    render(<LeadStatus status="qualified" />);
    expect(screen.getByText('Qualified')).toBeInTheDocument();
  });

  it('applies the status class', () => {
    render(<LeadStatus status="won" />);
    expect(screen.getByText('Won')).toHaveClass('badge-success');
  });

  it.each([
    ['new', 'badge-info'],
    ['contacted', 'badge-primary'],
    ['qualified', 'badge-accent'],
    ['proposal', 'badge-warning'],
    ['won', 'badge-success'],
    ['lost', 'badge-error'],
  ] as const)('maps %s status to %s', (status, expected) => {
    render(<LeadStatus status={status} />);
    expect(screen.getByTestId('lead-status')).toHaveClass(expected);
  });
});

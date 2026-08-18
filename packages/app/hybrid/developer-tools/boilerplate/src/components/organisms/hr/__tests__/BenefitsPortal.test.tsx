import { render, screen } from '@testing-library/react';
import { BenefitsPortal } from '../BenefitsPortal';

describe('BenefitsPortal', () => {
  const benefits = [
    {
      id: '1',
      title: 'Health insurance',
      description: 'Full medical coverage.',
      coverage: 'Family plan',
      icon: '🏥',
    },
    {
      id: '2',
      title: 'Learning budget',
      description: 'Annual allowance for courses.',
    },
  ];

  it('renders benefit cards with descriptions', () => {
    render(<BenefitsPortal benefits={benefits} />);
    expect(screen.getByText('Health insurance')).toBeInTheDocument();
    expect(screen.getByText('Full medical coverage.')).toBeInTheDocument();
  });

  it('renders the coverage badge when present', () => {
    render(<BenefitsPortal benefits={benefits} />);
    expect(screen.getByText('Family plan')).toHaveClass('badge-primary');
  });

  it('shows an empty state when no benefits exist', () => {
    render(<BenefitsPortal benefits={[]} />);
    expect(screen.getByText('No benefits available')).toBeInTheDocument();
  });
});

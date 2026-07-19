import { render, screen } from '@testing-library/react';
import { BenefitCard } from '../BenefitCard';

describe('BenefitCard', () => {
  it('renders title, description, and category', () => {
    render(
      <BenefitCard
        title="Health insurance"
        description="Comprehensive medical cover."
        category="Health"
      />
    );
    expect(screen.getByText('Health insurance')).toBeInTheDocument();
    expect(
      screen.getByText('Comprehensive medical cover.')
    ).toBeInTheDocument();
    expect(screen.getByText('Health')).toBeInTheDocument();
  });

  it('renders the default icon when none provided', () => {
    render(
      <BenefitCard
        title="Health insurance"
        description="Comprehensive cover."
      />
    );
    expect(screen.getByText('✦')).toBeInTheDocument();
  });

  it('renders a custom icon and hides category when omitted', () => {
    render(
      <BenefitCard
        title="Gym pass"
        description="Free gym membership."
        icon="💪"
      />
    );
    expect(screen.getByText('💪')).toBeInTheDocument();
    expect(screen.queryByText('Health')).not.toBeInTheDocument();
  });
});

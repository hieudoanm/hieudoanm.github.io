import { render, screen } from '@testing-library/react';
import { DealCard } from '../DealCard';

describe('DealCard', () => {
  it('renders deal name, company and formatted amount', () => {
    render(<DealCard name="Enterprise Plan" company="Acme" amount={25000} />);
    expect(screen.getByText('Enterprise Plan')).toBeInTheDocument();
    expect(screen.getByText('Acme')).toBeInTheDocument();
    expect(screen.getByText('$25,000')).toBeInTheDocument();
  });

  it('applies the stage badge variant', () => {
    render(
      <DealCard
        name="D"
        company="C"
        amount={1000}
        stage="Won"
        probability={100}
      />
    );
    expect(screen.getByText('Won')).toHaveClass('badge-success');
    expect(screen.getByText('100% chance')).toBeInTheDocument();
  });

  it('uses the default Prospecting stage', () => {
    render(<DealCard name="D" company="C" amount={1000} />);
    expect(screen.getByText('Prospecting')).toHaveClass('badge-ghost');
  });
});

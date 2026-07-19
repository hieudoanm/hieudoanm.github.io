import { render, screen } from '@testing-library/react';
import { RetirementPlanner } from '../RetirementPlanner';

describe('RetirementPlanner', () => {
  it('renders age and contribution figures', () => {
    render(
      <RetirementPlanner
        currentAge={30}
        retirementAge={65}
        currentSavings={50000}
        monthlyContribution={500}
      />
    );
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('65')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
    expect(screen.getByTestId('years')).toHaveTextContent('35 yrs');
  });

  it('projects savings using the default return rate', () => {
    render(
      <RetirementPlanner
        currentAge={30}
        retirementAge={65}
        currentSavings={0}
        monthlyContribution={0}
      />
    );
    expect(screen.getByTestId('projected')).toHaveTextContent('$0');
  });

  it('projects growth from current savings and contributions', () => {
    render(
      <RetirementPlanner
        currentAge={30}
        retirementAge={31}
        currentSavings={1000}
        monthlyContribution={100}
        expectedReturn={0}
      />
    );
    expect(screen.getByTestId('projected')).toHaveTextContent('$1,000');
  });

  it('shows zero years when retirement age is reached', () => {
    render(
      <RetirementPlanner
        currentAge={70}
        retirementAge={65}
        currentSavings={50000}
        monthlyContribution={0}
      />
    );
    expect(screen.getByTestId('years')).toHaveTextContent('0 yrs');
  });
});

import { render, screen } from '@testing-library/react';
import { StepNumber } from '../StepNumber';

describe('StepNumber', () => {
  it('renders the number, title, and description', () => {
    render(
      <StepNumber
        number={1}
        title="Create an account"
        description="Takes 2 minutes."
      />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.getByText('Takes 2 minutes.')).toBeInTheDocument();
  });

  it('omits the description when not provided', () => {
    render(<StepNumber number={2} title="Pick a plan" />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Pick a plan')).toBeInTheDocument();
  });
});

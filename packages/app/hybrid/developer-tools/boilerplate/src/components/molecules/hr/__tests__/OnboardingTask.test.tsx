import { render, screen } from '@testing-library/react';
import { OnboardingTask } from '../OnboardingTask';

const task = {
  title: 'Set up laptop',
  due: 'Aug 12',
  status: 'in-progress' as const,
  assignee: 'IT Team',
  category: 'Setup',
};

describe('OnboardingTask', () => {
  it('renders task details', () => {
    render(<OnboardingTask {...task} />);
    expect(screen.getByText('Set up laptop')).toBeInTheDocument();
    expect(screen.getByText('Due Aug 12')).toBeInTheDocument();
    expect(screen.getByText('IT Team')).toBeInTheDocument();
    expect(screen.getByText('Setup')).toBeInTheDocument();
  });

  it('applies the status badge variant', () => {
    render(<OnboardingTask {...task} />);
    expect(screen.getByText('in-progress')).toHaveClass('badge-warning');
  });

  it('hides assignee and category when omitted', () => {
    render(
      <OnboardingTask {...task} assignee={undefined} category={undefined} />
    );
    expect(screen.queryByText('IT Team')).not.toBeInTheDocument();
    expect(screen.queryByText('Setup')).not.toBeInTheDocument();
  });

  it('accepts a custom className', () => {
    render(<OnboardingTask {...task} className="shadow-md" />);
    expect(screen.getByTestId('onboarding-task')).toHaveClass('shadow-md');
  });
});

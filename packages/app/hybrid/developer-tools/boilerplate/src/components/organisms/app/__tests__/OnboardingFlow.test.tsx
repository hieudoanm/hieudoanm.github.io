import { fireEvent, render, screen } from '@testing-library/react';
import { OnboardingFlow } from '../OnboardingFlow';

const steps = [
  { id: 'profile', title: 'Your profile', content: <p>Profile step</p> },
  { id: 'team', title: 'Invite team', content: <p>Team step</p> },
  { id: 'done', title: 'You are set', content: <p>Done step</p> },
];

describe('OnboardingFlow', () => {
  it('renders the first step initially', () => {
    render(<OnboardingFlow steps={steps} />);
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
    expect(screen.getByText('Profile step')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeDisabled();
  });

  it('advances and goes back between steps', () => {
    render(<OnboardingFlow steps={steps} />);
    fireEvent.click(screen.getByTestId('onboarding-next'));
    expect(screen.getByText('Team step')).toBeInTheDocument();
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('onboarding-back'));
    expect(screen.getByText('Profile step')).toBeInTheDocument();
  });

  it('fires onComplete on the last step', () => {
    const onComplete = jest.fn();
    render(<OnboardingFlow steps={steps} onComplete={onComplete} />);
    fireEvent.click(screen.getByTestId('onboarding-next'));
    fireEvent.click(screen.getByTestId('onboarding-next'));
    expect(screen.getByText('Done step')).toBeInTheDocument();
    expect(screen.getByTestId('onboarding-next')).toHaveTextContent('Complete');
    fireEvent.click(screen.getByTestId('onboarding-next'));
    expect(onComplete).toHaveBeenCalledWith(2);
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { OnboardingProgram } from '../OnboardingProgram';

describe('OnboardingProgram', () => {
  const steps = [
    { id: '1', title: 'Account setup', description: 'Create your accounts.' },
    { id: '2', title: 'Team intro', description: 'Meet your team.' },
    { id: '3', title: 'First project', description: 'Start your first task.' },
  ];

  it('renders the first step content initially', () => {
    render(<OnboardingProgram steps={steps} />);
    expect(screen.getAllByText('Account setup').length).toBeGreaterThan(0);
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
  });

  it('advances to the next step', () => {
    render(<OnboardingProgram steps={steps} />);
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
    expect(screen.getByText('Meet your team.')).toBeInTheDocument();
  });

  it('marks completed steps with a success badge', () => {
    render(<OnboardingProgram steps={steps} />);
    fireEvent.click(screen.getByText('Next'));
    const badges = screen.getAllByText('✓');
    expect(badges[0]).toHaveClass('badge-success');
  });

  it('renders an empty state when no steps exist', () => {
    render(<OnboardingProgram steps={[]} />);
    expect(screen.getByText('No onboarding steps')).toBeInTheDocument();
  });
});

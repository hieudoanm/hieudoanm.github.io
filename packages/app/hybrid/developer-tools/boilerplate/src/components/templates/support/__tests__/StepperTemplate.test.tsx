import { fireEvent, render, screen } from '@testing-library/react';
import { StepperTemplate } from '../StepperTemplate';

describe('StepperTemplate', () => {
  it('starts on the first step', () => {
    render(<StepperTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Stepper' })
    ).toBeInTheDocument();
    expect(screen.getByText('Step 1: Account')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();
    expect(screen.queryByText('All steps complete')).not.toBeInTheDocument();
  });

  it('advances and goes back between steps', () => {
    render(<StepperTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Step 2: Profile')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Step 3: Preferences')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByText('Step 2: Profile')).toBeInTheDocument();
  });

  it('shows the completion state on the final step', () => {
    render(<StepperTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Step 4: Done')).toBeInTheDocument();
    expect(screen.getByText('All steps complete')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Back' })).toBeEnabled();
  });
});

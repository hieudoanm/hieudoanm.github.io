import { render, screen } from '@testing-library/react';
import StepperPage from '@/app/(templates)/support/stepper/page';

describe('StepperPage', () => {
  it('renders the stepper page', () => {
    render(<StepperPage />);
    expect(
      screen.getByRole('heading', { name: 'Stepper' })
    ).toBeInTheDocument();
  });
});

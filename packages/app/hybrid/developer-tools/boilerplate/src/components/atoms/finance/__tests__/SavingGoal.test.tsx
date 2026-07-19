import { render, screen } from '@testing-library/react';
import { SavingGoal } from '../SavingGoal';

describe('SavingGoal', () => {
  it('renders current and target amounts', () => {
    render(<SavingGoal current={4000} target={10000} />);
    expect(screen.getByTestId('saving-goal')).toHaveTextContent('$4,000');
    expect(screen.getByTestId('saving-goal')).toHaveTextContent('$10,000');
  });

  it('computes the progress percentage', () => {
    render(<SavingGoal current={5000} target={10000} />);
    expect(screen.getByTestId('saving-goal-progress')).toHaveAttribute(
      'value',
      '50'
    );
  });

  it('caps progress at 100 when the target is reached', () => {
    render(<SavingGoal current={15000} target={10000} />);
    expect(screen.getByTestId('saving-goal-progress')).toHaveAttribute(
      'value',
      '100'
    );
  });

  it('does not divide by zero with a zero target', () => {
    render(<SavingGoal current={100} target={0} />);
    expect(screen.getByTestId('saving-goal-progress')).toHaveAttribute(
      'value',
      '0'
    );
  });
});

import { render, screen } from '@testing-library/react';
import { SavingsGoal } from '../SavingsGoal';

describe('SavingsGoal', () => {
  it('renders name and amounts', () => {
    render(<SavingsGoal name="Trip" current={750} target={1000} />);
    expect(screen.getByText('Trip')).toBeInTheDocument();
    expect(screen.getByTestId('savings-current')).toHaveTextContent('$750');
    expect(screen.getByText('of $1,000')).toBeInTheDocument();
  });

  it('shows percentage badge', () => {
    render(<SavingsGoal name="Trip" current={750} target={1000} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('marks goal as completed at 100%', () => {
    render(<SavingsGoal name="Trip" current={1000} target={1000} />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('renders deadline when provided', () => {
    render(
      <SavingsGoal name="Trip" current={500} target={1000} deadline="Dec 31" />
    );
    expect(screen.getByText('Goal by Dec 31')).toBeInTheDocument();
  });
});

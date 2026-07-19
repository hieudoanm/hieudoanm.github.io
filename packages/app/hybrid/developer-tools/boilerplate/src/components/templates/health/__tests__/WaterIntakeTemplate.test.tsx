import { fireEvent, render, screen } from '@testing-library/react';
import { WaterIntakeTemplate } from '../WaterIntakeTemplate';

describe('WaterIntakeTemplate', () => {
  it('renders the water goal and the daily history', () => {
    render(<WaterIntakeTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Water Intake' })
    ).toBeInTheDocument();
    expect(screen.getByText('8 glasses/day')).toBeInTheDocument();
    expect(screen.getByText('5 of 8 glasses')).toBeInTheDocument();
    expect(screen.getByText('7 days recorded')).toBeInTheDocument();
    expect(screen.getAllByText('8 glasses')).toHaveLength(2);
    expect(
      screen.getByRole('button', { name: 'Add glass' })
    ).toBeInTheDocument();
  });

  it('adds glasses until the goal is reached', () => {
    render(<WaterIntakeTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Add glass' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add glass' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add glass' }));
    expect(screen.getByText('8 of 8 glasses')).toBeInTheDocument();
    expect(screen.getByText('Goal reached')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Add glass' })
    ).not.toBeInTheDocument();
  });
});

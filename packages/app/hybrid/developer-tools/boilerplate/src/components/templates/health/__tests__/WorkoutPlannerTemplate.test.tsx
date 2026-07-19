import { fireEvent, render, screen } from '@testing-library/react';
import { WorkoutPlannerTemplate } from '../WorkoutPlannerTemplate';

describe('WorkoutPlannerTemplate', () => {
  it('renders the workout plans with filters', () => {
    render(<WorkoutPlannerTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Workout Plans' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 workouts')).toBeInTheDocument();
    expect(screen.getByText('Morning Yoga Flow')).toBeInTheDocument();
    expect(screen.getByText('30 min')).toBeInTheDocument();
    expect(screen.getByText('420 kcal')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Start workout' })
    ).toHaveLength(6);
  });

  it('filters by intensity and starts a workout', () => {
    render(<WorkoutPlannerTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'High' }));
    expect(screen.getByText('2 workouts')).toBeInTheDocument();
    expect(screen.getByText('HIIT Cardio Blast')).toBeInTheDocument();
    expect(screen.queryByText('Morning Yoga Flow')).not.toBeInTheDocument();
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Start workout' })[0]
    );
    expect(screen.getAllByText('Workout started')).toHaveLength(1);
    expect(
      screen.getAllByRole('button', { name: 'Start workout' })
    ).toHaveLength(1);
  });
});

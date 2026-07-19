import { render, screen } from '@testing-library/react';
import { WorkoutPlan } from '../WorkoutPlan';

const workouts = [
  {
    day: 'Monday',
    focus: 'Upper body',
    duration: 45,
    exercises: [
      { name: 'Bench press', sets: 4, reps: 8 },
      { name: 'Pull-ups', sets: 3, reps: 10 },
    ],
  },
  { day: 'Wednesday', focus: 'Legs', duration: 60, exercises: [] },
];

describe('WorkoutPlan', () => {
  it('renders each workout with focus and duration', () => {
    render(<WorkoutPlan workouts={workouts} />);
    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('Upper body · 45m')).toBeInTheDocument();
    expect(screen.getByText('Legs · 60m')).toBeInTheDocument();
  });

  it('lists the exercises for each workout', () => {
    render(<WorkoutPlan workouts={workouts} />);
    expect(screen.getByText('Bench press · 4×8')).toBeInTheDocument();
    expect(screen.getByText('Pull-ups · 3×10')).toBeInTheDocument();
  });

  it('shows an empty state when no workouts are scheduled', () => {
    render(<WorkoutPlan workouts={[]} />);
    expect(screen.getByTestId('empty')).toHaveTextContent(
      'No workouts scheduled.'
    );
  });
});

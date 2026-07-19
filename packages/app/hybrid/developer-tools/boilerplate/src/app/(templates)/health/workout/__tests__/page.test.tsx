import { render, screen } from '@testing-library/react';
import WorkoutPage from '@/app/(templates)/health/workout/page';

describe('WorkoutPage', () => {
  it('renders the workout page', () => {
    render(<WorkoutPage />);
    expect(
      screen.getByRole('heading', { name: 'Workout Plans' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 workouts')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { WorkoutCard } from '../WorkoutCard';

describe('WorkoutCard', () => {
  it('renders name, duration and calories', () => {
    render(<WorkoutCard name="Morning Run" duration={30} calories={320} />);
    expect(screen.getByText('Morning Run')).toBeInTheDocument();
    expect(screen.getByTestId('workout-duration')).toHaveTextContent('30 min');
    expect(screen.getByText('320 kcal')).toBeInTheDocument();
  });

  it('renders intensity badge', () => {
    render(
      <WorkoutCard
        name="Sprints"
        duration={20}
        calories={250}
        intensity="high"
      />
    );
    expect(screen.getByText('high')).toHaveClass('badge-error');
  });

  it('renders type and date when provided', () => {
    render(
      <WorkoutCard
        name="Yoga"
        duration={45}
        calories={150}
        type="Flexibility"
        date="Aug 8"
      />
    );
    expect(screen.getByText('Flexibility')).toBeInTheDocument();
    expect(screen.getByText('Aug 8')).toBeInTheDocument();
  });

  it('marks completed workout', () => {
    render(<WorkoutCard name="Swim" duration={40} calories={400} completed />);
    expect(screen.getByText('Done')).toBeInTheDocument();
  });
});

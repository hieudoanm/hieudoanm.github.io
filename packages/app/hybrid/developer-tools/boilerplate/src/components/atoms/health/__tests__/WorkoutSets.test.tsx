import { render, screen } from '@testing-library/react';
import { WorkoutSets } from '../WorkoutSets';

describe('WorkoutSets', () => {
  it('renders sets and reps', () => {
    render(<WorkoutSets sets={3} reps={12} />);
    expect(screen.getByTestId('workout-sets')).toHaveTextContent('3 × 12');
  });

  it('renders the sets and reps caption', () => {
    render(<WorkoutSets sets={3} reps={12} />);
    expect(screen.getByTestId('workout-sets')).toHaveTextContent('sets × reps');
  });

  it('handles a single set', () => {
    render(<WorkoutSets sets={1} reps={10} />);
    expect(screen.getByTestId('workout-sets')).toHaveTextContent('1 × 10');
  });
});

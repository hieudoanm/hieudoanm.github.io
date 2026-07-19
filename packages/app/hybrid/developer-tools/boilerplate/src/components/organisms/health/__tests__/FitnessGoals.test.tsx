import { render, screen } from '@testing-library/react';
import { FitnessGoals } from '../FitnessGoals';

const goals = [
  {
    id: '1',
    name: 'Run 10km',
    current: 6,
    target: 10,
    unit: 'km',
    deadline: '2026-12',
  },
  { id: '2', name: 'Push-ups', current: 20, target: 50, unit: 'reps' },
];

describe('FitnessGoals', () => {
  it('renders goals with progress percentages', () => {
    render(<FitnessGoals goals={goals} />);
    expect(screen.getByText('Run 10km')).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();
    expect(screen.getByText('by 2026-12')).toBeInTheDocument();
  });

  it('renders current and target values', () => {
    render(<FitnessGoals goals={goals} />);
    expect(screen.getByText('6 / 10 km')).toBeInTheDocument();
    expect(screen.getByText('20 / 50 reps')).toBeInTheDocument();
  });

  it('shows zero percent when the target is zero', () => {
    render(
      <FitnessGoals
        goals={[{ id: '1', name: 'Test', current: 0, target: 0, unit: 'x' }]}
      />
    );
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('shows an empty state when there are no goals', () => {
    render(<FitnessGoals goals={[]} />);
    expect(screen.getByTestId('empty')).toHaveTextContent(
      'No fitness goals set.'
    );
  });
});

import { render, screen } from '@testing-library/react';
import { StepsChart } from '../StepsChart';

const points = [
  { label: 'Mon', steps: 8000 },
  { label: 'Tue', steps: 10000 },
  { label: 'Wed', steps: 6000 },
];

describe('StepsChart', () => {
  it('renders point labels and total', () => {
    render(<StepsChart points={points} />);
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByTestId('steps-total')).toHaveTextContent('24,000');
  });

  it('renders one bar per point', () => {
    render(<StepsChart points={points} />);
    expect(screen.getAllByTestId('steps-bar')).toHaveLength(3);
  });

  it('shows goal when provided', () => {
    render(<StepsChart points={points} goal={10000} />);
    expect(screen.getByText('Goal 10,000 steps')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<StepsChart points={[]} />);
    expect(screen.getByText('No step data')).toBeInTheDocument();
  });
});

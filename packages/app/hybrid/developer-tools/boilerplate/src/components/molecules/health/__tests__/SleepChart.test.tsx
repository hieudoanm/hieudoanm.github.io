import { render, screen } from '@testing-library/react';
import { SleepChart } from '../SleepChart';

const points = [
  { label: 'Mon', hours: 7.5 },
  { label: 'Tue', hours: 6 },
  { label: 'Wed', hours: 8 },
];

describe('SleepChart', () => {
  it('renders title and point labels', () => {
    render(<SleepChart points={points} />);
    expect(screen.getByText('Sleep')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
  });

  it('shows hours per night', () => {
    render(<SleepChart points={points} />);
    expect(screen.getByText('7.5h')).toBeInTheDocument();
    expect(screen.getByText('8h')).toBeInTheDocument();
  });

  it('renders one bar per point', () => {
    render(<SleepChart points={points} />);
    expect(screen.getAllByTestId('sleep-bar')).toHaveLength(3);
  });

  it('renders empty state', () => {
    render(<SleepChart points={[]} />);
    expect(screen.getByText('No sleep data')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { WeightChart } from '../WeightChart';

const points = [
  { label: 'Aug 1', weight: 82 },
  { label: 'Aug 4', weight: 81.2 },
  { label: 'Aug 8', weight: 80.5 },
];

describe('WeightChart', () => {
  it('renders point labels and current weight', () => {
    render(<WeightChart points={points} />);
    expect(screen.getByText('Aug 1')).toBeInTheDocument();
    expect(screen.getByTestId('weight-current')).toHaveTextContent('80.5 kg');
  });

  it('renders one bar per point', () => {
    render(<WeightChart points={points} />);
    expect(screen.getAllByTestId('weight-bar')).toHaveLength(3);
  });

  it('uses provided unit', () => {
    render(<WeightChart points={points} unit="lbs" />);
    expect(screen.getByTestId('weight-current')).toHaveTextContent('80.5 lbs');
  });

  it('renders empty state', () => {
    render(<WeightChart points={[]} />);
    expect(screen.getByText('No weight data')).toBeInTheDocument();
  });
});

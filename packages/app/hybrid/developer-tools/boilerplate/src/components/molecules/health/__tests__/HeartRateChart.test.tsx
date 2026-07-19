import { render, screen } from '@testing-library/react';
import { HeartRateChart } from '../HeartRateChart';

const points = [
  { label: '08:00', bpm: 72 },
  { label: '09:00', bpm: 90 },
  { label: '10:00', bpm: 80 },
];

describe('HeartRateChart', () => {
  it('renders title and range badge', () => {
    render(<HeartRateChart points={points} />);
    expect(screen.getByText('Heart rate')).toBeInTheDocument();
    expect(screen.getByText(/72–90 bpm/)).toBeInTheDocument();
  });

  it('renders an SVG line when enough data', () => {
    render(<HeartRateChart points={points} />);
    expect(screen.getByTestId('heart-rate-svg')).toBeInTheDocument();
  });

  it('renders empty state for single point', () => {
    render(<HeartRateChart points={[{ label: '08:00', bpm: 72 }]} />);
    expect(screen.getByText('Not enough data')).toBeInTheDocument();
  });

  it('renders empty state for no data', () => {
    render(<HeartRateChart points={[]} />);
    expect(screen.getByText('Not enough data')).toBeInTheDocument();
  });
});

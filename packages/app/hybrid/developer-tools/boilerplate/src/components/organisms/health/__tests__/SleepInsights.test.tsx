import { render, screen } from '@testing-library/react';
import { SleepInsights } from '../SleepInsights';

const nights = [
  { day: 'Mon', hours: 8, quality: 5 },
  { day: 'Tue', hours: 6, quality: 3 },
  { day: 'Wed', hours: 5, quality: 2 },
];

describe('SleepInsights', () => {
  it('computes the average sleep hours', () => {
    render(<SleepInsights nights={nights} />);
    expect(screen.getByTestId('average')).toHaveTextContent('6.3 hrs avg');
  });

  it('labels quality from the quality score', () => {
    render(<SleepInsights nights={nights} />);
    expect(screen.getByText('Excellent')).toBeInTheDocument();
    expect(screen.getByText('Good')).toBeInTheDocument();
    expect(screen.getByText('Restless')).toBeInTheDocument();
  });

  it('applies the success class for high quality nights', () => {
    const { container } = render(<SleepInsights nights={nights} />);
    expect(container.querySelector('.text-success')).toHaveTextContent(
      'Excellent'
    );
  });

  it('shows an empty state when there is no sleep data', () => {
    render(<SleepInsights nights={[]} />);
    expect(screen.getByTestId('empty')).toHaveTextContent('No sleep data yet.');
  });
});

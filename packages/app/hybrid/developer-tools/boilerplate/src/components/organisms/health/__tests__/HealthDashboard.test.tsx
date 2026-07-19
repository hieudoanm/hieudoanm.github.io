import { render, screen } from '@testing-library/react';
import { HealthDashboard } from '../HealthDashboard';

describe('HealthDashboard', () => {
  it('renders a greeting and vitals', () => {
    render(
      <HealthDashboard
        name="Jane"
        vitals={[
          { label: 'Heart rate', value: 72, unit: 'bpm' },
          { label: 'Blood pressure', value: 120, unit: 'mmHg' },
        ]}
      />
    );
    expect(screen.getByText('Good day, Jane.')).toBeInTheDocument();
    expect(screen.getByText('Heart rate')).toBeInTheDocument();
    expect(screen.getByText('72')).toBeInTheDocument();
  });

  it('shows the daily step progress percentage', () => {
    render(
      <HealthDashboard
        vitals={[]}
        steps={5000}
        stepsGoal={10000}
        calories={1800}
        sleepHours={7}
      />
    );
    expect(screen.getByTestId('steps-percent')).toHaveTextContent(
      '50% of your daily 10,000 step goal'
    );
    expect(screen.getByText('1800')).toBeInTheDocument();
    expect(screen.getByText('7 hours of sleep')).toBeInTheDocument();
  });

  it('uses a default greeting when no name is provided', () => {
    render(<HealthDashboard vitals={[]} />);
    expect(screen.getByText('Good day, there.')).toBeInTheDocument();
  });
});

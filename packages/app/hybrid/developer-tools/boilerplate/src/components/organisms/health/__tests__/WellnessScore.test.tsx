import { render, screen } from '@testing-library/react';
import { WellnessScore } from '../WellnessScore';

describe('WellnessScore', () => {
  it('renders the score and score label', () => {
    render(
      <WellnessScore
        score={85}
        factors={[
          { label: 'Sleep', value: 80 },
          { label: 'Activity', value: 90 },
        ]}
      />
    );
    expect(screen.getByTestId('score-ring')).toHaveTextContent('85');
    expect(screen.getByTestId('score-label')).toHaveTextContent('Thriving');
  });

  it('labels lower scores as balanced', () => {
    render(
      <WellnessScore score={62} factors={[{ label: 'Sleep', value: 60 }]} />
    );
    expect(screen.getByTestId('score-label')).toHaveTextContent('Balanced');
  });

  it('renders each factor with its value', () => {
    render(
      <WellnessScore
        score={85}
        factors={[
          { label: 'Sleep', value: 80 },
          { label: 'Activity', value: 90 },
        ]}
      />
    );
    expect(screen.getByText('Sleep')).toBeInTheDocument();
    expect(screen.getByText('80/100')).toBeInTheDocument();
    expect(screen.getByText('Activity')).toBeInTheDocument();
    expect(screen.getByText('90/100')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { VitalsCard } from '../VitalsCard';

describe('VitalsCard', () => {
  it('renders all vital measurements', () => {
    render(
      <VitalsCard
        bloodPressure="120/80"
        heartRate={72}
        temperature={36.6}
        spo2={98}
      />
    );
    expect(screen.getByText('120/80')).toBeInTheDocument();
    expect(screen.getByText('72 bpm')).toBeInTheDocument();
    expect(screen.getByText('36.6°C')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();
  });

  it('renders labels', () => {
    render(
      <VitalsCard
        bloodPressure="120/80"
        heartRate={72}
        temperature={36.6}
        spo2={98}
      />
    );
    expect(screen.getByText('Blood pressure')).toBeInTheDocument();
    expect(screen.getByText('Heart rate')).toBeInTheDocument();
    expect(screen.getByText('Temperature')).toBeInTheDocument();
    expect(screen.getByText('SpO₂')).toBeInTheDocument();
  });

  it('uses default title', () => {
    render(
      <VitalsCard
        bloodPressure="120/80"
        heartRate={72}
        temperature={36.6}
        spo2={98}
      />
    );
    expect(screen.getByText('Vitals')).toBeInTheDocument();
  });

  it('uses provided title', () => {
    render(
      <VitalsCard
        title="Latest check"
        bloodPressure="120/80"
        heartRate={72}
        temperature={36.6}
        spo2={98}
      />
    );
    expect(screen.getByText('Latest check')).toBeInTheDocument();
  });
});

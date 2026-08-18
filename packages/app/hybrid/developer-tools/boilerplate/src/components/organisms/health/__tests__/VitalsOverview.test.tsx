import { render, screen } from '@testing-library/react';
import { VitalsOverview } from '../VitalsOverview';

describe('VitalsOverview', () => {
  const vitals = [
    { label: 'Heart rate', value: 72, unit: 'bpm', status: 'normal' as const },
    {
      label: 'Blood pressure',
      value: 140,
      unit: 'mmHg',
      status: 'high' as const,
    },
  ];

  it('renders each vital with value and unit', () => {
    render(<VitalsOverview vitals={vitals} />);
    expect(screen.getByText('Heart rate')).toBeInTheDocument();
    expect(screen.getByText('72')).toBeInTheDocument();
    expect(screen.getByText('bpm')).toBeInTheDocument();
  });

  it('renders status badges', () => {
    render(<VitalsOverview vitals={vitals} />);
    expect(screen.getByText('normal')).toBeInTheDocument();
    expect(screen.getByText('high')).toBeInTheDocument();
  });

  it('shows an empty state when there are no vitals', () => {
    render(<VitalsOverview vitals={[]} />);
    expect(screen.getByTestId('empty')).toHaveTextContent(
      'No vitals recorded.'
    );
  });
});

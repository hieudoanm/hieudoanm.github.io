import { render, screen } from '@testing-library/react';
import { HiringFunnel } from '../HiringFunnel';

describe('HiringFunnel', () => {
  const stages = [
    { id: 'applied', name: 'Applied', count: 100, color: 'progress-primary' },
    { id: 'screened', name: 'Screened', count: 60 },
    { id: 'offered', name: 'Offered', count: 10 },
  ];

  it('renders stage names and counts', () => {
    render(<HiringFunnel stages={stages} />);
    expect(screen.getByText('Applied')).toBeInTheDocument();
    expect(screen.getByText('Offered')).toBeInTheDocument();
  });

  it('renders the total candidate count', () => {
    render(<HiringFunnel stages={stages} />);
    expect(screen.getByText('170 candidates')).toBeInTheDocument();
  });

  it('applies the configured progress color class', () => {
    render(<HiringFunnel stages={stages} />);
    expect(screen.getByTestId('funnel-applied')).toHaveClass(
      'progress-primary'
    );
  });

  it('shows an empty state when no stages exist', () => {
    render(<HiringFunnel stages={[]} />);
    expect(screen.getByText('No funnel data')).toBeInTheDocument();
  });
});

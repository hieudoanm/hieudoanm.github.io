import { render, screen } from '@testing-library/react';
import { BloodPressure } from '../BloodPressure';

describe('BloodPressure', () => {
  it('renders systolic and diastolic values', () => {
    render(<BloodPressure systolic={120} diastolic={80} />);
    expect(screen.getByTestId('blood-pressure')).toHaveTextContent('120/80');
  });

  it('includes the unit', () => {
    render(<BloodPressure systolic={120} diastolic={80} />);
    expect(screen.getByTestId('blood-pressure')).toHaveTextContent('mmHg');
  });

  it('uses a success badge for a normal reading', () => {
    render(<BloodPressure systolic={115} diastolic={75} />);
    expect(screen.getByTestId('blood-pressure')).toHaveClass('badge-success');
  });

  it('uses an error badge for a high reading', () => {
    render(<BloodPressure systolic={145} diastolic={95} />);
    expect(screen.getByTestId('blood-pressure')).toHaveClass('badge-error');
  });
});

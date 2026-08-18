import { render, screen } from '@testing-library/react';
import { HealthTip } from '../HealthTip';

describe('HealthTip', () => {
  it('renders the tip', () => {
    render(<HealthTip tip="Drink water throughout the day." />);
    expect(
      screen.getByText('Drink water throughout the day.')
    ).toBeInTheDocument();
  });

  it('prepends category when provided', () => {
    render(<HealthTip tip="Drink water." category="Hydration" />);
    expect(screen.getByText('Hydration: Drink water.')).toBeInTheDocument();
  });

  it('renders source when provided', () => {
    render(<HealthTip tip="Sleep 8 hours." source="WHO" />);
    expect(screen.getByText('WHO')).toBeInTheDocument();
  });
});

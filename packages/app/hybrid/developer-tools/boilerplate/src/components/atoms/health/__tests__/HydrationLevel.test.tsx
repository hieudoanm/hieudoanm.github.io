import { render, screen } from '@testing-library/react';
import { HydrationLevel } from '../HydrationLevel';

describe('HydrationLevel', () => {
  it('renders the hydration percent', () => {
    render(<HydrationLevel percent={70} />);
    expect(screen.getByTestId('hydration-level')).toHaveTextContent('70%');
  });

  it('renders a progress bar at the percent', () => {
    render(<HydrationLevel percent={70} />);
    expect(screen.getByTestId('hydration-level-progress')).toHaveAttribute(
      'value',
      '70'
    );
  });

  it('clamps values above 100', () => {
    render(<HydrationLevel percent={120} />);
    expect(screen.getByTestId('hydration-level-progress')).toHaveAttribute(
      'value',
      '100'
    );
  });

  it('clamps negative values to zero', () => {
    render(<HydrationLevel percent={-5} />);
    expect(screen.getByTestId('hydration-level-progress')).toHaveAttribute(
      'value',
      '0'
    );
  });
});

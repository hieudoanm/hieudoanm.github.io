import { render, screen } from '@testing-library/react';
import { WorkHours } from '../WorkHours';

describe('WorkHours', () => {
  it('renders the start and end hours', () => {
    render(<WorkHours start="09:00" end="17:00" />);
    expect(screen.getByTestId('work-hours')).toHaveTextContent('09:00 – 17:00');
  });

  it('renders the timezone when provided', () => {
    render(<WorkHours start="09:00" end="17:00" timezone="PST" />);
    expect(screen.getByTestId('work-hours')).toHaveTextContent('(PST)');
  });
});

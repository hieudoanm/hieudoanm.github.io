import { render, screen } from '@testing-library/react';
import { DateStamp } from '../DateStamp';

describe('DateStamp', () => {
  it('formats an ISO date', () => {
    render(<DateStamp date="2024-01-05" />);
    expect(screen.getByText('Jan 5, 2024')).toBeInTheDocument();
  });

  it('falls back to the raw value for unparseable dates', () => {
    render(<DateStamp date="not-a-date" />);
    expect(screen.getByText('not-a-date')).toBeInTheDocument();
  });

  it('sets the dateTime attribute', () => {
    render(<DateStamp date="2024-03-10" />);
    expect(screen.getByTestId('date-stamp')).toHaveAttribute(
      'datetime',
      '2024-03-10'
    );
  });
});

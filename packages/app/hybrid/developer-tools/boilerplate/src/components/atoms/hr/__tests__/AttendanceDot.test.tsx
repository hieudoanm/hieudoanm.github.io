import { render, screen } from '@testing-library/react';
import { AttendanceDot } from '../AttendanceDot';

describe('AttendanceDot', () => {
  it('renders the status label', () => {
    render(<AttendanceDot status="present" label="On time" />);
    expect(screen.getByTestId('attendance-dot')).toHaveAttribute(
      'aria-label',
      'On time'
    );
  });

  it('falls back to the status value when label is omitted', () => {
    render(<AttendanceDot status="late" />);
    expect(screen.getByTestId('attendance-dot')).toHaveAttribute(
      'aria-label',
      'late'
    );
  });

  it('applies the status color class', () => {
    render(<AttendanceDot status="absent" />);
    expect(screen.getByTestId('attendance-dot')).toHaveClass('bg-error');
  });

  it('applies the size class', () => {
    render(<AttendanceDot status="leave" size="sm" />);
    expect(screen.getByTestId('attendance-dot')).toHaveClass('h-2', 'w-2');
  });
});

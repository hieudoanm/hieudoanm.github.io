import { render, screen } from '@testing-library/react';
import { LeaveStatus } from '../LeaveStatus';

describe('LeaveStatus', () => {
  it('renders the status value as the label', () => {
    render(<LeaveStatus status="approved" />);
    expect(screen.getByTestId('leave-status')).toHaveTextContent('approved');
  });

  it('renders a custom label when provided', () => {
    render(<LeaveStatus status="pending" label="In review" />);
    expect(screen.getByTestId('leave-status')).toHaveTextContent('In review');
  });

  it('applies the status color class', () => {
    render(<LeaveStatus status="rejected" />);
    expect(screen.getByTestId('leave-status')).toHaveClass('badge-error');
  });
});

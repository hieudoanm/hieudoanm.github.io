import { fireEvent, render, screen, within } from '@testing-library/react';
import { TimeOffTemplate } from '../TimeOffTemplate';

describe('TimeOffTemplate', () => {
  it('renders all requests and the summary', () => {
    render(<TimeOffTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Time Off' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 requests')).toBeInTheDocument();
    expect(screen.getByText('Priya Patel')).toBeInTheDocument();
    expect(screen.getByText('Aug 12-16')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Pending')).toHaveLength(3);
    expect(within(table).getAllByText('Approved')).toHaveLength(2);
  });

  it('filters requests by status', () => {
    render(<TimeOffTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Rejected' }));
    expect(screen.getByText('1 requests')).toBeInTheDocument();
    expect(screen.getByText('David Chen')).toBeInTheDocument();
    expect(screen.queryByText('Priya Patel')).not.toBeInTheDocument();
  });

  it('approves a pending request', () => {
    render(<TimeOffTemplate />);
    const approveButtons = screen.getAllByRole('button', { name: 'Approve' });
    expect(approveButtons).toHaveLength(3);
    fireEvent.click(approveButtons[0]);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Pending')).toHaveLength(2);
    expect(within(table).getAllByText('Approved')).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Approve' })).toHaveLength(2);
  });
});

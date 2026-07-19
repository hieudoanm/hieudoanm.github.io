import { fireEvent, render, screen } from '@testing-library/react';
import { EmployeeDirectory } from '../EmployeeDirectory';

describe('EmployeeDirectory', () => {
  const employees = [
    {
      id: '1',
      name: 'Ada Lovelace',
      role: 'Engineer',
      department: 'Engineering',
      email: 'ada@example.com',
      status: 'active' as const,
    },
    {
      id: '2',
      name: 'Grace Hopper',
      role: 'Analyst',
      department: 'Finance',
      email: 'grace@example.com',
      status: 'on-leave' as const,
    },
  ];

  it('renders summary stats for the employee set', () => {
    render(<EmployeeDirectory employees={employees} />);
    expect(screen.getByTestId('employee-total')).toHaveTextContent('2');
    expect(screen.getAllByText('1').length).toBeGreaterThan(0);
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('grace@example.com')).toBeInTheDocument();
  });

  it('applies status badge classes per employee', () => {
    render(<EmployeeDirectory employees={employees} />);
    expect(screen.getByText('active')).toHaveClass('badge-success');
    expect(screen.getByText('on-leave')).toHaveClass('badge-warning');
  });

  it('shows an empty state when no employees exist', () => {
    render(<EmployeeDirectory employees={[]} />);
    expect(screen.getByText('No employees found')).toBeInTheDocument();
    expect(screen.getByTestId('employee-total')).toHaveTextContent('0');
  });

  it('fires onSelect when a row is clicked', () => {
    const onSelect = jest.fn();
    render(<EmployeeDirectory employees={employees} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Grace Hopper'));
    expect(onSelect).toHaveBeenCalledWith(employees[1]);
  });
});

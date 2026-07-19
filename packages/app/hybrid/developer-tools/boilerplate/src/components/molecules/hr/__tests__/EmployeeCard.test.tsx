import { render, screen } from '@testing-library/react';
import { EmployeeCard } from '../EmployeeCard';

const employee = {
  name: 'Jane Doe',
  role: 'Software Engineer',
  department: 'Engineering',
  email: 'jane@acme.io',
  status: 'active' as const,
};

describe('EmployeeCard', () => {
  it('renders employee details', () => {
    render(<EmployeeCard employee={employee} />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('jane@acme.io')).toBeInTheDocument();
  });

  it('applies the status badge variant', () => {
    render(<EmployeeCard employee={{ ...employee, status: 'on-leave' }} />);
    expect(screen.getByText('on-leave')).toHaveClass('badge-warning');
  });

  it('generates initials from the name', () => {
    render(<EmployeeCard employee={employee} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('supports custom initials and className', () => {
    render(
      <EmployeeCard
        employee={{ ...employee, initials: 'DO' }}
        className="shadow-xl"
      />
    );
    expect(screen.getByText('DO')).toBeInTheDocument();
    expect(screen.getByTestId('employee-card')).toHaveClass('shadow-xl');
  });
});

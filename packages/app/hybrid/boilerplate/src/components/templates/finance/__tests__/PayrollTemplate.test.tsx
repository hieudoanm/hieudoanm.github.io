import { fireEvent, render, screen, within } from '@testing-library/react';
import { PayrollTemplate } from '../PayrollTemplate';

describe('PayrollTemplate', () => {
  it('renders payroll runs with the paid summary', () => {
    render(<PayrollTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Payroll' })
    ).toBeInTheDocument();
    expect(screen.getByText('2 of 4 runs paid')).toBeInTheDocument();
    expect(screen.getByText('Aug 01, 2026')).toBeInTheDocument();
    expect(screen.getByText('$24,000')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Paid')).toHaveLength(2);
    expect(within(table).getAllByText('Draft')).toHaveLength(2);
  });

  it('runs payroll and shows the confirmation', () => {
    render(<PayrollTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Run payroll' }));
    expect(screen.getByText('3 of 5 runs paid')).toBeInTheDocument();
    expect(screen.getByText('Payroll run completed')).toBeInTheDocument();
    expect(screen.getByText('Aug 15, 2026')).toBeInTheDocument();
    expect(screen.getAllByText('$24,000')).toHaveLength(2);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Draft')).toHaveLength(2);
  });

  it('appends a paid run on every click', () => {
    render(<PayrollTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Run payroll' }));
    fireEvent.click(screen.getByRole('button', { name: 'Run payroll' }));
    expect(screen.getByText('4 of 6 runs paid')).toBeInTheDocument();
    expect(screen.getAllByText('$24,000')).toHaveLength(3);
  });
});

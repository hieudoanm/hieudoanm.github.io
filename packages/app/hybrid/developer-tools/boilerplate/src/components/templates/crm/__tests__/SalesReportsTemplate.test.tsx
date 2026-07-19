import { fireEvent, render, screen } from '@testing-library/react';
import { SalesReportsTemplate } from '../SalesReportsTemplate';

describe('SalesReportsTemplate', () => {
  it('renders the monthly report stats', () => {
    render(<SalesReportsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Sales Reports' })
    ).toBeInTheDocument();
    expect(screen.getByText('$84,200')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('34%')).toBeInTheDocument();
    expect(screen.getByText('$210,000')).toBeInTheDocument();
    expect(screen.getByText('This month report')).toBeInTheDocument();
  });

  it('switches to the quarterly report', () => {
    render(<SalesReportsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'This quarter' }));
    expect(screen.getByText('$312,500')).toBeInTheDocument();
    expect(screen.getByText('61')).toBeInTheDocument();
    expect(screen.getByText('38%')).toBeInTheDocument();
    expect(screen.getByText('$640,000')).toBeInTheDocument();
    expect(screen.getByText('This quarter report')).toBeInTheDocument();
  });

  it('switches to the yearly report', () => {
    render(<SalesReportsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'This year' }));
    expect(screen.getByText('$1,180,000')).toBeInTheDocument();
    expect(screen.getByText('214')).toBeInTheDocument();
    expect(screen.getByText('41%')).toBeInTheDocument();
    expect(screen.getByText('$1,500,000')).toBeInTheDocument();
  });
});

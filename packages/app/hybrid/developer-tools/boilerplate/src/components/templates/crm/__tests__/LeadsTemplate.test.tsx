import { fireEvent, render, screen, within } from '@testing-library/react';
import { LeadsTemplate } from '../LeadsTemplate';

describe('LeadsTemplate', () => {
  it('renders all leads and the summary', () => {
    render(<LeadsTemplate />);
    expect(screen.getByRole('heading', { name: 'Leads' })).toBeInTheDocument();
    expect(screen.getByText('6 leads')).toBeInTheDocument();
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getAllByText('Acme Corp')).toHaveLength(2);
    expect(
      screen.getAllByRole('button', { name: 'Mark contacted' })
    ).toHaveLength(2);
  });

  it('filters leads by status', () => {
    render(<LeadsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Qualified' }));
    expect(screen.getByText('2 leads')).toBeInTheDocument();
    expect(screen.getByText('Emma Wilson')).toBeInTheDocument();
    expect(screen.queryByText('Alice Chen')).not.toBeInTheDocument();
  });

  it('marks a lead as contacted', () => {
    render(<LeadsTemplate />);
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Mark contacted' })[0]
    );
    expect(
      screen.getAllByRole('button', { name: 'Mark contacted' })
    ).toHaveLength(1);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Contacted')).toHaveLength(3);
    expect(within(table).getAllByText('New')).toHaveLength(1);
  });
});

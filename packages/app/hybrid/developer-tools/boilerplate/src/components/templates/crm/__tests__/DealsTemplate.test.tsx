import { fireEvent, render, screen, within } from '@testing-library/react';
import { DealsTemplate } from '../DealsTemplate';

describe('DealsTemplate', () => {
  it('renders deals with the total value', () => {
    render(<DealsTemplate />);
    expect(screen.getByRole('heading', { name: 'Deals' })).toBeInTheDocument();
    expect(screen.getByText('6 deals')).toBeInTheDocument();
    expect(screen.getByText('$125,850')).toBeInTheDocument();
    expect(screen.getAllByText('Sarah Jones')).toHaveLength(2);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Open')).toHaveLength(2);
    expect(within(table).getAllByText('Won')).toHaveLength(2);
    expect(within(table).getAllByText('Lost')).toHaveLength(2);
  });

  it('marks an open deal as won', () => {
    render(<DealsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Mark won' })[0]);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Open')).toHaveLength(1);
    expect(within(table).getAllByText('Won')).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Mark won' })).toHaveLength(1);
  });

  it('marks an open deal as lost', () => {
    render(<DealsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Mark lost' })[1]);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Open')).toHaveLength(1);
    expect(within(table).getAllByText('Lost')).toHaveLength(3);
  });
});

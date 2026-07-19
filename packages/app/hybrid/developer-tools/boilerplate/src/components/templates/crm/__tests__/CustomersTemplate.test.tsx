import { fireEvent, render, screen, within } from '@testing-library/react';
import { CustomersTemplate } from '../CustomersTemplate';

describe('CustomersTemplate', () => {
  it('renders customers with segment badges and the summary', () => {
    render(<CustomersTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Customers' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 customers')).toBeInTheDocument();
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getByText('alice@acme.com')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('New')).toHaveLength(2);
    expect(within(table).getAllByText('Returning')).toHaveLength(3);
    expect(within(table).getAllByText('VIP')).toHaveLength(2);
  });

  it('searches customers by name or email', () => {
    render(<CustomersTemplate />);
    fireEvent.change(screen.getByLabelText('Search customers'), {
      target: { value: 'alice' },
    });
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.queryByText('Bob Martinez')).not.toBeInTheDocument();
    expect(screen.getByText('1 customers')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search customers'), {
      target: { value: 'grace@acme.com' },
    });
    expect(screen.getByText('Grace Kim')).toBeInTheDocument();
    expect(screen.getByText('1 customers')).toBeInTheDocument();
  });

  it('shows the empty state and filters by segment', () => {
    render(<CustomersTemplate />);
    fireEvent.change(screen.getByLabelText('Search customers'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No customers found')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search customers'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'VIP' }));
    expect(screen.getByText('2 customers')).toBeInTheDocument();
    expect(screen.getByText('David Lee')).toBeInTheDocument();
    expect(screen.queryByText('Bob Martinez')).not.toBeInTheDocument();
  });
});

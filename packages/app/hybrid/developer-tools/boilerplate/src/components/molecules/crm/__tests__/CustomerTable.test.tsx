import { render, screen } from '@testing-library/react';
import { CustomerTable } from '../CustomerTable';

const rows = [
  {
    id: '1',
    name: 'Alice',
    email: 'alice@example.com',
    plan: 'Pro',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Bob',
    email: 'bob@example.com',
    plan: 'Free',
    status: 'Trial',
  },
];

describe('CustomerTable', () => {
  it('renders header and row data', () => {
    render(<CustomerTable rows={rows} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Trial')).toBeInTheDocument();
  });

  it('applies the status badge class', () => {
    render(<CustomerTable rows={rows} />);
    expect(screen.getByText('Active')).toHaveClass('badge');
  });

  it('shows an empty state when there are no rows', () => {
    render(<CustomerTable rows={[]} />);
    expect(screen.getByText('No customers')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { DataTable } from '../DataTable';

jest.mock('next/link', () => {
  return ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const { usePathname } = jest.requireMock('next/navigation');

describe('DataTable', () => {
  const columns = [
    { key: 'name', header: 'Name' },
    {
      key: 'status',
      header: 'Status',
      render: (row: Record<string, unknown>) => String(row.status),
    },
  ];

  it('renders headers and cell values', () => {
    render(
      <DataTable columns={columns} rows={[{ name: 'Ada', status: 'Active' }]} />
    );
    expect(
      screen.getByRole('columnheader', { name: 'Name' })
    ).toBeInTheDocument();
    expect(screen.getByText('Ada')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('shows empty state text when no rows', () => {
    render(<DataTable columns={columns} rows={[]} emptyText="Nothing here" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
    expect(screen.queryByText('Ada')).not.toBeInTheDocument();
  });

  it('uses default empty text when not provided', () => {
    render(<DataTable columns={columns} rows={[]} />);
    expect(screen.getByText('No records found.')).toBeInTheDocument();
  });

  it('renders missing values as empty string', () => {
    render(<DataTable columns={columns} rows={[{ name: 'Ada' }]} />);
    expect(screen.getByText('Ada')).toBeInTheDocument();
  });
});

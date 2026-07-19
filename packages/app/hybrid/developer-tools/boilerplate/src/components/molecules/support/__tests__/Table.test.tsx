import { render, screen } from '@testing-library/react';
import { Table } from '../Table';

describe('Table', () => {
  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'score', header: 'Score', align: 'right' as const },
  ];
  const rows = [
    { name: 'Ada', score: 98 },
    { name: 'Grace', score: 95 },
  ];

  it('renders headers, cells, and caption', () => {
    render(<Table columns={columns} rows={rows} caption="Leaderboard" />);
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Ada')).toBeInTheDocument();
    expect(screen.getByText('98')).toBeInTheDocument();
  });

  it('renders an em dash for missing values', () => {
    render(<Table columns={columns} rows={[{ name: 'Ada' }]} />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('applies striped and compact classes', () => {
    const { container } = render(
      <Table columns={columns} rows={rows} striped compact />
    );
    expect(container.querySelector('table')).toHaveClass(
      'table-zebra',
      'table-compact'
    );
  });
});

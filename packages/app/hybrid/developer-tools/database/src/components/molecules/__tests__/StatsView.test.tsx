import { render, screen } from '@testing-library/react';

import { StatsView } from '@/components/molecules/StatsView';
import type { SqliteDatabase } from '@/types/sqlite';

const makeDb = (): SqliteDatabase => {
  const instance = {
    exec: (sql: string) => {
      if (sql.includes('PRAGMA page_size')) {
        return [{ columns: [], values: [['4096']] }];
      }
      if (sql.includes('PRAGMA page_count')) {
        return [{ columns: [], values: [['3']] }];
      }
      if (sql.includes("name FROM sqlite_master WHERE type='table'")) {
        return [{ columns: ['name'], values: [['users'], ['orders']] }];
      }
      if (sql.includes('SELECT COUNT(*) FROM "users"')) {
        return [{ columns: [], values: [['2']] }];
      }
      if (sql.includes('SELECT COUNT(*) FROM "orders"')) {
        return [{ columns: [], values: [['1']] }];
      }
      if (sql.includes('FROM pragma_index_list("users")')) {
        return [{ columns: [], values: [['1']] }];
      }
      if (sql.includes('FROM pragma_index_list("orders")')) {
        return [{ columns: [], values: [['0']] }];
      }
      if (sql.includes('SELECT * FROM "users"')) {
        return [
          {
            columns: ['id', 'name'],
            values: [
              [1, 'alice'],
              [2, 'bob'],
            ],
          },
        ];
      }
      if (sql.includes('SELECT * FROM "orders"')) {
        return [{ columns: ['id', 'user_id'], values: [[1, 1]] }];
      }
      if (sql.includes("type='index'")) {
        return [{ columns: [], values: [['0']] }];
      }
      if (sql.includes('PRAGMA index_list("users")')) {
        return [
          { columns: [], values: [['0', 'idx_users_name', '0', 'c', '0']] },
        ];
      }
      if (sql.includes('PRAGMA index_list("orders")')) {
        return [{ columns: [], values: [] }];
      }
      return [];
    },
  };
  return instance as unknown as SqliteDatabase;
};

describe('StatsView', () => {
  it('renders summary stat cards', () => {
    render(<StatsView dbInstance={makeDb()} />);
    expect(screen.getAllByText('Tables').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Rows').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Indexes').length).toBeGreaterThan(0);
    expect(screen.getByText('Database size')).toBeInTheDocument();
    expect(screen.getByText('12.0 KB')).toBeInTheDocument();
  });

  it('lists tables with row counts and sizes', () => {
    render(<StatsView dbInstance={makeDb()} />);
    expect(screen.getAllByText('users').length).toBeGreaterThan(0);
    expect(screen.getAllByText('orders').length).toBeGreaterThan(0);
    expect(screen.getAllByText('24 B').length).toBeGreaterThan(0);
    expect(screen.getAllByText('16 B').length).toBeGreaterThan(0);
  });

  it('renders the storage breakdown chart', () => {
    render(<StatsView dbInstance={makeDb()} />);
    expect(screen.getByText('Storage breakdown')).toBeInTheDocument();
    expect(screen.getByText('40 B in table data')).toBeInTheDocument();
  });

  it('shows mock index usage', () => {
    render(<StatsView dbInstance={makeDb()} />);
    expect(screen.getByText('Index usage')).toBeInTheDocument();
    expect(screen.getByText(/idx_users_name/)).toBeInTheDocument();
    expect(screen.getByText(/mock statistics/)).toBeInTheDocument();
  });

  it('shows a fallback when there are no indexes', () => {
    const db = {
      exec: (sql: string) => {
        if (sql.includes("name FROM sqlite_master WHERE type='table'")) {
          return [{ columns: ['name'], values: [['t']] }];
        }
        if (sql.includes('PRAGMA page_size')) {
          return [{ columns: [], values: [['4096']] }];
        }
        if (sql.includes('PRAGMA page_count')) {
          return [{ columns: [], values: [['1']] }];
        }
        if (sql.includes('SELECT COUNT(*) FROM "t"')) {
          return [{ columns: [], values: [['0']] }];
        }
        if (sql.includes('FROM pragma_index_list("t")')) {
          return [{ columns: [], values: [['0']] }];
        }
        if (sql.includes('SELECT * FROM "t"')) {
          return [{ columns: ['id'], values: [] }];
        }
        if (sql.includes("type='index'")) {
          return [{ columns: [], values: [['0']] }];
        }
        if (sql.includes('PRAGMA index_list("t")')) {
          return [{ columns: [], values: [] }];
        }
        return [];
      },
    } as unknown as SqliteDatabase;
    render(<StatsView dbInstance={db} />);
    expect(screen.getByText('No indexes found')).toBeInTheDocument();
  });
});

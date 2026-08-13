import { render, screen, fireEvent } from '@testing-library/react';

import { ErDiagramView } from '@/components/molecules/ErDiagramView';
import type { SqliteDatabase } from '@/types/sqlite';

jest.mock('react-icons/fi', () => ({
  FiZoomIn: () => <span data-testid="ico-zoom-in" />,
  FiZoomOut: () => <span data-testid="ico-zoom-out" />,
  FiMaximize: () => <span data-testid="ico-max" />,
  FiDownload: () => <span data-testid="ico-download" />,
  FiImage: () => <span data-testid="ico-image" />,
}));

const makeDb = (): SqliteDatabase => {
  const instance = {
    exec: (sql: string) => {
      if (sql.includes("name FROM sqlite_master WHERE type='table'")) {
        return [
          {
            columns: ['name'],
            values: [['audit_log'], ['orders'], ['users']],
          },
        ];
      }
      if (sql.includes('table_info("users")')) {
        return [
          {
            columns: [],
            values: [
              ['0', 'id', 'INTEGER', '0', '', '1'],
              ['1', 'name', 'TEXT', '1', '', '0'],
            ],
          },
        ];
      }
      if (sql.includes('table_info("orders")')) {
        return [
          {
            columns: [],
            values: [
              ['0', 'id', 'INTEGER', '0', '', '1'],
              ['1', 'user_id', 'INTEGER', '0', '', '0'],
            ],
          },
        ];
      }
      if (sql.includes('table_info("audit_log")')) {
        return [
          {
            columns: [],
            values: [['0', 'id', 'INTEGER', '0', '', '1']],
          },
        ];
      }
      if (sql.includes('foreign_key_list("orders")')) {
        return [
          {
            columns: [],
            values: [
              ['0', '0', 'users', 'user_id', 'id', 'NO ACTION', 'NO ACTION'],
            ],
          },
        ];
      }
      if (sql.includes('foreign_key_list(') || sql.includes('index_list(')) {
        return [{ columns: [], values: [] }];
      }
      return [];
    },
  };
  return instance as unknown as SqliteDatabase;
};

describe('ErDiagramView', () => {
  it('renders an svg with table names', () => {
    const { container } = render(<ErDiagramView dbInstance={makeDb()} />);
    expect(container.querySelector('svg')).not.toBeNull();
    expect(screen.getByText('users')).toBeInTheDocument();
    expect(screen.getByText('orders')).toBeInTheDocument();
    expect(container.querySelector('[data-edge]')).not.toBeNull();
  });

  it('highlights related tables and dims unrelated ones on hover', () => {
    const { container } = render(<ErDiagramView dbInstance={makeDb()} />);
    const stage = container.querySelector('.er-diagram')!;
    fireEvent.pointerMove(container.querySelector('[data-table="users"]')!);
    expect(stage.getAttribute('data-hover')).toBe('users');
    const style = (
      container.querySelector('style') ?? document.createElement('style')
    ).textContent;
    expect(style).toContain('.er-diagram[data-hover="users"] g[data-table]');
    expect(style).toContain(
      '.er-diagram[data-hover="users"] g[data-table="orders"] { opacity: 1; }'
    );
    expect(style).not.toContain(
      '.er-diagram[data-hover="users"] g[data-table="audit_log"] { opacity: 1; }'
    );
    fireEvent.pointerMove(container.querySelector('[data-table="audit_log"]')!);
    expect(stage.getAttribute('data-hover')).toBe('audit_log');
  });

  it('zooms in and out', () => {
    render(<ErDiagramView dbInstance={makeDb()} />);
    const initial = screen.getByText(/\d+%/).textContent;
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    expect(screen.getByText(/\d+%/).textContent).not.toBe(initial);
    fireEvent.click(screen.getByRole('button', { name: 'Zoom out' }));
    expect(screen.getByText(/\d+%/).textContent).toBe(initial);
  });

  it('shows export buttons and metadata', () => {
    render(<ErDiagramView dbInstance={makeDb()} fileName="shop.db" />);
    expect(screen.getByText('SVG')).toBeInTheDocument();
    expect(screen.getByText('PNG')).toBeInTheDocument();
    expect(screen.getByText(/3 tables · 1 relations/)).toBeInTheDocument();
  });

  it('shows an empty state when there are no tables', () => {
    const db = {
      exec: () => [],
    } as unknown as SqliteDatabase;
    render(<ErDiagramView dbInstance={db} />);
    expect(screen.getByText('No tables to visualize')).toBeInTheDocument();
  });
});

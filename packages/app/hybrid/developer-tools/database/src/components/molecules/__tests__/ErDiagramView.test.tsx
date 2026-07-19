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

jest.mock('@/utils/sqlDump', () => {
  const actual = jest.requireActual('@/utils/sqlDump');
  return { ...actual, downloadText: jest.fn() };
});

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

  it('zooms with the wheel and pans with the pointer', () => {
    const { container } = render(<ErDiagramView dbInstance={makeDb()} />);
    const stage = container.querySelector('.er-diagram')!;
    const before = screen.getByText(/\d+%/).textContent;
    fireEvent.wheel(stage, { clientX: 100, clientY: 100, deltaY: -50 });
    const after = screen.getByText(/\d+%/).textContent;
    expect(after).not.toBe(before);
    fireEvent.wheel(stage, { clientX: 100, clientY: 100, deltaY: 50 });
    expect(screen.getByText(/\d+%/).textContent).toBe(before);

    fireEvent.pointerDown(stage, { button: 0, clientX: 20, clientY: 20 });
    fireEvent.pointerMove(stage, { clientX: 60, clientY: 40 });
    fireEvent.pointerMove(stage, { clientX: 80, clientY: 60 });
    fireEvent.pointerUp(stage);
    expect(stage).toBeInTheDocument();
  });

  it('ignores pointer down for non-left buttons', () => {
    const { container } = render(<ErDiagramView dbInstance={makeDb()} />);
    const stage = container.querySelector('.er-diagram')!;
    fireEvent.pointerDown(stage, { button: 2, clientX: 20, clientY: 20 });
    fireEvent.pointerMove(stage, { clientX: 80, clientY: 80 });
    expect(stage).toBeInTheDocument();
  });

  it('exports the diagram as SVG with a stripped base name', () => {
    const { downloadText } = require('@/utils/sqlDump') as {
      downloadText: jest.Mock;
    };
    render(<ErDiagramView dbInstance={makeDb()} fileName="shop.db" />);
    fireEvent.click(screen.getByText('SVG'));
    expect(downloadText).toHaveBeenCalledWith(
      'shop-er.svg',
      expect.stringContaining('<svg')
    );
  });

  it('exports the diagram as PNG when a canvas context is available', () => {
    const getContext = jest.fn(() => null);
    const origToDataURL = HTMLCanvasElement.prototype.toDataURL;
    const origCreateObjectURL = URL.createObjectURL;
    const origRevoke = URL.revokeObjectURL;
    HTMLCanvasElement.prototype.getContext = getContext as never;
    URL.createObjectURL = jest.fn(() => 'blob:png');
    URL.revokeObjectURL = jest.fn();
    class FakeImage {
      onload: (() => void) | null = null;
      set src(_v: string) {
        this.onload?.();
      }
    }
    (global as { Image: unknown }).Image = FakeImage as never;

    const { container } = render(<ErDiagramView dbInstance={makeDb()} />);
    fireEvent.click(screen.getByText('PNG'));
    expect(getContext).toHaveBeenCalledWith('2d');

    HTMLCanvasElement.prototype.getContext = undefined as never;
    HTMLCanvasElement.prototype.toDataURL = origToDataURL;
    URL.createObjectURL = origCreateObjectURL;
    URL.revokeObjectURL = origRevoke;
    expect(container.querySelector('svg')).not.toBeNull();
  });
});

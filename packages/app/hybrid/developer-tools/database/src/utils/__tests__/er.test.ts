import type { SqliteDatabase } from '@/types/sqlite';
import {
  buildErModel,
  layoutErModel,
  erBounds,
  buildErSvg,
  tableHeight,
  DEFAULT_OPTS,
} from '@/utils/er';

interface FakeRes {
  columns: string[];
  values: (string | number)[][];
}

const makeDb = (): SqliteDatabase => {
  const instance = {
    exec: (sql: string) => {
      if (sql.includes("name FROM sqlite_master WHERE type='table'")) {
        return [{ columns: ['name'], values: [['orders'], ['customers']] }];
      }
      if (sql.includes('table_info("orders")')) {
        return [
          {
            columns: [],
            values: [
              ['0', 'order_id', 'INTEGER', '0', '', '1'],
              ['1', 'customer_id', 'INTEGER', '0', '', '0'],
            ],
          },
        ];
      }
      if (sql.includes('table_info("customers")')) {
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
      if (sql.includes('foreign_key_list("orders")')) {
        return [
          {
            columns: [],
            values: [
              [
                '0',
                '0',
                'customers',
                'customer_id',
                'id',
                'NO ACTION',
                'NO ACTION',
              ],
            ],
          },
        ];
      }
      if (
        sql.includes('index_list("orders")') ||
        sql.includes('index_list("customers")')
      ) {
        return [{ columns: [], values: [] }];
      }
      return [];
    },
  };
  return instance as unknown as SqliteDatabase;
};

describe('buildErModel', () => {
  it('extracts tables, columns and foreign key edges', () => {
    const model = buildErModel(makeDb());
    expect(model.tables.map((t) => t.name).sort()).toEqual([
      'customers',
      'orders',
    ]);
    const orders = model.tables.find((t) => t.name === 'orders');
    expect(orders?.columns[0].primaryKey).toBe(true);
    expect(model.edges).toEqual([
      {
        from: 'orders',
        fromColumn: 'customer_id',
        to: 'customers',
        toColumn: 'id',
      },
    ]);
  });
});

describe('layoutErModel', () => {
  it('places tables in a grid without overlap', () => {
    const model = buildErModel(makeDb());
    const laid = layoutErModel(model);
    expect(laid.tables[0].x).toBe(DEFAULT_OPTS.padding);
    expect(laid.tables[1].x).toBeGreaterThan(laid.tables[0].x);
    for (const t of laid.tables) {
      expect(t.x).toBeGreaterThanOrEqual(0);
      expect(t.y).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('tableHeight', () => {
  it('includes header and padding', () => {
    expect(
      tableHeight(
        { name: 't', columns: [{ name: 'a', primaryKey: false }], x: 0, y: 0 },
        DEFAULT_OPTS
      )
    ).toBe(DEFAULT_OPTS.headerHeight + DEFAULT_OPTS.rowHeight + 16);
  });
});

describe('erBounds', () => {
  it('computes svg dimensions', () => {
    const model = buildErModel(makeDb());
    const bounds = erBounds(layoutErModel(model));
    expect(bounds.width).toBeGreaterThan(0);
    expect(bounds.height).toBeGreaterThan(0);
  });
});

describe('buildErSvg', () => {
  it('produces an svg with tables and edges', () => {
    const { svg } = buildErSvg(layoutErModel(buildErModel(makeDb())));
    expect(svg).toContain('<svg');
    expect(svg).toContain('orders');
    expect(svg).toContain('customers');
    expect(svg).toContain('<path');
    expect(svg).toContain('</svg>');
  });
});

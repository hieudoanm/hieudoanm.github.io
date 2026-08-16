import type { SqliteCell } from '@/types/sqlite';
import {
  emptyDesignColumn,
  readTableDesign,
  buildCreateTableSQL,
  buildAlterStatements,
  TYPE_OPTIONS,
  type DesignColumn,
  type ExecFn,
} from '@/utils/schema';

const makeExec =
  (defs: Record<string, SqliteCell[][]>): ExecFn =>
  (sql) => {
    for (const [pattern, values] of Object.entries(defs)) {
      if (sql.includes(pattern)) {
        return [{ columns: [], values }];
      }
    }
    return [];
  };

const baseCols: SqliteCell[][] = [
  ['0', 'id', 'INTEGER', '1', '', '1'],
  ['1', 'name', 'TEXT', '1', '', '0'],
];

describe('emptyDesignColumn', () => {
  it('returns a blank column design', () => {
    expect(emptyDesignColumn()).toEqual({
      name: '',
      type: 'TEXT',
      nullable: true,
      primaryKey: false,
      unique: false,
      defaultValue: '',
      fkTable: '',
      fkColumn: '',
    });
  });
});

describe('readTableDesign', () => {
  it('reads columns, foreign keys and indexes', () => {
    const exec = makeExec({
      'table_info("t")': baseCols,
      'foreign_key_list("t")': [
        ['0', '0', 'customers', 'id', 'id', 'CASCADE', 'NO ACTION'],
      ],
      'index_list("t")': [
        ['0', 'idx_name', '0', 'c'],
        ['1', 'sqlite_autoindex_t_1', '2', 'pk'],
      ],
      'index_info("idx_name")': [['0', '1', 'name']],
    });
    const design = readTableDesign(exec, 't');
    expect(design.columns).toHaveLength(2);
    expect(design.columns[0].primaryKey).toBe(true);
    expect(design.columns[0].nullable).toBe(false);
    expect(design.columns[0].fkTable).toBe('customers');
    expect(design.columns[0].fkColumn).toBe('id');
    expect(design.foreignKeys).toHaveLength(1);
    expect(design.foreignKeys[0].table).toBe('customers');
    expect(design.indexes).toHaveLength(1);
    expect(design.indexes[0].name).toBe('idx_name');
    expect(design.indexes[0].columns).toEqual(['name']);
  });

  it('handles missing pragma results', () => {
    const design = readTableDesign(() => [], 't');
    expect(design.columns).toEqual([]);
    expect(design.foreignKeys).toEqual([]);
    expect(design.indexes).toEqual([]);
  });

  it('maps null defaults and null fk targets to empty strings', () => {
    const exec = makeExec({
      'table_info("t")': [
        ['0', 'id', 'INTEGER', '0', null, '0'],
        ['1', 'cid', 'INTEGER', '0', null, '0'],
      ],
      'foreign_key_list("t")': [['0', '0', 'customers', 'cid', null, '', '']],
      'index_list("t")': [
        ['0', 'uniq_id', '1', 'u'],
        ['1', 'auto', '1', 'pk'],
      ],
    });
    const design = readTableDesign(exec, 't');
    expect(design.columns[0].defaultValue).toBe('');
    expect(design.columns[1].fkColumn).toBe('');
    expect(design.columns[1].fkTable).toBe('customers');
    expect(design.indexes[0].unique).toBe(true);
  });

  it('handles an index with no detail rows', () => {
    const exec = makeExec({
      'table_info("t")': baseCols,
      'foreign_key_list("t")': [],
      'index_list("t")': [['0', 'idx', '0', 'c']],
    });
    const design = readTableDesign(exec, 't');
    expect(design.indexes[0].columns).toEqual([]);
  });

  it('maps a null type to an empty string', () => {
    const exec = makeExec({
      'table_info("t")': [['0', 'id', null, '0', '', '1']],
      'foreign_key_list("t")': [],
      'index_list("t")': [],
    });
    const design = readTableDesign(exec, 't');
    expect(design.columns[0].type).toBe('');
  });

  it('ignores foreign keys whose source column is missing', () => {
    const exec = makeExec({
      'table_info("t")': baseCols,
      'foreign_key_list("t")': [
        ['0', '0', 'customers', 'ghost', 'id', '', ''],
        ['1', '0', 'customers', 'id', 'id', '', ''],
      ],
      'index_list("t")': [],
    });
    const design = readTableDesign(exec, 't');
    expect(design.columns[0].fkTable).toBe('customers');
    expect(design.columns[1].fkTable).toBe('');
  });

  it('falls back to empty when exec throws', () => {
    const design = readTableDesign(() => {
      throw new Error('boom');
    }, 't');
    expect(design.columns).toEqual([]);
    expect(design.foreignKeys).toEqual([]);
  });
});

describe('buildCreateTableSQL', () => {
  it('builds a CREATE TABLE statement', () => {
    const cols: DesignColumn[] = [
      {
        name: 'id',
        type: 'INTEGER',
        nullable: false,
        primaryKey: true,
        unique: false,
        defaultValue: '',
        fkTable: '',
        fkColumn: '',
      },
      {
        name: 'name',
        type: 'TEXT',
        nullable: true,
        primaryKey: false,
        unique: true,
        defaultValue: '',
        fkTable: '',
        fkColumn: '',
      },
    ];
    const sql = buildCreateTableSQL('users', cols);
    expect(sql).toContain('CREATE TABLE "users"');
    expect(sql).toContain('"id" INTEGER PRIMARY KEY NOT NULL');
    expect(sql).toContain('"name" TEXT UNIQUE');
  });

  it('adds default and foreign key clauses', () => {
    const cols: DesignColumn[] = [
      {
        name: 'cid',
        type: 'INTEGER',
        nullable: false,
        primaryKey: false,
        unique: false,
        defaultValue: '0',
        fkTable: 'customers',
        fkColumn: 'id',
      },
    ];
    const sql = buildCreateTableSQL('orders', cols);
    expect(sql).toContain('DEFAULT 0');
    expect(sql).toContain('REFERENCES "customers"("id")');
  });

  it('filters empty references', () => {
    const cols: DesignColumn[] = [
      {
        name: 'a',
        type: 'TEXT',
        nullable: true,
        primaryKey: false,
        unique: false,
        defaultValue: '',
        fkTable: ' ',
        fkColumn: '',
      },
    ];
    expect(buildCreateTableSQL('t', cols)).not.toContain('REFERENCES');
  });

  it('references a table without a column when fkColumn is empty', () => {
    const cols: DesignColumn[] = [
      {
        name: 'a',
        type: 'INTEGER',
        nullable: true,
        primaryKey: false,
        unique: false,
        defaultValue: '',
        fkTable: 'customers',
        fkColumn: '',
      },
    ];
    const sql = buildCreateTableSQL('orders', cols);
    expect(sql).toContain('REFERENCES "customers"');
    expect(sql).not.toContain('("');
  });

  it('defaults a missing column type to TEXT', () => {
    const cols: DesignColumn[] = [
      {
        name: 'a',
        type: '',
        nullable: true,
        primaryKey: false,
        unique: false,
        defaultValue: '',
        fkTable: '',
        fkColumn: '',
      },
    ];
    expect(buildCreateTableSQL('t', cols)).toContain('"a" TEXT');
  });
});

describe('buildAlterStatements', () => {
  const original: DesignColumn[] = [
    {
      name: 'id',
      type: 'INTEGER',
      nullable: false,
      primaryKey: true,
      unique: false,
      defaultValue: '',
      fkTable: '',
      fkColumn: '',
    },
    {
      name: 'old',
      type: 'TEXT',
      nullable: true,
      primaryKey: false,
      unique: false,
      defaultValue: '',
      fkTable: '',
      fkColumn: '',
    },
  ];

  it('detects added columns', () => {
    const updated = [
      ...original,
      {
        name: 'new',
        type: 'REAL',
        nullable: true,
        primaryKey: false,
        unique: false,
        defaultValue: '',
        fkTable: '',
        fkColumn: '',
      },
    ];
    const stmts = buildAlterStatements('t', original, updated);
    expect(stmts).toContain('ALTER TABLE "t" ADD COLUMN "new" REAL;');
  });

  it('detects renamed columns', () => {
    const updated = original.map((c) =>
      c.name === 'old' ? { ...c, name: 'new' } : c
    );
    const stmts = buildAlterStatements('t', original, updated);
    expect(stmts).toContain('ALTER TABLE "t" RENAME COLUMN "old" TO "new";');
  });

  it('detects dropped columns', () => {
    const updated = [original[0]];
    const stmts = buildAlterStatements('t', original, updated);
    expect(stmts).toContain('ALTER TABLE "t" DROP COLUMN "old";');
  });

  it('builds ADD COLUMN with constraints and references', () => {
    const added: DesignColumn = {
      name: 'email',
      type: 'TEXT',
      nullable: false,
      primaryKey: false,
      unique: true,
      defaultValue: 'n/a',
      fkTable: 'contacts',
      fkColumn: '',
    };
    const stmts = buildAlterStatements('t', original, [...original, added]);
    const add = stmts.find((s) => s.includes('ADD COLUMN'));
    expect(add).toContain('"email" TEXT NOT NULL UNIQUE DEFAULT n/a');
    expect(add).toContain('REFERENCES "contacts"');
  });

  it('defaults an added column type and fk column', () => {
    const added: DesignColumn = {
      name: 'cid',
      type: '',
      nullable: true,
      primaryKey: false,
      unique: false,
      defaultValue: '',
      fkTable: 'customers',
      fkColumn: 'id',
    };
    const stmts = buildAlterStatements('t', original, [...original, added]);
    const add = stmts.find((s) => s.includes('ADD COLUMN'));
    expect(add).toContain('ADD COLUMN "cid" TEXT');
    expect(add).toContain('REFERENCES "customers"("id")');
  });
});

describe('TYPE_OPTIONS', () => {
  it('includes common SQLite types', () => {
    expect(TYPE_OPTIONS).toContain('INTEGER');
    expect(TYPE_OPTIONS).toContain('TEXT');
  });
});

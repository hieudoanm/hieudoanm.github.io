import {
  modelToErModel,
  parseErDiagram,
  parseInlineFields,
  parseMermaidField,
  renderErDiagram,
} from '@/utils/mermaid';
import { parseMarkdown } from '@/utils/markdown';
import { posts } from '@/posts';

describe('parseInlineFields', () => {
  it('parses alternating type/name tokens with flags', () => {
    expect(parseInlineFields('int id PK string username string email')).toEqual(
      [
        { type: 'int', name: 'id', primaryKey: true, foreignKey: false },
        {
          type: 'string',
          name: 'username',
          primaryKey: false,
          foreignKey: false,
        },
        { type: 'string', name: 'email', primaryKey: false, foreignKey: false },
      ]
    );
  });

  it('parses combined PK,FK annotations', () => {
    expect(
      parseInlineFields('int post_id PK,FK int category_id PK,FK')
    ).toEqual([
      { type: 'int', name: 'post_id', primaryKey: true, foreignKey: true },
      { type: 'int', name: 'category_id', primaryKey: true, foreignKey: true },
    ]);
  });
});

describe('parseMermaidField', () => {
  it('parses type, name and PK flag', () => {
    expect(parseMermaidField('int UserID PK')).toEqual({
      type: 'int',
      name: 'UserID',
      primaryKey: true,
      foreignKey: false,
    });
  });

  it('parses FK flag', () => {
    expect(parseMermaidField('string CustomerID FK')).toEqual({
      type: 'string',
      name: 'CustomerID',
      primaryKey: false,
      foreignKey: true,
    });
  });

  it('parses combined PK,FK', () => {
    expect(parseMermaidField('int OrderID PK,FK')).toEqual({
      type: 'int',
      name: 'OrderID',
      primaryKey: true,
      foreignKey: true,
    });
  });

  it('parses quoted names', () => {
    expect(parseMermaidField('string "Company Name"')).toEqual({
      type: 'string',
      name: 'Company Name',
      primaryKey: false,
      foreignKey: false,
    });
  });

  it('returns null for malformed lines', () => {
    expect(parseMermaidField('just_one_token')).toBeNull();
  });
});

describe('parseErDiagram', () => {
  it('parses relations with cardinality and labels', () => {
    const model = parseErDiagram(
      [
        'CUSTOMERS ||--o{ ORDERS : places',
        'EMPLOYEES ||--o{ EMPLOYEES : "reports to"',
        'ORDER_DETAILS }o--|| PRODUCTS : "is in"',
      ].join('\n')
    );
    expect(model.relations).toEqual([
      { from: 'CUSTOMERS', to: 'ORDERS', label: 'places' },
      { from: 'EMPLOYEES', to: 'EMPLOYEES', label: 'reports to' },
      { from: 'ORDER_DETAILS', to: 'PRODUCTS', label: 'is in' },
    ]);
  });

  it('parses entity attribute blocks', () => {
    const model = parseErDiagram(
      ['A {', '  int id PK', '  string name', '}'].join('\n')
    );
    expect(model.entities).toEqual([
      {
        name: 'A',
        fields: [
          { type: 'int', name: 'id', primaryKey: true, foreignKey: false },
          {
            type: 'string',
            name: 'name',
            primaryKey: false,
            foreignKey: false,
          },
        ],
      },
    ]);
  });

  it('skips comments and blank lines', () => {
    const model = parseErDiagram('%% a comment\n\nA ||--o{ B : x\n\n');
    expect(model.relations).toEqual([{ from: 'A', to: 'B', label: 'x' }]);
  });

  it('parses a full diagram with relations and blocks', () => {
    const model = parseErDiagram(
      [
        'CUSTOMERS ||--o{ ORDERS : places',
        'CUSTOMERS {',
        '  string CustomerID PK',
        '  string CompanyName',
        '}',
        'ORDERS {',
        '  int OrderID PK',
        '  string CustomerID FK',
        '}',
      ].join('\n')
    );
    expect(model.entities).toHaveLength(2);
    expect(model.relations).toHaveLength(1);
  });

  it('parses single-line entity blocks', () => {
    const model = parseErDiagram(
      'USERS { int id PK string email int role_id FK }\nUSERS ||--o{ POSTS : authors'
    );
    expect(model.entities).toEqual([
      {
        name: 'USERS',
        fields: [
          { type: 'int', name: 'id', primaryKey: true, foreignKey: false },
          {
            type: 'string',
            name: 'email',
            primaryKey: false,
            foreignKey: false,
          },
          { type: 'int', name: 'role_id', primaryKey: false, foreignKey: true },
        ],
      },
    ]);
    expect(model.relations).toEqual([
      { from: 'USERS', to: 'POSTS', label: 'authors' },
    ]);
  });

  it('renders every schema library post to an ER SVG', () => {
    for (const post of posts) {
      const mermaidBlocks = parseMarkdown(post.source).filter(
        (b) => b.type === 'code' && b.lang === 'mermaid'
      );
      expect(mermaidBlocks.length).toBeGreaterThan(0);
      for (const block of mermaidBlocks) {
        const result = renderErDiagram(block.text ?? '');
        expect(result).not.toBeNull();
        expect(result?.svg).toContain('<svg');
      }
    }
  });
});

describe('modelToErModel', () => {
  it('maps entities and relations to ErModel', () => {
    const model = modelToErModel(
      parseErDiagram(
        'A ||--o{ B : has\nA {\n  int id PK\n}\nB {\n  int bid PK\n}'
      )
    );
    expect(model.tables.map((t) => t.name)).toEqual(['A', 'B']);
    expect(model.tables[0].columns[0]).toEqual({
      name: 'id',
      primaryKey: true,
    });
    expect(model.edges).toEqual([
      { from: 'A', fromColumn: 'id', to: 'B', toColumn: 'id' },
    ]);
  });

  it('drops self-referencing edges', () => {
    const model = modelToErModel(
      parseErDiagram('E ||--o{ E : reports to\nE {\n  int id PK\n}')
    );
    expect(model.edges).toEqual([]);
  });
});

describe('renderErDiagram', () => {
  it('renders SVG for a valid diagram', () => {
    const result = renderErDiagram(
      'A ||--o{ B : has\nA {\n  int id PK\n}\nB {\n  int bid PK\n}'
    );
    expect(result).not.toBeNull();
    expect(result?.svg).toContain('<svg');
    expect(result?.svg).toContain('data-table="A"');
    expect(result?.svg).toContain('data-table="B"');
    expect(result?.width).toBeGreaterThan(0);
  });

  it('returns null when there are no entities', () => {
    expect(renderErDiagram('A ||--o{ B : has')).toBeNull();
  });
});

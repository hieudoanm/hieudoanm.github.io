import { resolveRef, schemaToExample } from '../utils/schemaHelpers';

describe('resolveRef', () => {
  it('returns the schema as-is when no $ref', () => {
    const schema = { type: 'string' };
    expect(resolveRef(schema, {} as any)).toBe(schema);
  });

  it('resolves a $ref to the root spec', () => {
    const root = {
      components: {
        schemas: {
          Pet: { type: 'object', properties: { name: { type: 'string' } } },
        },
      },
    };
    const result = resolveRef(
      { $ref: '#/components/schemas/Pet' },
      root as any
    );
    expect(result).toEqual(root.components.schemas.Pet);
  });

  it('returns empty object for non-existent ref', () => {
    const result = resolveRef({ $ref: '#/components/schemas/Nope' }, {} as any);
    expect(result).toEqual({});
  });

  it('handles undefined schema', () => {
    expect(resolveRef(undefined, {} as any)).toEqual({});
  });
});

describe('schemaToExample', () => {
  it('returns example when provided', () => {
    const schema = { type: 'string', example: 'hello' };
    expect(schemaToExample(schema, {} as any)).toBe('hello');
  });

  it('returns default when no example', () => {
    const schema = { type: 'number', default: 42 };
    expect(schemaToExample(schema, {} as any)).toBe(42);
  });

  it('generates example for string type', () => {
    expect(schemaToExample({ type: 'string' }, {} as any)).toBe('string');
  });

  it('uses first enum value for string with enum', () => {
    const schema = { type: 'string', enum: ['cat', 'dog'] };
    expect(schemaToExample(schema, {} as any)).toBe('cat');
  });

  it('generates example for integer type', () => {
    expect(schemaToExample({ type: 'integer' }, {} as any)).toBe(0);
  });

  it('generates example for boolean type', () => {
    expect(schemaToExample({ type: 'boolean' }, {} as any)).toBe(true);
  });

  it('generates example for array type', () => {
    const schema = { type: 'array', items: { type: 'string' } };
    expect(schemaToExample(schema, {} as any)).toEqual(['string']);
  });

  it('returns empty array for array with no items', () => {
    expect(schemaToExample({ type: 'array' }, {} as any)).toEqual([]);
  });

  it('generates example for object type', () => {
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'integer' },
      },
    };
    const result = schemaToExample(schema, {} as any);
    expect(result).toEqual({ name: 'string', age: 0 });
  });

  it('returns null for object with no properties', () => {
    expect(schemaToExample({ type: 'object' }, {} as any)).toBeNull();
  });

  it('respects depth limit', () => {
    const deep: any = { type: 'object', properties: {} };
    let current = deep;
    for (let i = 0; i < 10; i++) {
      current.properties = { nested: { type: 'object', properties: {} } };
      current = current.properties.nested;
    }
    const schema = { type: 'array', items: deep };
    const result = schemaToExample(schema, {} as any) as any;
    expect(Array.isArray(result)).toBe(true);
  });

  it('resolves $ref in schema', () => {
    const root = {
      components: { schemas: { Name: { type: 'string', example: 'Fido' } } },
    };
    const schema = { $ref: '#/components/schemas/Name' };
    expect(schemaToExample(schema, root as any)).toBe('Fido');
  });

  it('returns null for undefined schema', () => {
    expect(schemaToExample(undefined, {} as any)).toBeNull();
  });
});

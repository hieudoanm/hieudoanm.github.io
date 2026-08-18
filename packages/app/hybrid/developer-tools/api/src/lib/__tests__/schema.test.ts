import { inferSchema, schemaToJson, validateSchema } from '@/lib/schema';

describe('inferSchema', () => {
  it('infers an object schema with required properties', () => {
    const schema = inferSchema({ id: 1, name: 'Ada' });
    expect(schema).toEqual({
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
      },
      required: ['id', 'name'],
    });
  });

  it('infers an array schema from its first item', () => {
    expect(inferSchema([1, 2])).toEqual({
      type: 'array',
      items: { type: 'integer' },
    });
    expect(inferSchema([])).toEqual({ type: 'array', items: {} });
  });

  it('infers scalar schemas', () => {
    expect(inferSchema('hi')).toEqual({ type: 'string' });
    expect(inferSchema(1.5)).toEqual({ type: 'number' });
    expect(inferSchema(true)).toEqual({ type: 'boolean' });
    expect(inferSchema(null)).toEqual({ type: 'null' });
    expect(inferSchema(undefined)).toEqual({});
  });

  it('detects string formats', () => {
    expect(inferSchema('2024-01-01T10:00:00Z').format).toBe('date-time');
    expect(inferSchema('2024-01-01').format).toBe('date');
    expect(inferSchema('a@b.com').format).toBe('email');
    expect(inferSchema('f47ac10b-58cc-4372-a567-0e02b2c3d479').format).toBe(
      'uuid'
    );
    expect(inferSchema('https://example.com').format).toBe('uri');
  });
});

describe('validateSchema', () => {
  it('passes when the value matches the schema', () => {
    const result = validateSchema(
      {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
        },
        required: ['id'],
      },
      { id: 1, name: 'Ada', extra: true }
    );
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('reports type mismatches', () => {
    const result = validateSchema(
      { type: 'object', properties: { id: { type: 'integer' } } },
      { id: 'nope' }
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('$.id');
    expect(result.errors[0]).toContain('expected type "integer"');
  });

  it('reports missing required properties', () => {
    const result = validateSchema({ type: 'object', required: ['name'] }, {});
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('missing required property "name"');
  });

  it('validates array items by index', () => {
    const result = validateSchema(
      { type: 'array', items: { type: 'string' } },
      ['a', 2]
    );
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('$[1]');
  });

  it('validates enum values', () => {
    const result = validateSchema({ enum: ['a', 'b'] }, 'c');
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('not in enum');
  });

  it('validates formats', () => {
    expect(
      validateSchema({ type: 'string', format: 'email' }, 'x@y.com').valid
    ).toBe(true);
    expect(
      validateSchema({ type: 'string', format: 'email' }, 'nope').valid
    ).toBe(false);
    expect(validateSchema({ format: 'uuid' }, 42).valid).toBe(true);
  });

  it('validates date-time, date, uuid and uri formats', () => {
    expect(
      validateSchema(
        { type: 'string', format: 'date-time' },
        '2026-08-14T12:00:00Z'
      ).valid
    ).toBe(true);
    expect(
      validateSchema({ type: 'string', format: 'date-time' }, 'nope').valid
    ).toBe(false);
    expect(
      validateSchema({ type: 'string', format: 'date' }, '2026-08-14').valid
    ).toBe(true);
    expect(
      validateSchema({ type: 'string', format: 'date' }, 'nope').valid
    ).toBe(false);
    expect(
      validateSchema(
        { type: 'string', format: 'uuid' },
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
      ).valid
    ).toBe(true);
    expect(
      validateSchema({ type: 'string', format: 'uuid' }, 'nope').valid
    ).toBe(false);
    expect(
      validateSchema({ type: 'string', format: 'uri' }, 'https://example.com')
        .valid
    ).toBe(true);
    expect(
      validateSchema({ type: 'string', format: 'uri' }, 'nope').valid
    ).toBe(false);
    expect(
      validateSchema({ type: 'string', format: 'unknown' }, 'anything').valid
    ).toBe(true);
  });

  it('skips children when the container has the wrong type', () => {
    const result = validateSchema(
      {
        type: 'object',
        required: ['x'],
        properties: { x: { type: 'number' } },
      },
      'not-an-object'
    );
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
  });

  it('serializes a schema to indented JSON', () => {
    expect(schemaToJson({ type: 'string' })).toBe('{\n  "type": "string"\n}');
  });
});

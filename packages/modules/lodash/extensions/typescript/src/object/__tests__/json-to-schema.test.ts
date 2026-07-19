import { toSchema } from '../json-to-schema';

describe('toSchema', () => {
  it('infers string type', () => {
    const schema = toSchema({ name: 'Alice' });
    expect(schema).toContain('"type": "object"');
    expect(schema).toContain('"name"');
    expect(schema).toContain('"type": "string"');
    expect(schema).toContain('"required"');
  });

  it('infers integer vs number', () => {
    const schema = toSchema({ age: 30, pi: 3.14 });
    expect(schema).toContain('"type": "integer"');
    expect(schema).toContain('"type": "number"');
  });

  it('infers boolean type', () => {
    const schema = toSchema({ active: true });
    expect(schema).toContain('"type": "boolean"');
  });

  it('treats null as type null', () => {
    const schema = toSchema({ maybe: null });
    expect(schema).toContain('"type": "null"');
    expect(schema).not.toContain('"required"');
  });

  it('marks non-null fields as required', () => {
    const schema = toSchema({ a: 1, b: null, c: 'hi' });
    const parsed = JSON.parse(schema);
    expect(parsed.required).toEqual(['a', 'c']);
  });

  it('handles nested objects', () => {
    const data = { user: { name: 'Alice', scores: { math: 100 } } };
    const parsed = JSON.parse(toSchema(data));
    expect(parsed.properties.user.type).toBe('object');
    expect(parsed.properties.user.properties.name.type).toBe('string');
    expect(parsed.properties.user.properties.scores.properties.math.type).toBe(
      'integer'
    );
  });

  it('handles arrays of primitives', () => {
    const data = { ids: [1, 2, 3] };
    const parsed = JSON.parse(toSchema(data));
    expect(parsed.properties.ids.type).toBe('array');
    expect(parsed.properties.ids.items.type).toBe('integer');
  });

  it('handles empty arrays', () => {
    const data = { items: [] };
    const parsed = JSON.parse(toSchema(data));
    expect(parsed.properties.items.type).toBe('array');
    expect(parsed.properties.items.items).toEqual({});
  });

  it('creates oneOf for mixed-type arrays', () => {
    const data = { mixed: [1, 'two', true] };
    const parsed = JSON.parse(toSchema(data));
    expect(parsed.properties.mixed.type).toBe('array');
    expect(parsed.properties.mixed.items.oneOf).toBeDefined();
    const types = parsed.properties.mixed.items.oneOf.map(
      (s: Record<string, string>) => s.type
    );
    expect(types).toContain('integer');
    expect(types).toContain('string');
    expect(types).toContain('boolean');
  });

  it('merges object schemas in arrays', () => {
    const data = {
      people: [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
      ],
    };
    const parsed = JSON.parse(toSchema(data));
    expect(parsed.properties.people.type).toBe('array');
    expect(parsed.properties.people.items.properties.name.type).toBe('string');
    expect(parsed.properties.people.items.properties.age.type).toBe('integer');
    expect(parsed.properties.people.items.required).toContain('name');
    expect(parsed.properties.people.items.required).toContain('age');
  });

  it('handles empty objects', () => {
    const data = { meta: {} };
    const parsed = JSON.parse(toSchema(data));
    expect(parsed.properties.meta.type).toBe('object');
    expect(parsed.properties.meta.properties).toEqual({});
  });

  it('accepts custom root name', () => {
    const schema = toSchema({ x: 1 }, 'MySchema');
    const parsed = JSON.parse(schema);
    expect(parsed.title).toBe('MySchema');
    expect(parsed['$id']).toBe('MySchema');
  });

  it('generates valid JSON Schema', () => {
    const data = {
      id: 42,
      name: 'Widget',
      tags: ['a', 'b'],
      metadata: { color: 'red', weight: 1.5 },
    };
    const schema = toSchema(data);
    const parsed = JSON.parse(schema);
    expect(parsed.$schema).toBe('http://json-schema.org/draft-07/schema#');
    expect(parsed.type).toBe('object');
    expect(parsed.properties.id.type).toBe('integer');
    expect(parsed.properties.name.type).toBe('string');
    expect(parsed.properties.tags.type).toBe('array');
    expect(parsed.properties.metadata.type).toBe('object');
    expect(parsed.required).toEqual(['id', 'name', 'tags', 'metadata']);
  });
});

import { JsonSchema } from '@/types/api-client';

const DATE_TIME =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:?\d{2})$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const URI = /^[a-z][a-z0-9+.-]*:/i;

const inferStringFormat = (value: string): string | undefined => {
  if (DATE_TIME.test(value)) return 'date-time';
  if (DATE.test(value)) return 'date';
  if (EMAIL.test(value)) return 'email';
  if (UUID.test(value)) return 'uuid';
  if (URI.test(value)) return 'uri';
  return undefined;
};

const inferStringSchema = (value: string): JsonSchema => {
  const format = inferStringFormat(value);
  return format ? { type: 'string', format } : { type: 'string' };
};

export const inferSchema = (value: unknown): JsonSchema => {
  if (value === null) return { type: 'null' };
  if (Array.isArray(value)) {
    return {
      type: 'array',
      items: value.length > 0 ? inferSchema(value[0]) : {},
    };
  }
  if (typeof value === 'object') {
    const entries = value as Record<string, unknown>;
    const properties: Record<string, JsonSchema> = {};
    for (const [key, item] of Object.entries(entries)) {
      properties[key] = inferSchema(item);
    }
    return { type: 'object', properties, required: Object.keys(entries) };
  }
  if (typeof value === 'string') return inferStringSchema(value);
  if (typeof value === 'number') {
    return { type: Number.isInteger(value) ? 'integer' : 'number' };
  }
  if (typeof value === 'boolean') return { type: 'boolean' };
  return {};
};

const valueType = (value: unknown): string => {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
};

const typeMatches = (expected: string, value: unknown): boolean => {
  const actual = valueType(value);
  if (expected === 'integer') {
    return actual === 'number' && Number.isInteger(value);
  }
  return actual === expected;
};

const formatMatches = (format: string, value: unknown): boolean => {
  if (typeof value !== 'string') return true;
  if (format === 'date-time') return DATE_TIME.test(value);
  if (format === 'date') return DATE.test(value);
  if (format === 'email') return EMAIL.test(value);
  if (format === 'uuid') return UUID.test(value);
  if (format === 'uri') return URI.test(value);
  return true;
};

export interface SchemaResult {
  valid: boolean;
  errors: string[];
}

export const validateSchema = (
  schema: JsonSchema,
  value: unknown,
  path = '$'
): SchemaResult => {
  const errors: string[] = [];
  const push = (message: string): void => {
    errors.push(`${path} ${message}`);
  };

  if (schema.type) {
    if (!typeMatches(schema.type, value)) {
      push(`expected type "${schema.type}", got "${valueType(value)}"`);
    } else if (
      schema.type === 'object' &&
      typeof value === 'object' &&
      value !== null
    ) {
      const record = value as Record<string, unknown>;
      for (const key of schema.required ?? []) {
        if (!(key in record)) push(`missing required property "${key}"`);
      }
      for (const [key, child] of Object.entries(schema.properties ?? {})) {
        if (key in record) {
          const result = validateSchema(child, record[key], `${path}.${key}`);
          errors.push(...result.errors);
        }
      }
    } else if (schema.type === 'array' && Array.isArray(value)) {
      value.forEach((item, index) => {
        const result = validateSchema(
          schema.items ?? {},
          item,
          `${path}[${index}]`
        );
        errors.push(...result.errors);
      });
    }
  }

  if (schema.enum && !schema.enum.includes(value)) {
    push(`value not in enum ${JSON.stringify(schema.enum)}`);
  }

  if (schema.format && !formatMatches(schema.format, value)) {
    push(`does not match format "${schema.format}"`);
  }

  return { valid: errors.length === 0, errors };
};

export const schemaToJson = (schema: JsonSchema): string =>
  JSON.stringify(schema, null, 2);

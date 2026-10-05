import type { PipelineConfig } from '@/lib/contract/types';
import {
  CONFIG_JSON_SCHEMA,
  CONFIG_SCHEMA_VERSION,
} from '@/lib/contract/generated/config';

/**
 * The launch form is generated from the pipeline's JSON Schema, so a new
 * pipeline parameter appears in the app without a UI change.
 */
export type FieldKind =
  | 'text'
  | 'number'
  | 'boolean'
  | 'enum'
  | 'optional-text'
  /** A list of strings, edited as one comma-separated line. */
  | 'text-list';

export interface ConfigField {
  path: string;
  section: string;
  label: string;
  kind: FieldKind;
  description: string;
  options?: string[];
  default?: unknown;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
}

const SECTION_LABELS: Record<string, string> = {
  data: 'Data',
  split: 'Split',
  model: 'Model',
  run: 'Run',
};

const label = (name: string): string =>
  name
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const enumValues = (node: Record<string, unknown>): string[] => {
  if (Array.isArray(node.enum)) return node.enum as string[];
  const reference = String(node.$ref ?? '')
    .split('/')
    .pop();
  const definition = CONFIG_JSON_SCHEMA.$defs[
    reference as keyof typeof CONFIG_JSON_SCHEMA.$defs
  ] as Record<string, unknown> | undefined;
  return Array.isArray(definition?.enum) ? (definition.enum as string[]) : [];
};

const isNullable = (node: Record<string, unknown>): boolean =>
  Array.isArray(node.anyOf) &&
  node.anyOf.some((entry) => (entry as { type?: string }).type === 'null');

const kindOf = (node: Record<string, unknown>): FieldKind => {
  if (enumValues(node).length > 0) return 'enum';
  if (isNullable(node)) return 'optional-text';
  if (node.type === 'boolean') return 'boolean';
  if (node.type === 'integer' || node.type === 'number') return 'number';
  if (isStringList(node)) return 'text-list';
  return 'text';
};

/** A JSON Schema array of strings, such as `data.features`. */
const isStringList = (node: Record<string, unknown>): boolean =>
  node.type === 'array' &&
  (node.items as { type?: string } | undefined)?.type === 'string';

const fieldFrom = (
  section: string,
  name: string,
  node: Record<string, unknown>
): ConfigField => ({
  path: `${section}.${name}`,
  section,
  label: label(name),
  kind: kindOf(node),
  description: String(node.description ?? ''),
  options: enumValues(node),
  default: node.default,
  minimum: node.minimum as number | undefined,
  maximum: node.maximum as number | undefined,
  exclusiveMinimum: node.exclusiveMinimum as number | undefined,
});

export const configFields = (): ConfigField[] => {
  const sections = CONFIG_JSON_SCHEMA.properties as Record<
    string,
    Record<string, unknown>
  >;
  return Object.entries(sections).flatMap(([section, node]) => {
    const reference = String(node.$ref ?? '')
      .split('/')
      .pop();
    const definition = CONFIG_JSON_SCHEMA.$defs[
      reference as keyof typeof CONFIG_JSON_SCHEMA.$defs
    ] as { properties?: Record<string, Record<string, unknown>> } | undefined;
    return Object.entries(definition?.properties ?? {}).map(
      ([name, property]) => fieldFrom(section, name, property)
    );
  });
};

export const sectionLabels = (): { id: string; label: string }[] =>
  Object.entries(SECTION_LABELS).map(([id, name]) => ({ id, label: name }));

export type ConfigValue = string | number | boolean | null | string[];
export type ConfigValues = Record<string, ConfigValue>;

export const configToValues = (config: PipelineConfig): ConfigValues => {
  const values: ConfigValues = {};
  for (const field of configFields()) {
    const value = field.path
      .split('.')
      .reduce<unknown>(
        (current, key) =>
          (current as Record<string, unknown> | undefined)?.[key],
        config
      );
    if (value !== undefined && value !== null) {
      values[field.path] = value as ConfigValue;
    }
  }
  return values;
};

export const defaultValues = (): ConfigValues =>
  configFields().reduce<ConfigValues>((values, field) => {
    values[field.path] = (field.default ?? nullFor(field)) as ConfigValue;
    return values;
  }, {});

/**
 * A list field has no JSON Schema default, but Pydantic's `default_factory`
 * makes an omitted list empty rather than invalid, so the form starts empty too.
 */
const nullFor = (field: ConfigField): null | string[] =>
  field.kind === 'text-list' ? [] : null;

/**
 * Rebuilds a pipeline config from the form. The shape matches the Pydantic
 * model exactly, including `extra: forbid`, so a typo cannot reach the CLI.
 */
/**
 * Merges the edited form over the config it was loaded from, so keys this build
 * does not render (`run_id`, early stopping, calibration) survive a re-launch.
 */
export const valuesToConfig = (
  values: ConfigValues,
  base?: PipelineConfig | null
): PipelineConfig => {
  const sections: Record<string, Record<string, unknown>> = {};
  for (const field of configFields()) {
    const [section, name] = field.path.split('.');
    sections[section] = {
      ...(sections[section] ?? {}),
      [name]: coerce(field, values[field.path]),
    };
  }
  const merge = (
    edited: Record<string, unknown> | undefined,
    original: unknown
  ): Record<string, unknown> => ({
    ...(typeof original === 'object' && original !== null
      ? (original as Record<string, unknown>)
      : {}),
    ...(edited ?? {}),
  });
  return {
    ...(base ?? {}),
    schema_version: CONFIG_SCHEMA_VERSION,
    data: merge(sections.data, base?.data) as PipelineConfig['data'],
    split: merge(sections.split, base?.split) as PipelineConfig['split'],
    model: merge(sections.model, base?.model) as PipelineConfig['model'],
    run: merge(sections.run, base?.run) as PipelineConfig['run'],
  };
};

/** Splits the comma-separated editor value into a list of trimmed names. */
export const parseList = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.map((entry) => String(entry).trim());
  if (typeof value !== 'string') return [];
  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
};

/** Renders a list for a single-line editor. */
export const formatList = (value: unknown): string =>
  Array.isArray(value) ? value.map((entry) => String(entry)).join(', ') : '';

const coerce = (field: ConfigField, value: unknown): unknown => {
  if (field.kind === 'text-list') return parseList(value);
  if (value === null || value === undefined || value === '') {
    return field.kind === 'optional-text' ? null : (field.default ?? null);
  }
  if (field.kind === 'number') {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? (field.default ?? null) : parsed;
  }
  if (field.kind === 'boolean') return Boolean(value);
  return value;
};

export interface FieldIssue {
  path: string;
  message: string;
}

/** Validation mirrors the schema constraints, so the CLI never rejects a form. */
export const validateValues = (values: ConfigValues): FieldIssue[] => {
  const issues: FieldIssue[] = [];
  for (const field of configFields()) {
    const value = values[field.path];
    if (value === null || value === undefined || value === '') {
      if (field.kind === 'text' && field.default === undefined) {
        issues.push({
          path: field.path,
          message: `${field.label} is required`,
        });
      }
      continue;
    }
    if (field.kind !== 'number') continue;
    const numeric = Number(value);
    if (Number.isNaN(numeric)) {
      issues.push({
        path: field.path,
        message: `${field.label} must be a number`,
      });
      continue;
    }
    if (field.minimum !== undefined && numeric < field.minimum) {
      issues.push({
        path: field.path,
        message: `${field.label} must be at least ${field.minimum}`,
      });
    }
    if (field.maximum !== undefined && numeric > field.maximum) {
      issues.push({
        path: field.path,
        message: `${field.label} must be at most ${field.maximum}`,
      });
    }
    if (
      field.exclusiveMinimum !== undefined &&
      numeric <= field.exclusiveMinimum
    ) {
      issues.push({
        path: field.path,
        message: `${field.label} must be greater than ${field.exclusiveMinimum}`,
      });
    }
  }
  return issues;
};

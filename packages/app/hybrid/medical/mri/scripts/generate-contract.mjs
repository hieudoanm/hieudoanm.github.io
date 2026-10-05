#!/usr/bin/env node
/**
 * Generates the launch-form types from the pipeline's JSON Schema.
 *
 * The schema itself is produced by the pipeline:
 *   cd pipeline && uv run pipeline export-schemas --output-dir ../schemas
 * then copy `config_schema.json` to
 * `src/lib/contract/generated/config.schema.json`.
 *
 * Run with: pnpm generate:contract
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const generatedDir = join(here, '..', 'src', 'lib', 'contract', 'generated');
const schemaPath = join(generatedDir, 'config.schema.json');

const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
const defs = schema.$defs ?? {};

const typeOf = (node) => {
  const types = Array.isArray(node.type) ? node.type : [node.type];
  if (types.includes('integer') || types.includes('number')) return 'number';
  if (types.includes('boolean')) return 'boolean';
  if (types.includes('array')) return 'string[]';
  return 'string';
};

const refName = (node) => (node.$ref ?? '').split('/').pop() ?? 'string';

const enumValues = (node) => {
  if (!node) return [];
  if (Array.isArray(node.enum)) return node.enum;
  const name = refName(node);
  const target = defs[name];
  return Array.isArray(target?.enum) ? target.enum : [];
};

const propertyType = (node) => {
  const values = enumValues(node);
  if (values.length > 0)
    return values.map((value) => JSON.stringify(value)).join(' | ');
  if (node.anyOf) {
    const types = node.anyOf
      .filter((entry) => entry.type !== 'null')
      .map((entry) => typeOf(entry));
    return (
      [...new Set(types.length > 0 ? types : ['string'])].join(' | ') +
      ' | null'
    );
  }
  return typeOf(node);
};

const sectionName = (name) =>
  name.replace(/(^|_)([a-z])/g, (_, _prefix, letter) => letter.toUpperCase());

const interfaceFor = (definitionName) => {
  const definition = defs[definitionName];
  const properties = Object.entries(definition?.properties ?? {});
  const lines = properties.map(
    ([name, node]) =>
      `  ${name}${node.default === undefined ? '?' : ''}?: ${propertyType(node)};`
  );
  return [`export interface ${definitionName} {`, ...lines, '}'].join('\n');
};

const defaultConfig = () => {
  const section = (name) => {
    const definition = defs[name];
    const entries = Object.entries(definition?.properties ?? {});
    return entries
      .filter(([, node]) => node.default !== undefined)
      .map(([key, node]) => `    ${key}: ${JSON.stringify(node.default)},`);
  };
  return [
    'export const DEFAULT_CONFIG: PipelineConfig = {',
    `  schema_version: CONFIG_SCHEMA_VERSION,`,
    '  data: {',
    ...section('DataConfig'),
    '  },',
    '  split: {',
    ...section('SplitConfig'),
    '  },',
    '  model: {',
    ...section('ModelConfig'),
    '  },',
    '  run: {',
    ...section('RunConfig'),
    '  },',
    '};',
  ].join('\n');
};

const definitionNames = Object.keys(defs).filter((name) =>
  name.endsWith('Config')
);

const output = `/**
 * GENERATED FILE - do not edit by hand.
 * Source: pipeline/src/pipeline/schemas/config.py via scripts/generate-contract.mjs
 */
import type { PipelineConfig } from '../types';

${definitionNames.map(interfaceFor).join('\n\n')}

export const CONFIG_SCHEMA_VERSION = ${JSON.stringify(
  schema.properties?.schema_version?.default ?? '0.1.0'
)};
export const CONFIG_JSON_SCHEMA = ${JSON.stringify(schema)} as const;

${defaultConfig()}
`;

mkdirSync(generatedDir, { recursive: true });
writeFileSync(join(generatedDir, 'config.ts'), output);
process.stdout.write(`wrote ${join(generatedDir, 'config.ts')}\n`);

import {
  configFields,
  configToValues,
  defaultValues,
  sectionLabels,
  validateValues,
  valuesToConfig,
} from '@/lib/config/form';
import { CONFIG_SCHEMA_VERSION } from '@/lib/contract/generated/config';
import type { PipelineConfig } from '@/lib/contract/types';

describe('config form generated from the pipeline schema', () => {
  test('exposes every pipeline section', () => {
    expect(sectionLabels().map((section) => section.id)).toEqual([
      'data',
      'split',
      'model',
      'run',
    ]);
  });

  test('reads constraints out of the JSON Schema', () => {
    const fields = configFields();
    const folds = fields.find((field) => field.path === 'split.n_folds');
    expect(folds).toMatchObject({ kind: 'number', minimum: 2, maximum: 10 });
    const model = fields.find((field) => field.path === 'model.model_type');
    expect(model?.kind).toBe('enum');
    expect(model?.options).toContain('resnet18');
  });

  test('defaults come from the schema, not from the UI', () => {
    const values = defaultValues();
    expect(values['split.n_folds']).toBe(4);
    expect(values['split.lock_box_fraction']).toBe(0.2);
    expect(values['model.model_type']).toBe('logistic_regression');
  });

  test('round-trips a config through form values', () => {
    const config: PipelineConfig = {
      schema_version: CONFIG_SCHEMA_VERSION,
      data: { dataset: 'atlas', data_path: 'data/' },
      split: {
        n_folds: 5,
        lock_box_fraction: 0.3,
        seed: 7,
        stratify_by: 'wab_aq',
      },
      model: { model_type: 'resnet18', image_type: 'hybrid' },
      run: { device: 'cpu', output_dir: 'runs/' },
    };
    const values = configToValues(config);
    expect(values['split.n_folds']).toBe(5);
    const rebuilt = valuesToConfig(values);
    expect(rebuilt.schema_version).toBe(CONFIG_SCHEMA_VERSION);
    expect(rebuilt.split).toEqual(config.split);
    expect(rebuilt.model?.model_type).toBe('resnet18');
    expect(rebuilt.run?.device).toBe('cpu');
  });

  test('produces a config the pipeline accepts, with no extra keys', () => {
    const config = valuesToConfig(defaultValues());
    expect(Object.keys(config).sort()).toEqual([
      'data',
      'model',
      'run',
      'schema_version',
      'split',
    ]);
  });
});

describe('config form validation', () => {
  test('mirrors the schema bounds', () => {
    const values = { ...defaultValues(), 'split.n_folds': 99 };
    const issues = validateValues(values);
    expect(issues.map((issue) => issue.path)).toContain('split.n_folds');
    expect(issues[0].message).toContain('at most 10');
  });

  test('rejects a non-numeric value in a numeric field', () => {
    const values = { ...defaultValues(), 'model.learning_rate': 'fast' };
    expect(validateValues(values).map((issue) => issue.message)).toContainEqual(
      expect.stringContaining('must be a number')
    );
  });

  test('rejects a learning rate of zero', () => {
    const issues = validateValues({
      ...defaultValues(),
      'model.learning_rate': 0,
    });
    expect(issues.map((issue) => issue.message)).toContainEqual(
      expect.stringContaining('greater than 0')
    );
  });

  test('accepts the defaults', () => {
    expect(validateValues(defaultValues())).toEqual([]);
  });
});

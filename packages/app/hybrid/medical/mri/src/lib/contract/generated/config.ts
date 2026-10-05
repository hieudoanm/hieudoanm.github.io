/**
 * GENERATED FILE - do not edit by hand.
 * Source: pipeline/src/pipeline/schemas/config.py via scripts/generate-contract.mjs
 */
import type { PipelineConfig } from '../types';

export interface DataConfig {
  dataset?: 'arc' | 'atlas' | 'ploras';
  data_path?: string;
  participants_tsv?: string | null;
  lesion_mask_path?: string | null;
  t1_path?: string | null;
}

export interface ModelConfig {
  model_type?: 'logistic_regression' | 'gradient_boosting' | 'resnet18';
  image_type?: 'stitched' | 'roi' | 'hybrid';
  learning_rate?: number;
  batch_size?: number;
  max_epochs?: number;
  early_stopping_patience?: number;
  class_weight?: boolean;
  calibration?: boolean;
}

export interface RunConfig {
  run_id?: string | null;
  output_dir?: string;
  device?: string;
  log_level?: string;
  cache_stages?: boolean;
}

export interface SplitConfig {
  n_folds?: number;
  lock_box_fraction?: number;
  seed?: number;
  stratify_by?: string;
}

export const CONFIG_SCHEMA_VERSION = '0.1.0';
export const CONFIG_JSON_SCHEMA = {
  $defs: {
    DataConfig: {
      description: 'Data configuration.',
      properties: {
        dataset: {
          $ref: '#/$defs/DatasetType',
          default: 'arc',
          description: 'Dataset to use',
        },
        data_path: {
          default: 'data/',
          description: 'Path to data directory',
          title: 'Data Path',
          type: 'string',
        },
        participants_tsv: {
          anyOf: [{ type: 'string' }, { type: 'null' }],
          default: null,
          description: 'Path to participants.tsv',
          title: 'Participants Tsv',
        },
        lesion_mask_path: {
          anyOf: [{ type: 'string' }, { type: 'null' }],
          default: null,
          description: 'Path to lesion masks',
          title: 'Lesion Mask Path',
        },
        t1_path: {
          anyOf: [{ type: 'string' }, { type: 'null' }],
          default: null,
          description: 'Path to T1 scans',
          title: 'T1 Path',
        },
      },
      title: 'DataConfig',
      type: 'object',
    },
    DatasetType: {
      description: 'Supported dataset types.',
      enum: ['arc', 'atlas', 'ploras'],
      title: 'DatasetType',
      type: 'string',
    },
    ImageType: {
      description: 'Image representation types.',
      enum: ['stitched', 'roi', 'hybrid'],
      title: 'ImageType',
      type: 'string',
    },
    ModelConfig: {
      description: 'Model configuration.',
      properties: {
        model_type: {
          $ref: '#/$defs/ModelType',
          default: 'logistic_regression',
          description: 'Type of model',
        },
        image_type: {
          $ref: '#/$defs/ImageType',
          default: 'stitched',
          description: 'Image representation type',
        },
        learning_rate: {
          default: 0.001,
          description: 'Learning rate',
          exclusiveMinimum: 0,
          title: 'Learning Rate',
          type: 'number',
        },
        batch_size: {
          default: 32,
          description: 'Batch size',
          minimum: 1,
          title: 'Batch Size',
          type: 'integer',
        },
        max_epochs: {
          default: 100,
          description: 'Maximum number of epochs',
          minimum: 1,
          title: 'Max Epochs',
          type: 'integer',
        },
        early_stopping_patience: {
          default: 10,
          description: 'Early stopping patience',
          minimum: 1,
          title: 'Early Stopping Patience',
          type: 'integer',
        },
        class_weight: {
          default: true,
          description: 'Use class weighting',
          title: 'Class Weight',
          type: 'boolean',
        },
        calibration: {
          default: true,
          description: 'Apply calibration',
          title: 'Calibration',
          type: 'boolean',
        },
      },
      title: 'ModelConfig',
      type: 'object',
    },
    ModelType: {
      description: 'Model types.',
      enum: ['logistic_regression', 'gradient_boosting', 'resnet18'],
      title: 'ModelType',
      type: 'string',
    },
    RunConfig: {
      description: 'Run configuration.',
      properties: {
        run_id: {
          anyOf: [{ type: 'string' }, { type: 'null' }],
          default: null,
          description: 'Run ID (auto-generated if not provided)',
          title: 'Run Id',
        },
        output_dir: {
          default: 'runs/',
          description: 'Output directory for runs',
          title: 'Output Dir',
          type: 'string',
        },
        device: {
          default: 'auto',
          description: 'Device: auto, cuda, mps, cpu',
          title: 'Device',
          type: 'string',
        },
        log_level: {
          default: 'INFO',
          description: 'Logging level',
          title: 'Log Level',
          type: 'string',
        },
        cache_stages: {
          default: true,
          description: 'Cache intermediate stages',
          title: 'Cache Stages',
          type: 'boolean',
        },
      },
      title: 'RunConfig',
      type: 'object',
    },
    SplitConfig: {
      description: 'Train/validation/test split configuration.',
      properties: {
        n_folds: {
          default: 4,
          description: 'Number of cross-validation folds',
          maximum: 10,
          minimum: 2,
          title: 'N Folds',
          type: 'integer',
        },
        lock_box_fraction: {
          default: 0.2,
          description: 'Fraction of data for lock-box test set',
          maximum: 0.4,
          minimum: 0.1,
          title: 'Lock Box Fraction',
          type: 'number',
        },
        seed: {
          default: 42,
          description: 'Random seed for reproducibility',
          minimum: 0,
          title: 'Seed',
          type: 'integer',
        },
        stratify_by: {
          default: 'wab_aq',
          description: 'Column to stratify by',
          title: 'Stratify By',
          type: 'string',
        },
      },
      title: 'SplitConfig',
      type: 'object',
    },
  },
  additionalProperties: false,
  description: 'Main configuration for the pipeline.',
  properties: {
    data: { $ref: '#/$defs/DataConfig' },
    split: { $ref: '#/$defs/SplitConfig' },
    model: { $ref: '#/$defs/ModelConfig' },
    run: { $ref: '#/$defs/RunConfig' },
    schema_version: {
      default: '0.1.0',
      description: 'Configuration schema version',
      title: 'Schema Version',
      type: 'string',
    },
  },
  title: 'Config',
  type: 'object',
  $schema: 'https://json-schema.org/draft/2020-12/schema',
} as const;

export const DEFAULT_CONFIG: PipelineConfig = {
  schema_version: CONFIG_SCHEMA_VERSION,
  data: {
    dataset: 'arc',
    data_path: 'data/',
    participants_tsv: null,
    lesion_mask_path: null,
    t1_path: null,
  },
  split: {
    n_folds: 4,
    lock_box_fraction: 0.2,
    seed: 42,
    stratify_by: 'wab_aq',
  },
  model: {
    model_type: 'logistic_regression',
    image_type: 'stitched',
    learning_rate: 0.001,
    batch_size: 32,
    max_epochs: 100,
    early_stopping_patience: 10,
    class_weight: true,
    calibration: true,
  },
  run: {
    run_id: null,
    output_dir: 'runs/',
    device: 'auto',
    log_level: 'INFO',
    cache_stages: true,
  },
};

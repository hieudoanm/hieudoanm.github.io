'use client';

import { useState } from 'react';

import { Card } from '@/components/atoms/Card';
import { ErrorNote, Loading } from '@/components/atoms/EmptyState';
import { PageHeader, SettingsHint } from '@/components/organisms/PageHeader';
import { Screen } from '@/components/organisms/Screen';
import {
  configFields,
  configToValues,
  defaultValues,
  valuesToConfig,
  validateValues,
  type ConfigValues,
} from '@/lib/config/form';
import { sectionLabels } from '@/lib/config/form';
import {
  listConfigs,
  launchRun,
  getLauncherStatus,
  cancelRun,
} from '@/lib/ipc/api';
import { useResource } from '@/lib/ui/use-resource';
import type {
  ConfigFile,
  LauncherStatus,
  PipelineConfig,
} from '@/lib/contract/types';
import { useRunLog } from '@/lib/ipc/events';
import { RunLog, type LogLine } from '@/components/molecules/RunLog';

/**
 * Launch: the form is generated from the pipeline's own JSON Schema, then handed
 * to Rust as a config object. No training logic lives here.
 */
export const LaunchTemplate = () => {
  const configs = useResource(listConfigs, []);
  const [values, setValues] = useState<ConfigValues>(() => defaultValues());
  const [base, setBase] = useState<PipelineConfig | null>(null);
  const [issue, setIssue] = useState<string | null>(null);
  const [started, setStarted] = useState<string | null>(null);
  const [lines, setLines] = useState<LogLine[]>([]);
  const launcher = useResource<LauncherStatus>(() => getLauncherStatus(), []);

  useRunLog(started ?? undefined, (payload) =>
    setLines((current) =>
      [
        ...current,
        { line: payload.line, stream: payload.stream, atMs: payload.atMs },
      ].slice(-200)
    )
  );

  const applyConfig = (file: ConfigFile) => {
    const config = configSnapshot(file);
    if (!file.config && !config) return;
    setValues({ ...defaultValues(), ...configToValues(config) });
    setBase(config);
  };

  const submit = async () => {
    const issues = validateValues(values);
    if (issues.length > 0) {
      setIssue(issues.map((entry) => entry.message).join('; '));
      return;
    }
    setIssue(null);
    const outcome = await launchRun(valuesToConfig(values, base));
    setStarted(outcome.runId);
    await launcher.refresh();
  };

  const active = launcher.data?.active;

  return (
    <Screen>
      <PageHeader
        title="Launch"
        description="Start one pipeline run from an edited configuration. The run is written to a file first, so it can be reproduced later.">
        {!configs.data && <SettingsHint />}
      </PageHeader>
      <div className="grid gap-4 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-4">
          <Card
            title="Configuration"
            description="Fields come from the pipeline's config schema.">
            {configs.error && <ErrorNote message={configs.error} />}
            {configs.loading && <Loading />}
            <div className="mb-4 flex flex-wrap items-end gap-3">
              <label className="form-control">
                <span className="label-text text-xs">Start from</span>
                <select
                  className="select select-sm select-bordered"
                  defaultValue=""
                  onChange={(event) => {
                    const file = configs.data?.find(
                      (entry) => entry.name === event.target.value
                    );
                    if (file) applyConfig(file);
                  }}>
                  <option value="">Pipeline defaults</option>
                  {(configs.data ?? []).map((file) => (
                    <option key={file.path} value={file.name}>
                      {file.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {sectionLabels().map((section) => (
              <fieldset key={section.id} className="mb-4">
                <legend className="text-base-content/60 text-xs tracking-wide uppercase">
                  {section.label}
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {configFields()
                    .filter((field) => field.section === section.id)
                    .map((field) => (
                      <Field
                        key={field.path}
                        field={field}
                        value={values[field.path]}
                        onChange={(value) =>
                          setValues((current) => ({
                            ...current,
                            [field.path]: value,
                          }))
                        }
                      />
                    ))}
                </div>
              </fieldset>
            ))}
            {issue && <p className="text-error mt-2 text-sm">{issue}</p>}
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={submit}>
                Start run
              </button>
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={() => {
                  setValues(defaultValues());
                  setBase(null);
                }}>
                Reset to defaults
              </button>
            </div>
          </Card>
        </div>
        <div className="space-y-4">
          <Card title="Launcher">
            {active ? (
              <div className="space-y-2 text-sm">
                <p className="font-mono text-xs break-all">{active.command}</p>
                <p className="text-base-content/60 text-xs">
                  device {active.device} · pid {active.pid}
                </p>
                <button
                  type="button"
                  className="btn btn-sm btn-error"
                  onClick={() => cancelRun(active.runId)}>
                  Cancel
                </button>
              </div>
            ) : (
              <p className="text-base-content/70 text-sm">
                Nothing is running.
              </p>
            )}
            {(launcher.data?.queued.length ?? 0) > 0 && (
              <p className="text-base-content/60 mt-2 text-xs">
                {launcher.data?.queued.length} run(s) queued.
              </p>
            )}
          </Card>
          <Card
            title="Output"
            description={
              started ? `run ${started}` : 'Output appears after a run starts.'
            }>
            <RunLog lines={lines} />
          </Card>
        </div>
      </div>
    </Screen>
  );
};

/**
 * Rust returns the raw config next to a display view. Preferring `raw` keeps
 * fields this build does not show (`run_id`, early stopping, calibration) when
 * a saved config is re-launched; the view is only a fallback.
 */
const configSnapshot = (file: ConfigFile): PipelineConfig =>
  file.raw ?? viewToConfig(file);

/** Fallback for a build whose backend sends only the display view. */
const viewToConfig = (file: ConfigFile): PipelineConfig => ({
  schema_version: file.config?.schemaVersion ?? undefined,
  data: compact({
    dataset: file.config?.dataset,
    data_path: file.config?.dataPath,
  }),
  split: compact({
    n_folds: file.config?.nFolds,
    lock_box_fraction: file.config?.lockBoxFraction,
    seed: file.config?.seed,
    stratify_by: file.config?.stratifyBy,
  }),
  model: compact({
    model_type: file.config?.modelType,
    image_type: file.config?.imageType,
    learning_rate: file.config?.learningRate,
    batch_size: file.config?.batchSize,
    max_epochs: file.config?.maxEpochs,
  }),
  run: compact({
    device: file.config?.device,
    output_dir: file.config?.outputDir,
    log_level: file.config?.logLevel,
  }),
});

type Defined<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: Exclude<T[K], null>;
};

const compact = <T extends object>(value: T): Defined<T> =>
  Object.fromEntries(
    Object.entries(value).filter(
      ([, entry]) => entry !== null && entry !== undefined
    )
  ) as Defined<T>;

const Field = ({
  field,
  value,
  onChange,
}: {
  field: ReturnType<typeof configFields>[number];
  value: ConfigValues[string];
  onChange: (value: string | number | boolean | null) => void;
}) => (
  <label className="form-control">
    <span className="label-text text-xs" title={field.description}>
      {field.label}
    </span>
    {field.kind === 'enum' && (
      <select
        className="select select-sm select-bordered"
        value={String(value ?? '')}
        onChange={(event) => onChange(event.target.value)}>
        {(field.options ?? []).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    )}
    {field.kind === 'boolean' && (
      <input
        type="checkbox"
        className="checkbox checkbox-sm"
        checked={Boolean(value)}
        onChange={(event) => onChange(event.target.checked)}
      />
    )}
    {(field.kind === 'number' ||
      field.kind === 'text' ||
      field.kind === 'optional-text') && (
      <input
        type={field.kind === 'number' ? 'number' : 'text'}
        className="input input-sm input-bordered"
        step={field.minimum !== undefined ? 'any' : undefined}
        value={value === null || value === undefined ? '' : String(value)}
        placeholder={field.description}
        onChange={(event) =>
          onChange(
            field.kind === 'number' ? event.target.value : event.target.value
          )
        }
      />
    )}
    {field.minimum !== undefined && (
      <span className="label-text-alt text-base-content/50 text-xs">
        min {field.minimum}
        {field.maximum !== undefined ? ` · max ${field.maximum}` : ''}
      </span>
    )}
  </label>
);

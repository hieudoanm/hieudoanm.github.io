'use client';

import { useCallback, useEffect, useState, type FC } from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiCpu, FiPlay, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { JobsPanel } from '@/components/molecules/JobsPanel';
import type { MriApi } from '@/lib/api/client';
import type { Dataset, ModelRecord, ModelRuntime } from '@/lib/api/types';

export interface ModelsTemplateProps {
  api: MriApi;
}

const runtimeBadge = (available: boolean): 'success' | 'error' =>
  available ? 'success' : 'error';

/** Model registry: registered models are first-class, versioned data. */
export const ModelsTemplate: FC<ModelsTemplateProps> = ({ api }) => {
  const [models, setModels] = useState<ModelRecord[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [name, setName] = useState('');
  const [version, setVersion] = useState('1.0');
  const [task, setTask] = useState('segmentation');
  const [runtime, setRuntime] = useState<ModelRuntime>('python');
  const [source, setSource] = useState('');
  const [license, setLicense] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('');
  const [inputRef, setInputRef] = useState('');
  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setModels(await api.listModels());
      setDatasets(await api.listDatasets(''));
      const runtimes: ModelRuntime[] = ['python', 'docker'];
      const entries = await Promise.all(
        runtimes.map(
          async (item) => [item, await api.isRuntimeAvailable(item)] as const
        )
      );
      setAvailability(Object.fromEntries(entries));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  }, [api]);

  useEffect(() => {
    void load();
  }, [load]);

  const register = async () => {
    setError(null);
    const definition = {
      name: name.trim(),
      version: version.trim(),
      task,
      runtime,
      source: source.trim(),
      license,
    };
    try {
      await api.registerModel(JSON.stringify(definition));
      setName('');
      setSource('');
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  };

  const remove = async (modelId: string) => {
    try {
      await api.deleteModel(modelId);
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  };

  const run = async (modelId: string) => {
    setError(null);
    try {
      await api.runModel(
        modelId,
        selectedDataset || undefined,
        inputRef.trim() || undefined
      );
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 p-8">
      <div className="flex items-center gap-4">
        <Link href="/workspace" className="btn btn-ghost btn-sm">
          <FiChevronLeft /> Workspace
        </Link>
        <h1 className="text-3xl font-bold">Models</h1>
        <span className="flex items-center gap-1">
          {(['python', 'docker'] as ModelRuntime[]).map((item) => (
            <span key={item} data-testid={`runtime-${item}`}>
              <Badge variant={runtimeBadge(availability[item] ?? false)}>
                {item}
              </Badge>
            </span>
          ))}
        </span>
      </div>

      {error ? (
        <div className="alert alert-error" role="alert">
          <span>{error}</span>
        </div>
      ) : null}

      <section className="card bg-base-200" data-testid="model-form">
        <div className="card-body gap-3">
          <h2 className="text-xl font-semibold">Register model</h2>
          <div className="flex gap-2">
            <input
              className="input input-bordered"
              placeholder="Model name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              data-testid="model-name"
            />
            <input
              className="input input-bordered w-28"
              placeholder="Version"
              value={version}
              onChange={(event) => setVersion(event.target.value)}
              data-testid="model-version"
            />
          </div>
          <div className="flex gap-2">
            <select
              className="select select-bordered"
              value={task}
              onChange={(event) => setTask(event.target.value)}
              data-testid="model-task">
              <option value="segmentation">Segmentation</option>
              <option value="registration">Registration</option>
              <option value="reconstruction">Reconstruction</option>
              <option value="super-resolution">Super resolution</option>
            </select>
            <select
              className="select select-bordered"
              value={runtime}
              onChange={(event) =>
                setRuntime(event.target.value as ModelRuntime)
              }
              data-testid="model-runtime">
              <option value="python">python (PyTorch / MONAI / ONNX)</option>
              <option value="docker">docker</option>
            </select>
          </div>
          <input
            className="input input-bordered font-mono text-xs"
            placeholder={
              runtime === 'python' ? '/path/to/model.py' : 'org/model:tag'
            }
            value={source}
            onChange={(event) => setSource(event.target.value)}
            data-testid="model-source"
          />
          <input
            className="input input-bordered"
            placeholder="License (optional)"
            value={license}
            onChange={(event) => setLicense(event.target.value)}
            data-testid="model-license"
          />
          <Button variant="primary" size="sm" onClick={register}>
            <FiPlus className="mr-1" /> Register model
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-2" data-testid="model-list">
        <h2 className="text-xl font-semibold">Registered models</h2>
        {models.length === 0 ? (
          <p className="text-base-content/60 text-sm">No models yet.</p>
        ) : (
          models.map((model) => (
            <div key={model.id} className="card bg-base-200">
              <div className="card-body flex-row items-center justify-between py-3">
                <div className="min-w-0">
                  <p className="font-semibold">
                    {model.name}{' '}
                    <span className="text-base-content/60 text-xs">
                      v{model.version}
                    </span>{' '}
                    <Badge variant="info">{model.task}</Badge>
                  </p>
                  <p className="text-base-content/60 truncate font-mono text-xs">
                    {model.runtime}: {model.source}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => void run(model.id)}
                    data-testid={`model-run-${model.id}`}>
                    <FiCpu />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => void remove(model.id)}
                    data-testid={`model-delete-${model.id}`}>
                    <FiTrash2 />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      <section className="card bg-base-200" data-testid="run-section">
        <div className="card-body gap-3">
          <h2 className="text-xl font-semibold">Run context</h2>
          <select
            className="select select-bordered"
            value={selectedDataset}
            onChange={(event) => setSelectedDataset(event.target.value)}
            data-testid="run-dataset">
            <option value="">No dataset (provenance skipped)</option>
            {datasets.map((dataset) => (
              <option key={dataset.id} value={dataset.id}>
                {dataset.name}
              </option>
            ))}
          </select>
          <input
            className="input input-bordered font-mono text-xs"
            placeholder="Input reference, e.g. series://1/s1"
            value={inputRef}
            onChange={(event) => setInputRef(event.target.value)}
            data-testid="run-input-ref"
          />
          <p className="text-base-content/60 flex items-center gap-1 text-xs">
            <FiPlay /> Runs are queued as background jobs with per-inference
            provenance.
          </p>
        </div>
      </section>

      <JobsPanel api={api} />
    </main>
  );
};

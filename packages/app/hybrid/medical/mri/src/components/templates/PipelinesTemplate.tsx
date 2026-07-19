'use client';

import { useCallback, useEffect, useState, type FC } from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiPlay, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Button } from '@/components/atoms/Button';
import { JobsPanel } from '@/components/molecules/JobsPanel';
import type { MriApi } from '@/lib/api/client';
import type { Dataset, PipelineRow } from '@/lib/api/types';

export interface PipelinesTemplateProps {
  api: MriApi;
}

const SAMPLE_STEPS = JSON.stringify(
  {
    name: 'Convert DICOM',
    steps: [{ id: 'convert', tool: 'dcm2niix', args: ['-z', 'y'] }],
  },
  null,
  2
);

/** Pipeline builder: stored, versioned definitions plus a run queue. */
export const PipelinesTemplate: FC<PipelinesTemplateProps> = ({ api }) => {
  const [pipelines, setPipelines] = useState<PipelineRow[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [name, setName] = useState('');
  const [stepsJson, setStepsJson] = useState(SAMPLE_STEPS);
  const [selectedDataset, setSelectedDataset] = useState('');
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setPipelines(await api.listPipelines());
      setDatasets(await api.listDatasets(''));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  }, [api]);

  useEffect(() => {
    void load();
  }, [load]);

  const create = async () => {
    setError(null);
    let definition: unknown;
    try {
      definition = JSON.parse(stepsJson);
    } catch {
      setError('Steps must be valid JSON.');
      return;
    }
    const payload = {
      ...(definition as Record<string, unknown>),
      name: name.trim() || (definition as { name?: string }).name,
    };
    try {
      await api.createPipeline(JSON.stringify(payload));
      setName('');
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  };

  const remove = async (pipelineId: string) => {
    try {
      await api.deletePipeline(pipelineId);
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  };

  const run = async (pipelineId: string) => {
    setError(null);
    try {
      await api.runPipeline(pipelineId, selectedDataset || undefined);
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
        <h1 className="text-3xl font-bold">Pipelines</h1>
      </div>

      {error ? (
        <div className="alert alert-error" role="alert">
          <span>{error}</span>
        </div>
      ) : null}

      <section className="card bg-base-200" data-testid="pipeline-form">
        <div className="card-body gap-3">
          <h2 className="text-xl font-semibold">New pipeline</h2>
          <input
            className="input input-bordered"
            placeholder="Pipeline name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="pipeline-name"
          />
          <textarea
            className="textarea textarea-bordered font-mono text-xs"
            rows={6}
            value={stepsJson}
            onChange={(event) => setStepsJson(event.target.value)}
            data-testid="pipeline-steps"
          />
          <Button variant="primary" size="sm" onClick={create}>
            <FiPlus className="mr-1" /> Save pipeline
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-2" data-testid="pipeline-list">
        <h2 className="text-xl font-semibold">Saved pipelines</h2>
        {pipelines.length === 0 ? (
          <p className="text-base-content/60 text-sm">No pipelines yet.</p>
        ) : (
          pipelines.map((pipeline) => (
            <div key={pipeline.id} className="card bg-base-200">
              <div className="card-body flex-row items-center justify-between py-3">
                <div className="min-w-0">
                  <p className="font-semibold">
                    {pipeline.name}{' '}
                    <span className="text-base-content/60 text-xs">
                      v{pipeline.version}
                    </span>
                  </p>
                  <p className="text-base-content/60 truncate font-mono text-xs">
                    {pipeline.definitionJson}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => void run(pipeline.id)}
                    data-testid={`pipeline-run-${pipeline.id}`}>
                    <FiPlay />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => void remove(pipeline.id)}
                    data-testid={`pipeline-delete-${pipeline.id}`}>
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
        </div>
      </section>

      <JobsPanel api={api} />
    </main>
  );
};

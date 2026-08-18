'use client';

import { useCallback, useEffect, useState, type FC } from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiCheckCircle, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import type { MriApi } from '@/lib/api/client';
import type { Dataset, ProtocolReport, ProtocolRow } from '@/lib/api/types';

export interface ProtocolsTemplateProps {
  api: MriApi;
  initialDatasetId?: string;
}

export const ProtocolsTemplate: FC<ProtocolsTemplateProps> = ({
  api,
  initialDatasetId,
}) => {
  const [protocols, setProtocols] = useState<ProtocolRow[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [name, setName] = useState('');
  const [required, setRequired] = useState('T1, T2, FLAIR');
  const [maxVoxel, setMaxVoxel] = useState('');
  const [selectedDataset, setSelectedDataset] = useState(
    initialDatasetId ?? ''
  );
  const [report, setReport] = useState<ProtocolReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setProtocols(await api.listProtocols());
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
    const constraints =
      maxVoxel.trim() && required.includes('T1')
        ? { T1: { maxVoxelMm: Number(maxVoxel) } }
        : {};
    const definition = {
      name: name.trim(),
      required: required
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      constraints,
    };
    try {
      await api.createProtocol(JSON.stringify(definition));
      setName('');
      setMaxVoxel('');
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  };

  const remove = async (protocolId: string) => {
    try {
      await api.deleteProtocol(protocolId);
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  };

  const validate = async () => {
    if (!selectedDataset || protocols.length === 0) return;
    try {
      setReport(await api.validateDataset(selectedDataset, protocols[0].id));
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
        <h1 className="text-3xl font-bold">Protocols</h1>
      </div>

      {error ? (
        <div className="alert alert-error" role="alert">
          <span>{error}</span>
        </div>
      ) : null}

      <section className="card bg-base-200" data-testid="protocol-form">
        <div className="card-body gap-3">
          <h2 className="text-xl font-semibold">New protocol</h2>
          <input
            className="input input-bordered"
            placeholder="Protocol name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="protocol-name"
          />
          <input
            className="input input-bordered"
            placeholder="Required sequences (comma separated)"
            value={required}
            onChange={(event) => setRequired(event.target.value)}
            data-testid="protocol-required"
          />
          <input
            className="input input-bordered"
            placeholder="T1 max voxel size (mm), optional"
            value={maxVoxel}
            onChange={(event) => setMaxVoxel(event.target.value)}
            data-testid="protocol-max-voxel"
          />
          <Button variant="primary" size="sm" onClick={create}>
            <FiPlus className="mr-1" /> Create protocol
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-2" data-testid="protocol-list">
        <h2 className="text-xl font-semibold">Saved protocols</h2>
        {protocols.length === 0 ? (
          <p className="text-base-content/60 text-sm">No protocols yet.</p>
        ) : (
          protocols.map((protocol) => (
            <div key={protocol.id} className="card bg-base-200">
              <div className="card-body flex-row items-center justify-between py-3">
                <div>
                  <p className="font-semibold">{protocol.name}</p>
                  <p className="text-base-content/60 font-mono text-xs">
                    {protocol.definitionJson}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => remove(protocol.id)}>
                  <FiTrash2 />
                </Button>
              </div>
            </div>
          ))
        )}
      </section>

      <section className="card bg-base-200" data-testid="validate-section">
        <div className="card-body gap-3">
          <h2 className="text-xl font-semibold">Validate a dataset</h2>
          <select
            className="select select-bordered"
            value={selectedDataset}
            onChange={(event) => setSelectedDataset(event.target.value)}
            data-testid="validate-dataset">
            <option value="">Select dataset…</option>
            {datasets.map((dataset) => (
              <option key={dataset.id} value={dataset.id}>
                {dataset.name}
              </option>
            ))}
          </select>
          <Button
            variant="primary"
            size="sm"
            onClick={validate}
            disabled={!selectedDataset || protocols.length === 0}>
            <FiCheckCircle className="mr-1" /> Validate
          </Button>
          {report ? <ProtocolReportView report={report} /> : null}
        </div>
      </section>
    </main>
  );
};

export const ProtocolReportView: FC<{ report: ProtocolReport }> = ({
  report,
}) => (
  <div className="flex flex-col gap-1 text-sm" data-testid="protocol-report">
    <p className="font-semibold">
      {report.protocolName}:{' '}
      <Badge variant={report.passed ? 'success' : 'warning'}>
        {report.passed ? 'passed' : 'issues found'}
      </Badge>
    </p>
    {report.missing.length > 0 ? (
      <p className="text-warning">Missing: {report.missing.join(', ')}</p>
    ) : null}
    {report.violations.map((violation) => (
      <p
        key={`${violation.contrast}-${violation.constraint}`}
        className="text-error">
        {violation.contrast}: {violation.constraint} — {violation.detail}
      </p>
    ))}
  </div>
);

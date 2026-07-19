'use client';

import { useCallback, useEffect, useState, type FC } from 'react';
import { FiFolderPlus, FiSearch, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import type { MriApi } from '@/lib/api/client';
import type { Dataset, ImportSummary } from '@/lib/api/types';
import { DESKTOP_REQUIRED_MESSAGE, isDesktopRuntime } from '@/lib/api/client';

export interface WorkspaceTemplateProps {
  api: MriApi;
}

const formatDate = (seconds: number): string =>
  new Date(seconds * 1000).toISOString().slice(0, 10);

export const WorkspaceTemplate: FC<WorkspaceTemplateProps> = ({ api }) => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [query, setQuery] = useState('');
  const [summary, setSummary] = useState<ImportSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const desktop = isDesktopRuntime();

  const refresh = useCallback(
    async (search: string) => {
      try {
        setDatasets(await api.listDatasets(search));
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : String(cause));
      }
    },
    [api]
  );

  useEffect(() => {
    if (desktop) {
      void refresh('');
    }
  }, [desktop, refresh]);

  const handleImport = useCallback(async () => {
    setError(null);
    setBusy(true);
    try {
      const paths = await api.pickScanFiles();
      if (paths.length > 0) {
        const result = await api.importFiles(paths, '');
        setSummary(result);
        await refresh('');
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    } finally {
      setBusy(false);
    }
  }, [api, refresh]);

  const handleSearch = useCallback(async () => {
    await refresh(query);
  }, [query, refresh]);

  const handleDelete = useCallback(
    async (id: string) => {
      setError(null);
      try {
        await api.deleteDataset(id);
        await refresh(query);
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : String(cause));
      }
    },
    [api, query, refresh]
  );

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Workspace</h1>
        <Button
          variant="primary"
          onClick={handleImport}
          disabled={!desktop || busy}
          data-testid="import-button">
          <FiFolderPlus className="mr-2" />
          {busy ? 'Importing…' : 'Import files'}
        </Button>
      </div>

      {!desktop ? (
        <div className="alert alert-info" data-testid="desktop-required">
          <span>{DESKTOP_REQUIRED_MESSAGE}</span>
        </div>
      ) : null}

      <div className="join">
        <input
          type="text"
          className="input input-bordered join-item w-full"
          placeholder="Search datasets"
          value={query}
          data-testid="search-input"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') void handleSearch();
          }}
        />
        <Button variant="outline" className="join-item" onClick={handleSearch}>
          <FiSearch />
        </Button>
      </div>

      {summary ? (
        <div className="alert alert-success" data-testid="import-summary">
          <span>
            Imported {summary.importedFiles} files into {summary.seriesCount}{' '}
            series
            {summary.skippedFiles > 0
              ? ` (${summary.skippedFiles} skipped)`
              : ''}
            .
          </span>
        </div>
      ) : null}

      {error ? (
        <div className="alert alert-error" role="alert">
          <span>{error}</span>
        </div>
      ) : null}

      <div className="overflow-x-auto" data-testid="dataset-table">
        <table className="table-zebra table">
          <thead>
            <tr>
              <th>Dataset</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {datasets.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-base-content/60 text-center">
                  No datasets yet. Import DICOM or NIfTI files to begin.
                </td>
              </tr>
            ) : (
              datasets.map((dataset) => (
                <tr key={dataset.id} data-testid="dataset-row">
                  <td>{dataset.name}</td>
                  <td>{formatDate(dataset.createdAt)}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/studies?dataset=${encodeURIComponent(dataset.id)}`}
                        className="btn btn-sm btn-primary">
                        Open
                      </Link>
                      <Button
                        variant="secondary"
                        size="sm"
                        aria-label={`Delete ${dataset.name}`}
                        onClick={() => void handleDelete(dataset.id)}>
                        <FiTrash2 />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

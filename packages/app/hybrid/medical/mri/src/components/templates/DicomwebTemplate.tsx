'use client';

import { useCallback, useEffect, useState, type FC } from 'react';
import Link from 'next/link';
import {
  FiChevronLeft,
  FiDownload,
  FiGlobe,
  FiPlus,
  FiSearch,
  FiTrash2,
} from 'react-icons/fi';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import type { MriApi } from '@/lib/api/client';
import type {
  Dataset,
  DicomwebServer,
  ImportSummary,
  QidoSeries,
  QidoStudy,
  StowResult,
} from '@/lib/api/types';

export interface DicomwebTemplateProps {
  api: MriApi;
}

/** DICOMweb bridge: QIDO-RS search, WADO-RS import, STOW-RS export. */
export const DicomwebTemplate: FC<DicomwebTemplateProps> = ({ api }) => {
  const [servers, setServers] = useState<DicomwebServer[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [authHeader, setAuthHeader] = useState('');
  const [selectedServer, setSelectedServer] = useState('');
  const [patientName, setPatientName] = useState('');
  const [studies, setStudies] = useState<QidoStudy[]>([]);
  const [openStudy, setOpenStudy] = useState('');
  const [series, setSeries] = useState<QidoSeries[]>([]);
  const [exportDataset, setExportDataset] = useState('');
  const [stow, setStow] = useState<StowResult | null>(null);
  const [imported, setImported] = useState<ImportSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setServers(await api.listDicomwebServers());
      setDatasets(await api.listDatasets(''));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  }, [api]);

  useEffect(() => {
    void load();
  }, [load]);

  const addServer = async () => {
    setError(null);
    try {
      await api.addDicomwebServer(name.trim(), url.trim(), authHeader.trim());
      setName('');
      setUrl('');
      setAuthHeader('');
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  };

  const removeServer = async (serverId: string) => {
    try {
      await api.deleteDicomwebServer(serverId);
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  };

  const searchStudies = async () => {
    setError(null);
    setSeries([]);
    setOpenStudy('');
    try {
      setStudies(await api.qidoStudies(selectedServer, patientName.trim()));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  };

  const openSeries = async (studyUid: string) => {
    setError(null);
    setOpenStudy(studyUid);
    setSeries([]);
    try {
      setSeries(await api.qidoSeries(selectedServer, studyUid));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  };

  const importSeries = async (studyUid: string, seriesUid: string) => {
    setError(null);
    try {
      setImported(
        await api.wadoImportSeries(selectedServer, studyUid, seriesUid)
      );
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  };

  const exportToServer = async () => {
    setError(null);
    setStow(null);
    try {
      setStow(await api.stowExportDataset(selectedServer, exportDataset));
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
        <h1 className="text-3xl font-bold">DICOMweb</h1>
        <Badge variant="info">QIDO / WADO / STOW</Badge>
      </div>

      {error ? (
        <div className="alert alert-error" role="alert">
          <span>{error}</span>
        </div>
      ) : null}

      <section className="card bg-base-200" data-testid="server-form">
        <div className="card-body gap-3">
          <h2 className="text-xl font-semibold">Add server</h2>
          <div className="flex gap-2">
            <input
              className="input input-bordered"
              placeholder="Server name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              data-testid="server-name"
            />
            <input
              className="input input-bordered grow font-mono text-xs"
              placeholder="http://pacs.local/dicom-web"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              data-testid="server-url"
            />
          </div>
          <input
            className="input input-bordered font-mono text-xs"
            placeholder="Authorization header (optional)"
            value={authHeader}
            onChange={(event) => setAuthHeader(event.target.value)}
            data-testid="server-auth"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={addServer}
            data-testid="server-add">
            <FiPlus className="mr-1" /> Add server
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-2" data-testid="server-list">
        {servers.length === 0 ? (
          <p className="text-base-content/60 text-sm">No servers yet.</p>
        ) : (
          servers.map((server) => (
            <div key={server.id} className="card bg-base-200">
              <div className="card-body flex-row items-center justify-between py-3">
                <div className="min-w-0">
                  <p className="font-semibold">{server.name}</p>
                  <p className="text-base-content/60 truncate font-mono text-xs">
                    {server.url}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedServer(server.id)}
                    data-testid={`server-select-${server.id}`}>
                    <FiGlobe />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => void removeServer(server.id)}
                    data-testid={`server-delete-${server.id}`}>
                    <FiTrash2 />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      <section className="card bg-base-200" data-testid="qido-section">
        <div className="card-body gap-3">
          <h2 className="text-xl font-semibold">Query studies (QIDO-RS)</h2>
          <div className="flex gap-2">
            <select
              className="select select-bordered"
              value={selectedServer}
              onChange={(event) => setSelectedServer(event.target.value)}
              data-testid="qido-server">
              <option value="">Select server</option>
              {servers.map((server) => (
                <option key={server.id} value={server.id}>
                  {server.name}
                </option>
              ))}
            </select>
            <input
              className="input input-bordered"
              placeholder="Patient name"
              value={patientName}
              onChange={(event) => setPatientName(event.target.value)}
              data-testid="qido-patient"
            />
            <Button
              variant="primary"
              size="sm"
              disabled={!selectedServer}
              onClick={searchStudies}
              data-testid="qido-search">
              <FiSearch />
            </Button>
          </div>
          {studies.map((study) => (
            <div key={study.studyUid} className="bg-base-300 rounded p-3">
              <button
                type="button"
                className="w-full text-left"
                onClick={() => void openSeries(study.studyUid)}
                data-testid={`study-${study.studyUid}`}>
                <p className="font-semibold">
                  {study.patientName || '(no name)'}{' '}
                  <span className="text-base-content/60 text-xs">
                    {study.studyDate}
                  </span>
                </p>
                <p className="text-base-content/60 text-xs">
                  {study.studyDescription || study.studyUid}
                </p>
              </button>
              {openStudy === study.studyUid
                ? series.map((item) => (
                    <div
                      key={item.seriesUid}
                      className="border-base-content/10 mt-2 flex items-center justify-between gap-2 border-t pt-2">
                      <span className="min-w-0 text-sm">
                        {item.seriesDescription || item.seriesUid}{' '}
                        <Badge variant="neutral">{item.modality || '?'}</Badge>{' '}
                        <span className="text-base-content/60 text-xs">
                          {item.instanceCount} instances
                        </span>
                      </span>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          void importSeries(study.studyUid, item.seriesUid)
                        }
                        data-testid={`series-import-${item.seriesUid}`}>
                        Import
                      </Button>
                    </div>
                  ))
                : null}
            </div>
          ))}
        </div>
      </section>

      <section className="card bg-base-200" data-testid="export-section">
        <div className="card-body gap-3">
          <h2 className="text-xl font-semibold">Export dataset (STOW-RS)</h2>
          <div className="flex gap-2">
            <select
              className="select select-bordered"
              value={exportDataset}
              onChange={(event) => setExportDataset(event.target.value)}
              data-testid="export-dataset">
              <option value="">Select dataset</option>
              {datasets.map((dataset) => (
                <option key={dataset.id} value={dataset.id}>
                  {dataset.name}
                </option>
              ))}
            </select>
            <Button
              variant="primary"
              size="sm"
              disabled={!selectedServer || !exportDataset}
              onClick={exportToServer}
              data-testid="export-run">
              <FiDownload />
            </Button>
          </div>
          {stow ? (
            <p className="text-sm" data-testid="stow-result">
              Stored {stow.stored} instance(s)
              {stow.failed > 0 ? `, ${stow.failed} failed` : ''}.
            </p>
          ) : null}
          {imported ? (
            <p className="text-sm" data-testid="import-result">
              Imported {imported.importedFiles} file(s) into{' '}
              {imported.seriesCount} series.
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
};

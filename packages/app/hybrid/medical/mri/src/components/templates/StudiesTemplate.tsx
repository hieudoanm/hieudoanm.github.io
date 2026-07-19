'use client';

import { useCallback, useEffect, useState, type FC } from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiEye, FiFilm } from 'react-icons/fi';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { AnalysisPanel } from '@/components/molecules/AnalysisPanel';
import { MetadataPanel } from '@/components/molecules/MetadataPanel';
import { QcPanel } from '@/components/molecules/QcPanel';
import type { MriApi } from '@/lib/api/client';
import type { DatasetDetail, ProvenanceRecord } from '@/lib/api/types';

export interface StudiesTemplateProps {
  api: MriApi;
  datasetId: string;
}

export const StudiesTemplate: FC<StudiesTemplateProps> = ({
  api,
  datasetId,
}) => {
  const [detail, setDetail] = useState<DatasetDetail | null>(null);
  const [provenance, setProvenance] = useState<ProvenanceRecord[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const nextDetail = await api.getDatasetDetail(datasetId);
      setDetail(nextDetail);
      setProvenance(await api.getProvenance(datasetId));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
  }, [api, datasetId]);

  useEffect(() => {
    void load();
  }, [load]);

  if (error) {
    return (
      <main className="mx-auto min-h-screen max-w-4xl p-8">
        <div className="alert alert-error" role="alert">
          <span>{error}</span>
        </div>
      </main>
    );
  }

  if (!detail) {
    return (
      <main className="min-h-screen p-8">
        <span className="loading loading-spinner loading-lg" />
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 p-8">
      <div className="flex items-center gap-4">
        <Link href="/workspace" className="btn btn-ghost btn-sm">
          <FiChevronLeft /> Workspace
        </Link>
        <h1 className="text-3xl font-bold">{detail.dataset.name}</h1>
      </div>

      {detail.studies.map((study) => (
        <AnalysisPanel
          key={study.studyUid}
          api={api}
          datasetId={datasetId}
          studyUid={study.studyUid}
        />
      ))}

      <section className="flex flex-col gap-3" data-testid="series-list">
        <h2 className="text-xl font-semibold">
          Series ({detail.series.length})
        </h2>
        {detail.series.map((series) => (
          <div
            key={series.id}
            className="card bg-base-200"
            data-testid="series-card">
            <div className="card-body gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FiFilm />
                  <h3 className="font-semibold">
                    {series.seriesDescription || series.seriesUid || 'Series'}
                  </h3>
                  <Badge variant="info">{series.modality}</Badge>
                  <Badge variant="neutral">{series.kind}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setSelectedSeries(
                        selectedSeries === series.id ? null : series.id
                      )
                    }>
                    Metadata
                  </Button>
                  <Link
                    href={`/viewer?series=${encodeURIComponent(series.id)}`}
                    className="btn btn-primary btn-sm">
                    <FiEye className="mr-1" /> View
                  </Link>
                </div>
              </div>
              <p className="text-base-content/60 text-sm">
                {series.sliceCount} slices · {series.rows}×{series.columns} ·{' '}
                {series.bitsAllocated}-bit
              </p>
              {selectedSeries === series.id ? (
                <div className="flex flex-col gap-3">
                  <SeriesMetadataLoader api={api} seriesId={series.id} />
                  <QcPanel api={api} seriesId={series.id} />
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-2" data-testid="provenance-list">
        <h2 className="text-xl font-semibold">Provenance</h2>
        {provenance.length === 0 ? (
          <p className="text-base-content/60 text-sm">
            No recorded activity for this dataset.
          </p>
        ) : (
          provenance.map((record) => (
            <div key={record.id} className="card bg-base-200">
              <div className="card-body py-3">
                <p className="font-mono text-sm">
                  {record.activity} · {record.software}
                </p>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
};

const SeriesMetadataLoader: FC<{ api: MriApi; seriesId: string }> = ({
  api,
  seriesId,
}) => {
  const [metadata, setMetadata] = useState<Awaited<
    ReturnType<MriApi['getSeriesMetadata']>
  > | null>(null);
  useEffect(() => {
    let active = true;
    api
      .getSeriesMetadata(seriesId)
      .then((value) => {
        if (active) setMetadata(value);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [api, seriesId]);
  if (!metadata) {
    return <span className="loading loading-spinner" />;
  }
  return <MetadataPanel metadata={metadata} />;
};

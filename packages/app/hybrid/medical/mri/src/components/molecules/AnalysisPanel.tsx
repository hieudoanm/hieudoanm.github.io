'use client';

import { useEffect, useState, type FC } from 'react';
import { FiActivity } from 'react-icons/fi';
import type { MriApi } from '@/lib/api/client';
import type { StudyAnalysis } from '@/lib/api/types';

export interface AnalysisPanelProps {
  api: MriApi;
  datasetId: string;
  studyUid: string;
}

const formatVoxel = (voxels: number[][]): string =>
  voxels
    .map((voxel) => voxel.map((value) => value.toFixed(1)).join('×'))
    .join(', ');

/** Study-level intelligence summary; all values are recorded facts. */
export const AnalysisPanel: FC<AnalysisPanelProps> = ({
  api,
  datasetId,
  studyUid,
}) => {
  const [analysis, setAnalysis] = useState<StudyAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    api
      .getStudyAnalysis(datasetId, studyUid)
      .then((value) => {
        if (active) setAnalysis(value);
      })
      .catch((cause: unknown) => {
        if (active) {
          setError(cause instanceof Error ? cause.message : String(cause));
        }
      });
    return () => {
      active = false;
    };
  }, [api, datasetId, studyUid]);

  if (error) {
    return (
      <p className="text-error text-sm" role="alert">
        {error}
      </p>
    );
  }
  if (!analysis) {
    return <span className="loading loading-spinner" />;
  }
  return (
    <div className="card bg-base-200" data-testid="analysis-panel">
      <div className="card-body gap-2">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <FiActivity /> Study analysis
        </h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm md:grid-cols-3">
          <Fact label="Series" value={String(analysis.seriesCount)} />
          <Fact
            label="Modalities"
            value={analysis.modalities.join(', ') || '—'}
          />
          <Fact
            label="Contrasts"
            value={analysis.contrasts.join(', ') || '—'}
          />
          <Fact
            label="Orientations"
            value={analysis.orientations.join(', ') || '—'}
          />
          <Fact
            label="Field strength"
            value={
              analysis.fieldStrengthT ? `${analysis.fieldStrengthT} T` : '—'
            }
          />
          <Fact
            label="Temporal series"
            value={String(analysis.temporalSeries)}
          />
          <Fact
            label="Voxel sizes (mm)"
            value={
              analysis.voxelSizes.length > 0
                ? formatVoxel(analysis.voxelSizes)
                : '—'
            }
          />
          <Fact
            label="Manufacturers"
            value={analysis.manufacturers.join(', ') || '—'}
          />
          <Fact label="Models" value={analysis.models.join(', ') || '—'} />
        </div>
      </div>
    </div>
  );
};

const Fact: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-base-content/60 text-xs uppercase">{label}</span>
    <span className="font-mono">{value}</span>
  </div>
);

'use client';

import { type FC } from 'react';
import { FiTag } from 'react-icons/fi';
import { Badge } from '@/components/atoms/Badge';
import type { SeriesMetadata } from '@/lib/api/types';

export interface MetadataPanelProps {
  metadata: SeriesMetadata;
}

const ConceptRow: FC<{ label: string; value: string | null }> = ({
  label,
  value,
}) => (
  <div className="flex items-center justify-between gap-4 py-1">
    <span className="text-base-content/60">{label}</span>
    <span className="font-mono text-sm">{value ?? '—'}</span>
  </div>
);

export const MetadataPanel: FC<MetadataPanelProps> = ({ metadata }) => {
  const { series, normalized, originalTags, classification } = metadata;
  return (
    <div className="flex flex-col gap-4" data-testid="metadata-panel">
      <div className="card bg-base-200">
        <div className="card-body gap-2">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <FiTag /> Normalized concepts
          </h3>
          <ConceptRow label="Modality" value={normalized.modality} />
          <ConceptRow label="Contrast" value={normalized.contrast} />
          <ConceptRow
            label="Sequence family"
            value={normalized.sequenceFamily}
          />
          <ConceptRow
            label="Dimensionality"
            value={normalized.dimensionality}
          />
          <Badge variant="warning">inferred from naming</Badge>
        </div>
      </div>

      {classification.length > 0 ? (
        <div className="card bg-base-200" data-testid="classification-panel">
          <div className="card-body gap-2">
            <h3 className="text-lg font-semibold">Sequence candidates</h3>
            {classification.map((candidate) => (
              <div
                key={candidate.sequence}
                className="flex items-center justify-between gap-4 py-1"
                data-testid="sequence-candidate">
                <span className="font-mono text-sm">{candidate.sequence}</span>
                <span className="flex items-center gap-2">
                  <progress
                    className="progress progress-info w-24"
                    value={candidate.confidence}
                    max={1}
                    aria-label={`confidence ${candidate.confidence}`}
                  />
                  <span className="text-base-content/60 text-xs">
                    {(candidate.confidence * 100).toFixed(0)}%
                  </span>
                </span>
              </div>
            ))}
            <Badge variant="warning">inferred — not authoritative</Badge>
          </div>
        </div>
      ) : null}

      <div className="card bg-base-200">
        <div className="card-body gap-2">
          <h3 className="text-lg font-semibold">Geometry</h3>
          <ConceptRow label="Kind" value={series.kind} />
          <ConceptRow
            label="Slices"
            value={`${series.sliceCount} (${series.fileCount} files)`}
          />
          <ConceptRow
            label="In-plane"
            value={`${series.rows} × ${series.columns}`}
          />
          <ConceptRow
            label="Voxel (mm)"
            value={`${series.voxelX} × ${series.voxelY} × ${series.voxelZ}`}
          />
          <ConceptRow label="Orientation" value={series.orientation || null} />
          <ConceptRow
            label="TR / TE / flip"
            value={`${series.trMs} / ${series.teMs} / ${series.flipAngle}`}
          />
          <ConceptRow
            label="Field strength"
            value={
              series.fieldStrengthT > 0 ? `${series.fieldStrengthT} T` : null
            }
          />
          <ConceptRow
            label="Scanner"
            value={
              [series.manufacturer, series.model].filter(Boolean).join(' ') ||
              null
            }
          />
          <ConceptRow
            label="Bits / signed"
            value={`${series.bitsAllocated} / ${series.signedPixels ? 'yes' : 'no'}`}
          />
        </div>
      </div>

      <details
        className="collapse-arrow bg-base-200 collapse"
        data-testid="original-tags">
        <summary className="collapse-title text-lg font-semibold">
          Original tags
        </summary>
        <div className="collapse-content">
          <pre
            data-testid="original-tags-json"
            className="bg-base-300 max-h-96 overflow-auto rounded p-3 text-xs">
            {JSON.stringify(originalTags, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  );
};

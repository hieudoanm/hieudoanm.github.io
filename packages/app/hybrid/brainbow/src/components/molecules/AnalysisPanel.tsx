import type { ChangeEvent, FC, RefObject } from 'react';
import { FiDownload, FiFile, FiPlay, FiSearch } from 'react-icons/fi';
import { Button } from '@/components/atoms/Button';
import type { AnalysisStatus } from '@/hooks/useAnalysis';
import type { BatchResult } from '@/lib/analysis/batch';
import type { ImageAnalysis } from '@/lib/analysis/analyze';

export interface AnalysisPanelProps {
  status: AnalysisStatus;
  progress: number;
  error: string | null;
  k: number;
  result: ImageAnalysis | null;
  batch: BatchResult | null;
  hasRaster: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onSetK: (k: number) => void;
  onRunSingle: () => void;
  onBatchFiles: (files: File[]) => void;
  onExportCsv: () => void;
  onExportJson: () => void;
  onExportPng: () => void;
  onOpenReport: () => void;
}

const hex = (color: { r: number; g: number; b: number }): string =>
  `#${[color.r, color.g, color.b].map((value) => value.toString(16).padStart(2, '0')).join('')}`;

export const AnalysisPanel: FC<AnalysisPanelProps> = ({
  status,
  progress,
  error,
  k,
  result,
  batch,
  hasRaster,
  fileInputRef,
  onSetK,
  onRunSingle,
  onBatchFiles,
  onExportCsv,
  onExportJson,
  onExportPng,
  onOpenReport,
}) => {
  const running = status === 'running';
  const done = status === 'done';
  const hasResult = Boolean(result);
  const hasBatch = Boolean(batch);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length > 0) {
      onBatchFiles(files);
    }
    event.target.value = '';
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3>Analysis</h3>
        <select
          aria-label="Clusters (k)"
          className="select select-bordered select-sm"
          value={k}
          disabled={running}
          onChange={(event) => onSetK(Number(event.target.value))}>
          {[2, 3, 4, 5, 6, 8, 10].map((value) => (
            <option key={value} value={value}>
              k={value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          size="sm"
          disabled={running || !hasRaster}
          aria-label="Run analysis on current image"
          onClick={onRunSingle}>
          <FiSearch />
          Run analysis
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={running}
          aria-label="Analyze a batch of images"
          onClick={() => fileInputRef.current?.click()}>
          <FiFile />
          Batch analyze…
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          aria-hidden="true"
          onChange={onFileChange}
        />
      </div>

      {running ? (
        <div className="flex flex-col gap-1">
          <progress
            className="progress progress-primary"
            value={progress}
            max={1}
          />
          <p className="text-base-content/50 text-xs">
            {Math.round(progress * 100)}%
          </p>
        </div>
      ) : null}

      {error ? <p className="text-error text-sm">{error}</p> : null}

      {done && hasResult && result ? (
        <section aria-label="Analysis results">
          <table className="table-compact w-full">
            <thead>
              <tr>
                <th>Cluster</th>
                <th>Color</th>
                <th>Pixels</th>
                <th>Regions</th>
              </tr>
            </thead>
            <tbody>
              {result.summary.clusters.map((cluster) => (
                <tr key={cluster.index}>
                  <td>{cluster.index + 1}</td>
                  <td>
                    <span
                      className="inline-block h-3 w-3 rounded-full align-middle"
                      style={{ backgroundColor: hex(cluster.color) }}
                      aria-label={`Cluster ${cluster.index + 1} color`}
                    />
                  </td>
                  <td>{cluster.pixelCount.toLocaleString()}</td>
                  <td>{cluster.regionCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-base-content/70 mt-2 text-xs">
            Diversity index: {result.summary.diversity.toFixed(3)}
          </p>
        </section>
      ) : null}

      {done && hasBatch && batch ? (
        <section aria-label="Batch summary" className="flex flex-col gap-1">
          <p className="text-sm">
            {batch.aggregate.imageCount} image
            {batch.aggregate.imageCount === 1 ? '' : 's'} analyzed
          </p>
          <p className="text-sm">
            {batch.aggregate.totalRegions.toLocaleString()} regions detected
          </p>
          <p className="text-sm">
            Mean diversity: {batch.aggregate.meanDiversity.toFixed(3)}
          </p>
        </section>
      ) : null}

      {done && (hasResult || hasBatch) ? (
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            aria-label="Export CSV"
            onClick={onExportCsv}>
            <FiDownload />
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            aria-label="Export JSON"
            onClick={onExportJson}>
            <FiDownload />
            JSON
          </Button>
          <Button
            variant="outline"
            size="sm"
            aria-label="Export PNG"
            onClick={onExportPng}>
            <FiDownload />
            PNG
          </Button>
          <Button
            variant="outline"
            size="sm"
            aria-label="Open report"
            onClick={onOpenReport}>
            <FiDownload />
            Report
          </Button>
        </div>
      ) : null}
    </div>
  );
};

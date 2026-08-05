import {
  useRef,
  useState,
  type ChangeEvent,
  type FC,
  type RefObject,
} from 'react';
import {
  FiBookmark,
  FiDownload,
  FiFile,
  FiPlay,
  FiSearch,
  FiShare,
  FiTrash2,
} from 'react-icons/fi';
import { Button } from '@/components/atoms/Button';
import { Toggle } from '@/components/atoms/Toggle';
import type { AnalysisStatus } from '@/hooks/useAnalysis';
import type { BatchResult } from '@/lib/analysis/batch';
import type { ImageAnalysis } from '@/lib/analysis/analyze';
import type { AnalysisPreset } from '@/lib/analysis/presets';

export interface AnalysisPanelProps {
  status: AnalysisStatus;
  progress: number;
  error: string | null;
  k: number;
  result: ImageAnalysis | null;
  batch: BatchResult | null;
  presets: AnalysisPreset[];
  onApplyPreset: (preset: AnalysisPreset) => void;
  onSavePreset: (name: string) => void;
  onDeletePreset: (id: string) => void;
  showDensity: boolean;
  densityRadius: number;
  onToggleDensity: (show: boolean) => void;
  onDensityRadiusChange: (radius: number) => void;
  hasRaster: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onSetK: (k: number) => void;
  onRunSingle: () => void;
  onBatchFiles: (files: File[]) => void;
  onExportCsv: () => void;
  onExportJson: () => void;
  onExportRegionsCsv: () => void;
  onExportPng: () => void;
  onOpenReport: () => void;
  onShareExport: () => void;
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
  presets,
  onApplyPreset,
  onSavePreset,
  onDeletePreset,
  showDensity,
  densityRadius,
  onToggleDensity,
  onDensityRadiusChange,
  hasRaster,
  fileInputRef,
  onSetK,
  onRunSingle,
  onBatchFiles,
  onExportCsv,
  onExportJson,
  onExportRegionsCsv,
  onExportPng,
  onOpenReport,
  onShareExport,
}) => {
  const running = status === 'running';
  const done = status === 'done';
  const hasResult = Boolean(result);
  const hasBatch = Boolean(batch);
  const presetNameRef = useRef<HTMLInputElement>(null);
  const [selectedPresetId, setSelectedPresetId] = useState(
    presets[0]?.id ?? ''
  );

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

      <section aria-label="Analysis presets" className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <select
            aria-label="Analysis preset"
            className="select select-bordered select-sm flex-1"
            value={selectedPresetId}
            disabled={running}
            onChange={(event) => setSelectedPresetId(event.target.value)}>
            {presets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            size="sm"
            disabled={running}
            aria-label="Apply selected preset"
            onClick={() => {
              const preset = presets.find(
                (item) => item.id === selectedPresetId
              );
              if (preset) onApplyPreset(preset);
            }}>
            <FiPlay />
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={running}
            aria-label="Delete selected preset"
            onClick={() => {
              onDeletePreset(selectedPresetId);
              setSelectedPresetId(presets[0]?.id ?? '');
            }}>
            <FiTrash2 />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={presetNameRef}
            type="text"
            aria-label="Preset name"
            className="input input-bordered input-sm flex-1"
            placeholder="Preset name"
          />
          <Button
            variant="outline"
            size="sm"
            aria-label="Save current parameters as preset"
            onClick={() => {
              const name = presetNameRef.current?.value.trim();
              if (name) {
                onSavePreset(name);
                if (presetNameRef.current) {
                  presetNameRef.current.value = '';
                }
              }
            }}>
            <FiBookmark />
            Save
          </Button>
        </div>
      </section>

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

      {done && hasResult && result ? (
        <section
          aria-label="Density heatmap overlay"
          className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <Toggle
              checked={showDensity}
              label="Density heatmap overlay"
              showLabel={false}
              onChange={onToggleDensity}
            />
            <span className="text-sm">Density heatmap</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="density-radius" className="text-xs">
              Neighborhood radius
            </label>
            <select
              id="density-radius"
              aria-label="Density radius"
              className="select select-bordered select-sm"
              value={densityRadius}
              onChange={(event) =>
                onDensityRadiusChange(Number(event.target.value))
              }>
              {[8, 16, 24, 48, 96].map((value) => (
                <option key={value} value={value}>
                  {value}px
                </option>
              ))}
            </select>
          </div>
        </section>
      ) : null}

      {done && hasResult && result && result.regionStats.length > 0 ? (
        <section aria-label="Region statistics" className="flex flex-col gap-1">
          <h4>Regions</h4>
          <div className="max-h-48 overflow-y-auto">
            <table className="table-compact w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Cluster</th>
                  <th>Area</th>
                  <th>Mean</th>
                  <th>X</th>
                  <th>Y</th>
                </tr>
              </thead>
              <tbody>
                {result.regionStats.map((region) => (
                  <tr key={region.id}>
                    <td>{region.id + 1}</td>
                    <td>{region.cluster + 1}</td>
                    <td>{region.area}</td>
                    <td>{region.meanIntensity.toFixed(1)}</td>
                    <td>{region.centroidX.toFixed(1)}</td>
                    <td>{region.centroidY.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-base-content/50 text-xs">
            {result.regionStats.length} regions detected
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
            aria-label="Export regions CSV"
            onClick={onExportRegionsCsv}>
            <FiDownload />
            Regions CSV
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
          <Button
            variant="outline"
            size="sm"
            aria-label="Share exports"
            onClick={onShareExport}>
            <FiShare />
            Share
          </Button>
        </div>
      ) : null}
    </div>
  );
};

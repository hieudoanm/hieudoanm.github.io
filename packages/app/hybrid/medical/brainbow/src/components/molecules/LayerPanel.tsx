import type { FC } from 'react';
import { FiDownload, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Button } from '@/components/atoms/Button';
import { Toggle } from '@/components/atoms/Toggle';
import type { AnnotationLayer } from '@/types/annotation';

export interface LayerPanelProps {
  layers: AnnotationLayer[];
  activeLayerId: string;
  onSelect: (id: string) => void;
  onToggleVisible: (id: string, visible: boolean) => void;
  onChangeColor: (id: string, color: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onExportRoiZip: () => void;
  onExportGeoJson: () => void;
  onExportAnnotationsCsv: () => void;
  onExportSvg: () => void;
  onExportWebViewer: () => void;
}

export const LayerPanel: FC<LayerPanelProps> = ({
  layers,
  activeLayerId,
  onSelect,
  onToggleVisible,
  onChangeColor,
  onAdd,
  onRemove,
  onExportRoiZip,
  onExportGeoJson,
  onExportAnnotationsCsv,
  onExportSvg,
  onExportWebViewer,
}) => {
  const annotationCount = layers.reduce(
    (sum, layer) => sum + (layer.visible ? layer.annotations.length : 0),
    0
  );
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3>Layers</h3>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Add layer"
          onClick={onAdd}>
          <FiPlus />
        </Button>
      </div>
      {layers.map((layer) => {
        const active = layer.id === activeLayerId;
        return (
          <div
            key={layer.id}
            className={`border-base-300 bg-base-200 rounded-lg border p-2 ${
              active ? 'border-primary' : ''
            }`}>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={layer.color}
                aria-label={`${layer.name} color`}
                className="h-6 w-6 cursor-pointer rounded"
                onChange={(event) =>
                  onChangeColor(layer.id, event.target.value)
                }
              />
              <button
                type="button"
                aria-pressed={active}
                className="flex-1 truncate text-left text-sm"
                onClick={() => onSelect(layer.id)}>
                {layer.name}
              </button>
              <Toggle
                checked={layer.visible}
                label={`${layer.name} visible`}
                showLabel={false}
                onChange={(visible) => onToggleVisible(layer.id, visible)}
              />
              <button
                type="button"
                aria-label={`Remove ${layer.name}`}
                className="btn btn-ghost btn-square min-h-9 min-w-9"
                onClick={() => onRemove(layer.id)}>
                <FiTrash2 />
              </button>
            </div>
            <p className="text-base-content/50 mt-1 text-xs">
              {layer.annotations.length} annotation
              {layer.annotations.length === 1 ? '' : 's'}
            </p>
          </div>
        );
      })}
      {annotationCount > 0 ? (
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            aria-label="Export ImageJ ROI set"
            onClick={onExportRoiZip}>
            <FiDownload />
            ROI zip
          </Button>
          <Button
            variant="outline"
            size="sm"
            aria-label="Export annotations as GeoJSON"
            onClick={onExportGeoJson}>
            <FiDownload />
            GeoJSON
          </Button>
          <Button
            variant="outline"
            size="sm"
            aria-label="Export annotations as CSV"
            onClick={onExportAnnotationsCsv}>
            <FiDownload />
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            aria-label="Export annotations as SVG figure"
            onClick={onExportSvg}>
            <FiDownload />
            SVG
          </Button>
          <Button
            variant="outline"
            size="sm"
            aria-label="Export read-only web viewer"
            onClick={onExportWebViewer}>
            <FiDownload />
            Web viewer
          </Button>
        </div>
      ) : null}
    </div>
  );
};

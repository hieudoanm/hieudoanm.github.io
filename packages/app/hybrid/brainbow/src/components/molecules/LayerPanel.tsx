import type { FC } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
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
}

export const LayerPanel: FC<LayerPanelProps> = ({
  layers,
  activeLayerId,
  onSelect,
  onToggleVisible,
  onChangeColor,
  onAdd,
  onRemove,
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <h3>Layers</h3>
      <Button variant="ghost" size="sm" aria-label="Add layer" onClick={onAdd}>
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
              onChange={(event) => onChangeColor(layer.id, event.target.value)}
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
              className="btn btn-ghost btn-square btn-xs"
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
  </div>
);

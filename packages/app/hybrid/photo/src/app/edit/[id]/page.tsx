'use client';

import { type FC, useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { defaultAdjustments } from '@/data/models';
import type { Adjustment, Tool } from '@/types';
import {
  FiArrowLeft,
  FiMove,
  FiCrop,
  FiType,
  FiSquare,
  FiSliders,
  FiEye,
  FiEyeOff,
  FiLock,
  FiUnlock,
  FiPlus,
  FiTrash2,
  FiStar,
  FiDownload,
} from 'react-icons/fi';

const tools: { id: Tool; icon: typeof FiMove; label: string }[] = [
  { id: 'move', icon: FiMove, label: 'Move' },
  { id: 'crop', icon: FiCrop, label: 'Crop' },
  { id: 'brush', icon: FiSliders, label: 'Brush' },
  { id: 'text', icon: FiType, label: 'Text' },
  { id: 'shape', icon: FiSquare, label: 'Shape' },
];

const adjustmentKeys: (keyof Adjustment)[] = [
  'brightness',
  'contrast',
  'saturation',
  'hue',
  'temperature',
  'exposure',
  'highlights',
  'shadows',
  'clarity',
  'vibrance',
  'sharpness',
  'noiseReduction',
  'vignette',
];

const EditorContent: FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const {
    images,
    currentImage,
    setCurrentImage,
    currentAdjustments,
    setCurrentAdjustments,
    filters,
    history,
    layers,
    addHistoryEntry,
    addLayer,
    updateLayer,
    deleteLayer,
    toggleFavorite,
    isLoading,
    updateImage,
  } = useData();
  const { addToast } = useToast();
  const [activeTool, setActiveTool] = useState<Tool>('move');
  const [activePanel, setActivePanel] = useState<
    'adjust' | 'filter' | 'layer' | 'none'
  >('adjust');
  const [showBefore, setShowBefore] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [activeFilterId, setActiveFilterId] = useState<string | null>(null);
  const [filterIntensity, setFilterIntensity] = useState(100);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const img = images.find((i) => i.id === id);
    if (img) setCurrentImage(img);
    else if (!isLoading && images.length > 0) router.push('/');
  }, [id, images, isLoading, setCurrentImage, router]);

  const buildFilterString = useCallback(
    (adj: Adjustment, filterAdj?: Partial<Adjustment>, intensity?: number) => {
      const merged = { ...adj };
      if (filterAdj && intensity) {
        for (const [k, v] of Object.entries(filterAdj)) {
          const key = k as keyof Adjustment;
          merged[key] = Math.round(
            merged[key] + ((v as number) - merged[key]) * (intensity / 100)
          );
        }
      }
      const parts = [
        `brightness(${100 + merged.brightness})`,
        `contrast(${100 + merged.contrast})`,
        `saturate(${100 + merged.saturation})`,
        `hue-rotate(${merged.hue}deg)`,
        `sepia(${merged.temperature > 0 ? merged.temperature : 0}%)`,
      ];
      if (merged.clarity > 0)
        parts.push(`contrast(${100 + merged.clarity / 2})`);
      return parts.join(' ');
    },
    []
  );

  if (!currentImage)
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-base-content/50">Loading...</p>
      </div>
    );

  const activeFilter = activeFilterId
    ? filters.find((f) => f.id === activeFilterId)
    : null;
  const displayAdjustments = showBefore
    ? defaultAdjustments
    : currentAdjustments;
  const filterStr = buildFilterString(
    displayAdjustments,
    activeFilter?.adjustments,
    filterIntensity
  );

  const handleReset = () => {
    setCurrentAdjustments(defaultAdjustments);
    setActiveFilterId(null);
    addToast('Adjustments reset', 'info');
  };
  const handleSliderChange = (key: keyof Adjustment, value: number) => {
    setCurrentAdjustments({ ...currentAdjustments, [key]: value });
  };

  return (
    <div className="bg-base-300 flex h-screen flex-col">
      <header className="border-base-300 bg-base-100 flex items-center gap-3 border-b px-4 py-2">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="btn btn-neutral btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="flex-1 truncate text-sm font-bold">
          {currentImage.name}
        </h1>
        <div className="flex items-center gap-1">
          {tools.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTool(t.id)}
              className={`btn btn-xs ${activeTool === t.id ? 'btn-primary' : 'btn-ghost'}`}
              title={t.label}>
              <t.icon className="size-4" />
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setShowBefore(!showBefore)}
            className={`btn btn-xs ${showBefore ? 'btn-warning' : 'btn-ghost'}`}>
            Before
          </button>
          <button
            type="button"
            onClick={() => toggleFavorite(currentImage.id)}
            className="btn btn-ghost btn-xs btn-circle">
            <FiStar
              className={`size-4 ${currentImage.favorite ? 'fill-warning text-warning' : ''}`}
            />
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-ghost btn-xs">
            Reset
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 items-center justify-center overflow-auto p-4">
          <div
            className="relative"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center',
            }}>
            <div
              className="aspect-square w-96 overflow-hidden rounded-lg"
              style={{
                backgroundColor: currentImage.color,
                filter: filterStr,
              }}>
              <div className="flex h-full items-center justify-center text-4xl font-bold text-white/60">
                {currentImage.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        <div className="border-base-300 bg-base-100 flex w-64 flex-col border-l">
          <div className="border-base-300 flex border-b">
            {(['adjust', 'filter', 'layer'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setActivePanel(p)}
                className={`flex-1 py-2 text-xs font-medium capitalize ${activePanel === p ? 'border-primary text-primary border-b-2' : 'text-base-content/50'}`}>
                {p}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-auto p-3">
            {activePanel === 'adjust' && (
              <div className="space-y-3">
                {adjustmentKeys.map((key) => (
                  <div key={key}>
                    <div className="flex justify-between text-xs">
                      <span className="capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span>{currentAdjustments[key]}</span>
                    </div>
                    <input
                      type="range"
                      min={-100}
                      max={100}
                      value={currentAdjustments[key]}
                      onChange={(e) =>
                        handleSliderChange(key, parseInt(e.target.value))
                      }
                      className="range range-xs range-primary w-full"
                    />
                  </div>
                ))}
              </div>
            )}

            {activePanel === 'filter' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs">
                    Intensity: {filterIntensity}%
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={filterIntensity}
                    onChange={(e) =>
                      setFilterIntensity(parseInt(e.target.value))
                    }
                    className="range range-xs range-primary w-full"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {filters.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() =>
                        setActiveFilterId(activeFilterId === f.id ? null : f.id)
                      }
                      className={`rounded-lg p-2 text-xs ${activeFilterId === f.id ? 'ring-primary ring-2' : ''}`}
                      style={{
                        backgroundColor: currentImage.color,
                        filter: buildFilterString(
                          defaultAdjustments,
                          f.adjustments,
                          100
                        ),
                      }}>
                      <span className="text-white/80 drop-shadow">
                        {f.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activePanel === 'layer' && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={async () => {
                    await addLayer({
                      name: `Layer ${layers.length + 1}`,
                      type: 'image',
                      visible: true,
                      locked: false,
                      opacity: 100,
                      blendMode: 'normal',
                      x: 0,
                      y: 0,
                      width: 100,
                      height: 100,
                      rotation: 0,
                    });
                  }}
                  className="btn btn-primary btn-xs w-full">
                  <FiPlus className="size-3" /> Add Layer
                </button>
                {layers.map((l) => (
                  <div key={l.id} className="card bg-base-200 card-body p-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateLayer(l.id, { visible: !l.visible })
                        }
                        className="btn btn-ghost btn-xs btn-circle">
                        {l.visible ? (
                          <FiEye className="size-3" />
                        ) : (
                          <FiEyeOff className="size-3" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => updateLayer(l.id, { locked: !l.locked })}
                        className="btn btn-ghost btn-xs btn-circle">
                        {l.locked ? (
                          <FiLock className="size-3" />
                        ) : (
                          <FiUnlock className="size-3" />
                        )}
                      </button>
                      <span className="flex-1 truncate text-xs">{l.name}</span>
                      <button
                        type="button"
                        onClick={() => deleteLayer(l.id)}
                        className="btn btn-ghost btn-xs btn-circle text-error">
                        <FiTrash2 className="size-3" />
                      </button>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={l.opacity}
                      onChange={(e) =>
                        updateLayer(l.id, { opacity: parseInt(e.target.value) })
                      }
                      className="range range-xs range-primary w-full"
                    />
                  </div>
                ))}
                {layers.length === 0 && (
                  <p className="text-center text-xs opacity-50">
                    No layers yet
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="border-base-300 border-t p-3">
            <div className="flex items-center justify-between text-xs">
              <span>{zoom}%</span>
              <span>
                {currentImage.width} × {currentImage.height}
              </span>
            </div>
            <input
              type="range"
              min={25}
              max={400}
              value={zoom}
              onChange={(e) => setZoom(parseInt(e.target.value))}
              className="range range-xs range-primary w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const EditPage: FC = () => (
  <Providers>
    <EditorContent />
  </Providers>
);
export default EditPage;

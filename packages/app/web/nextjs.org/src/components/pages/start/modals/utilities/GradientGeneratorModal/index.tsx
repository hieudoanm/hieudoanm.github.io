'use client';

import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { FC, useMemo, useState } from 'react';

type ColorStop = { color: string; position: number };

type GradientType = 'linear' | 'radial';

const DIRECTION_LABELS: { value: string; label: string }[] = [
  { value: 'to bottom', label: '↓' },
  { value: 'to top', label: '↑' },
  { value: 'to right', label: '→' },
  { value: 'to left', label: '←' },
  { value: 'to bottom right', label: '↘' },
  { value: 'to bottom left', label: '↙' },
  { value: 'to top right', label: '↗' },
  { value: 'to top left', label: '↖' },
];

const INITIAL_STOPS: ColorStop[] = [
  { color: '#6366f1', position: 0 },
  { color: '#ec4899', position: 100 },
];

function buildGradientCSS(
  type: GradientType,
  stops: ColorStop[],
  direction: string,
  angle: number
): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const stopsStr = sorted.map((s) => `${s.color} ${s.position}%`).join(', ');

  if (type === 'radial') {
    return `radial-gradient(circle, ${stopsStr})`;
  }
  return `linear-gradient(${angle}deg, ${stopsStr})`;
}

export const GradientGeneratorModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [type, setType] = useState<GradientType>('linear');
  const [stops, setStops] = useState<ColorStop[]>(INITIAL_STOPS);
  const [direction, setDirection] = useState('to bottom');
  const [angle, setAngle] = useState(180);
  const [copied, setCopied] = useState(false);

  const css = useMemo(
    () => buildGradientCSS(type, stops, direction, angle),
    [type, stops, direction, angle]
  );

  const updateStop = (index: number, partial: Partial<ColorStop>) =>
    setStops((prev) =>
      prev.map((s, i) => (i === index ? { ...s, ...partial } : s))
    );

  const addStop = () => {
    const pos = Math.round(
      stops.reduce((sum, s) => sum + s.position, 0) / stops.length
    );
    setStops([...stops, { color: '#22c55e', position: pos }]);
  };

  const removeStop = (index: number) =>
    setStops((prev) =>
      prev.length > 2 ? prev.filter((_, i) => i !== index) : prev
    );

  const handleDirectionChange = (dir: string) => {
    setDirection(dir);
    const map: Record<string, number> = {
      'to bottom': 180,
      'to top': 0,
      'to right': 90,
      'to left': 270,
      'to bottom right': 135,
      'to bottom left': 225,
      'to top right': 45,
      'to top left': 315,
    };
    setAngle(map[dir] ?? 180);
  };

  return (
    <ModalWrapper
      onClose={onClose}
      title="Gradient Generator"
      subtitle={`${type} · ${stops.length} stops`}
      footerNote="Click outside to close"
      size="max-w-md">
      <div className="flex flex-col gap-4">
        <div className="h-32 rounded-xl border" style={{ background: css }} />

        <div className="flex gap-2">
          {(['linear', 'radial'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`btn btn-xs flex-1 font-mono tracking-widest capitalize ${
                type === t ? 'btn-primary' : 'btn-ghost'
              }`}>
              {t}
            </button>
          ))}
        </div>

        {type === 'linear' && (
          <>
            <div className="flex flex-wrap gap-1">
              {DIRECTION_LABELS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => handleDirectionChange(value)}
                  className={`btn btn-xs btn-square font-mono ${
                    direction === value ? 'btn-primary' : 'btn-ghost'
                  }`}
                  title={value}>
                  {label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">
                Angle
              </span>
              <input
                type="range"
                min={0}
                max={360}
                value={angle}
                onChange={(e) => {
                  setAngle(Number(e.target.value));
                  setDirection('');
                }}
                className="range range-xs flex-1"
              />
              <span className="font-mono text-xs tabular-nums">{angle}°</span>
            </div>
          </>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">
              Color Stops
            </span>
            <button
              onClick={addStop}
              className="btn btn-ghost btn-xs font-mono">
              + Add
            </button>
          </div>
          <div className="flex flex-col gap-1.5">
            {stops.map((stop, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => updateStop(i, { color: e.target.value })}
                  className="h-7 w-7 shrink-0 cursor-pointer rounded border-0 p-0"
                />
                <input
                  type="text"
                  value={stop.color}
                  onChange={(e) => updateStop(i, { color: e.target.value })}
                  className="input input-bordered input-xs w-28 font-mono text-xs tracking-wider"
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={stop.position}
                  onChange={(e) =>
                    updateStop(i, { position: Number(e.target.value) })
                  }
                  className="range range-xs flex-1"
                />
                <span className="w-8 text-right font-mono text-xs tabular-nums">
                  {stop.position}%
                </span>
                <button
                  onClick={() => removeStop(i)}
                  disabled={stops.length <= 2}
                  className="btn btn-ghost btn-xs btn-square text-base-content/40 font-mono disabled:opacity-20">
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-base-200 rounded-xl p-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">
              CSS
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`background: ${css};`);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className={`btn btn-xs font-mono ${
                copied ? 'btn-success' : 'btn-primary'
              }`}>
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <pre className="overflow-x-auto font-mono text-xs leading-relaxed select-all">
            background: {css};
          </pre>
        </div>
      </div>
    </ModalWrapper>
  );
};
GradientGeneratorModal.displayName = 'GradientGeneratorModal';

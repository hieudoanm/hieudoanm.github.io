'use client';

import { FC, useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { gradientCss } from '@/lib/colors';
import { useClipboard } from '@/hooks/useClipboard';
import { TheoryNote } from '@/components/atoms/TheoryNote';

export const GradientBuilder: FC<{ baseColor: string }> = ({ baseColor }) => {
  const [stops, setStops] = useState<string[]>([baseColor, '#ffffff']);
  const [angle, setAngle] = useState(135);
  const [radial, setRadial] = useState(false);
  const { copied, copy } = useClipboard();
  const css = gradientCss(stops, angle, radial);

  const updateStop = (index: number, hex: string) => {
    setStops(stops.map((stop, i) => (i === index ? hex : stop)));
  };

  const addStop = () => {
    setStops([...stops, '#888888']);
  };

  const removeStop = (index: number) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  return (
    <div data-testid="gradient-builder" className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end gap-4">
        {stops.map((hex, index) => (
          <label key={index} className="flex flex-col gap-1">
            <span className="text-base-content/50 text-xs">
              Stop {index + 1}
            </span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                aria-label={`Stop ${index + 1} color`}
                className="h-9 w-14 cursor-pointer rounded border"
                value={hex}
                onChange={(event) => updateStop(index, event.target.value)}
              />
              {stops.length > 2 && (
                <button
                  type="button"
                  aria-label={`Remove stop ${index + 1}`}
                  className="btn btn-ghost btn-xs text-base-content/40"
                  onClick={() => removeStop(index)}>
                  ✕
                </button>
              )}
            </div>
          </label>
        ))}
        {stops.length < 3 && (
          <button
            type="button"
            className="btn btn-ghost btn-sm text-base-content/50"
            onClick={addStop}>
            + Add stop
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-3 text-sm">
          <span className="text-base-content/50">Angle</span>
          <input
            type="range"
            min={0}
            max={360}
            value={angle}
            aria-label="Gradient angle"
            onChange={(event) => setAngle(Number(event.target.value))}
            className="range range-primary range-xs w-40"
          />
          <span className="text-base-content font-mono text-xs">{angle}°</span>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            aria-label="Radial gradient"
            checked={radial}
            onChange={(event) => setRadial(event.target.checked)}
            className="checkbox checkbox-sm"
          />
          <span className="text-base-content/70">Radial</span>
        </label>
      </div>
      <div
        className="h-32 w-full rounded-xl border"
        style={{ background: css }}
        aria-label="Gradient preview"
      />
      <div className="flex items-center gap-3">
        <code className="text-base-content/70 flex-1 font-mono text-xs break-all">
          {css}
        </code>
        <button
          type="button"
          aria-label="Copy gradient"
          className="btn btn-primary btn-sm"
          onClick={() => copy('gradient', css)}>
          {copied === 'gradient' ? (
            <FiCheck className="text-success" />
          ) : (
            <FiCopy />
          )}
          Copy CSS
        </button>
      </div>
      <TheoryNote title="Gradients">
        CSS interpolates between color stops. A linear gradient blends along a
        line at the chosen angle while a radial gradient blends outward from a
        center. The midpoint of a two-color gradient is the average of the two
        RGB colors, which can look muddy when the stops are complementary.
      </TheoryNote>
    </div>
  );
};
GradientBuilder.displayName = 'GradientBuilder';

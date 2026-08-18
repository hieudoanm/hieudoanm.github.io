'use client';

import { useCallback, useEffect, useRef, useState, type FC } from 'react';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
import { Button } from '@/components/atoms/Button';
import type { MriApi } from '@/lib/api/client';
import type { SeriesMetadata } from '@/lib/api/types';
import {
  applyWindowLevel,
  autoWindowLevel,
  defaultWindowLevel,
  type WindowLevel,
} from '@/lib/viewer/lut';

export interface ViewerTemplateProps {
  api: MriApi;
  seriesId: string;
}

export const ViewerTemplate: FC<ViewerTemplateProps> = ({ api, seriesId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sliceRef = useRef<ArrayBuffer | null>(null);
  const [metadata, setMetadata] = useState<SeriesMetadata | null>(null);
  const [sliceIndex, setSliceIndex] = useState(0);
  const [windowLevel, setWindowLevel] =
    useState<WindowLevel>(defaultWindowLevel());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    api
      .getSeriesMetadata(seriesId)
      .then((value) => {
        if (active) setMetadata(value);
      })
      .catch((cause) => {
        if (active) {
          setError(cause instanceof Error ? cause.message : String(cause));
        }
      });
    return () => {
      active = false;
    };
  }, [api, seriesId]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const data = sliceRef.current;
    if (!canvas || !data || !metadata) return;
    const { rows, columns, signedPixels } = metadata.series;
    canvas.width = columns;
    canvas.height = rows;
    const context = canvas.getContext('2d');
    if (!context) return;
    const rgba = applyWindowLevel(data, signedPixels, windowLevel);
    context.putImageData(new ImageData(rgba, columns, rows), 0, 0);
  }, [metadata, windowLevel]);

  const loadSlice = useCallback(
    async (index: number) => {
      if (!metadata) return;
      try {
        const data = await api.readSlice(seriesId, index);
        sliceRef.current = data;
        setWindowLevel(autoWindowLevel(data, metadata.series.signedPixels));
        render();
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : String(cause));
      }
    },
    [api, metadata, render, seriesId]
  );

  useEffect(() => {
    void loadSlice(sliceIndex);
    // Reload whenever the requested slice changes.
  }, [loadSlice, sliceIndex]);

  useEffect(() => {
    render();
  }, [render]);

  const stepSlice = useCallback(
    (delta: number) => {
      setSliceIndex((current) => {
        const total = metadata?.series.sliceCount ?? 0;
        return Math.min(total - 1, Math.max(0, current + delta));
      });
    },
    [metadata]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') stepSlice(1);
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') stepSlice(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [stepSlice]);

  if (error) {
    return (
      <main className="mx-auto min-h-screen max-w-4xl p-8">
        <div className="alert alert-error" role="alert">
          <span>{error}</span>
        </div>
      </main>
    );
  }

  if (!metadata) {
    return (
      <main className="min-h-screen p-8">
        <span className="loading loading-spinner loading-lg" />
      </main>
    );
  }

  const total = metadata.series.sliceCount;

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-4 p-8">
      <div className="flex items-center gap-4">
        <Link
          href={`/studies?dataset=${encodeURIComponent(metadata.series.datasetId)}`}
          className="btn btn-ghost btn-sm">
          <FiChevronLeft /> Studies
        </Link>
        <h1 className="text-xl font-bold">
          {metadata.series.seriesDescription || 'Series viewer'}
        </h1>
      </div>

      <div className="flex justify-center bg-black" data-testid="viewport">
        <canvas
          ref={canvasRef}
          className="max-h-[70vh] w-auto object-contain"
          aria-label="MRI slice"
        />
      </div>

      <div className="flex flex-col gap-3" data-testid="viewer-controls">
        <label className="flex items-center gap-3">
          <span className="w-24 text-sm">Slice</span>
          <input
            type="range"
            min={0}
            max={Math.max(0, total - 1)}
            value={sliceIndex}
            className="range range-sm range-primary grow"
            data-testid="slice-slider"
            onChange={(event) => setSliceIndex(Number(event.target.value))}
          />
          <span className="font-mono text-sm">
            {sliceIndex + 1}/{total}
          </span>
        </label>

        <label className="flex items-center gap-3">
          <span className="w-24 text-sm">Window</span>
          <input
            type="range"
            min={1}
            max={4096}
            value={windowLevel.width}
            className="range range-sm range-secondary grow"
            data-testid="window-slider"
            onChange={(event) =>
              setWindowLevel((current) => ({
                ...current,
                width: Number(event.target.value),
              }))
            }
          />
          <span className="font-mono text-sm">{windowLevel.width}</span>
        </label>

        <label className="flex items-center gap-3">
          <span className="w-24 text-sm">Level</span>
          <input
            type="range"
            min={-1024}
            max={4096}
            value={windowLevel.center}
            className="range range-sm range-accent grow"
            data-testid="level-slider"
            onChange={(event) =>
              setWindowLevel((current) => ({
                ...current,
                center: Number(event.target.value),
              }))
            }
          />
          <span className="font-mono text-sm">{windowLevel.center}</span>
        </label>

        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => stepSlice(-1)}>
            Prev
          </Button>
          <Button variant="outline" size="sm" onClick={() => stepSlice(1)}>
            Next
          </Button>
        </div>
      </div>
    </main>
  );
};

'use client';

import { useCallback, useEffect, useRef, useState, type FC } from 'react';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
import { Button } from '@/components/atoms/Button';
import { SliceCanvas } from '@/components/molecules/SliceCanvas';
import type { MriApi } from '@/lib/api/client';
import type { CompareCompatibility, SeriesMetadata } from '@/lib/api/types';
import { diffStats, diffToRgba, type DiffStats } from '@/lib/compare';
import {
  autoWindowLevel,
  defaultWindowLevel,
  type WindowLevel,
} from '@/lib/viewer/lut';

export interface CompareTemplateProps {
  api: MriApi;
  leftSeriesId: string;
  rightSeriesId: string;
}

interface SideState {
  metadata: SeriesMetadata | null;
  slice: ArrayBuffer | null;
}

export const CompareTemplate: FC<CompareTemplateProps> = ({
  api,
  leftSeriesId,
  rightSeriesId,
}) => {
  const [left, setLeft] = useState<SideState>({ metadata: null, slice: null });
  const [right, setRight] = useState<SideState>({
    metadata: null,
    slice: null,
  });
  const [compatibility, setCompatibility] =
    useState<CompareCompatibility | null>(null);
  const [sliceIndex, setSliceIndex] = useState(0);
  const [windowLevel, setWindowLevel] =
    useState<WindowLevel>(defaultWindowLevel());
  const [crosshair, setCrosshair] = useState<{ x: number; y: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    Promise.all([
      api.getSeriesMetadata(leftSeriesId),
      api.getSeriesMetadata(rightSeriesId),
      api.compareCompatibility(leftSeriesId, rightSeriesId),
    ])
      .then(([leftMeta, rightMeta, compat]) => {
        if (!active) return;
        setLeft({ metadata: leftMeta, slice: null });
        setRight({ metadata: rightMeta, slice: null });
        setCompatibility(compat);
      })
      .catch((cause: unknown) => {
        if (active) {
          setError(cause instanceof Error ? cause.message : String(cause));
        }
      });
    return () => {
      active = false;
    };
  }, [api, leftSeriesId, rightSeriesId]);

  useEffect(() => {
    let active = true;
    Promise.all([
      api.readSlice(leftSeriesId, sliceIndex),
      api.readSlice(rightSeriesId, sliceIndex),
    ])
      .then(([leftSlice, rightSlice]) => {
        if (!active) return;
        setLeft((current) => ({ ...current, slice: leftSlice }));
        setRight((current) => ({ ...current, slice: rightSlice }));
        setWindowLevel(
          autoWindowLevel(
            leftSlice,
            left.metadata?.series.signedPixels ?? false
          )
        );
      })
      .catch((cause: unknown) => {
        if (active) {
          setError(cause instanceof Error ? cause.message : String(cause));
        }
      });
    return () => {
      active = false;
    };
  }, [
    api,
    left.metadata?.series.signedPixels,
    leftSeriesId,
    rightSeriesId,
    sliceIndex,
  ]);

  const total =
    Math.min(
      left.metadata?.series.sliceCount ?? 0,
      right.metadata?.series.sliceCount ?? 0
    ) || 0;

  const stepSlice = useCallback(
    (delta: number) => {
      setSliceIndex((current) =>
        Math.min(total - 1, Math.max(0, current + delta))
      );
    },
    [total]
  );

  if (error) {
    return (
      <main className="mx-auto min-h-screen max-w-5xl p-8">
        <div className="alert alert-error" role="alert">
          <span>{error}</span>
        </div>
      </main>
    );
  }

  if (!left.metadata || !right.metadata || !compatibility) {
    return (
      <main className="min-h-screen p-8">
        <span className="loading loading-spinner loading-lg" />
      </main>
    );
  }

  return (
    <CompareView
      left={left}
      right={right}
      compatibility={compatibility}
      sliceIndex={sliceIndex}
      total={total}
      windowLevel={windowLevel}
      crosshair={crosshair}
      onCrosshair={setCrosshair}
      onSlice={setSliceIndex}
      onStep={stepSlice}
      onWindow={setWindowLevel}
    />
  );
};

interface CompareViewProps {
  left: SideState;
  right: SideState;
  compatibility: CompareCompatibility;
  sliceIndex: number;
  total: number;
  windowLevel: WindowLevel;
  crosshair: { x: number; y: number } | null;
  onCrosshair: (value: { x: number; y: number } | null) => void;
  onSlice: (index: number) => void;
  onStep: (delta: number) => void;
  onWindow: (value: WindowLevel) => void;
}

const CompareView: FC<CompareViewProps> = ({
  left,
  right,
  compatibility,
  sliceIndex,
  total,
  windowLevel,
  crosshair,
  onCrosshair,
  onSlice,
  onStep,
  onWindow,
}) => {
  const signed = left.metadata?.series.signedPixels ?? false;
  const rows = left.metadata?.series.rows ?? 0;
  const columns = left.metadata?.series.columns ?? 0;
  const diff: DiffStats | null =
    left.slice && right.slice
      ? diffStats(left.slice, right.slice, signed)
      : null;
  const diffRgba =
    left.slice && right.slice
      ? diffToRgba(left.slice, right.slice, signed, windowLevel)
      : null;

  const handlePointer = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const bounds = target.getBoundingClientRect();
    onCrosshair({
      x: Math.round(
        ((event.clientX - bounds.left) / bounds.width) *
          (target.dataset.columns ? Number(target.dataset.columns) : 256)
      ),
      y: Math.round(
        ((event.clientY - bounds.top) / bounds.height) *
          (target.dataset.rows ? Number(target.dataset.rows) : 256)
      ),
    });
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-4 p-8">
      <div className="flex items-center gap-4">
        <Link href="/studies" className="btn btn-ghost btn-sm">
          <FiChevronLeft /> Studies
        </Link>
        <h1 className="text-xl font-bold">Compare series</h1>
      </div>

      {!compatibility.compatible ? (
        <div
          className="alert alert-warning"
          role="alert"
          data-testid="compatibility-warning">
          <span>
            Geometry differs — registration is not applied yet:{' '}
            {compatibility.reasons.join('; ')}
          </span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SideCanvas
          side={left}
          label="Baseline"
          testId="left-canvas"
          windowLevel={windowLevel}
          crosshair={crosshair}
          onPointer={handlePointer}
        />
        <SideCanvas
          side={right}
          label="Follow-up"
          testId="right-canvas"
          windowLevel={windowLevel}
          crosshair={crosshair}
          onPointer={handlePointer}
        />
        <figure className="flex flex-col items-center gap-1">
          <div className="bg-black" data-testid="diff-canvas">
            {diffRgba ? (
              <DiffCanvas rgba={diffRgba} rows={rows} columns={columns} />
            ) : null}
          </div>
          <figcaption className="text-base-content/60 text-xs">
            Difference
            {diff
              ? ` · mean ${diff.meanAbsDiff.toFixed(1)} · max ${diff.maxDiff}`
              : ''}
          </figcaption>
        </figure>
      </div>

      <div className="flex flex-col gap-3" data-testid="compare-controls">
        <label className="flex items-center gap-3">
          <span className="w-24 text-sm">Slice</span>
          <input
            type="range"
            min={0}
            max={Math.max(0, total - 1)}
            value={Math.min(sliceIndex, Math.max(0, total - 1))}
            className="range range-primary range-sm grow"
            data-testid="compare-slice-slider"
            onChange={(event) => onSlice(Number(event.target.value))}
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
            className="range range-secondary range-sm grow"
            data-testid="compare-window-slider"
            onChange={(event) =>
              onWindow({ ...windowLevel, width: Number(event.target.value) })
            }
          />
        </label>
        <div className="flex justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onStep(-1)}>
            Prev
          </Button>
          <Button variant="outline" size="sm" onClick={() => onStep(1)}>
            Next
          </Button>
        </div>
      </div>
    </main>
  );
};

const SideCanvas: FC<{
  side: SideState;
  label: string;
  testId: string;
  windowLevel: WindowLevel;
  crosshair: { x: number; y: number } | null;
  onPointer: (event: React.MouseEvent<HTMLDivElement>) => void;
}> = ({ side, label, testId, windowLevel, crosshair, onPointer }) =>
  side.metadata ? (
    <div
      onClick={onPointer}
      data-columns={side.metadata.series.columns}
      data-rows={side.metadata.series.rows}>
      <SliceCanvas
        data={side.slice}
        rows={side.metadata.series.rows}
        columns={side.metadata.series.columns}
        signedPixels={side.metadata.series.signedPixels}
        windowLevel={windowLevel}
        crosshair={crosshair}
        label={label}
        testId={testId}
      />
    </div>
  ) : null;

const DiffCanvas: FC<{
  rgba: Uint8ClampedArray<ArrayBuffer>;
  rows: number;
  columns: number;
}> = ({ rgba, rows, columns }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = columns;
    canvas.height = rows;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.putImageData(new ImageData(rgba, columns, rows), 0, 0);
  }, [columns, rgba, rows]);
  return (
    <canvas
      ref={canvasRef}
      className="max-h-[45vh] w-auto object-contain"
      aria-label="Difference map"
    />
  );
};

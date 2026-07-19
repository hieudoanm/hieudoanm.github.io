'use client';

import type { FC, MouseEvent } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { HEIGHT, WIDTH, nearestAnchor } from './outline-geometry';
import { renderScene } from './outline-drawing';
import type { BrainRegion } from './types';

export interface BrainOutlineProps {
  /** Structures the current cut exposes, each optionally carrying an anchor. */
  regions: BrainRegion[];
  /** Structures still below the cut, drawn faint so the full brain stays legible. */
  buried: BrainRegion[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

/**
 * A schematic lateral view with a hotspot per anchored structure. Deliberately
 * not a proportional atlas: it teaches where things sit relative to each other,
 * which is what the outline in the source notes conveys.
 */
export const BrainOutline: FC<BrainOutlineProps> = ({
  regions,
  buried,
  selectedId,
  onSelect,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) renderScene(ctx, { regions, buried, selectedId });
  }, [regions, buried, selectedId]);

  useEffect(draw, [draw]);

  const handleClick = (event: MouseEvent<HTMLCanvasElement>): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const box = canvas.getBoundingClientRect();
    if (box.width === 0 || box.height === 0) return;
    // The canvas is fluid, so clicks arrive in CSS pixels; scale into the
    // drawing's own pixels before measuring against the hit radius.
    const px = ((event.clientX - box.left) / box.width) * WIDTH;
    const py = ((event.clientY - box.top) / box.height) * HEIGHT;
    const hit = nearestAnchor(regions, px, py);
    if (hit) onSelect(hit.id);
  };

  return (
    <canvas
      ref={canvasRef}
      width={WIDTH}
      height={HEIGHT}
      onClick={handleClick}
      role="img"
      aria-label="Schematic lateral view of the brain with a hotspot per exposed structure"
      className="border-base-content/10 bg-base-200/30 w-full rounded-lg border"
    />
  );
};

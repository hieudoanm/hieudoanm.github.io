'use client';

import type { AppData } from '@/lib/downloads';
import { getIcon } from '@/lib/icons';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';

// ── Honeycomb geometry (pointy-top hexagons) ────────────────────────────
const HEX_H = 100; // visible hexagon height (px)
const GAP = 6; // uniform gap between hexagons (px)
const SQRT3 = Math.sqrt(3);

const HEX_W = (HEX_H * SQRT3) / 2; // exact regular hexagon width (~86.603)
const CELL_W = HEX_W + GAP; // layout cell = hexagon + gap
const CELL_H = (CELL_W * 2) / SQRT3; // same aspect ratio keeps the gap uniform
const PITCH_X = CELL_W; // horizontal distance between neighbours
const PITCH_Y = CELL_H * 0.75; // vertical distance between rows
const DEFAULT_COLS = 12;

const HEX_CLIP =
  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

/** How many columns fit in `width` px (leaves room for the odd-row shift). */
const columnsFor = (width: number): number =>
  Math.max(1, Math.floor((width - CELL_W / 2) / PITCH_X));

/** Top-left position of the cell at `index` for a grid with `cols` columns. */
const cellPosition = (index: number, cols: number) => {
  const col = index % cols;
  const row = Math.floor(index / cols);
  return {
    x: col * PITCH_X + (row % 2 === 1 ? CELL_W / 2 : 0),
    y: row * PITCH_Y,
  };
};

interface HexagonGridProps {
  apps: AppData[];
}

export const HexagonGrid: FC<HexagonGridProps> = ({ apps }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState<number>(DEFAULT_COLS);

  // Recompute the column count whenever the container is resized.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => setCols(columnsFor(el.clientWidth));
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const usedCols = Math.max(1, Math.min(cols, apps.length));
  const rows = Math.ceil(apps.length / usedCols);

  // Extra half-cell of width only when a second row exists (it is shifted right).
  const gridWidth = usedCols * CELL_W + (rows > 1 ? CELL_W / 2 : 0);
  const gridHeight = rows > 0 ? (rows - 1) * PITCH_Y + CELL_H : 0;

  return (
    <div ref={containerRef} className="w-full">
      {/* pt-10 reserves room for the first row's tooltips */}
      <div className="mx-auto pt-10" style={{ width: gridWidth }}>
        <div
          className="relative"
          style={{ width: gridWidth, height: gridHeight }}>
          {apps.map((app, i) => {
            const Icon = getIcon(app.icon);
            const { x, y } = cellPosition(i, usedCols);

            return (
              <div
                key={app.slug}
                className="group absolute flex items-center justify-center hover:z-20"
                style={{
                  left: x,
                  top: y,
                  width: CELL_W,
                  height: CELL_H,
                }}>
                <Link
                  href={`/app/${app.slug}`}
                  aria-label={app.label}
                  className="block"
                  style={{ width: HEX_W, height: HEX_H }}>
                  <div
                    className="bg-base-300 group-hover:bg-primary flex h-full w-full items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:text-white"
                    style={{ clipPath: HEX_CLIP }}>
                    <Icon className="text-3xl transition-transform duration-200 group-hover:scale-125" />
                  </div>
                </Link>

                <div className="bg-base-100 text-base-content ring-base-300 pointer-events-none absolute top-0 left-1/2 z-30 -translate-x-1/2 -translate-y-full rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap opacity-0 ring-1 transition-opacity group-hover:opacity-100">
                  {app.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

HexagonGrid.displayName = 'HexagonGrid';

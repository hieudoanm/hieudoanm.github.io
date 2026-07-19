'use client';

import { useEffect, useMemo, useRef, useState, type FC } from 'react';
import {
  FiDownload,
  FiImage,
  FiMaximize,
  FiZoomIn,
  FiZoomOut,
} from 'react-icons/fi';

import type { SqliteDatabase } from '@/types/sqlite';
import { buildErModel, buildErSvg, layoutErModel } from '@/utils/er';
import { downloadText } from '@/utils/sqlDump';

const MIN_SCALE = 0.1;
const MAX_SCALE = 3;

interface ErDiagramViewProps {
  dbInstance: SqliteDatabase;
  fileName?: string | null;
}

const baseName = (name: string): string =>
  name.replace(/\.(db|sqlite|sqlite3)$/i, '') || 'database';

export const ErDiagramView: FC<ErDiagramViewProps> = ({
  dbInstance,
  fileName,
}) => {
  const model = useMemo(
    () => layoutErModel(buildErModel(dbInstance)),
    [dbInstance]
  );
  const { svg, width, height } = useMemo(() => buildErSvg(model), [model]);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    x: number;
    y: number;
    px: number;
    py: number;
  } | null>(null);
  const [view, setView] = useState({ x: 0, y: 0, scale: 1 });
  const [hovered, setHovered] = useState<string | null>(null);

  const hoverStyles = useMemo(() => {
    const q = (s: string): string =>
      `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
    const rules: string[] = [];
    for (const t of model.tables) {
      const sel = `.er-diagram[data-hover=${q(t.name)}]`;
      const relatedNames = new Set<string>([t.name]);
      for (const e of model.edges) {
        if (e.from === t.name) relatedNames.add(e.to);
        if (e.to === t.name) relatedNames.add(e.from);
      }
      rules.push(`${sel} g[data-table] { opacity: 0.25; }`);
      rules.push(`${sel} path[data-edge] { opacity: 0.15; }`);
      for (const name of relatedNames) {
        rules.push(
          `${sel} g[data-table=${q(name)}] { opacity: 1; }${name === t.name ? ' rect:first-child { stroke: #818cf8; stroke-width: 2; }' : ''}`
        );
      }
      for (const e of model.edges) {
        if (e.from === t.name || e.to === t.name) {
          rules.push(
            `${sel} path[data-edge=${q(`${e.from}.${e.to}`)}] { opacity: 1; }`
          );
        }
      }
    }
    return rules.join('\n');
  }, [model]);

  const fitView = () => {
    const el = containerRef.current;
    if (!el) return;
    const cw = el.clientWidth;
    const ch = el.clientHeight;
    const scale = Math.min((cw - 24) / width, (ch - 24) / height, 1);
    setView({
      x: (cw - width * scale) / 2,
      y: (ch - height * scale) / 2,
      scale: Math.max(MIN_SCALE, scale),
    });
  };

  useEffect(() => {
    fitView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  const handleWheel = (e: React.WheelEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, view.scale * factor));
    const k = next / view.scale;
    setView((v) => ({
      x: px - (px - v.x) * k,
      y: py - (py - v.y) * k,
      scale: next,
    }));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    dragRef.current = { x: view.x, y: view.y, px: e.clientX, py: e.clientY };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (d) {
      setView((v) => ({
        ...v,
        x: d.x + (e.clientX - d.px),
        y: d.y + (e.clientY - d.py),
      }));
    }
    const table = (e.target as Element).closest?.('[data-table]');
    setHovered(table ? table.getAttribute('data-table') : null);
  };

  const onPointerEnd = () => {
    dragRef.current = null;
  };

  const handleExportSvg = () => {
    downloadText(`${baseName(fileName ?? 'database')}-er.svg`, svg);
  };

  const handleExportPng = () => {
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const scale = 2;
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `${baseName(fileName ?? 'database')}-er.png`;
      a.click();
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const zoomBtn =
    'btn btn-ghost btn-xs text-base-content/50 hover:text-base-content';

  if (model.tables.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-base-content/40 text-sm italic">
          No tables to visualize
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-base-300 flex flex-shrink-0 items-center gap-1 overflow-x-auto border-b px-3 py-2">
        <button
          type="button"
          title="Zoom out"
          aria-label="Zoom out"
          className={zoomBtn}
          onClick={() =>
            setView((v) => ({
              ...v,
              scale: Math.max(MIN_SCALE, v.scale / 1.2),
            }))
          }>
          <FiZoomOut className="size-3.5" />
        </button>
        <button
          type="button"
          title="Zoom in"
          aria-label="Zoom in"
          className={zoomBtn}
          onClick={() =>
            setView((v) => ({
              ...v,
              scale: Math.min(MAX_SCALE, v.scale * 1.2),
            }))
          }>
          <FiZoomIn className="size-3.5" />
        </button>
        <button
          type="button"
          title="Fit to view"
          aria-label="Fit to view"
          className={zoomBtn}
          onClick={fitView}>
          <FiMaximize className="size-3.5" />
        </button>
        <span className="text-base-content/40 font-mono text-[11px]">
          {Math.round(view.scale * 100)}%
        </span>
        <div className="bg-base-300 mx-1 h-4 w-px" />
        <button
          type="button"
          className="btn btn-ghost btn-xs text-base-content/50 hover:text-base-content gap-1"
          onClick={handleExportSvg}>
          <FiDownload className="size-3.5" /> SVG
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-xs text-base-content/50 hover:text-base-content gap-1"
          onClick={handleExportPng}>
          <FiImage className="size-3.5" /> PNG
        </button>
        <span className="text-base-content/30 ml-auto hidden shrink-0 font-mono text-[11px] md:inline">
          {model.tables.length} tables · {model.edges.length} relations · drag
          to pan, scroll to zoom
        </span>
      </div>
      <div
        ref={containerRef}
        data-hover={hovered ?? ''}
        className="er-diagram relative min-h-0 flex-1 cursor-grab overflow-hidden bg-slate-950 active:cursor-grabbing"
        onWheel={handleWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerLeave={onPointerEnd}>
        <style>{hoverStyles}</style>
        <div
          className="absolute top-0 left-0 origin-top-left select-none"
          style={{
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
    </div>
  );
};
ErDiagramView.displayName = 'ErDiagramView';

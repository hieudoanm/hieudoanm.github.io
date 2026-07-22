'use client';

import { type FC, useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import type {
  SVGShape,
  SVGFill,
  SVGStroke,
  Tool,
  SVGGradient,
  SVGLayer,
  Guide,
} from '@/types';
import {
  generateId,
  snapToGrid,
  exportAsSVG,
  downloadFile,
  copyToClipboard,
} from '@/utils/format';
import {
  FiArrowLeft,
  FiSave,
  FiDownload,
  FiCopy,
  FiEye,
  FiEyeOff,
  FiGrid,
  FiLock,
  FiUnlock,
  FiTrash2,
  FiPlus,
  FiRotateCcw,
  FiRotateCw,
  FiChevronUp,
  FiChevronDown,
  FiLayers,
  FiSettings,
  FiCode,
  FiMousePointer,
  FiSquare,
  FiCircle,
  FiMinus,
  FiPenTool,
  FiEdit3,
  FiType,
  FiDroplet,
  FiMaximize,
  FiMinimize,
  FiStar,
  FiX,
} from 'react-icons/fi';

const EditorContent: FC = () => {
  const router = useRouter();
  const params = useParams();
  const documentId = params.id as string;
  const { addToast } = useToast();
  const {
    documents,
    symbols,
    settings,
    updateDocument,
    addShape,
    updateShape,
    removeShape,
    moveShape,
    resizeShape,
    duplicateShape,
    updateLayers,
    addLayer,
    removeLayer,
    renameLayer,
    toggleLayerVisibility,
    toggleLayerLock,
    addSymbol,
    removeSymbol,
    updateSettings,
    addGradient,
    removeGradient,
    saveHistory,
    undo,
    redo,
  } = useData();

  const document = documents.find((d) => d.id === documentId);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [tool, setTool] = useState<Tool>('select');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isPanning, setIsPanning] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(settings.showGrid);
  const [showRulers, setShowRulers] = useState(settings.showRulers);
  const [snapEnabled, setSnapEnabled] = useState(settings.snapToGrid);
  const [previewMode, setPreviewMode] = useState(false);
  const [drawingShape, setDrawingShape] = useState<SVGShape | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [resizing, setResizing] = useState<{
    handle: string;
    shapeId: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    origW: number;
    origH: number;
  } | null>(null);
  const [dragging, setDragging] = useState<{
    shapeId: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const [sidePanel, setSidePanel] = useState<
    'layers' | 'properties' | 'symbols'
  >('layers');
  const [gradientStops, setGradientStops] = useState<
    { color: string; offset: number }[]
  >([
    { color: '#3b82f6', offset: 0 },
    { color: '#8b5cf6', offset: 1 },
  ]);
  const [textValue, setTextValue] = useState('Text');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState(24);
  const [penPoints, setPenPoints] = useState<{ x: number; y: number }[]>([]);
  const [pencilPoints, setPencilPoints] = useState<{ x: number; y: number }[]>(
    []
  );
  const [guides, setGuides] = useState<Guide[]>([]);
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);

  useEffect(() => {
    if (document) {
      setShowGrid(settings.showGrid);
      setShowRulers(settings.showRulers);
      setSnapEnabled(settings.snapToGrid);
    }
  }, [document, settings]);

  const getCanvasPoint = useCallback(
    (e: React.MouseEvent): { x: number; y: number } => {
      const svg = svgRef.current;
      if (!svg) return { x: 0, y: 0 };
      const rect = svg.getBoundingClientRect();
      const x = (e.clientX - rect.left) / zoom - panOffset.x;
      const y = (e.clientY - rect.top) / zoom - panOffset.y;
      return { x, y };
    },
    [zoom, panOffset]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!document) return;
      const point = getCanvasPoint(e);

      if (tool === 'select') {
        if (isPanning) return;
        const clickedShape = [...document.shapes].reverse().find((s) => {
          if (!s.visible) return false;
          return (
            point.x >= s.x &&
            point.x <= s.x + s.width &&
            point.y >= s.y &&
            point.y <= s.y + s.height
          );
        });
        if (clickedShape) {
          if (e.shiftKey) {
            setSelectedIds((prev) =>
              prev.includes(clickedShape.id)
                ? prev.filter((id) => id !== clickedShape.id)
                : [...prev, clickedShape.id]
            );
          } else {
            setSelectedIds([clickedShape.id]);
          }
        } else {
          setSelectedIds([]);
        }
      } else if (tool === 'rect' || tool === 'ellipse' || tool === 'line') {
        setDragStart(point);
        const newShape: SVGShape = {
          id: generateId(),
          type: tool,
          name: `${tool.charAt(0).toUpperCase() + tool.slice(1)} ${document.shapes.length + 1}`,
          x: point.x,
          y: point.y,
          width: 0,
          height: 0,
          rotation: 0,
          fill: { type: 'solid', color: '#3b82f6', opacity: 1 },
          stroke: {
            color: '#1e293b',
            width: 2,
            dashArray: '',
            cap: 'round',
            join: 'round',
          },
          opacity: 1,
          locked: false,
          visible: true,
        };
        setDrawingShape(newShape);
      } else if (tool === 'text') {
        const newShape: SVGShape = {
          id: generateId(),
          type: 'text',
          name: 'Text',
          x: point.x,
          y: point.y,
          width: 200,
          height: fontSize,
          rotation: 0,
          fill: { type: 'solid', color: '#1e293b', opacity: 1 },
          stroke: {
            color: 'transparent',
            width: 0,
            dashArray: '',
            cap: 'round',
            join: 'round',
          },
          opacity: 1,
          locked: false,
          visible: true,
          text: textValue,
          fontFamily,
          fontSize,
        };
        addShape(documentId, newShape);
      } else if (tool === 'path') {
        setPenPoints((prev) => [...prev, point]);
      } else if (tool === 'pencil') {
        setPencilPoints([point]);
      }
    },
    [
      document,
      tool,
      isPanning,
      getCanvasPoint,
      textValue,
      fontFamily,
      fontSize,
      addShape,
      documentId,
    ]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!document) return;
      const point = getCanvasPoint(e);

      if (dragStart && drawingShape) {
        const snapped = snapEnabled
          ? {
              x: snapToGrid(point.x, settings.gridSize),
              y: snapToGrid(point.y, settings.gridSize),
            }
          : point;
        const x = Math.min(dragStart.x, snapped.x);
        const y = Math.min(dragStart.y, snapped.y);
        const width = Math.abs(snapped.x - dragStart.x);
        const height = Math.abs(snapped.y - dragStart.y);
        setDrawingShape((prev) =>
          prev ? { ...prev, x, y, width, height } : null
        );
      }

      if (dragging) {
        const dx = point.x - dragging.startX;
        const dy = point.y - dragging.startY;
        let newX = dragging.origX + dx;
        let newY = dragging.origY + dy;
        if (snapEnabled) {
          newX = snapToGrid(newX, settings.gridSize);
          newY = snapToGrid(newY, settings.gridSize);
        }
        moveShape(documentId, dragging.shapeId, newX, newY);
      }

      if (resizing) {
        const dx = point.x - resizing.startX;
        const dy = point.y - resizing.startY;
        let newW = resizing.origW;
        let newH = resizing.origH;
        let newX = resizing.origX;
        let newY = resizing.origY;

        if (resizing.handle.includes('e')) newW = resizing.origW + dx;
        if (resizing.handle.includes('w')) {
          newW = resizing.origW - dx;
          newX = resizing.origX + dx;
        }
        if (resizing.handle.includes('s')) newH = resizing.origH + dy;
        if (resizing.handle.includes('n')) {
          newH = resizing.origH - dy;
          newY = resizing.origY + dy;
        }

        if (snapEnabled) {
          newW = snapToGrid(Math.max(1, newW), settings.gridSize);
          newH = snapToGrid(Math.max(1, newH), settings.gridSize);
          newX = snapToGrid(newX, settings.gridSize);
          newY = snapToGrid(newY, settings.gridSize);
        }

        const shape = document.shapes.find((s) => s.id === resizing.shapeId);
        if (shape) {
          moveShape(documentId, resizing.shapeId, newX, newY);
          resizeShape(documentId, resizing.shapeId, newW, newH);
        }
      }

      if (tool === 'pencil' && pencilPoints.length > 0) {
        setPencilPoints((prev) => [...prev, point]);
      }

      if (activeGuide) {
        setGuides((prev) =>
          prev.map((g) =>
            g.id === activeGuide.id ? { ...g, position: point.y } : g
          )
        );
      }
    },
    [
      document,
      dragStart,
      drawingShape,
      dragging,
      resizing,
      tool,
      pencilPoints,
      activeGuide,
      snapEnabled,
      settings.gridSize,
      getCanvasPoint,
      moveShape,
      resizeShape,
      documentId,
    ]
  );

  const handleMouseUp = useCallback(() => {
    if (drawingShape && document) {
      if (drawingShape.width > 2 || drawingShape.height > 2) {
        addShape(documentId, drawingShape);
      }
      setDrawingShape(null);
      setDragStart(null);
    }
    setDragging(null);
    setResizing(null);
    setActiveGuide(null);

    if (tool === 'pencil' && pencilPoints.length > 1 && document) {
      const minX = Math.min(...pencilPoints.map((p) => p.x));
      const minY = Math.min(...pencilPoints.map((p) => p.y));
      const maxX = Math.max(...pencilPoints.map((p) => p.x));
      const maxY = Math.max(...pencilPoints.map((p) => p.y));
      const d = pencilPoints
        .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`)
        .join(' ');
      const newShape: SVGShape = {
        id: generateId(),
        type: 'path',
        name: 'Pencil Path',
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
        rotation: 0,
        fill: { type: 'none', color: 'transparent', opacity: 0 },
        stroke: {
          color: '#1e293b',
          width: 2,
          dashArray: '',
          cap: 'round',
          join: 'round',
        },
        opacity: 1,
        locked: false,
        visible: true,
        pathData: d,
      };
      addShape(documentId, newShape);
      setPencilPoints([]);
    }
  }, [drawingShape, document, tool, pencilPoints, addShape, documentId]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!document) return;

      if (e.key === 'v') setTool('select');
      if (e.key === 'r') setTool('rect');
      if (e.key === 'e') setTool('ellipse');
      if (e.key === 'l') setTool('line');
      if (e.key === 'p') setTool('path');
      if (e.key === 't') setTool('text');

      if (e.key === 'Escape') {
        setSelectedIds([]);
        setPenPoints([]);
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedIds.length > 0) {
          for (const id of selectedIds) {
            removeShape(documentId, id);
          }
          setSelectedIds([]);
        }
      }

      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && !e.shiftKey) {
          e.preventDefault();
          undo(documentId);
        }
        if (e.key === 'z' && e.shiftKey) {
          e.preventDefault();
          redo(documentId);
        }
        if (e.key === 'd') {
          e.preventDefault();
          if (selectedIds.length > 0) {
            duplicateShape(documentId, selectedIds[0]);
          }
        }
        if (e.key === 'a') {
          e.preventDefault();
          setSelectedIds(document.shapes.map((s) => s.id));
        }
        if (e.key === 'c') {
          const svgContent = exportAsSVG(document);
          copyToClipboard(svgContent).then(() => {
            addToast('SVG copied to clipboard', 'success');
          });
        }
      }

      if (e.key === ' ') {
        e.preventDefault();
        setIsPanning(true);
      }
    },
    [
      document,
      selectedIds,
      documentId,
      removeShape,
      undo,
      redo,
      duplicateShape,
      addToast,
    ]
  );

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === ' ') {
      setIsPanning(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prev) => Math.min(5, Math.max(0.1, prev * delta)));
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      if (!document) return;
      e.preventDefault();
      const symbolId = e.dataTransfer.getData('symbolId');
      if (symbolId) {
        const symbol = symbols.find((s) => s.id === symbolId);
        if (symbol) {
          const point = getCanvasPoint(e as unknown as React.MouseEvent);
          for (const shape of symbol.shapes) {
            const newShape: SVGShape = {
              ...shape,
              id: generateId(),
              x: point.x + shape.x,
              y: point.y + shape.y,
              symbolId: symbol.id,
            };
            addShape(documentId, newShape);
          }
        }
      }
    },
    [document, symbols, getCanvasPoint, addShape, documentId]
  );

  if (!document) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  const selectedShapes = document.shapes.filter((s) =>
    selectedIds.includes(s.id)
  );
  const firstSelected = selectedShapes[0];

  const tools: { id: Tool; icon: FC<{ className?: string }>; label: string }[] =
    [
      { id: 'select', icon: FiMousePointer, label: 'Select (V)' },
      { id: 'rect', icon: FiSquare, label: 'Rectangle (R)' },
      { id: 'ellipse', icon: FiCircle, label: 'Ellipse (E)' },
      { id: 'line', icon: FiMinus, label: 'Line (L)' },
      { id: 'path', icon: FiPenTool, label: 'Pen (P)' },
      { id: 'pencil', icon: FiEdit3, label: 'Pencil' },
      { id: 'text', icon: FiType, label: 'Text (T)' },
      { id: 'eyedropper', icon: FiDroplet, label: 'Eyedropper' },
    ];

  const cursorClass = isPanning
    ? 'canvas-cursor-grabbing'
    : tool === 'select'
      ? ''
      : 'canvas-cursor-crosshair';

  const visibleShapeIds = new Set(
    document.layers.filter((l) => l.visible).flatMap((l) => l.shapeIds)
  );

  return (
    <div className="flex h-screen flex-col">
      <header className="border-base-300 bg-base-100 flex items-center gap-2 border-b px-3 py-2">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="btn btn-ghost btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="mr-4 truncate text-sm font-semibold">
          {document.title}
        </h1>
        <div className="border-base-300 flex items-center gap-1 border-r pr-2">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTool(t.id)}
                className={`btn btn-sm btn-circle ${tool === t.id ? 'btn-primary' : 'btn-ghost'}`}
                title={t.label}>
                <Icon className="size-4" />
              </button>
            );
          })}
        </div>
        <div className="border-base-300 flex items-center gap-1 border-r px-2">
          <button
            type="button"
            onClick={() => undo(documentId)}
            className="btn btn-ghost btn-sm btn-circle"
            title="Undo (Ctrl+Z)">
            <FiRotateCcw className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => redo(documentId)}
            className="btn btn-ghost btn-sm btn-circle"
            title="Redo (Ctrl+Shift+Z)">
            <FiRotateCw className="size-4" />
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setShowGrid(!showGrid);
              updateSettings({ showGrid: !showGrid });
            }}
            className={`btn btn-sm btn-circle ${showGrid ? 'btn-primary' : 'btn-ghost'}`}
            title="Toggle Grid">
            <FiGrid className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setSnapEnabled(!snapEnabled)}
            className={`btn btn-sm btn-circle ${snapEnabled ? 'btn-primary' : 'btn-ghost'}`}
            title="Snap to Grid">
            <FiMaximize className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className={`btn btn-sm btn-circle ${previewMode ? 'btn-primary' : 'btn-ghost'}`}
            title="Preview Mode">
            {previewMode ? (
              <FiEyeOff className="size-4" />
            ) : (
              <FiEye className="size-4" />
            )}
          </button>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <span className="text-base-content/50 text-xs">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoom(1)}
            className="btn btn-ghost btn-xs">
            100%
          </button>
          <button
            type="button"
            onClick={() => {
              setZoom(1);
              setPanOffset({ x: 0, y: 0 });
            }}
            className="btn btn-ghost btn-xs">
            Fit
          </button>
        </div>
        <div className="border-base-300 flex items-center gap-1 border-l pl-2">
          <button
            type="button"
            onClick={() => {
              const svgContent = exportAsSVG(document);
              copyToClipboard(svgContent).then(() => {
                addToast('SVG copied to clipboard', 'success');
              });
            }}
            className="btn btn-ghost btn-sm btn-circle"
            title="Copy SVG">
            <FiCopy className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              const svgContent = exportAsSVG(document);
              downloadFile(svgContent, `${document.title}.svg`);
              addToast('Exported as SVG', 'success');
            }}
            className="btn btn-ghost btn-sm btn-circle"
            title="Export SVG">
            <FiDownload className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => router.push(`/edit/${documentId}/code`)}
            className="btn btn-ghost btn-sm btn-circle"
            title="SVG Code">
            <FiCode className="size-4" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {showRulers && !previewMode && (
          <div className="bg-base-200 flex">
            <div className="bg-base-300 h-6 w-6 shrink-0" />
            <div className="border-base-300 bg-base-200 h-6 overflow-hidden border-b">
              {Array.from({ length: 50 }, (_, i) => (
                <span
                  key={i}
                  className="text-base-content/30 inline-block w-20 text-center text-[8px]">
                  {i * 50}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-1 overflow-hidden">
          {showRulers && !previewMode && (
            <div className="bg-base-200 flex w-6 shrink-0 flex-col overflow-hidden border-r">
              {Array.from({ length: 50 }, (_, i) => (
                <span
                  key={i}
                  className="text-base-content/30 flex h-20 items-center justify-center text-[8px]">
                  {i * 50}
                </span>
              ))}
            </div>
          )}

          <div
            ref={containerRef}
            className={`bg-base-300 relative flex-1 overflow-hidden ${cursorClass}`}
            onMouseDown={(e) => {
              if (isPanning) {
                const startX = e.clientX - panOffset.x;
                const startY = e.clientY - panOffset.y;
                const handleMove = (ev: MouseEvent) => {
                  setPanOffset({
                    x: ev.clientX - startX,
                    y: ev.clientY - startY,
                  });
                };
                const handleUp = () => {
                  window.removeEventListener('mousemove', handleMove);
                  window.removeEventListener('mouseup', handleUp);
                };
                window.addEventListener('mousemove', handleMove);
                window.addEventListener('mouseup', handleUp);
              }
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}>
            <svg
              ref={svgRef}
              viewBox={`${-panOffset.x / zoom} ${-panOffset.y / zoom} ${document.width / zoom} ${document.height / zoom}`}
              className="h-full w-full"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onWheel={handleWheel}>
              <defs>
                {document.gradients.map((grad) => {
                  if (grad.type === 'linear') {
                    return (
                      <linearGradient
                        key={grad.id}
                        id={grad.id}
                        x1={grad.x1 ?? 0}
                        y1={grad.y1 ?? 0}
                        x2={grad.x2 ?? 1}
                        y2={grad.y2 ?? 1}>
                        {grad.stops.map((stop, i) => (
                          <stop
                            key={i}
                            offset={`${stop.offset * 100}%`}
                            stopColor={stop.color}
                            stopOpacity={stop.opacity}
                          />
                        ))}
                      </linearGradient>
                    );
                  }
                  return (
                    <radialGradient
                      key={grad.id}
                      id={grad.id}
                      cx={grad.cx ?? 0.5}
                      cy={grad.cy ?? 0.5}
                      r={grad.r ?? 0.5}>
                      {grad.stops.map((stop, i) => (
                        <stop
                          key={i}
                          offset={`${stop.offset * 100}%`}
                          stopColor={stop.color}
                          stopOpacity={stop.opacity}
                        />
                      ))}
                    </radialGradient>
                  );
                })}
              </defs>

              {showGrid && !previewMode && (
                <defs>
                  <pattern
                    id="grid"
                    width={settings.gridSize}
                    height={settings.gridSize}
                    patternUnits="userSpaceOnUse">
                    <circle
                      cx={settings.gridSize / 2}
                      cy={settings.gridSize / 2}
                      r="0.5"
                      fill="rgba(255,255,255,0.1)"
                    />
                  </pattern>
                </defs>
              )}
              {showGrid && !previewMode && (
                <rect
                  x={-10000}
                  y={-10000}
                  width={20000}
                  height={20000}
                  fill="url(#grid)"
                />
              )}

              <rect
                x={0}
                y={0}
                width={document.width}
                height={document.height}
                fill="#ffffff"
                stroke="#e2e8f0"
                strokeWidth={1 / zoom}
              />

              {document.shapes
                .filter((s) => visibleShapeIds.has(s.id) || previewMode)
                .map((shape) => {
                  const fill =
                    shape.fill.type === 'none'
                      ? 'none'
                      : shape.fill.type === 'gradient'
                        ? `url(#${shape.fill.gradientId})`
                        : shape.fill.color;
                  const stroke =
                    shape.stroke.width > 0 ? shape.stroke.color : 'none';

                  const transform = shape.rotation
                    ? `rotate(${shape.rotation} ${shape.x + shape.width / 2} ${shape.y + shape.height / 2})`
                    : '';

                  const isSelected = selectedIds.includes(shape.id);

                  const commonProps = {
                    fill,
                    stroke,
                    strokeWidth: shape.stroke.width,
                    opacity: shape.opacity,
                    transform: transform || undefined,
                    'data-shape-id': shape.id,
                  };

                  let el: React.ReactNode = null;

                  switch (shape.type) {
                    case 'rect':
                      el = (
                        <rect
                          key={shape.id}
                          x={shape.x}
                          y={shape.y}
                          width={shape.width}
                          height={shape.height}
                          rx={shape.rx ?? 0}
                          {...commonProps}
                        />
                      );
                      break;
                    case 'ellipse':
                      el = (
                        <ellipse
                          key={shape.id}
                          cx={shape.x + shape.width / 2}
                          cy={shape.y + shape.height / 2}
                          rx={shape.width / 2}
                          ry={shape.height / 2}
                          {...commonProps}
                        />
                      );
                      break;
                    case 'line':
                      el = (
                        <line
                          key={shape.id}
                          x1={shape.x}
                          y1={shape.y}
                          x2={shape.x + shape.width}
                          y2={shape.y + shape.height}
                          stroke={stroke}
                          strokeWidth={shape.stroke.width}
                          opacity={shape.opacity}
                          transform={transform || undefined}
                        />
                      );
                      break;
                    case 'path':
                      el = (
                        <path
                          key={shape.id}
                          d={shape.pathData ?? ''}
                          {...commonProps}
                        />
                      );
                      break;
                    case 'text':
                      el = (
                        <text
                          key={shape.id}
                          x={shape.x}
                          y={shape.y + shape.height}
                          fontFamily={shape.fontFamily ?? 'Arial'}
                          fontSize={shape.fontSize ?? 16}
                          fontWeight={shape.fontWeight ?? 'normal'}
                          fontStyle={shape.fontStyle ?? 'normal'}
                          textDecoration={shape.textDecoration ?? 'none'}
                          textAnchor={
                            (shape.textAlign ?? 'start') as
                              'start' | 'middle' | 'end'
                          }
                          fill={fill}
                          opacity={shape.opacity}
                          transform={transform || undefined}>
                          {shape.text ?? ''}
                        </text>
                      );
                      break;
                    case 'polygon':
                      if (shape.points && shape.points.length > 0) {
                        const pts = shape.points
                          .map((p) => `${p.x},${p.y}`)
                          .join(' ');
                        el = (
                          <polygon
                            key={shape.id}
                            points={pts}
                            {...commonProps}
                          />
                        );
                      }
                      break;
                    case 'star':
                      el = (
                        <polygon key={shape.id} points="" {...commonProps} />
                      );
                      break;
                  }

                  if (!previewMode && isSelected && el) {
                    return (
                      <g key={shape.id}>
                        {el}
                        <rect
                          x={shape.x - 2}
                          y={shape.y - 2}
                          width={shape.width + 4}
                          height={shape.height + 4}
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth={1.5 / zoom}
                          strokeDasharray={`${4 / zoom}`}
                        />
                        {[
                          { handle: 'nw', cx: shape.x, cy: shape.y },
                          {
                            handle: 'ne',
                            cx: shape.x + shape.width,
                            cy: shape.y,
                          },
                          {
                            handle: 'se',
                            cx: shape.x + shape.width,
                            cy: shape.y + shape.height,
                          },
                          {
                            handle: 'sw',
                            cx: shape.x,
                            cy: shape.y + shape.height,
                          },
                        ].map((h) => (
                          <rect
                            key={h.handle}
                            x={h.cx - 4 / zoom}
                            y={h.cy - 4 / zoom}
                            width={8 / zoom}
                            height={8 / zoom}
                            fill="#3b82f6"
                            stroke="#ffffff"
                            strokeWidth={1 / zoom}
                            className="cursor-pointer"
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              setResizing({
                                handle: h.handle,
                                shapeId: shape.id,
                                startX: getCanvasPoint(e).x,
                                startY: getCanvasPoint(e).y,
                                origX: shape.x,
                                origY: shape.y,
                                origW: shape.width,
                                origH: shape.height,
                              });
                            }}
                          />
                        ))}
                      </g>
                    );
                  }

                  return el;
                })}

              {drawingShape && (
                <rect
                  x={drawingShape.x}
                  y={drawingShape.y}
                  width={drawingShape.width}
                  height={drawingShape.height}
                  fill="rgba(59, 130, 246, 0.2)"
                  stroke="#3b82f6"
                  strokeWidth={1.5 / zoom}
                  strokeDasharray={`${4 / zoom}`}
                />
              )}

              {penPoints.length > 0 && (
                <g>
                  <polyline
                    points={penPoints.map((p) => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth={1.5 / zoom}
                    strokeDasharray={`${4 / zoom}`}
                  />
                  {penPoints.map((p, i) => (
                    <circle
                      key={i}
                      cx={p.x}
                      cy={p.y}
                      r={4 / zoom}
                      fill={i === 0 ? '#ef4444' : '#3b82f6'}
                      stroke="#ffffff"
                      strokeWidth={1 / zoom}
                      className="cursor-pointer"
                      onClick={(e) => {
                        if (i === 0 && penPoints.length > 2) {
                          const d =
                            penPoints
                              .map(
                                (pp, idx) =>
                                  `${idx === 0 ? 'M' : 'L'}${pp.x} ${pp.y}`
                              )
                              .join(' ') + ' Z';
                          const minX = Math.min(...penPoints.map((pp) => pp.x));
                          const minY = Math.min(...penPoints.map((pp) => pp.y));
                          const maxX = Math.max(...penPoints.map((pp) => pp.x));
                          const maxY = Math.max(...penPoints.map((pp) => pp.y));
                          addShape(documentId, {
                            id: generateId(),
                            type: 'path',
                            name: 'Pen Path',
                            x: minX,
                            y: minY,
                            width: maxX - minX,
                            height: maxY - minY,
                            rotation: 0,
                            fill: {
                              type: 'solid',
                              color: '#3b82f6',
                              opacity: 1,
                            },
                            stroke: {
                              color: '#1e293b',
                              width: 2,
                              dashArray: '',
                              cap: 'round',
                              join: 'round',
                            },
                            opacity: 1,
                            locked: false,
                            visible: true,
                            pathData: d,
                          });
                          setPenPoints([]);
                        }
                      }}
                    />
                  ))}
                </g>
              )}
            </svg>
          </div>

          {!previewMode && (
            <div className="bg-base-100 border-base-300 flex w-64 flex-col border-l">
              <div className="border-base-300 flex border-b">
                <button
                  type="button"
                  onClick={() => setSidePanel('layers')}
                  className={`flex-1 p-2 text-xs font-semibold ${sidePanel === 'layers' ? 'bg-base-200 border-primary border-b-2' : ''}`}>
                  <FiLayers className="mr-1 inline size-3" />
                  Layers
                </button>
                <button
                  type="button"
                  onClick={() => setSidePanel('properties')}
                  className={`flex-1 p-2 text-xs font-semibold ${sidePanel === 'properties' ? 'bg-base-200 border-primary border-b-2' : ''}`}>
                  <FiSettings className="mr-1 inline size-3" />
                  Props
                </button>
                <button
                  type="button"
                  onClick={() => setSidePanel('symbols')}
                  className={`flex-1 p-2 text-xs font-semibold ${sidePanel === 'symbols' ? 'bg-base-200 border-primary border-b-2' : ''}`}>
                  <FiStar className="mr-1 inline size-3" />
                  Symbols
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                {sidePanel === 'layers' && (
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-base-content/50 text-xs font-semibold uppercase">
                        Layers
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          addLayer(
                            documentId,
                            `Layer ${document.layers.length + 1}`
                          )
                        }
                        className="btn btn-ghost btn-xs btn-circle">
                        <FiPlus className="size-3" />
                      </button>
                    </div>
                    {[...document.layers].reverse().map((layer) => (
                      <div
                        key={layer.id}
                        className="bg-base-200 mb-1 flex items-center gap-1 rounded p-1.5 text-xs">
                        <button
                          type="button"
                          onClick={() =>
                            toggleLayerVisibility(documentId, layer.id)
                          }
                          className="btn btn-ghost btn-xs btn-circle">
                          {layer.visible ? (
                            <FiEye className="size-3" />
                          ) : (
                            <FiEyeOff className="text-base-content/30 size-3" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleLayerLock(documentId, layer.id)}
                          className="btn btn-ghost btn-xs btn-circle">
                          {layer.locked ? (
                            <FiLock className="text-warning size-3" />
                          ) : (
                            <FiUnlock className="size-3" />
                          )}
                        </button>
                        <span className="flex-1 truncate">{layer.name}</span>
                        <span className="text-base-content/30 text-[10px]">
                          {layer.shapeIds.length}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeLayer(documentId, layer.id)}
                          className="btn btn-ghost btn-xs btn-circle text-error">
                          <FiTrash2 className="size-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {sidePanel === 'properties' && (
                  <div className="space-y-3">
                    {firstSelected ? (
                      <>
                        <div>
                          <span className="text-base-content/50 text-xs font-semibold uppercase">
                            Shape
                          </span>
                          <input
                            type="text"
                            value={firstSelected.name}
                            onChange={(e) =>
                              updateShape(documentId, {
                                ...firstSelected,
                                name: e.target.value,
                              })
                            }
                            className="input input-sm input-bordered mt-1 w-full"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-base-content/50 text-xs">
                              X
                            </label>
                            <input
                              type="number"
                              value={Math.round(firstSelected.x)}
                              onChange={(e) =>
                                moveShape(
                                  documentId,
                                  firstSelected.id,
                                  Number(e.target.value),
                                  firstSelected.y
                                )
                              }
                              className="input input-sm input-bordered w-full"
                            />
                          </div>
                          <div>
                            <label className="text-base-content/50 text-xs">
                              Y
                            </label>
                            <input
                              type="number"
                              value={Math.round(firstSelected.y)}
                              onChange={(e) =>
                                moveShape(
                                  documentId,
                                  firstSelected.id,
                                  firstSelected.x,
                                  Number(e.target.value)
                                )
                              }
                              className="input input-sm input-bordered w-full"
                            />
                          </div>
                          <div>
                            <label className="text-base-content/50 text-xs">
                              Width
                            </label>
                            <input
                              type="number"
                              value={Math.round(firstSelected.width)}
                              onChange={(e) =>
                                resizeShape(
                                  documentId,
                                  firstSelected.id,
                                  Number(e.target.value),
                                  firstSelected.height
                                )
                              }
                              className="input input-sm input-bordered w-full"
                            />
                          </div>
                          <div>
                            <label className="text-base-content/50 text-xs">
                              Height
                            </label>
                            <input
                              type="number"
                              value={Math.round(firstSelected.height)}
                              onChange={(e) =>
                                resizeShape(
                                  documentId,
                                  firstSelected.id,
                                  firstSelected.width,
                                  Number(e.target.value)
                                )
                              }
                              className="input input-sm input-bordered w-full"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-base-content/50 text-xs">
                            Rotation
                          </label>
                          <input
                            type="number"
                            value={firstSelected.rotation}
                            onChange={(e) =>
                              updateShape(documentId, {
                                ...firstSelected,
                                rotation: Number(e.target.value),
                              })
                            }
                            className="input input-sm input-bordered w-full"
                          />
                        </div>
                        <div>
                          <label className="text-base-content/50 text-xs">
                            Opacity
                          </label>
                          <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={firstSelected.opacity}
                            onChange={(e) =>
                              updateShape(documentId, {
                                ...firstSelected,
                                opacity: Number(e.target.value),
                              })
                            }
                            className="range range-sm"
                          />
                        </div>
                        <div>
                          <label className="text-base-content/50 text-xs">
                            Fill Color
                          </label>
                          <div className="mt-1 flex items-center gap-2">
                            <input
                              type="color"
                              value={
                                firstSelected.fill.type === 'solid'
                                  ? firstSelected.fill.color
                                  : '#000000'
                              }
                              onChange={(e) =>
                                updateShape(documentId, {
                                  ...firstSelected,
                                  fill: {
                                    ...firstSelected.fill,
                                    type: 'solid',
                                    color: e.target.value,
                                  } as SVGFill,
                                })
                              }
                              className="size-8 cursor-pointer"
                            />
                            <input
                              type="text"
                              value={
                                firstSelected.fill.type === 'solid'
                                  ? firstSelected.fill.color
                                  : ''
                              }
                              onChange={(e) =>
                                updateShape(documentId, {
                                  ...firstSelected,
                                  fill: {
                                    ...firstSelected.fill,
                                    type: 'solid',
                                    color: e.target.value,
                                  } as SVGFill,
                                })
                              }
                              className="input input-sm input-bordered flex-1"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                updateShape(documentId, {
                                  ...firstSelected,
                                  fill: {
                                    ...firstSelected.fill,
                                    type: 'none',
                                    color: 'transparent',
                                  },
                                })
                              }
                              className="btn btn-ghost btn-xs"
                              title="No Fill">
                              <FiX className="size-3" />
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="text-base-content/50 text-xs">
                            Stroke Color
                          </label>
                          <div className="mt-1 flex items-center gap-2">
                            <input
                              type="color"
                              value={firstSelected.stroke.color}
                              onChange={(e) =>
                                updateShape(documentId, {
                                  ...firstSelected,
                                  stroke: {
                                    ...firstSelected.stroke,
                                    color: e.target.value,
                                  } as SVGStroke,
                                })
                              }
                              className="size-8 cursor-pointer"
                            />
                            <input
                              type="text"
                              value={firstSelected.stroke.color}
                              onChange={(e) =>
                                updateShape(documentId, {
                                  ...firstSelected,
                                  stroke: {
                                    ...firstSelected.stroke,
                                    color: e.target.value,
                                  } as SVGStroke,
                                })
                              }
                              className="input input-sm input-bordered flex-1"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-base-content/50 text-xs">
                            Stroke Width
                          </label>
                          <input
                            type="number"
                            min={0}
                            max={20}
                            value={firstSelected.stroke.width}
                            onChange={(e) =>
                              updateShape(documentId, {
                                ...firstSelected,
                                stroke: {
                                  ...firstSelected.stroke,
                                  width: Number(e.target.value),
                                } as SVGStroke,
                              })
                            }
                            className="input input-sm input-bordered w-full"
                          />
                        </div>
                        <div>
                          <label className="text-base-content/50 text-xs">
                            Stroke Cap
                          </label>
                          <select
                            value={firstSelected.stroke.cap}
                            onChange={(e) =>
                              updateShape(documentId, {
                                ...firstSelected,
                                stroke: {
                                  ...firstSelected.stroke,
                                  cap: e.target.value as SVGStroke['cap'],
                                } as SVGStroke,
                              })
                            }
                            className="select select-sm select-bordered w-full">
                            <option value="butt">Butt</option>
                            <option value="round">Round</option>
                            <option value="square">Square</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-base-content/50 text-xs">
                            Stroke Join
                          </label>
                          <select
                            value={firstSelected.stroke.join}
                            onChange={(e) =>
                              updateShape(documentId, {
                                ...firstSelected,
                                stroke: {
                                  ...firstSelected.stroke,
                                  join: e.target.value as SVGStroke['join'],
                                } as SVGStroke,
                              })
                            }
                            className="select select-sm select-bordered w-full">
                            <option value="miter">Miter</option>
                            <option value="round">Round</option>
                            <option value="bevel">Bevel</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-base-content/50 text-xs">
                            Stroke Dash
                          </label>
                          <input
                            type="text"
                            value={firstSelected.stroke.dashArray}
                            onChange={(e) =>
                              updateShape(documentId, {
                                ...firstSelected,
                                stroke: {
                                  ...firstSelected.stroke,
                                  dashArray: e.target.value,
                                } as SVGStroke,
                              })
                            }
                            placeholder="e.g. 5 5"
                            className="input input-sm input-bordered w-full"
                          />
                        </div>
                        {firstSelected.type === 'rect' && (
                          <div>
                            <label className="text-base-content/50 text-xs">
                              Corner Radius
                            </label>
                            <input
                              type="number"
                              min={0}
                              value={firstSelected.rx ?? 0}
                              onChange={(e) =>
                                updateShape(documentId, {
                                  ...firstSelected,
                                  rx: Number(e.target.value),
                                })
                              }
                              className="input input-sm input-bordered w-full"
                            />
                          </div>
                        )}
                        {firstSelected.type === 'text' && (
                          <>
                            <div>
                              <label className="text-base-content/50 text-xs">
                                Text
                              </label>
                              <input
                                type="text"
                                value={firstSelected.text ?? ''}
                                onChange={(e) =>
                                  updateShape(documentId, {
                                    ...firstSelected,
                                    text: e.target.value,
                                  })
                                }
                                className="input input-sm input-bordered w-full"
                              />
                            </div>
                            <div>
                              <label className="text-base-content/50 text-xs">
                                Font
                              </label>
                              <select
                                value={firstSelected.fontFamily ?? 'Arial'}
                                onChange={(e) =>
                                  updateShape(documentId, {
                                    ...firstSelected,
                                    fontFamily: e.target.value,
                                  })
                                }
                                className="select select-sm select-bordered w-full">
                                {[
                                  'Arial',
                                  'Helvetica',
                                  'Georgia',
                                  'Courier',
                                  'Verdana',
                                  'Impact',
                                  'Comic Sans MS',
                                ].map((f) => (
                                  <option key={f} value={f}>
                                    {f}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="text-base-content/50 text-xs">
                                Font Size
                              </label>
                              <input
                                type="number"
                                min={8}
                                max={200}
                                value={firstSelected.fontSize ?? 16}
                                onChange={(e) =>
                                  updateShape(documentId, {
                                    ...firstSelected,
                                    fontSize: Number(e.target.value),
                                  })
                                }
                                className="input input-sm input-bordered w-full"
                              />
                            </div>
                          </>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            duplicateShape(documentId, firstSelected.id);
                            addToast('Shape duplicated', 'success');
                          }}
                          className="btn btn-outline btn-sm w-full">
                          <FiCopy className="mr-1 size-3" />
                          Duplicate
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            removeShape(documentId, firstSelected.id);
                            setSelectedIds([]);
                            addToast('Shape deleted', 'success');
                          }}
                          className="btn btn-outline btn-error btn-sm w-full">
                          <FiTrash2 className="mr-1 size-3" />
                          Delete
                        </button>
                      </>
                    ) : (
                      <div className="text-base-content/30 py-8 text-center text-xs">
                        Select a shape to edit properties
                      </div>
                    )}
                  </div>
                )}

                {sidePanel === 'symbols' && (
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-base-content/50 text-xs font-semibold uppercase">
                        Symbol Library
                      </span>
                    </div>
                    {symbols.length === 0 ? (
                      <div className="text-base-content/30 py-8 text-center text-xs">
                        No symbols yet. Create one from a selection.
                      </div>
                    ) : (
                      symbols.map((sym) => (
                        <div
                          key={sym.id}
                          className="bg-base-200 mb-1 flex items-center gap-2 rounded p-2">
                          <svg
                            viewBox={`0 0 ${sym.width} ${sym.height}`}
                            className="size-8">
                            {sym.shapes.map((s) => {
                              const fill =
                                s.fill.type === 'none' ? 'none' : s.fill.color;
                              switch (s.type) {
                                case 'rect':
                                  return (
                                    <rect
                                      key={s.id}
                                      x={s.x}
                                      y={s.y}
                                      width={s.width}
                                      height={s.height}
                                      fill={fill}
                                    />
                                  );
                                case 'ellipse':
                                  return (
                                    <ellipse
                                      key={s.id}
                                      cx={s.x + s.width / 2}
                                      cy={s.y + s.height / 2}
                                      rx={s.width / 2}
                                      ry={s.height / 2}
                                      fill={fill}
                                    />
                                  );
                                case 'path':
                                  return (
                                    <path
                                      key={s.id}
                                      d={s.pathData ?? ''}
                                      fill={fill}
                                    />
                                  );
                                default:
                                  return null;
                              }
                            })}
                          </svg>
                          <span className="flex-1 text-xs">{sym.name}</span>
                          <button
                            type="button"
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData('symbolId', sym.id);
                            }}
                            className="btn btn-ghost btn-xs">
                            Drag
                          </button>
                        </div>
                      ))
                    )}
                    {selectedIds.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const shapes = document.shapes.filter((s) =>
                            selectedIds.includes(s.id)
                          );
                          if (shapes.length > 0) {
                            const minX = Math.min(...shapes.map((s) => s.x));
                            const minY = Math.min(...shapes.map((s) => s.y));
                            const maxX = Math.max(
                              ...shapes.map((s) => s.x + s.width)
                            );
                            const maxY = Math.max(
                              ...shapes.map((s) => s.y + s.height)
                            );
                            addSymbol({
                              id: generateId(),
                              name: `Symbol ${symbols.length + 1}`,
                              shapes: shapes.map((s) => ({
                                ...s,
                                x: s.x - minX,
                                y: s.y - minY,
                              })),
                              width: maxX - minX,
                              height: maxY - minY,
                              createdAt: Date.now(),
                            });
                            addToast('Symbol created', 'success');
                          }
                        }}
                        className="btn btn-outline btn-sm mt-2 w-full">
                        Create Symbol from Selection
                      </button>
                    )}
                  </div>
                )}
              </div>

              {tool === 'text' && (
                <div className="border-base-300 border-t p-2">
                  <label className="text-base-content/50 text-xs">
                    Text Content
                  </label>
                  <input
                    type="text"
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    className="input input-sm input-bordered mt-1 w-full"
                  />
                  <label className="text-base-content/50 mt-1 text-xs">
                    Font
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="select select-sm select-bordered mt-1 w-full">
                    {[
                      'Arial',
                      'Helvetica',
                      'Georgia',
                      'Courier',
                      'Verdana',
                      'Impact',
                      'Comic Sans MS',
                    ].map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                  <label className="text-base-content/50 mt-1 text-xs">
                    Size
                  </label>
                  <input
                    type="number"
                    min={8}
                    max={200}
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="input input-sm input-bordered mt-1 w-full"
                  />
                </div>
              )}

              <div className="border-base-300 border-t p-2">
                <div className="text-base-content/50 text-xs">
                  {document.shapes.length} shape
                  {document.shapes.length !== 1 ? 's' : ''} &middot;{' '}
                  {selectedIds.length > 0
                    ? `${selectedIds.length} selected`
                    : 'No selection'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EditorPage: FC = () => (
  <Providers>
    <EditorContent />
  </Providers>
);

export default EditorPage;

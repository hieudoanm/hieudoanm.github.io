'use client';

import {
  type FC,
  Suspense,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { PageTransition } from '@/components/atoms/PageTransition';
import type {
  SVGShape,
  SVGStroke,
  Tool,
  SVGGradient,
  SVGGradientStop,
  SVGLayer,
  Guide,
  SVGSymbol,
} from '@/types';
import {
  generateId,
  snapToGrid,
  getAlignment,
  applyAlignment,
  alignShapes,
  distributeShapes,
  moveLayer,
  exportAsSVG,
  downloadFile,
  downloadBlob,
  copyToClipboard,
  rasterizeSVG,
  parsePath,
  serializePath,
  mockBooleanUnion,
  wrapText,
  mixHexColors,
  type ParsedPath,
  type AlignMode,
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
  FiCheck,
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
  FiFolder,
  FiFolderPlus,
  FiChevronRight,
} from 'react-icons/fi';

const MAX_RECENT_COLORS = 8;

const SWATCH_PALETTE = [
  '#ffffff',
  '#1e293b',
  '#3b82f6',
  '#22c55e',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#0ea5e9',
  '#84cc16',
  '#f97316',
  '#a855f7',
  '#14b8a6',
  '#f43f5e',
  '#64748b',
  '#000000',
];

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const EditorContent: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const documentId = searchParams.get('id') as string;
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
    updateSymbol,
    removeSymbol,
    updateSettings,
    addGradient,
    updateGradient,
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
    group: { id: string; x: number; y: number }[];
  } | null>(null);
  const [pendingDrag, setPendingDrag] = useState<{
    shapeId: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const [dragLayerId, setDragLayerId] = useState<string | null>(null);
  const [dropLayerId, setDropLayerId] = useState<string | null>(null);
  const [renamingLayerId, setRenamingLayerId] = useState<string | null>(null);
  const [renamingName, setRenamingName] = useState('');
  const [collapsedFolders, setCollapsedFolders] = useState<string[]>([]);
  const [alignGuides, setAlignGuides] = useState<
    { orientation: 'horizontal' | 'vertical'; position: number }[]
  >([]);
  const [sidePanel, setSidePanel] = useState<
    'layers' | 'properties' | 'symbols' | null
  >('layers');
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [gradientDrag, setGradientDrag] = useState<{
    shapeId: string;
    gradientId: string;
    handle: string;
  } | null>(null);
  const [draggedGradient, setDraggedGradient] = useState<SVGGradient | null>(
    null
  );
  const [textValue, setTextValue] = useState('Text');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState(24);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.2);
  const [penPoints, setPenPoints] = useState<{ x: number; y: number }[]>([]);
  const [pencilPoints, setPencilPoints] = useState<{ x: number; y: number }[]>(
    []
  );
  const [guides, setGuides] = useState<Guide[]>([]);
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);
  const [editingPathId, setEditingPathId] = useState<string | null>(null);
  const [editingPath, setEditingPath] = useState<ParsedPath | null>(null);
  const editingPathRef = useRef<ParsedPath | null>(null);
  const [editingSymbol, setEditingSymbol] = useState<SVGSymbol | null>(null);
  const editingBackupRef = useRef<{
    shapes: SVGShape[];
    layers: SVGLayer[];
  } | null>(null);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [selectionOnlyExport, setSelectionOnlyExport] = useState(false);

  useEffect(() => {
    editingPathRef.current = editingPath;
  }, [editingPath]);

  useEffect(() => {
    if (document) {
      setShowGrid(settings.showGrid);
      setShowRulers(settings.showRulers);
      setSnapEnabled(settings.snapToGrid);
    }
  }, [document, settings]);

  const visibleShapeIds = new Set(
    (document?.layers ?? []).filter((l) => l.visible).flatMap((l) => l.shapeIds)
  );

  const getCanvasPoint = useCallback(
    (clientX: number, clientY: number): { x: number; y: number } => {
      const svg = svgRef.current;
      if (!svg) return { x: 0, y: 0 };
      const rect = svg.getBoundingClientRect();
      const x = (clientX - rect.left) / zoom - panOffset.x;
      const y = (clientY - rect.top) / zoom - panOffset.y;
      return { x, y };
    },
    [zoom, panOffset]
  );

  const dragGuide = (
    orientation: Guide['orientation'],
    guideId: string,
    e: React.MouseEvent
  ) => {
    if (!document) return;
    e.preventDefault();
    const max = orientation === 'vertical' ? document.width : document.height;
    const updatePosition = (ev: MouseEvent) => {
      const p = getCanvasPoint(ev.clientX, ev.clientY);
      const raw = orientation === 'vertical' ? p.x : p.y;
      const position = Math.max(0, Math.min(max, raw));
      setGuides((prev) =>
        prev.map((g) => (g.id === guideId ? { ...g, position } : g))
      );
      setActiveGuide({ id: guideId, orientation, position });
    };
    const finish = (ev: MouseEvent) => {
      const p = getCanvasPoint(ev.clientX, ev.clientY);
      const raw = orientation === 'vertical' ? p.x : p.y;
      if (raw < 0 || raw > max) {
        setGuides((prev) => prev.filter((g) => g.id !== guideId));
      }
      setActiveGuide(null);
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseup', finish);
    };
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseup', finish);
    updatePosition(e.nativeEvent);
  };

  const startGuideCreate = (
    orientation: Guide['orientation'],
    e: React.MouseEvent
  ) => {
    if (!document || previewMode) return;
    const id = generateId();
    setGuides((prev) => [...prev, { id, orientation, position: 0 }]);
    dragGuide(orientation, id, e);
  };

  const startGuideMove = (guide: Guide, e: React.MouseEvent) => {
    if (!document || previewMode) return;
    e.stopPropagation();
    dragGuide(guide.orientation, guide.id, e);
  };

  const removeGuide = (id: string) =>
    setGuides((prev) => prev.filter((g) => g.id !== id));

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!document) return;
      setAlignGuides([]);
      setPendingDrag(null);
      setEditingPathId(null);
      setEditingPath(null);
      const point = getCanvasPoint(e.clientX, e.clientY);

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
            setPendingDrag({
              shapeId: clickedShape.id,
              startX: point.x,
              startY: point.y,
              origX: clickedShape.x,
              origY: clickedShape.y,
            });
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
          width: 0,
          height: 0,
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
          letterSpacing,
          lineHeight,
        };
        setDrawingShape(newShape);
        setDragStart(point);
      } else if (tool === 'path') {
        setPenPoints((prev) => [...prev, point]);
      } else if (tool === 'pencil') {
        setPencilPoints([point]);
      } else if (tool === 'eyedropper') {
        const clicked = [...document.shapes]
          .reverse()
          .find(
            (s) =>
              s.visible &&
              point.x >= s.x &&
              point.x <= s.x + s.width &&
              point.y >= s.y &&
              point.y <= s.y + s.height
          );
        if (!clicked) return;
        const sampled =
          clicked.fill.type === 'solid'
            ? clicked.fill.color
            : clicked.fill.type === 'gradient'
              ? (document.gradients.find(
                  (g) => g.id === clicked.fill.gradientId
                )?.stops[0]?.color ?? null)
              : null;
        if (sampled) {
          setRecentColors((prev) =>
            [sampled, ...prev.filter((c) => c !== sampled)].slice(
              0,
              MAX_RECENT_COLORS
            )
          );
          const target = selectedIds.length
            ? document.shapes.find((s) => s.id === selectedIds[0])
            : null;
          if (target) {
            updateShape(documentId, {
              ...target,
              fill: { ...target.fill, type: 'solid', color: sampled },
            });
          } else {
            setSelectedIds([clicked.id]);
          }
        } else {
          setSelectedIds([clicked.id]);
        }
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
      letterSpacing,
      lineHeight,
      addShape,
      documentId,
      updateShape,
      selectedIds,
    ]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!document) return;
      const point = getCanvasPoint(e.clientX, e.clientY);

      if (pendingDrag) {
        const dx = point.x - pendingDrag.startX;
        const dy = point.y - pendingDrag.startY;
        if (Math.hypot(dx, dy) > 3) {
          saveHistory(documentId, 'move shape');
          const shape = document.shapes.find(
            (s) => s.id === pendingDrag.shapeId
          );
          const group = shape?.groupId
            ? document.shapes
                .filter((s) => s.groupId === shape.groupId)
                .map((s) => ({ id: s.id, x: s.x, y: s.y }))
            : [];
          setDragging({ ...pendingDrag, group });
          setPendingDrag(null);
        }
      }

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
        const shape = document.shapes.find((s) => s.id === dragging.shapeId);
        const others = document.shapes.filter(
          (s) => s.id !== dragging.shapeId && visibleShapeIds.has(s.id)
        );
        const bounds = shape
          ? { x: newX, y: newY, width: shape.width, height: shape.height }
          : { x: newX, y: newY, width: 0, height: 0 };
        const alignment = getAlignment(bounds, others);
        const snapped = applyAlignment(bounds, alignment);
        setAlignGuides(
          [
            alignment.vertical
              ? {
                  orientation: 'vertical',
                  position: alignment.vertical.position,
                }
              : null,
            alignment.horizontal
              ? {
                  orientation: 'horizontal',
                  position: alignment.horizontal.position,
                }
              : null,
          ].filter(
            (
              g
            ): g is {
              orientation: 'vertical' | 'horizontal';
              position: number;
            } => g !== null
          )
        );
        moveShape(documentId, dragging.shapeId, snapped.x, snapped.y);
        const gdx = snapped.x - dragging.origX;
        const gdy = snapped.y - dragging.origY;
        for (const member of dragging.group) {
          if (member.id !== dragging.shapeId) {
            moveShape(documentId, member.id, member.x + gdx, member.y + gdy);
          }
        }
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
          const others = document.shapes.filter(
            (s) => s.id !== resizing.shapeId && visibleShapeIds.has(s.id)
          );
          const alignment = getAlignment(
            { x: newX, y: newY, width: newW, height: newH },
            others
          );
          const snapped = applyAlignment(
            { x: newX, y: newY, width: newW, height: newH },
            alignment,
            resizing.handle
          );
          newX = snapped.x;
          newY = snapped.y;
          newW = Math.max(1, snapped.width);
          newH = Math.max(1, snapped.height);
          const guides: {
            orientation: 'vertical' | 'horizontal';
            position: number;
          }[] = [];
          if (alignment.vertical) {
            guides.push({
              orientation: 'vertical',
              position: alignment.vertical.position,
            });
          }
          if (alignment.horizontal) {
            guides.push({
              orientation: 'horizontal',
              position: alignment.horizontal.position,
            });
          }
          setAlignGuides(guides);
          moveShape(documentId, resizing.shapeId, newX, newY);
          resizeShape(documentId, resizing.shapeId, newW, newH);
        }
      }

      if (tool === 'pencil' && pencilPoints.length > 0) {
        setPencilPoints((prev) => [...prev, point]);
      }
    },
    [
      document,
      dragStart,
      drawingShape,
      pendingDrag,
      dragging,
      resizing,
      tool,
      pencilPoints,
      snapEnabled,
      settings.gridSize,
      visibleShapeIds,
      saveHistory,
      getCanvasPoint,
      moveShape,
      resizeShape,
      documentId,
    ]
  );

  const handleMouseUp = useCallback(() => {
    if (drawingShape && document) {
      const isText = drawingShape.type === 'text';
      const isLargeEnough = drawingShape.width > 2 || drawingShape.height > 2;
      if (isText) {
        if (isLargeEnough) {
          addShape(documentId, { ...drawingShape, textArea: true });
        } else {
          addShape(documentId, {
            ...drawingShape,
            width: 200,
            height: fontSize,
            textArea: false,
          });
        }
      } else if (isLargeEnough) {
        addShape(documentId, drawingShape);
      }
      setDrawingShape(null);
      setDragStart(null);
    }
    setDragging(null);
    setPendingDrag(null);
    setResizing(null);
    setActiveGuide(null);
    setAlignGuides([]);

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
  }, [
    drawingShape,
    document,
    tool,
    pencilPoints,
    addShape,
    documentId,
    fontSize,
  ]);

  const groupSelection = async () => {
    if (!document) return;
    const targets = document.shapes.filter((s) => selectedIds.includes(s.id));
    if (targets.length < 2) return;
    await saveHistory(documentId, 'group shapes');
    const groupId = generateId();
    const shapes = document.shapes.map((s) =>
      selectedIds.includes(s.id) ? { ...s, groupId } : s
    );
    await updateDocument({ ...document, shapes });
    addToast(`Grouped ${targets.length} shapes`, 'success');
  };

  const ungroupSelection = async () => {
    if (!document) return;
    const targets = document.shapes.filter(
      (s) => selectedIds.includes(s.id) && s.groupId
    );
    if (targets.length === 0) return;
    await saveHistory(documentId, 'ungroup shapes');
    const shapes = document.shapes.map((s) =>
      selectedIds.includes(s.id) ? { ...s, groupId: undefined } : s
    );
    await updateDocument({ ...document, shapes });
    addToast('Ungrouped shapes', 'success');
  };

  const arrangeSelection = async (
    mode: 'front' | 'forward' | 'backward' | 'back'
  ) => {
    if (!document) return;
    const selected = document.shapes.filter((s) => selectedIds.includes(s.id));
    if (selected.length === 0) return;
    const groupIds = new Set(
      selected.map((s) => s.groupId).filter((g): g is string => Boolean(g))
    );
    const ids = new Set(
      document.shapes
        .filter(
          (s) =>
            selectedIds.includes(s.id) || (s.groupId && groupIds.has(s.groupId))
        )
        .map((s) => s.id)
    );
    await saveHistory(documentId, 'arrange shapes');
    const order = document.shapes.map((s) => s.id);
    if (mode === 'front') {
      for (let i = 0; i < order.length; i++) {
        if (ids.has(order[i])) {
          const [id] = order.splice(i, 1);
          order.push(id);
        }
      }
    } else if (mode === 'back') {
      for (let i = order.length - 1; i >= 0; i--) {
        if (ids.has(order[i])) {
          const [id] = order.splice(i, 1);
          order.unshift(id);
        }
      }
    } else if (mode === 'forward') {
      for (let i = order.length - 1; i >= 0; i--) {
        if (
          ids.has(order[i]) &&
          i + 1 < order.length &&
          !ids.has(order[i + 1])
        ) {
          [order[i], order[i + 1]] = [order[i + 1], order[i]];
          break;
        }
      }
    } else {
      for (let i = 0; i < order.length; i++) {
        if (ids.has(order[i]) && i > 0 && !ids.has(order[i - 1])) {
          [order[i], order[i - 1]] = [order[i - 1], order[i]];
          break;
        }
      }
    }
    const shapes = order
      .map((id) => document.shapes.find((s) => s.id === id))
      .filter((s): s is SVGShape => Boolean(s));
    await updateDocument({ ...document, shapes });
    addToast(`Arranged: ${mode}`, 'success');
  };

  const applyAlign = async (mode: AlignMode) => {
    if (!document) return;
    const targets = document.shapes.filter((s) => selectedIds.includes(s.id));
    if (targets.length < 2) return;
    await saveHistory(documentId, `align ${mode}`);
    const aligned = alignShapes(targets, mode);
    const shapes = document.shapes.map(
      (s) => aligned.find((a) => a.id === s.id) ?? s
    );
    await updateDocument({ ...document, shapes });
    addToast(`Aligned ${mode}`, 'success');
  };

  const applyDistribute = async (axis: 'horizontal' | 'vertical') => {
    if (!document) return;
    const targets = document.shapes.filter((s) => selectedIds.includes(s.id));
    if (targets.length < 3) return;
    await saveHistory(documentId, `distribute ${axis}`);
    const distributed = distributeShapes(targets, axis);
    const shapes = document.shapes.map(
      (s) => distributed.find((d) => d.id === s.id) ?? s
    );
    await updateDocument({ ...document, shapes });
    addToast(`Distributed ${axis}`, 'success');
  };

  const startLayerDrag = (layerId: string, e: React.DragEvent) => {
    setDragLayerId(layerId);
    if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
  };

  const finishLayerDrag = () => {
    setDragLayerId(null);
    setDropLayerId(null);
  };

  const handleLayerDrop = (targetLayerId: string, e?: React.DragEvent) => {
    e?.stopPropagation();
    if (!document || !dragLayerId) return;
    const next = moveLayer(document.layers, dragLayerId, targetLayerId);
    if (next !== document.layers) {
      updateLayers(documentId, next);
    }
    finishLayerDrag();
  };

  const handleLayerRootDrop = (e: React.DragEvent) => {
    if (!document || !dragLayerId) return;
    const dragged = document.layers.find((l) => l.id === dragLayerId);
    if (dragged?.parentId) {
      updateLayers(
        documentId,
        document.layers.map((l) =>
          l.id === dragLayerId ? { ...l, parentId: undefined } : l
        )
      );
    }
    finishLayerDrag();
  };

  const addFolder = () => {
    if (!document) return;
    const folder: SVGLayer = {
      id: generateId(),
      name: `Folder ${document.layers.length + 1}`,
      visible: true,
      locked: false,
      shapeIds: [],
      blending: 'normal',
      isFolder: true,
    };
    updateLayers(documentId, [...document.layers, folder]);
  };

  const removeFolder = (layerId: string) => {
    if (!document) return;
    updateLayers(
      documentId,
      document.layers
        .filter((l) => l.id !== layerId)
        .map((l) =>
          l.parentId === layerId ? { ...l, parentId: undefined } : l
        )
    );
  };

  const toggleFolder = (layerId: string) => {
    setCollapsedFolders((prev) =>
      prev.includes(layerId)
        ? prev.filter((id) => id !== layerId)
        : [...prev, layerId]
    );
  };

  const startLayerRename = (layerId: string, name: string) => {
    setRenamingLayerId(layerId);
    setRenamingName(name);
  };

  const commitLayerRename = (layerId: string) => {
    const name = renamingName.trim();
    if (name) renameLayer(documentId, layerId, name);
    setRenamingLayerId(null);
    setRenamingName('');
  };

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
        setEditingPathId(null);
        setEditingPath(null);
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedIds.length > 0) {
          for (const id of selectedIds) {
            removeShape(documentId, id);
          }
          setSelectedIds([]);
          setEditingPathId(null);
          setEditingPath(null);
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
        if (e.key === 'g' && e.shiftKey) {
          e.preventDefault();
          ungroupSelection();
        }
        if (e.key === 'g' && !e.shiftKey) {
          e.preventDefault();
          groupSelection();
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
      groupSelection,
      ungroupSelection,
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
          const point = getCanvasPoint(e.clientX, e.clientY);
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

  if (!documentId || !document) {
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

  const selectedGradient =
    firstSelected?.fill.type === 'gradient'
      ? document.gradients.find((g) => g.id === firstSelected.fill.gradientId)
      : undefined;
  const activeGradient = draggedGradient ?? selectedGradient;

  const enterSymbolEdit = (sym: SVGSymbol) => {
    if (!document) return;
    const editingShapes: SVGShape[] = sym.shapes.map((s) => ({
      ...s,
      id: generateId(),
      symbolId: sym.id,
    }));
    editingBackupRef.current = {
      shapes: document.shapes,
      layers: document.layers,
    };
    setEditingSymbol(sym);
    updateDocument({
      ...document,
      shapes: editingShapes,
      layers: [
        {
          id: generateId(),
          name: `${sym.name} master`,
          visible: true,
          locked: false,
          shapeIds: editingShapes.map((s) => s.id),
          blending: 'normal',
        },
      ],
    });
    setSelectedIds([]);
    setSidePanel(null);
    setPreviewMode(false);
    addToast(`Editing ${sym.name}`, 'info');
  };

  const exitSymbolEdit = () => {
    if (!document || !editingSymbol || !editingBackupRef.current) return;
    const backup = editingBackupRef.current;
    const edited = document.shapes.filter(
      (s) => s.symbolId === editingSymbol.id
    );
    if (edited.length > 0) {
      const minX = Math.min(...edited.map((s) => s.x));
      const minY = Math.min(...edited.map((s) => s.y));
      const maxX = Math.max(...edited.map((s) => s.x + s.width));
      const maxY = Math.max(...edited.map((s) => s.y + s.height));
      const updatedSymbol: SVGSymbol = {
        ...editingSymbol,
        shapes: edited.map((s) => ({
          ...s,
          symbolId: undefined,
          x: s.x - minX,
          y: s.y - minY,
        })),
        width: Math.max(1, maxX - minX),
        height: Math.max(1, maxY - minY),
      };
      updateSymbol(updatedSymbol);
      const instances = backup.shapes.filter(
        (s) => s.symbolId === updatedSymbol.id
      );
      if (instances.length > 0) {
        const groups: { x: number; y: number; w: number; h: number }[] = [];
        for (const s of instances) {
          let group = groups.find(
            (g) =>
              s.x + s.width >= g.x &&
              s.x <= g.x + g.w &&
              s.y + s.height >= g.y &&
              s.y <= g.y + g.h
          );
          if (!group) {
            group = { x: s.x, y: s.y, w: s.width, h: s.height };
            groups.push(group);
          }
          group.x = Math.min(group.x, s.x);
          group.y = Math.min(group.y, s.y);
          group.w = Math.max(group.w, s.x + s.width) - group.x;
          group.h = Math.max(group.h, s.y + s.height) - group.y;
        }
        const instanceIds = new Set(instances.map((i) => i.id));
        const keptShapes = backup.shapes.filter((s) => !instanceIds.has(s.id));
        const newShapes: SVGShape[] = [...keptShapes];
        for (const g of groups) {
          for (const ls of updatedSymbol.shapes) {
            newShapes.push({
              ...ls,
              id: generateId(),
              x: g.x + ls.x,
              y: g.y + ls.y,
              symbolId: updatedSymbol.id,
            });
          }
        }
        const targetLayer = backup.layers.find((l) =>
          l.shapeIds.some((id) => instanceIds.has(id))
        );
        backup.shapes = newShapes;
        backup.layers = backup.layers.map((l) => ({
          ...l,
          shapeIds: l.shapeIds.filter((id) => !instanceIds.has(id)),
        }));
        if (targetLayer) {
          const newInstanceIds = newShapes
            .filter((s) => s.symbolId === updatedSymbol.id)
            .map((s) => s.id);
          backup.layers = backup.layers.map((l) =>
            l.id === targetLayer.id
              ? { ...l, shapeIds: [...l.shapeIds, ...newInstanceIds] }
              : l
          );
        }
      }
    }
    updateDocument({
      ...document,
      shapes: backup.shapes,
      layers: backup.layers,
    });
    editingBackupRef.current = null;
    setEditingSymbol(null);
    setSelectedIds([]);
    addToast('Symbol updated', 'success');
  };

  const detachSelection = () => {
    if (!document) return;
    const shapes = document.shapes.filter((s) => selectedIds.includes(s.id));
    if (shapes.length === 0) return;
    const groupId = generateId();
    shapes.forEach((s) => {
      updateShape(documentId, {
        ...s,
        symbolId: undefined,
        groupId: s.groupId ?? groupId,
      });
    });
    addToast('Symbol instance detached', 'success');
  };

  const exportShapeIds = selectionOnlyExport
    ? document.shapes.filter((s) => selectedIds.includes(s.id)).map((s) => s.id)
    : undefined;

  const downloadExport = async (
    format: 'svg' | 'png' | 'jpeg',
    scale: number,
    quality?: number
  ) => {
    if (exportShapeIds && exportShapeIds.length === 0) {
      addToast('Select shapes to export', 'error');
      return;
    }
    const svgContent = exportAsSVG(document, exportShapeIds);
    if (format === 'svg') {
      downloadFile(svgContent, `${document.title}.svg`);
      addToast('Exported as SVG', 'success');
      return;
    }
    const blob = await rasterizeSVG(svgContent, {
      scale,
      type: format === 'png' ? 'image/png' : 'image/jpeg',
      quality,
    });
    if (!blob) {
      addToast('Export failed', 'error');
      return;
    }
    downloadBlob(blob, `${document.title}.${format}`);
    addToast(
      format === 'png' ? `Exported as PNG ${scale}x` : 'Exported as JPEG',
      'success'
    );
  };

  const quickExport = () => {
    if (settings.exportFormat === 'png') {
      downloadExport('png', settings.exportScale);
    } else if (settings.exportFormat === 'jpeg') {
      downloadExport('jpeg', settings.exportScale, 0.85);
    } else {
      downloadExport('svg', 1);
    }
  };

  const recordRecentColor = (color: string) =>
    setRecentColors((prev) =>
      [color, ...prev.filter((c) => c !== color)].slice(0, MAX_RECENT_COLORS)
    );

  const applyFillColor = (color: string) => {
    if (!firstSelected) return;
    recordRecentColor(color);
    updateShape(documentId, {
      ...firstSelected,
      fill: { ...firstSelected.fill, type: 'solid', color },
    });
  };

  const applyFillType = (type: 'solid' | 'gradient' | 'none') => {
    if (!firstSelected) return;
    if (type === 'gradient') {
      ensureShapeGradient();
      return;
    }
    if (type === 'none') {
      updateShape(documentId, {
        ...firstSelected,
        fill: {
          type: 'none',
          color: 'transparent',
          opacity: firstSelected.fill.opacity,
        },
      });
      return;
    }
    updateShape(documentId, {
      ...firstSelected,
      fill: {
        type: 'solid',
        color:
          firstSelected.fill.type === 'solid'
            ? firstSelected.fill.color
            : '#3b82f6',
        opacity: firstSelected.fill.opacity,
      },
    });
  };

  const ensureShapeGradient = (): SVGGradient | null => {
    if (!firstSelected) return null;
    const existing =
      firstSelected.fill.type === 'gradient'
        ? document.gradients.find((g) => g.id === firstSelected.fill.gradientId)
        : undefined;
    if (existing) return existing;
    const gradient: SVGGradient = {
      id: generateId(),
      type: 'linear',
      stops: [
        { color: '#3b82f6', offset: 0, opacity: 1 },
        { color: '#8b5cf6', offset: 1, opacity: 1 },
      ],
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 1,
    };
    addGradient(documentId, gradient);
    updateShape(documentId, {
      ...firstSelected,
      fill: {
        type: 'gradient',
        color: '',
        gradientId: gradient.id,
        opacity: firstSelected.fill.opacity,
      },
    });
    return gradient;
  };

  const setSelectedGradientType = (type: 'linear' | 'radial') => {
    const grad = ensureShapeGradient();
    if (!grad) return;
    const next: SVGGradient = { ...grad, type };
    if (type === 'radial') {
      next.cx = grad.cx ?? 0.5;
      next.cy = grad.cy ?? 0.5;
      next.r = grad.r ?? 0.5;
    }
    updateGradient(documentId, next);
  };

  const updateStop = (index: number, patch: Partial<SVGGradientStop>) => {
    const grad = ensureShapeGradient();
    if (!grad) return;
    updateGradient(documentId, {
      ...grad,
      stops: grad.stops.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    });
  };

  const removeStop = (index: number) => {
    const grad = ensureShapeGradient();
    if (!grad || grad.stops.length <= 2) return;
    updateGradient(documentId, {
      ...grad,
      stops: grad.stops.filter((_, i) => i !== index),
    });
  };

  const insertStop = () => {
    const grad = ensureShapeGradient();
    if (!grad) return;
    const stops = grad.stops;
    if (stops.length < 2) {
      updateGradient(documentId, {
        ...grad,
        stops: [
          ...stops,
          {
            color: stops[0]?.color ?? '#ffffff',
            offset: 1,
            opacity: 1,
          },
        ],
      });
      return;
    }
    let gap = -1;
    let insertAt = 1;
    for (let i = 0; i < stops.length - 1; i++) {
      const g = stops[i + 1].offset - stops[i].offset;
      if (g > gap) {
        gap = g;
        insertAt = i + 1;
      }
    }
    const prev = stops[insertAt - 1];
    const next = stops[insertAt] ?? prev;
    const updated = [...stops];
    updated.splice(insertAt, 0, {
      color: mixHexColors(prev.color, next.color, 0.5),
      offset: prev.offset + gap / 2,
      opacity: 1,
    });
    updateGradient(documentId, { ...grad, stops: updated });
  };

  const startGradientHandleDrag = (
    grad: SVGGradient,
    shape: SVGShape,
    handle: 'start' | 'end' | 'center' | 'radius',
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (!document) return;
    saveHistory(documentId, 'edit gradient');
    const start = getCanvasPoint(e.clientX, e.clientY);
    let working: SVGGradient = grad;
    setGradientDrag({ shapeId: shape.id, gradientId: grad.id, handle });
    setDraggedGradient(grad);
    const handleMove = (ev: MouseEvent) => {
      const p = getCanvasPoint(ev.clientX, ev.clientY);
      const dx = (p.x - start.x) / shape.width;
      const dy = (p.y - start.y) / shape.height;
      if (grad.type === 'linear') {
        const x1 =
          handle === 'end' ? (grad.x1 ?? 0) : clamp01((grad.x1 ?? 0) + dx);
        const y1 =
          handle === 'end' ? (grad.y1 ?? 0) : clamp01((grad.y1 ?? 0) + dy);
        const x2 =
          handle === 'start' ? (grad.x2 ?? 1) : clamp01((grad.x2 ?? 1) + dx);
        const y2 =
          handle === 'start' ? (grad.y2 ?? 1) : clamp01((grad.y2 ?? 1) + dy);
        working = { ...grad, x1, y1, x2, y2 };
      } else if (handle === 'center') {
        working = {
          ...grad,
          cx: clamp01((grad.cx ?? 0.5) + dx),
          cy: clamp01((grad.cy ?? 0.5) + dy),
        };
      } else {
        working = {
          ...grad,
          r: Math.max(0.01, (grad.r ?? 0.5) + dx),
        };
      }
      setDraggedGradient(working);
    };
    const finish = () => {
      updateGradient(documentId, working);
      setDraggedGradient(null);
      setGradientDrag(null);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', finish);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', finish);
  };

  const layerRows: { layer: SVGLayer; depth: number }[] = [];
  for (const layer of document.layers.filter((l) => !l.parentId)) {
    layerRows.push({ layer, depth: 0 });
    if (layer.isFolder && !collapsedFolders.includes(layer.id)) {
      for (const child of document.layers.filter(
        (l) => l.parentId === layer.id
      )) {
        layerRows.push({ layer: child, depth: 1 });
      }
    }
  }

  const startPathEdit = (shape: SVGShape) => {
    const parsed = parsePath(shape.pathData);
    editingPathRef.current = parsed;
    setEditingPath(parsed);
    setEditingPathId(shape.id);
    setSelectedIds([shape.id]);
  };

  const commitPathEdit = (shape: SVGShape, next: ParsedPath) => {
    editingPathRef.current = next;
    setEditingPath(next);
    updateShape(documentId, { ...shape, pathData: serializePath(next) });
  };

  const startPathPointDrag = (
    shape: SVGShape,
    index: number,
    e: React.MouseEvent
  ) => {
    const startPoint = getCanvasPoint(e.clientX, e.clientY);
    const orig = editingPathRef.current?.points[index];
    if (!orig) return;
    const handleMove = (ev: MouseEvent) => {
      const point = getCanvasPoint(ev.clientX, ev.clientY);
      const current = editingPathRef.current;
      if (!current) return;
      const x = Math.round(orig.x + (point.x - startPoint.x));
      const y = Math.round(orig.y + (point.y - startPoint.y));
      const next: ParsedPath = {
        ...current,
        points: current.points.map((p, i) =>
          i === index ? { ...p, x, y } : p
        ),
      };
      editingPathRef.current = next;
      setEditingPath(next);
    };
    const finish = () => {
      const current = editingPathRef.current;
      if (current) {
        updateShape(documentId, {
          ...shape,
          pathData: serializePath(current),
        });
      }
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', finish);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', finish);
  };

  const addPathPoint = (shape: SVGShape, index: number) => {
    const current = editingPathRef.current;
    if (!current || index >= current.points.length - 1) return;
    const a = current.points[index];
    const b = current.points[index + 1];
    commitPathEdit(shape, {
      ...current,
      points: [
        ...current.points.slice(0, index + 1),
        {
          x: Math.round((a.x + b.x) / 2),
          y: Math.round((a.y + b.y) / 2),
          smooth: false,
        },
        ...current.points.slice(index + 1),
      ],
    });
  };

  const removePathPoint = (shape: SVGShape, index: number) => {
    const current = editingPathRef.current;
    if (!current || current.points.length <= 2) return;
    commitPathEdit(shape, {
      ...current,
      points: current.points.filter((_, i) => i !== index),
    });
  };

  const togglePathPointSmooth = (shape: SVGShape, index: number) => {
    const current = editingPathRef.current;
    if (!current || index === 0) return;
    commitPathEdit(shape, {
      ...current,
      points: current.points.map((p, i) =>
        i === index ? { ...p, smooth: !p.smooth } : p
      ),
    });
  };

  const applyBooleanUnion = () => {
    const paths = selectedShapes.filter((s) => s.type === 'path');
    if (paths.length < 2) return;
    const first = paths[0];
    updateShape(documentId, { ...first, pathData: mockBooleanUnion(paths) });
    for (const p of paths.slice(1)) {
      removeShape(documentId, p.id);
    }
    setSelectedIds([first.id]);
    setEditingPathId(null);
    setEditingPath(null);
    addToast('Union applied (mock)', 'success');
  };

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

  return (
    <PageTransition>
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
          {editingSymbol && (
            <button
              type="button"
              onClick={exitSymbolEdit}
              className="btn btn-primary btn-sm mr-4"
              title="Done Editing">
              <FiCheck className="size-4" />
              Done Editing
            </button>
          )}
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
              onClick={() => quickExport()}
              className="btn btn-ghost btn-sm btn-circle"
              title="Export">
              <FiDownload className="size-4" />
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setExportMenuOpen((o) => !o)}
                className="btn btn-ghost btn-sm btn-circle"
                title="Export options">
                <FiChevronDown className="size-4" />
              </button>
              {exportMenuOpen && (
                <div className="bg-base-100 border-base-300 absolute top-full right-0 z-50 mt-1 w-44 rounded-lg border p-1 shadow-lg">
                  <button
                    type="button"
                    onClick={() => setSelectionOnlyExport((v) => !v)}
                    className="hover:bg-base-200 flex w-full items-center gap-2 rounded px-2 py-1 text-left text-xs">
                    <input
                      type="checkbox"
                      checked={selectionOnlyExport}
                      readOnly
                      className="checkbox checkbox-xs"
                    />
                    Selection only
                  </button>
                  <div className="border-base-200 my-1 border-t" />
                  <button
                    type="button"
                    onClick={() => {
                      setExportMenuOpen(false);
                      downloadExport('svg', 1);
                    }}
                    className="hover:bg-base-200 w-full rounded px-2 py-1 text-left text-xs">
                    SVG
                  </button>
                  {[1, 2, 4].map((scale) => (
                    <button
                      key={scale}
                      type="button"
                      onClick={() => {
                        setExportMenuOpen(false);
                        downloadExport('png', scale);
                      }}
                      className="hover:bg-base-200 w-full rounded px-2 py-1 text-left text-xs">
                      PNG {scale}x
                    </button>
                  ))}
                  <div className="border-base-200 my-1 border-t" />
                  <button
                    type="button"
                    onClick={() => {
                      setExportMenuOpen(false);
                      downloadExport('jpeg', 2, 0.92);
                    }}
                    className="hover:bg-base-200 w-full rounded px-2 py-1 text-left text-xs">
                    JPEG High
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setExportMenuOpen(false);
                      downloadExport('jpeg', 2, 0.8);
                    }}
                    className="hover:bg-base-200 w-full rounded px-2 py-1 text-left text-xs">
                    JPEG Medium
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setExportMenuOpen(false);
                      downloadExport('jpeg', 2, 0.6);
                    }}
                    className="hover:bg-base-200 w-full rounded px-2 py-1 text-left text-xs">
                    JPEG Low
                  </button>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => router.push(`/edit/code?id=${documentId}`)}
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
              <div
                className="border-base-300 bg-base-200 h-6 cursor-col-resize overflow-hidden border-b"
                onMouseDown={(e) => startGuideCreate('vertical', e)}>
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
              <div
                className="bg-base-200 flex w-6 shrink-0 cursor-row-resize flex-col overflow-hidden border-r"
                onMouseDown={(e) => startGuideCreate('horizontal', e)}>
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
                            onDoubleClick={(e) => {
                              e.stopPropagation();
                              startPathEdit(shape);
                            }}
                          />
                        );
                        break;
                      case 'text':
                        el = (() => {
                          const size = shape.fontSize ?? 16;
                          const lineHeightPx = (shape.lineHeight ?? 1.2) * size;
                          const lines = shape.textArea
                            ? wrapText(
                                shape.text ?? '',
                                shape.width,
                                size,
                                shape.letterSpacing ?? 0
                              )
                            : null;
                          return (
                            <text
                              key={shape.id}
                              x={shape.x}
                              y={shape.y + shape.height}
                              fontFamily={shape.fontFamily ?? 'Arial'}
                              fontSize={size}
                              fontWeight={shape.fontWeight ?? 'normal'}
                              fontStyle={shape.fontStyle ?? 'normal'}
                              textDecoration={shape.textDecoration ?? 'none'}
                              textAnchor={
                                (shape.textAlign ?? 'start') as
                                  'start' | 'middle' | 'end'
                              }
                              letterSpacing={shape.letterSpacing ?? 0}
                              fill={fill}
                              opacity={shape.opacity}
                              transform={transform || undefined}>
                              {lines
                                ? [
                                    lines[0],
                                    ...lines.slice(1).map((line, i) => (
                                      <tspan
                                        key={i}
                                        x={shape.x}
                                        dy={lineHeightPx}>
                                        {line}
                                      </tspan>
                                    )),
                                  ]
                                : (shape.text ?? '')}
                            </text>
                          );
                        })();
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
                                setPendingDrag(null);
                                saveHistory(documentId, 'resize shape');
                                setResizing({
                                  handle: h.handle,
                                  shapeId: shape.id,
                                  startX: getCanvasPoint(e.clientX, e.clientY)
                                    .x,
                                  startY: getCanvasPoint(e.clientX, e.clientY)
                                    .y,
                                  origX: shape.x,
                                  origY: shape.y,
                                  origW: shape.width,
                                  origH: shape.height,
                                });
                              }}
                            />
                          ))}
                          {shape.fill.type === 'gradient' &&
                            selectedIds.length === 1 &&
                            (draggedGradient?.id === shape.fill.gradientId ||
                              !draggedGradient) &&
                            (() => {
                              const grad =
                                draggedGradient?.id === shape.fill.gradientId
                                  ? draggedGradient
                                  : document.gradients.find(
                                      (g) => g.id === shape.fill.gradientId
                                    );
                              if (!grad) return null;
                              const handles =
                                grad.type === 'linear'
                                  ? [
                                      {
                                        handle: 'start' as const,
                                        x: grad.x1 ?? 0,
                                        y: grad.y1 ?? 0,
                                      },
                                      {
                                        handle: 'end' as const,
                                        x: grad.x2 ?? 1,
                                        y: grad.y2 ?? 1,
                                      },
                                    ]
                                  : [
                                      {
                                        handle: 'center' as const,
                                        x: grad.cx ?? 0.5,
                                        y: grad.cy ?? 0.5,
                                      },
                                      {
                                        handle: 'radius' as const,
                                        x: (grad.cx ?? 0.5) + (grad.r ?? 0.5),
                                        y: grad.cy ?? 0.5,
                                      },
                                    ];
                              return (
                                <g>
                                  <line
                                    x1={shape.x + handles[0].x * shape.width}
                                    y1={shape.y + handles[0].y * shape.height}
                                    x2={shape.x + handles[1].x * shape.width}
                                    y2={shape.y + handles[1].y * shape.height}
                                    stroke="#8b5cf6"
                                    strokeWidth={1 / zoom}
                                    strokeDasharray={`${3 / zoom}`}
                                  />
                                  {handles.map((p) => (
                                    <circle
                                      key={p.handle}
                                      cx={shape.x + p.x * shape.width}
                                      cy={shape.y + p.y * shape.height}
                                      r={5 / zoom}
                                      fill="#8b5cf6"
                                      stroke="#ffffff"
                                      strokeWidth={1 / zoom}
                                      className="cursor-grab"
                                      onMouseDown={(e) =>
                                        startGradientHandleDrag(
                                          grad,
                                          shape,
                                          p.handle,
                                          e
                                        )
                                      }
                                    />
                                  ))}
                                </g>
                              );
                            })()}
                        </g>
                      );
                    }

                    return el;
                  })}

                {!previewMode &&
                  alignGuides.map((g, i) => (
                    <line
                      key={`align-${i}`}
                      x1={g.orientation === 'vertical' ? g.position : -100}
                      y1={g.orientation === 'vertical' ? -100 : g.position}
                      x2={
                        g.orientation === 'vertical'
                          ? g.position
                          : document.width + 100
                      }
                      y2={
                        g.orientation === 'vertical'
                          ? document.height + 100
                          : g.position
                      }
                      stroke="#3b82f6"
                      strokeWidth={1 / zoom}
                      strokeDasharray={`${4 / zoom}`}
                      pointerEvents="none"
                    />
                  ))}

                {!previewMode &&
                  guides.map((g) => (
                    <line
                      key={g.id}
                      x1={g.orientation === 'vertical' ? g.position : -100}
                      y1={g.orientation === 'vertical' ? -100 : g.position}
                      x2={
                        g.orientation === 'vertical'
                          ? g.position
                          : document.width + 100
                      }
                      y2={
                        g.orientation === 'vertical'
                          ? document.height + 100
                          : g.position
                      }
                      stroke="#e11d48"
                      strokeWidth={1.5 / zoom}
                      strokeDasharray={`${4 / zoom}`}
                      className="cursor-pointer"
                      onMouseDown={(e) => startGuideMove(g, e)}
                      onDoubleClick={() => removeGuide(g.id)}
                    />
                  ))}

                {!previewMode &&
                  editingPathId &&
                  (() => {
                    const shape = document.shapes.find(
                      (s) => s.id === editingPathId
                    );
                    if (!shape || shape.type !== 'path' || !editingPath) {
                      return null;
                    }
                    const pts = editingPath.points;
                    return (
                      <g>
                        {pts.map((p, i) => (
                          <circle
                            key={`pt-${i}`}
                            cx={shape.x + p.x}
                            cy={shape.y + p.y}
                            r={4 / zoom}
                            fill={p.smooth ? '#10b981' : '#8b5cf6'}
                            stroke="#ffffff"
                            strokeWidth={1 / zoom}
                            className="cursor-pointer"
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              if (e.altKey) {
                                removePathPoint(shape, i);
                                return;
                              }
                              startPathPointDrag(shape, i, e);
                            }}
                            onDoubleClick={(e) => {
                              e.stopPropagation();
                              togglePathPointSmooth(shape, i);
                            }}
                          />
                        ))}
                        {pts.slice(0, -1).map((p, i) => {
                          const n = pts[i + 1];
                          return (
                            <circle
                              key={`seg-${i}`}
                              cx={shape.x + (p.x + n.x) / 2}
                              cy={shape.y + (p.y + n.y) / 2}
                              r={2.5 / zoom}
                              fill="#a78bfa"
                              stroke="#ffffff"
                              strokeWidth={1 / zoom}
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                addPathPoint(shape, i);
                              }}
                            />
                          );
                        })}
                      </g>
                    );
                  })()}

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
                            const minX = Math.min(
                              ...penPoints.map((pp) => pp.x)
                            );
                            const minY = Math.min(
                              ...penPoints.map((pp) => pp.y)
                            );
                            const maxX = Math.max(
                              ...penPoints.map((pp) => pp.x)
                            );
                            const maxY = Math.max(
                              ...penPoints.map((pp) => pp.y)
                            );
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
                        <div className="flex gap-1">
                          <button
                            type="button"
                            title="New folder"
                            onClick={addFolder}
                            className="btn btn-ghost btn-xs btn-circle">
                            <FiFolderPlus className="size-3" />
                          </button>
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
                      </div>
                      <div
                        className="min-h-16"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleLayerRootDrop}>
                        {layerRows.map(({ layer, depth }) => (
                          <div
                            key={layer.id}
                            draggable
                            onDragStart={(e) => startLayerDrag(layer.id, e)}
                            onDragOver={(e) => {
                              e.preventDefault();
                              setDropLayerId(layer.id);
                            }}
                            onDrop={(e) => handleLayerDrop(layer.id, e)}
                            onDragEnd={finishLayerDrag}
                            className={`bg-base-200 mb-1 flex items-center gap-1 rounded p-1.5 text-xs ${dropLayerId === layer.id ? 'border-primary ring-primary/30 ring-1' : ''} ${dragLayerId === layer.id ? 'opacity-50' : ''}`}
                            style={depth ? { marginLeft: 16 } : undefined}>
                            {layer.isFolder && (
                              <button
                                type="button"
                                onClick={() => toggleFolder(layer.id)}
                                className="btn btn-ghost btn-xs btn-circle">
                                <FiChevronRight
                                  className={`size-3 transition-transform ${collapsedFolders.includes(layer.id) ? '' : 'rotate-90'}`}
                                />
                              </button>
                            )}
                            {layer.isFolder && (
                              <FiFolder className="text-warning size-3" />
                            )}
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
                              onClick={() =>
                                toggleLayerLock(documentId, layer.id)
                              }
                              className="btn btn-ghost btn-xs btn-circle">
                              {layer.locked ? (
                                <FiLock className="text-warning size-3" />
                              ) : (
                                <FiUnlock className="size-3" />
                              )}
                            </button>
                            {renamingLayerId === layer.id ? (
                              <input
                                autoFocus
                                type="text"
                                value={renamingName}
                                onChange={(e) =>
                                  setRenamingName(e.target.value)
                                }
                                onBlur={() => commitLayerRename(layer.id)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    commitLayerRename(layer.id);
                                  }
                                  if (e.key === 'Escape') {
                                    setRenamingLayerId(null);
                                    setRenamingName('');
                                  }
                                }}
                                className="input input-xs input-bordered flex-1"
                              />
                            ) : (
                              <span
                                className="flex-1 truncate"
                                title={
                                  layer.isFolder
                                    ? 'Folder'
                                    : 'Double-click to rename'
                                }
                                onDoubleClick={() =>
                                  startLayerRename(layer.id, layer.name)
                                }>
                                {layer.name}
                              </span>
                            )}
                            {!layer.isFolder && (
                              <span className="text-base-content/30 text-[10px]">
                                {layer.shapeIds.length}
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() =>
                                layer.isFolder
                                  ? removeFolder(layer.id)
                                  : removeLayer(documentId, layer.id)
                              }
                              className="btn btn-ghost btn-xs btn-circle text-error">
                              <FiTrash2 className="size-3" />
                            </button>
                          </div>
                        ))}
                      </div>
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
                          {firstSelected.symbolId && (
                            <button
                              type="button"
                              onClick={detachSelection}
                              className="btn btn-outline btn-xs w-full"
                              title="Detach Symbol">
                              Detach Symbol
                            </button>
                          )}
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
                            <div className="mt-1 flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => applyFillType('solid')}
                                className={`btn btn-xs ${
                                  firstSelected.fill.type === 'solid'
                                    ? 'btn-primary'
                                    : 'btn-outline'
                                }`}>
                                Solid
                              </button>
                              <button
                                type="button"
                                onClick={() => applyFillType('gradient')}
                                className={`btn btn-xs ${
                                  firstSelected.fill.type === 'gradient'
                                    ? 'btn-primary'
                                    : 'btn-outline'
                                }`}>
                                Gradient
                              </button>
                              <button
                                type="button"
                                onClick={() => applyFillType('none')}
                                className="btn btn-ghost btn-xs"
                                title="No Fill">
                                <FiX className="size-3" />
                              </button>
                            </div>
                            {firstSelected.fill.type !== 'none' && (
                              <div className="mt-2">
                                {firstSelected.fill.type === 'solid' && (
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="color"
                                      value={firstSelected.fill.color}
                                      onChange={(e) =>
                                        applyFillColor(e.target.value)
                                      }
                                      className="size-8 cursor-pointer"
                                    />
                                    <input
                                      type="text"
                                      value={firstSelected.fill.color}
                                      onChange={(e) =>
                                        applyFillColor(e.target.value)
                                      }
                                      className="input input-sm input-bordered flex-1"
                                    />
                                  </div>
                                )}
                                {activeGradient &&
                                  firstSelected.fill.type === 'gradient' && (
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-1">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setSelectedGradientType('linear')
                                          }
                                          className={`btn btn-xs ${
                                            activeGradient.type === 'linear'
                                              ? 'btn-primary'
                                              : 'btn-outline'
                                          }`}>
                                          Linear
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setSelectedGradientType('radial')
                                          }
                                          className={`btn btn-xs ${
                                            activeGradient.type === 'radial'
                                              ? 'btn-primary'
                                              : 'btn-outline'
                                          }`}>
                                          Radial
                                        </button>
                                      </div>
                                      <div
                                        className="h-3 w-full rounded-full"
                                        style={{
                                          background: `linear-gradient(90deg, ${activeGradient.stops
                                            .map(
                                              (s) =>
                                                `${s.color} ${s.offset * 100}%`
                                            )
                                            .join(', ')})`,
                                        }}
                                      />
                                      {activeGradient.stops.map((stop, i) => (
                                        <div
                                          key={i}
                                          className="flex items-center gap-1">
                                          <input
                                            type="color"
                                            value={stop.color}
                                            onChange={(e) =>
                                              updateStop(i, {
                                                color: e.target.value,
                                              })
                                            }
                                            className="size-6 cursor-pointer"
                                          />
                                          <input
                                            type="range"
                                            min={0}
                                            max={100}
                                            value={Math.round(
                                              stop.offset * 100
                                            )}
                                            onChange={(e) =>
                                              updateStop(i, {
                                                offset:
                                                  Number(e.target.value) / 100,
                                              })
                                            }
                                            className="range range-xs flex-1"
                                          />
                                          <button
                                            type="button"
                                            disabled={
                                              activeGradient.stops.length <= 2
                                            }
                                            onClick={() => removeStop(i)}
                                            className="btn btn-ghost btn-xs"
                                            title={`Remove stop ${i + 1}`}>
                                            <FiX className="size-3" />
                                          </button>
                                        </div>
                                      ))}
                                      <button
                                        type="button"
                                        onClick={insertStop}
                                        className="btn btn-outline btn-xs w-full">
                                        Add Stop
                                      </button>
                                    </div>
                                  )}
                              </div>
                            )}
                            <div className="mt-2">
                              <label className="text-base-content/50 text-xs">
                                Palette
                              </label>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {SWATCH_PALETTE.map((c) => (
                                  <button
                                    key={c}
                                    type="button"
                                    title={c}
                                    onClick={() => applyFillColor(c)}
                                    className="border-base-content/20 size-5 cursor-pointer rounded-full border"
                                    style={{ backgroundColor: c }}
                                  />
                                ))}
                              </div>
                            </div>
                            {recentColors.length > 0 && (
                              <div className="mt-2">
                                <label className="text-base-content/50 text-xs">
                                  Recent Colors
                                </label>
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {recentColors.map((c) => (
                                    <button
                                      key={c}
                                      type="button"
                                      title={`Recent ${c}`}
                                      onClick={() => applyFillColor(c)}
                                      className="border-base-content/20 size-5 cursor-pointer rounded-full border"
                                      style={{ backgroundColor: c }}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
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
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label
                                    htmlFor="prop-letter-spacing"
                                    className="text-base-content/50 text-xs">
                                    Letter Spacing
                                  </label>
                                  <input
                                    id="prop-letter-spacing"
                                    type="number"
                                    step={0.5}
                                    value={firstSelected.letterSpacing ?? 0}
                                    onChange={(e) =>
                                      updateShape(documentId, {
                                        ...firstSelected,
                                        letterSpacing: Number(e.target.value),
                                      })
                                    }
                                    className="input input-sm input-bordered w-full"
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="prop-line-height"
                                    className="text-base-content/50 text-xs">
                                    Line Height
                                  </label>
                                  <input
                                    id="prop-line-height"
                                    type="number"
                                    step={0.1}
                                    min={1}
                                    value={firstSelected.lineHeight ?? 1.2}
                                    onChange={(e) =>
                                      updateShape(documentId, {
                                        ...firstSelected,
                                        lineHeight: Number(e.target.value),
                                      })
                                    }
                                    className="input input-sm input-bordered w-full"
                                  />
                                </div>
                              </div>
                            </>
                          )}
                          {selectedShapes.length > 1 &&
                            selectedShapes.every((s) => s.type === 'path') && (
                              <div>
                                <span className="text-base-content/50 text-xs font-semibold uppercase">
                                  Path Booleans (mock)
                                </span>
                                <div className="mt-1 flex gap-1">
                                  <button
                                    type="button"
                                    onClick={applyBooleanUnion}
                                    className="btn btn-outline btn-sm flex-1">
                                    Union
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      addToast(
                                        'Subtract (mock) — not implemented',
                                        'info'
                                      )
                                    }
                                    className="btn btn-outline btn-sm flex-1">
                                    Subtract
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      addToast(
                                        'Intersect (mock) — not implemented',
                                        'info'
                                      )
                                    }
                                    className="btn btn-outline btn-sm flex-1">
                                    Intersect
                                  </button>
                                </div>
                              </div>
                            )}
                          {selectedShapes.length > 0 && (
                            <>
                              <div>
                                <span className="text-base-content/50 text-xs font-semibold uppercase">
                                  Group
                                </span>
                                <div className="mt-1 flex gap-1">
                                  <button
                                    type="button"
                                    onClick={() => groupSelection()}
                                    className="btn btn-outline btn-xs flex-1">
                                    Group (Ctrl+G)
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => ungroupSelection()}
                                    className="btn btn-outline btn-xs flex-1">
                                    Ungroup
                                  </button>
                                </div>
                              </div>
                              <div>
                                <span className="text-base-content/50 text-xs font-semibold uppercase">
                                  Arrange
                                </span>
                                <div className="mt-1 grid grid-cols-2 gap-1">
                                  <button
                                    type="button"
                                    onClick={() => arrangeSelection('front')}
                                    className="btn btn-outline btn-xs">
                                    Bring to Front
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => arrangeSelection('forward')}
                                    className="btn btn-outline btn-xs">
                                    Bring Forward
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => arrangeSelection('backward')}
                                    className="btn btn-outline btn-xs">
                                    Send Backward
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => arrangeSelection('back')}
                                    className="btn btn-outline btn-xs">
                                    Send to Back
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                          {selectedShapes.length > 1 && (
                            <div>
                              <span className="text-base-content/50 text-xs font-semibold uppercase">
                                Align
                              </span>
                              <div className="mt-1 grid grid-cols-3 gap-1">
                                {(
                                  [
                                    ['left', 'Align Left'],
                                    ['center', 'Align Center'],
                                    ['right', 'Align Right'],
                                    ['top', 'Align Top'],
                                    ['middle', 'Align Middle'],
                                    ['bottom', 'Align Bottom'],
                                  ] as [AlignMode, string][]
                                ).map(([mode, label]) => (
                                  <button
                                    key={mode}
                                    type="button"
                                    title={label}
                                    onClick={() => applyAlign(mode)}
                                    className="btn btn-outline btn-xs">
                                    {label.replace('Align ', '')}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          {selectedShapes.length > 2 && (
                            <div>
                              <span className="text-base-content/50 text-xs font-semibold uppercase">
                                Distribute
                              </span>
                              <div className="mt-1 flex gap-1">
                                <button
                                  type="button"
                                  onClick={() => applyDistribute('horizontal')}
                                  className="btn btn-outline btn-xs flex-1">
                                  Horizontal
                                </button>
                                <button
                                  type="button"
                                  onClick={() => applyDistribute('vertical')}
                                  className="btn btn-outline btn-xs flex-1">
                                  Vertical
                                </button>
                              </div>
                            </div>
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
                                  s.fill.type === 'none'
                                    ? 'none'
                                    : s.fill.color;
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
                            <span className="flex-1 truncate text-xs">
                              {sym.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => enterSymbolEdit(sym)}
                              className="btn btn-ghost btn-xs"
                              title={`Edit ${sym.name}`}>
                              <FiEdit3 className="size-3" />
                            </button>
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
                    <div className="mt-1 grid grid-cols-2 gap-2">
                      <div>
                        <label
                          htmlFor="tool-letter-spacing"
                          className="text-base-content/50 text-xs">
                          Letter Spacing
                        </label>
                        <input
                          id="tool-letter-spacing"
                          type="number"
                          step={0.5}
                          value={letterSpacing}
                          onChange={(e) =>
                            setLetterSpacing(Number(e.target.value))
                          }
                          className="input input-sm input-bordered w-full"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="tool-line-height"
                          className="text-base-content/50 text-xs">
                          Line Height
                        </label>
                        <input
                          id="tool-line-height"
                          type="number"
                          step={0.1}
                          min={1}
                          value={lineHeight}
                          onChange={(e) =>
                            setLineHeight(Number(e.target.value))
                          }
                          className="input input-sm input-bordered w-full"
                        />
                      </div>
                    </div>
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
    </PageTransition>
  );
};

const EditorPage: FC = () => (
  <Providers>
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      }>
      <EditorContent />
    </Suspense>
  </Providers>
);

export default EditorPage;

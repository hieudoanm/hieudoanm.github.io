'use client';

import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Canvas from './Canvas';
import ErrorStrip from './ErrorStrip';
import ExamplesModal from './ExamplesModal';
import HelpModal from './HelpModal';
import StatusBar from './StatusBar';
import TextPane from './TextPane';
import Toolbar from './Toolbar';
import { useDiagramState } from '@/hooks/useDiagramState';
import { useTheme } from '@/hooks/useTheme';
import {
  buildSnippet,
  downloadDiagram,
  downloadPng,
  downloadSvg,
} from '@/lib/export';
import { EXAMPLES } from '@/lib/examples';
import { applyManualPositions, computeLayout } from '@/lib/layout';
import type { DiagramExample } from '@/lib/examples';
import type { LayoutDirection, NodeShape, SnippetFormat } from '@/lib/types';

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;

const clampZoom = (zoom: number): number =>
  Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));

const SHAPE_LABELS: Record<NodeShape, string> = {
  rect: 'Rectangle',
  round: 'Rounded',
  ellipse: 'Ellipse',
  diamond: 'Diamond',
  cylinder: 'Cylinder',
  hexagon: 'Hexagon',
  parallelogram: 'Parallelogram',
  cloud: 'Cloud',
  note: 'Note',
  actor: 'Actor',
};

const Editor: FC = () => {
  const {
    text,
    setText,
    parsed,
    reset,
    importText,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useDiagramState();
  const { theme, toggleTheme } = useTheme();
  const fileInput = useRef<HTMLInputElement>(null);
  const [zoom, setZoom] = useState(1);
  const [helpOpen, setHelpOpen] = useState(false);
  const [examplesOpen, setExamplesOpen] = useState(false);
  const [direction, setDirection] = useState<LayoutDirection>('horizontal');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<
    Record<string, { x: number; y: number }>
  >({});

  const baseLayout = useMemo(
    () => computeLayout(parsed.diagram, direction),
    [parsed.diagram, direction]
  );
  const layout = useMemo(
    () => applyManualPositions(baseLayout, overrides),
    [baseLayout, overrides]
  );
  const name = useMemo(
    () => parsed.diagram.title || 'diagram',
    [parsed.diagram.title]
  );

  useEffect(() => {
    setOverrides({});
    setSelectedId(null);
  }, [text]);

  const handleOpen = useCallback((): void => {
    fileInput.current?.click();
  }, []);

  const handleFile = useCallback(
    async (file: File | undefined): Promise<void> => {
      if (!file) return;
      importText(await file.text());
    },
    [importText]
  );

  const handleSave = useCallback((): void => {
    downloadDiagram(text, name);
  }, [text, name]);

  const handleExportSvg = useCallback((): void => {
    downloadSvg(layout, parsed.diagram.title, name);
  }, [layout, parsed.diagram.title, name]);

  const handleExportSvgPrint = useCallback((): void => {
    downloadSvg(layout, parsed.diagram.title, name, {
      print: true,
      page: 'a4-landscape',
    });
  }, [layout, parsed.diagram.title, name]);

  const handleExportPng = useCallback((): void => {
    void downloadPng(layout, parsed.diagram.title, name, {
      page: 'a4-landscape',
    });
  }, [layout, parsed.diagram.title, name]);

  const handleCopySnippet = useCallback(
    async (format: SnippetFormat): Promise<void> => {
      const snippet = buildSnippet(parsed.diagram, format);
      try {
        await navigator.clipboard.writeText(snippet);
      } catch {
        // clipboard unavailable outside a secure context
      }
    },
    [parsed.diagram]
  );

  const handleLoadExample = useCallback(
    (example: DiagramExample): void => {
      setText(example.text);
      setExamplesOpen(false);
    },
    [setText]
  );

  const handleDirectionChange = useCallback((next: LayoutDirection): void => {
    setDirection(next);
    setOverrides({});
  }, []);

  const handleNewShape = useCallback(
    (shape: NodeShape): void => {
      const id = `shape${layout.nodes.length + 1}`;
      const line = `node ${id}: ${SHAPE_LABELS[shape]} [${shape}]`;
      const value = text ? `${text.replace(/\s+$/, '')}\n${line}` : line;
      setText(value);
    },
    [layout.nodes.length, text, setText]
  );

  const handleDragNode = useCallback(
    (id: string, dx: number, dy: number): void => {
      setOverrides((current) => {
        const node = layout.nodes.find((candidate) => candidate.id === id);
        if (!node) return current;
        const previous = current[id] ?? { x: node.x, y: node.y };
        return { ...current, [id]: { x: previous.x + dx, y: previous.y + dy } };
      });
    },
    [layout]
  );

  const canExport = parsed.diagram.nodes.length > 0;

  return (
    <div className="flex h-screen flex-col">
      <Toolbar
        canExport={canExport}
        canRedo={canRedo}
        canUndo={canUndo}
        direction={direction}
        onCopySnippet={(format) => void handleCopySnippet(format)}
        onDirectionChange={handleDirectionChange}
        onExamples={() => setExamplesOpen(true)}
        onExportPng={handleExportPng}
        onExportSvg={handleExportSvg}
        onExportSvgPrint={handleExportSvgPrint}
        onHelp={() => setHelpOpen(true)}
        onNew={reset}
        onNewShape={handleNewShape}
        onOpen={handleOpen}
        onRedo={redo}
        onSave={handleSave}
        onToggleTheme={toggleTheme}
        onUndo={undo}
        onZoomIn={() => setZoom((current) => clampZoom(current + ZOOM_STEP))}
        onZoomOut={() => setZoom((current) => clampZoom(current - ZOOM_STEP))}
        onZoomReset={() => setZoom(1)}
        theme={theme}
        zoom={zoom}
      />
      <input
        ref={fileInput}
        accept=".diagram,.txt,text/plain"
        aria-label="Open diagram file"
        className="hidden"
        type="file"
        onChange={(event) => {
          void handleFile(event.target.files?.[0]);
          event.target.value = '';
        }}
      />
      {parsed.errors.length > 0 && <ErrorStrip errors={parsed.errors} />}
      <div className="flex min-h-0 flex-1">
        <div className="flex w-[44%] max-w-[52%] min-w-64">
          <TextPane
            errors={parsed.errors}
            onChange={setText}
            onRedo={redo}
            onUndo={undo}
            text={text}
          />
        </div>
        <Canvas
          layout={layout}
          onDragNode={handleDragNode}
          onSelectNode={setSelectedId}
          selectedId={selectedId}
          title={parsed.diagram.title}
          zoom={zoom}
        />
      </div>
      <StatusBar
        edges={parsed.diagram.edges.length}
        errors={parsed.errors.length}
        kind={parsed.diagram.kind}
        nodes={parsed.diagram.nodes.length}
        title={parsed.diagram.title}
      />
      <HelpModal onClose={() => setHelpOpen(false)} open={helpOpen} />
      <ExamplesModal
        examples={EXAMPLES}
        onClose={() => setExamplesOpen(false)}
        onLoadExample={handleLoadExample}
        open={examplesOpen}
      />
    </div>
  );
};

export default Editor;

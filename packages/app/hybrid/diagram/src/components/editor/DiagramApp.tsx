'use client';

import { FC, useCallback, useMemo, useRef, useState } from 'react';
import Canvas from './Canvas';
import ErrorStrip from './ErrorStrip';
import ExamplesModal from './ExamplesModal';
import HelpModal from './HelpModal';
import StatusBar from './StatusBar';
import TextPane from './TextPane';
import Toolbar from './Toolbar';
import { useDiagramState } from '@/hooks/useDiagramState';
import { useTheme } from '@/hooks/useTheme';
import { downloadDiagram, downloadSvg } from '@/lib/export';
import { EXAMPLES } from '@/lib/examples';
import { computeLayout } from '@/lib/layout';
import type { DiagramExample } from '@/lib/examples';

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;

const clampZoom = (zoom: number): number =>
  Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));

const DiagramApp: FC = () => {
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

  const layout = useMemo(() => computeLayout(parsed.diagram), [parsed.diagram]);
  const name = useMemo(
    () => parsed.diagram.title || 'diagram',
    [parsed.diagram.title]
  );

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

  const handleLoadExample = useCallback(
    (example: DiagramExample): void => {
      setText(example.text);
      setExamplesOpen(false);
    },
    [setText]
  );

  const canExport = parsed.diagram.nodes.length > 0;

  return (
    <div className="flex h-screen flex-col">
      <Toolbar
        canExport={canExport}
        canRedo={canRedo}
        canUndo={canUndo}
        onExamples={() => setExamplesOpen(true)}
        onExportSvg={handleExportSvg}
        onHelp={() => setHelpOpen(true)}
        onNew={reset}
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
        <Canvas layout={layout} title={parsed.diagram.title} zoom={zoom} />
      </div>
      <StatusBar
        edges={parsed.diagram.edges.length}
        errors={parsed.errors.length}
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

export default DiagramApp;

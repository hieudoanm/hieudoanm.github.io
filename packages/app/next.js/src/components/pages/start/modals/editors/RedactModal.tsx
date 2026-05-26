import * as fabric from 'fabric';
import { saveAs } from 'file-saver';
import { PDFDocument, rgb } from 'pdf-lib';
import { FC, useCallback, useRef, useState } from 'react';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';
import { Document, Page, pdfjs } from 'react-pdf';

const NODE_ENV: 'development' | 'production' | 'test' =
  process.env.NODE_ENV ?? 'development';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `/workers/pdf.worker.min.js`;

type RedactionBox = { x: number; y: number; width: number; height: number };
type FabricCanvas = fabric.Canvas;

export const RedactModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [
    {
      redactions = {},
      redoStack = {},
      file = null,
      numberOfPages = 0,
      scale = 1.5,
    },
    setState,
  ] = useState<{
    redactions: Record<number, RedactionBox[]>;
    redoStack: Record<number, RedactionBox[]>;
    file: File | null;
    numberOfPages: number;
    scale: number;
  }>({
    redactions: {},
    redoStack: {},
    file: null,
    numberOfPages: 0,
    scale: 1.5,
  });

  const canvasRefs = useRef<Record<number, FabricCanvas>>({});

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setState((previous) => ({
        ...previous,
        file: f,
        redactions: {},
        redoStack: {},
      }));
    }
  };

  const handleExport = async () => {
    if (!file) return;
    const buffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(buffer);

    Object.entries(redactions).forEach(([pageIndexStr, boxes]) => {
      const pageIndex = Number(pageIndexStr);
      const page = pdfDoc.getPage(pageIndex);
      boxes.forEach(({ x, y, width, height }) => {
        page.drawRectangle({
          x,
          y: page.getHeight() - y - height,
          width,
          height,
          color: rgb(0, 0, 0),
        });
      });
    });

    const modifiedBytes = await pdfDoc.save();
    const arrayBuffer = modifiedBytes.slice().buffer;
    saveAs(
      new Blob([arrayBuffer], { type: 'application/pdf' }),
      'redacted.pdf'
    );
  };

  const initFabric = useCallback(
    (el: HTMLCanvasElement | null, pageIndex: number) => {
      if (!el || canvasRefs.current[pageIndex]) return;

      const canvas = new fabric.Canvas(el, {
        selection: false,
        renderOnAddRemove: true,
      });
      canvas.setDimensions({ width: el.width, height: el.height });
      canvasRefs.current[pageIndex] = canvas;

      let isDown = false;
      let rect: fabric.Rect;
      let origX = 0;
      let origY = 0;

      canvas.on('mouse:down', (o) => {
        isDown = true;
        const pointer = canvas.getViewportPoint(o.e);
        origX = pointer.x;
        origY = pointer.y;
        rect = new fabric.Rect({
          left: origX,
          top: origY,
          fill: 'black',
          width: 0,
          height: 0,
          selectable: false,
        });
        canvas.add(rect);
      });

      canvas.on('mouse:move', (o) => {
        if (!isDown) return;
        const pointer = canvas.getViewportPoint(o.e);
        rect.set({
          width: pointer.x - origX,
          height: pointer.y - origY,
        });
        canvas.renderAll();
      });

      canvas.on('mouse:up', () => {
        isDown = false;
        const box: RedactionBox = {
          x: rect.left / scale,
          y: rect.top / scale,
          width: rect.width / scale,
          height: rect.height / scale,
        };
        setState((prev) => ({
          ...prev,
          redactions: {
            ...prev.redactions,
            [pageIndex]: [...(prev.redactions[pageIndex] ?? []), box],
          },
          redoStack: {
            ...prev.redoStack,
            [pageIndex]: [],
          },
        }));
      });
    },
    [scale]
  );

  const handleUndo = () => {
    const pagesWithRedactions = Object.entries(redactions).filter(
      ([, boxes]) => boxes.length > 0
    );
    if (pagesWithRedactions.length === 0) return;

    const [lastPageStr] = pagesWithRedactions[pagesWithRedactions.length - 1];
    const pageIndex = Number(lastPageStr);
    const canvas = canvasRefs.current[pageIndex];
    if (!canvas) return;

    const objects = canvas.getObjects('rect');
    if (objects.length > 0) {
      const lastRect = objects[objects.length - 1];
      canvas.remove(lastRect);
      canvas.renderAll();
    }

    setState((prev) => {
      const redactionsOnPage = [...(prev.redactions[pageIndex] ?? [])];
      const popped = redactionsOnPage.pop();
      if (!popped) return prev;

      return {
        ...prev,
        redactions: {
          ...prev.redactions,
          [pageIndex]: redactionsOnPage,
        },
        redoStack: {
          ...prev.redoStack,
          [pageIndex]: [...(prev.redoStack[pageIndex] ?? []), popped],
        },
      };
    });
  };

  const handleRedo = () => {
    const pagesWithRedo = Object.entries(redoStack).filter(
      ([, boxes]) => boxes.length > 0
    );
    if (pagesWithRedo.length === 0) return;

    const [lastPageStr] = pagesWithRedo[pagesWithRedo.length - 1];
    const pageIndex = Number(lastPageStr);
    const canvas = canvasRefs.current[pageIndex];
    if (!canvas) return;

    const redoBoxes = [...(redoStack[pageIndex] ?? [])];
    const redoBox = redoBoxes.pop();
    if (!redoBox) return;

    const rect = new fabric.Rect({
      left: redoBox.x * scale,
      top: redoBox.y * scale,
      width: redoBox.width * scale,
      height: redoBox.height * scale,
      fill: 'black',
      selectable: false,
    });
    canvas.add(rect);
    canvas.renderAll();

    setState((prev) => ({
      ...prev,
      redactions: {
        ...prev.redactions,
        [pageIndex]: [...(prev.redactions[pageIndex] ?? []), redoBox],
      },
      redoStack: {
        ...prev.redoStack,
        [pageIndex]: redoBoxes,
      },
    }));
  };

  return (
    <ModalWrapper
      onClose={onClose}
      title="Redact PDF"
      subtitle="Hide sensitive information from your documents."
      size="max-w-5xl">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <label className="btn btn-primary btn-sm rounded-lg">
          Upload PDF
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFile}
            className="hidden"
          />
        </label>

        {file && (
          <>
            <div className="divider divider-horizontal mx-1"></div>
            <button
              className="btn btn-ghost btn-sm rounded-lg"
              onClick={handleUndo}
              title="Undo (Ctrl+Z)">
              Undo
            </button>
            <button
              className="btn btn-ghost btn-sm rounded-lg"
              onClick={handleRedo}
              title="Redo (Ctrl+Y)">
              Redo
            </button>
            <div className="flex-1"></div>
            <button
              className="btn btn-success btn-sm rounded-lg text-white"
              onClick={handleExport}>
              Export PDF
            </button>
          </>
        )}
      </div>

      {/* Canvas Area */}
      <div className="bg-base-200 border-base-300 min-h-[400px] flex-1 overflow-auto rounded-xl border border-dashed">
        {!file ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 py-20 text-center">
            <div className="bg-base-300 text-base-content/20 flex h-16 w-16 items-center justify-center rounded-2xl">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div>
              <p className="font-semibold">No document loaded</p>
              <p className="text-base-content/50 text-sm">
                Upload a PDF to start redacting.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center p-8">
            <Document
              file={file}
              onLoadSuccess={({ numPages }) =>
                setState((previous) => ({
                  ...previous,
                  numberOfPages: numPages,
                }))
              }
              loading={
                <div className="flex items-center gap-2 py-20">
                  <span className="loading loading-spinner loading-md"></span>
                  <span>Loading PDF...</span>
                </div>
              }>
              {Array.from({ length: numberOfPages }, (_, i) => (
                <div
                  key={i}
                  className="relative mb-8 shadow-xl last:mb-0"
                  style={{
                    width: scale * 595, // Approximate A4 width
                    minHeight: scale * 842, // Approximate A4 height
                  }}>
                  <Page
                    pageNumber={i + 1}
                    scale={scale}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    onRenderSuccess={(page) => {
                      // Adjust container width to match actual rendered page
                      const canvas = document.getElementById(
                        `canvas-${i}`
                      ) as HTMLCanvasElement;
                      if (canvas) {
                        canvas.width = page.width;
                        canvas.height = page.height;
                        initFabric(canvas, i);
                      }
                    }}
                  />
                  <canvas
                    id={`canvas-${i}`}
                    className="pointer-events-auto absolute top-0 left-0 z-10 h-full w-full"
                  />
                </div>
              ))}
            </Document>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

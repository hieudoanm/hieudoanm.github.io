import * as fabric from 'fabric';
import { saveAs } from 'file-saver';
import { PDFDocument, rgb } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { createSignal, onMount } from 'solid-js';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

const NODE_ENV: 'development' | 'production' | 'test' =
  process.env.NODE_ENV ?? 'development';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `/workers/pdf.worker.min.js`;

type RedactionBox = { x: number; y: number; width: number; height: number };
type FabricCanvas = fabric.Canvas;

export const RedactModal = ({ onClose }: { onClose: () => void }) => {
  const [state, setState] = createSignal({
    redactions: {} as Record<number, RedactionBox[]>,
    redoStack: {} as Record<number, RedactionBox[]>,
    file: null as File | null,
    numPages: 0,
    scale: 1.5,
    pdfDoc: null as pdfjsLib.PDFDocumentProxy | null,
  });

  const redactions = () => state().redactions;
  const redoStack = () => state().redoStack;
  const file = () => state().file;
  const numPages = () => state().numPages;
  const scale = () => state().scale;
  const pdfDoc = () => state().pdfDoc;

  let fabricRefs: Record<number, FabricCanvas> = {};

  const handleFile = async (e: Event) => {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (!f) return;
    const buffer = await f.arrayBuffer();
    const doc = await pdfjsLib.getDocument(buffer).promise;
    setState((prev) => ({
      ...prev,
      file: f,
      pdfDoc: doc,
      numPages: doc.numPages,
      redactions: {},
      redoStack: {},
    }));
  };

  const renderPdfPage = (canvasEl: HTMLCanvasElement, pageIndex: number) => {
    const doc = pdfDoc();
    if (!doc) return;
    (async () => {
      const page = await doc.getPage(pageIndex + 1);
      const viewport = page.getViewport({ scale: scale() });
      canvasEl.width = viewport.width;
      canvasEl.height = viewport.height;
      const ctx = canvasEl.getContext('2d');
      if (!ctx) return;
      await page.render({ canvasContext: ctx, viewport }).promise;
      initFabric(canvasEl, pageIndex);
    })();
  };

  const handleExport = async () => {
    const f = file();
    if (!f) return;
    const buffer = await f.arrayBuffer();
    const pdfDoc = await PDFDocument.load(buffer);
    const r = redactions();
    Object.entries(r).forEach(([pageIndexStr, boxes]) => {
      const pg = pdfDoc.getPage(Number(pageIndexStr));
      boxes.forEach(({ x, y, width, height }) => {
        pg.drawRectangle({
          x,
          y: pg.getHeight() - y - height,
          width,
          height,
          color: rgb(0, 0, 0),
        });
      });
    });
    const modifiedBytes = await pdfDoc.save();
    saveAs(
      new Blob([modifiedBytes], { type: 'application/pdf' }),
      'redacted.pdf'
    );
  };

  const initFabric = (el: HTMLCanvasElement, pageIndex: number) => {
    if (fabricRefs[pageIndex]) return;

    const canvas = new fabric.Canvas(el, {
      selection: false,
      renderOnAddRemove: true,
    });
    canvas.setDimensions({ width: el.width, height: el.height });
    fabricRefs[pageIndex] = canvas;

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
      const s = scale();
      const box: RedactionBox = {
        x: rect.left / s,
        y: rect.top / s,
        width: rect.width / s,
        height: rect.height / s,
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
  };

  const handleUndo = () => {
    const r = redactions();
    const pagesWith = Object.entries(r).filter(([, boxes]) => boxes.length > 0);
    if (pagesWith.length === 0) return;

    const [lastPageStr] = pagesWith[pagesWith.length - 1];
    const pageIndex = Number(lastPageStr);
    const canvas = fabricRefs[pageIndex];
    if (!canvas) return;

    const objects = canvas.getObjects('rect');
    if (objects.length > 0) {
      canvas.remove(objects[objects.length - 1]);
      canvas.renderAll();
    }

    setState((prev) => {
      const redactionsOnPage = [...(prev.redactions[pageIndex] ?? [])];
      const popped = redactionsOnPage.pop();
      if (!popped) return prev;
      return {
        ...prev,
        redactions: { ...prev.redactions, [pageIndex]: redactionsOnPage },
        redoStack: {
          ...prev.redoStack,
          [pageIndex]: [...(prev.redoStack[pageIndex] ?? []), popped],
        },
      };
    });
  };

  const handleRedo = () => {
    const rs = redoStack();
    const pagesWith = Object.entries(rs).filter(
      ([, boxes]) => boxes.length > 0
    );
    if (pagesWith.length === 0) return;

    const [lastPageStr] = pagesWith[pagesWith.length - 1];
    const pageIndex = Number(lastPageStr);
    const canvas = fabricRefs[pageIndex];
    if (!canvas) return;

    const redoBoxes = [...(rs[pageIndex] ?? [])];
    const redoBox = redoBoxes.pop();
    if (!redoBox) return;

    const s = scale();
    const rect = new fabric.Rect({
      left: redoBox.x * s,
      top: redoBox.y * s,
      width: redoBox.width * s,
      height: redoBox.height * s,
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
      redoStack: { ...prev.redoStack, [pageIndex]: redoBoxes },
    }));
  };

  return (
    <ModalWrapper
      onClose={onClose}
      title="Redact PDF"
      subtitle="Hide sensitive information from your documents."
      size="max-w-5xl">
      {/* Toolbar */}
      <div class="flex flex-wrap items-center gap-2">
        <label class="btn btn-primary btn-sm rounded-lg">
          Upload PDF
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFile}
            class="hidden"
          />
        </label>

        {file() && (
          <>
            <div class="divider divider-horizontal mx-1"></div>
            <button
              class="btn btn-ghost btn-sm rounded-lg"
              onClick={handleUndo}
              title="Undo (Ctrl+Z)">
              Undo
            </button>
            <button
              class="btn btn-ghost btn-sm rounded-lg"
              onClick={handleRedo}
              title="Redo (Ctrl+Y)">
              Redo
            </button>
            <div class="flex-1"></div>
            <button
              class="btn btn-success btn-sm rounded-lg text-white"
              onClick={handleExport}>
              Export PDF
            </button>
          </>
        )}
      </div>

      {/* Canvas Area */}
      <div class="bg-base-200 border-base-300 min-h-[400px] flex-1 overflow-auto rounded-xl border border-dashed">
        {!file() ? (
          <div class="flex h-full flex-col items-center justify-center gap-4 py-20 text-center">
            <div class="bg-base-300 text-base-content/20 flex h-16 w-16 items-center justify-center rounded-2xl">
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
              <p class="font-semibold">No document loaded</p>
              <p class="text-base-content/50 text-sm">
                Upload a PDF to start redacting.
              </p>
            </div>
          </div>
        ) : (
          <div class="flex flex-col items-center p-8">
            {pdfDoc() ? (
              Array.from({ length: numPages() }, (_, i) => (
                <div
                  class="relative mb-8 shadow-xl last:mb-0"
                  style={
                    {
                      width: scale() * 595,
                      minHeight: scale() * 842,
                    } as any
                  }>
                  <canvas
                    ref={(el) => renderPdfPage(el, i)}
                    class="absolute top-0 left-0 z-0 h-full w-full"
                  />
                  <canvas
                    ref={(el) => {
                      if (el) {
                        el.width = scale() * 595;
                        el.height = scale() * 842;
                        initFabric(el, i);
                      }
                    }}
                    class="pointer-events-auto absolute top-0 left-0 z-10 h-full w-full"
                  />
                </div>
              ))
            ) : (
              <div class="flex items-center gap-2 py-20">
                <span class="loading loading-spinner loading-md"></span>
                <span>Loading PDF...</span>
              </div>
            )}
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

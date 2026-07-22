'use client';

import { type FC, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  FiArrowLeft,
  FiType,
  FiImage,
  FiPenTool,
  FiStar,
  FiBold,
  FiItalic,
  FiCheck,
  FiX,
  FiSquare,
} from 'react-icons/fi';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { generateId } from '@/data/models';

const STAMP_PRESETS = [
  { name: 'Approved', color: '#10b981', text: 'APPROVED' },
  { name: 'Rejected', color: '#ef4444', text: 'REJECTED' },
  { name: 'Draft', color: '#f59e0b', text: 'DRAFT' },
  { name: 'Confidential', color: '#8b5cf6', text: 'CONFIDENTIAL' },
];

const PDFEditor: FC = () => {
  const params = useParams();
  const id = params.id as string;
  const { getDocument, updateDocument, addStamp } = useData();
  const { addToast } = useToast();

  const [doc, setDoc] = useState<Awaited<
    ReturnType<typeof getDocument>
  > | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [activeTool, setActiveTool] = useState<
    'text' | 'image' | 'watermark' | 'stamp'
  >('text');
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [fontBold, setFontBold] = useState(false);
  const [fontItalic, setFontItalic] = useState(false);
  const [fontSize, setFontSize] = useState(12);
  const [fontColor, setFontColor] = useState('#1a1a1a');
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.3);
  const [watermarkRotation, setWatermarkRotation] = useState(-45);

  useEffect(() => {
    const load = async () => {
      const d = await getDocument(id);
      setDoc(d);
    };
    load();
  }, [id, getDocument]);

  const handleTextEdit = useCallback((textBlockId: string, content: string) => {
    setEditingTextId(textBlockId);
    setEditText(content);
  }, []);

  const handleSaveTextEdit = useCallback(async () => {
    if (!doc || !editingTextId) return;
    const updatedPages = doc.pages.map((page) => ({
      ...page,
      textBlocks: page.textBlocks.map((tb) =>
        tb.id === editingTextId ? { ...tb, content: editText } : tb
      ),
    }));
    await updateDocument({
      ...doc,
      pages: updatedPages,
      updatedAt: Date.now(),
    });
    setEditingTextId(null);
    addToast('Text updated', 'success');
  }, [doc, editingTextId, editText, updateDocument, addToast]);

  const handleStamp = useCallback(
    async (preset: (typeof STAMP_PRESETS)[number]) => {
      if (!doc) return;
      await addStamp({
        documentId: doc.id,
        pageNumber: currentPage,
        preset: preset.name,
        text: preset.text,
        color: preset.color,
        x: 200,
        y: 350,
        width: 180,
        height: 60,
        rotation: -15,
      });
      addToast(`Stamp "${preset.name}" added`, 'success');
    },
    [doc, currentPage, addStamp, addToast]
  );

  const handleAddTextBox = useCallback(async () => {
    if (!doc) return;
    const newPage = doc.pages[currentPage - 1];
    if (!newPage) return;
    const newText = {
      id: `text-new-${generateId()}`,
      x: 100,
      y: 200,
      width: 300,
      height: 30,
      content: 'New text box',
      fontSize,
      fontFamily: 'sans-serif',
      bold: fontBold,
      italic: fontItalic,
      color: fontColor,
    };
    const updatedPages = doc.pages.map((page) =>
      page.pageNumber === currentPage
        ? { ...page, textBlocks: [...page.textBlocks, newText] }
        : page
    );
    await updateDocument({
      ...doc,
      pages: updatedPages,
      updatedAt: Date.now(),
    });
    addToast('Text box added', 'success');
  }, [
    doc,
    currentPage,
    fontSize,
    fontBold,
    fontItalic,
    fontColor,
    updateDocument,
    addToast,
  ]);

  if (!doc) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="bg-base-200 flex h-screen flex-col">
      <div className="bg-base-100 border-base-300 no-print flex items-center gap-2 border-b px-4 py-2">
        <Link href={`/pdf/${id}`} className="btn btn-ghost btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </Link>
        <h1 className="text-base-content truncate text-sm font-medium">
          {doc.title} - Editor
        </h1>
        <div className="ml-auto flex items-center gap-1">
          {[
            { tool: 'text' as const, icon: FiType, label: 'Text' },
            { tool: 'image' as const, icon: FiImage, label: 'Image' },
            { tool: 'watermark' as const, icon: FiSquare, label: 'Watermark' },
            { tool: 'stamp' as const, icon: FiStar, label: 'Stamp' },
          ].map(({ tool, icon: Icon, label }) => (
            <button
              key={tool}
              type="button"
              onClick={() => setActiveTool(tool)}
              className={`btn btn-sm btn-circle ${activeTool === tool ? 'btn-primary' : 'btn-ghost'}`}
              aria-label={label}>
              <Icon className="size-4" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="bg-base-100 border-base-300 no-print w-64 border-r p-4">
          <h3 className="text-base-content mb-3 text-sm font-semibold">
            Tool: {activeTool}
          </h3>

          {activeTool === 'text' && (
            <div className="space-y-3">
              <div>
                <label className="text-base-content/60 mb-1 text-xs">
                  Font Size
                </label>
                <input
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="input input-sm w-full"
                  min={8}
                  max={72}
                />
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setFontBold((b) => !b)}
                  className={`btn btn-sm btn-circle ${fontBold ? 'btn-primary' : 'btn-ghost'}`}>
                  <FiBold className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setFontItalic((i) => !i)}
                  className={`btn btn-sm btn-circle ${fontItalic ? 'btn-primary' : 'btn-ghost'}`}>
                  <FiItalic className="size-4" />
                </button>
              </div>
              <div>
                <label className="text-base-content/60 mb-1 text-xs">
                  Color
                </label>
                <input
                  type="color"
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value)}
                  className="input input-sm w-full"
                />
              </div>
              <button
                type="button"
                onClick={handleAddTextBox}
                className="btn btn-primary btn-sm w-full">
                Add Text Box
              </button>
            </div>
          )}

          {activeTool === 'watermark' && (
            <div className="space-y-3">
              <div>
                <label className="text-base-content/60 mb-1 text-xs">
                  Text
                </label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  className="input input-sm w-full"
                />
              </div>
              <div>
                <label className="text-base-content/60 mb-1 text-xs">
                  Opacity: {watermarkOpacity}
                </label>
                <input
                  type="range"
                  min={0.1}
                  max={1}
                  step={0.1}
                  value={watermarkOpacity}
                  onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                  className="range range-sm w-full"
                />
              </div>
              <div>
                <label className="text-base-content/60 mb-1 text-xs">
                  Rotation: {watermarkRotation}°
                </label>
                <input
                  type="range"
                  min={-90}
                  max={90}
                  value={watermarkRotation}
                  onChange={(e) => setWatermarkRotation(Number(e.target.value))}
                  className="range range-sm w-full"
                />
              </div>
            </div>
          )}

          {activeTool === 'stamp' && (
            <div className="space-y-2">
              {STAMP_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handleStamp(preset)}
                  className="btn btn-outline btn-sm w-full justify-start gap-2"
                  style={{ borderColor: preset.color, color: preset.color }}>
                  <FiStar className="size-3" />
                  {preset.name}
                </button>
              ))}
            </div>
          )}

          {activeTool === 'image' && (
            <div className="text-base-content/60 text-xs">
              <p>Image insertion panel</p>
              <p className="mt-2">Drag & drop or click to upload</p>
              <button
                type="button"
                className="btn btn-outline btn-sm mt-3 w-full">
                Choose Image
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-1 justify-center overflow-auto p-4">
          <div
            className="relative bg-white shadow-lg"
            style={{
              width: `${(595 * zoom) / 100}px`,
              minHeight: `${(842 * zoom) / 100}px`,
            }}>
            {doc.pages[currentPage - 1]?.textBlocks.map((tb) => (
              <div
                key={tb.id}
                className="absolute"
                style={{
                  left: `${(tb.x * zoom) / 100}px`,
                  top: `${(tb.y * zoom) / 100}px`,
                  width: `${(tb.width * zoom) / 100}px`,
                }}>
                {editingTextId === tb.id ? (
                  <div className="flex items-center gap-1">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="textarea textarea-bordered textarea-sm w-full"
                      rows={2}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleSaveTextEdit}
                      className="btn btn-success btn-xs btn-circle">
                      <FiCheck className="size-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingTextId(null)}
                      className="btn btn-ghost btn-xs btn-circle">
                      <FiX className="size-3" />
                    </button>
                  </div>
                ) : (
                  <div
                    className="hover:bg-primary/10 cursor-pointer rounded p-1"
                    style={{
                      fontSize: `${(tb.fontSize * zoom) / 100}px`,
                      fontFamily: tb.fontFamily,
                      fontWeight: tb.bold ? 'bold' : 'normal',
                      fontStyle: tb.italic ? 'italic' : 'normal',
                      color: tb.color,
                    }}
                    onClick={() => handleTextEdit(tb.id, tb.content)}>
                    {tb.content}
                  </div>
                )}
              </div>
            ))}
            {doc.pages[currentPage - 1]?.images.map((img) => (
              <div
                key={img.id}
                className="absolute flex items-center justify-center rounded"
                style={{
                  left: `${(img.x * zoom) / 100}px`,
                  top: `${(img.y * zoom) / 100}px`,
                  width: `${(img.width * zoom) / 100}px`,
                  height: `${(img.height * zoom) / 100}px`,
                  backgroundColor: img.color,
                  opacity: img.opacity,
                }}>
                <span className="text-xs text-gray-500">{img.label}</span>
              </div>
            ))}
            {activeTool === 'watermark' && (
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                style={{ opacity: watermarkOpacity }}>
                <span
                  className="text-4xl font-bold text-gray-400"
                  style={{ transform: `rotate(${watermarkRotation}deg)` }}>
                  {watermarkText}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-base-100 border-base-300 no-print flex items-center justify-between border-t px-4 py-1">
        <span className="text-base-content/50 text-xs">
          Page {currentPage} of {doc.pageCount}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="btn btn-ghost btn-xs"
            disabled={currentPage <= 1}>
            Prev
          </button>
          <button
            type="button"
            onClick={() =>
              setCurrentPage((p) => Math.min(doc.pageCount, p + 1))
            }
            className="btn btn-ghost btn-xs"
            disabled={currentPage >= doc.pageCount}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const EditPage: FC = () => (
  <Providers>
    <PDFEditor />
  </Providers>
);

export default EditPage;

'use client';

import {
  type FC,
  Suspense,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
  FiTrash2,
  FiCopy,
} from 'react-icons/fi';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { generateId } from '@/data/models';
import { parsePageRange } from '@/lib/pdf-tools';
import { PageOrganizer } from '@/components/molecules/PageOrganizer';
import type { ImageBlock, PDFDocument, PDFPage, Watermark } from '@/types';

const STAMP_PRESETS = [
  { name: 'Approved', color: '#10b981', text: 'APPROVED' },
  { name: 'Rejected', color: '#ef4444', text: 'REJECTED' },
  { name: 'Draft', color: '#f59e0b', text: 'DRAFT' },
  { name: 'Confidential', color: '#8b5cf6', text: 'CONFIDENTIAL' },
];

const WATERMARK_COLORS = [
  '#3b82f6',
  '#ef4444',
  '#10b981',
  '#f59e0b',
  '#8b5cf6',
];

interface ResizeState {
  id: string;
  startX: number;
  startY: number;
  startW: number;
  startH: number;
}

interface CropBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CropDragState {
  mode: 'move' | 'resize';
  startX: number;
  startY: number;
  box: CropBox;
}

const buildDocFromPages = (
  title: string,
  pages: PDFPage[],
  source: PDFDocument
): PDFDocument => ({
  id: `doc-${generateId()}`,
  title,
  filename: `${title}.pdf`,
  author: source.author,
  pageCount: pages.length,
  fileSize: source.fileSize,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  lastOpenedAt: Date.now(),
  thumbnailColor: source.thumbnailColor,
  pages,
});

const PDFEditorContent: FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { getDocument, updateDocument, addStamp, createDocument, documents } =
    useData();
  const { addToast } = useToast();

  const [doc, setDoc] = useState<Awaited<
    ReturnType<typeof getDocument>
  > | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [activeTool, setActiveTool] = useState<
    'text' | 'image' | 'watermark' | 'stamp' | 'page'
  >('text');
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [fontBold, setFontBold] = useState(false);
  const [fontItalic, setFontItalic] = useState(false);
  const [fontSize, setFontSize] = useState(12);
  const [fontColor, setFontColor] = useState('#1a1a1a');
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const [resizing, setResizing] = useState<ResizeState | null>(null);
  const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text');
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.3);
  const [watermarkRotation, setWatermarkRotation] = useState(-45);
  const [watermarkColor, setWatermarkColor] = useState(WATERMARK_COLORS[0]);
  const [watermarkAllPages, setWatermarkAllPages] = useState(false);
  const [cropMode, setCropMode] = useState(false);
  const [cropBox, setCropBox] = useState<CropBox>({
    x: 100,
    y: 100,
    width: 300,
    height: 400,
  });
  const [cropDrag, setCropDrag] = useState<CropDragState | null>(null);

  const docRef = useRef(doc);
  useEffect(() => {
    docRef.current = doc;
  }, [doc]);
  const imageCountRef = useRef(0);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      const d = await getDocument(id);
      setDoc(d);
    };
    load();
  }, [id, getDocument]);

  const currentImage = doc?.pages[currentPage - 1]?.images.find(
    (img) => img.id === selectedImageId
  );

  const updateImages = useCallback(
    (updater: (images: ImageBlock[]) => ImageBlock[]) => {
      if (!doc) return null;
      const updatedPages = doc.pages.map((page) =>
        page.pageNumber === currentPage
          ? { ...page, images: updater(page.images) }
          : page
      );
      const updated: PDFDocument = {
        ...doc,
        pages: updatedPages,
        updatedAt: Date.now(),
      };
      setDoc(updated);
      return updated;
    },
    [doc, currentPage]
  );

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

  const handleAddImage = useCallback(async () => {
    if (!doc) return;
    const count = imageCountRef.current + 1;
    imageCountRef.current = count;
    const newImage: ImageBlock = {
      id: `image-new-${generateId()}`,
      x: 150,
      y: 250,
      width: 160,
      height: 120,
      color: '#8b5cf6',
      label: `image-${count}`,
      opacity: 1,
    };
    const updated = updateImages((images) => [...images, newImage]);
    if (!updated) return;
    await updateDocument(updated);
    setSelectedImageId(newImage.id);
    setImageOpacity(1);
    setImageRotation(0);
    addToast('Image added', 'success');
  }, [doc, updateImages, updateDocument, addToast]);

  const handleImageChange = useCallback(
    async (patch: Partial<ImageBlock>) => {
      if (!selectedImageId) return;
      const updated = updateImages((images) =>
        images.map((img) =>
          img.id === selectedImageId ? { ...img, ...patch } : img
        )
      );
      if (!updated) return;
      await updateDocument(updated);
    },
    [selectedImageId, updateImages, updateDocument]
  );

  const handleDeleteImage = useCallback(async () => {
    if (!selectedImageId) return;
    const updated = updateImages((images) =>
      images.filter((img) => img.id !== selectedImageId)
    );
    if (!updated) return;
    await updateDocument(updated);
    setSelectedImageId(null);
    addToast('Image deleted', 'success');
  }, [selectedImageId, updateImages, updateDocument, addToast]);

  const handleResizeStart = useCallback(
    (img: ImageBlock) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setResizing({
        id: img.id,
        startX: e.clientX,
        startY: e.clientY,
        startW: img.width,
        startH: img.height,
      });
    },
    []
  );

  const handleResizeMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!resizing) return;
      const dx = ((e.clientX - resizing.startX) * 100) / zoom;
      const dy = ((e.clientY - resizing.startY) * 100) / zoom;
      const width = Math.max(20, resizing.startW + dx);
      const height = Math.max(20, resizing.startH + dy);
      updateImages((images) =>
        images.map((img) =>
          img.id === resizing.id ? { ...img, width, height } : img
        )
      );
    },
    [resizing, zoom, updateImages]
  );

  const handleResizeEnd = useCallback(async () => {
    if (!resizing) return;
    setResizing(null);
    const current = docRef.current;
    if (!current) return;
    await updateDocument({ ...current, updatedAt: Date.now() });
  }, [resizing, updateDocument]);

  const handleApplyWatermark = useCallback(async () => {
    if (!doc) return;
    const watermark: Watermark = {
      id: `wm-${generateId()}`,
      documentId: doc.id,
      type: watermarkType,
      text: watermarkText,
      fontSize: 48,
      color: watermarkType === 'image' ? watermarkColor : '#9ca3af',
      opacity: watermarkOpacity,
      rotation: watermarkRotation,
      position: 'center',
      pageRange: watermarkAllPages ? 'all' : String(currentPage),
    };
    const updatedPages = doc.pages.map((page) =>
      watermarkAllPages || page.pageNumber === currentPage
        ? { ...page, watermark }
        : page
    );
    const updated: PDFDocument = {
      ...doc,
      pages: updatedPages,
      updatedAt: Date.now(),
    };
    await updateDocument(updated);
    setDoc(updated);
    addToast('Watermark applied', 'success');
  }, [
    doc,
    currentPage,
    watermarkType,
    watermarkText,
    watermarkColor,
    watermarkOpacity,
    watermarkRotation,
    watermarkAllPages,
    updateDocument,
    addToast,
  ]);

  const persistPages = useCallback(
    async (pages: PDFPage[]) => {
      if (!doc) return;
      const renumbered = pages.map((p, i) => ({ ...p, pageNumber: i + 1 }));
      const updated: PDFDocument = {
        ...doc,
        pages: renumbered,
        pageCount: renumbered.length,
        updatedAt: Date.now(),
      };
      setDoc(updated);
      await updateDocument(updated);
      return updated;
    },
    [doc, updateDocument]
  );

  const handleReorder = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (!doc) return;
      const next = [...doc.pages];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      persistPages(next);
    },
    [doc, persistPages]
  );

  const handleDeletePage = useCallback(
    async (pageNumber: number) => {
      if (!doc) return;
      const next = doc.pages.filter((p) => p.pageNumber !== pageNumber);
      if (!next.length) return;
      await persistPages(next);
      setCurrentPage((c) => Math.min(c, next.length));
      addToast('Page deleted', 'success');
    },
    [doc, persistPages, addToast]
  );

  const handleRotatePage = useCallback(
    (pageNumber: number, delta: number) => {
      if (!doc) return;
      const next = doc.pages.map((p) =>
        p.pageNumber === pageNumber
          ? { ...p, rotation: (p.rotation + delta + 360) % 360 }
          : p
      );
      persistPages(next);
    },
    [doc, persistPages]
  );

  const handleDuplicatePage = useCallback(
    (pageNumber: number) => {
      if (!doc) return;
      const index = doc.pages.findIndex((p) => p.pageNumber === pageNumber);
      if (index < 0) return;
      const page = doc.pages[index];
      const copy: PDFPage = {
        ...page,
        id: `page-${generateId()}`,
        textBlocks: page.textBlocks.map((tb) => ({
          ...tb,
          id: `tb-${generateId()}`,
        })),
        images: page.images.map((img) => ({
          ...img,
          id: `img-${generateId()}`,
        })),
      };
      const next = [...doc.pages];
      next.splice(index + 1, 0, copy);
      persistPages(next);
      addToast('Page duplicated', 'success');
    },
    [doc, persistPages, addToast]
  );

  const handleLabelChange = useCallback(
    (pageNumber: number, label: string) => {
      if (!doc) return;
      const next = doc.pages.map((p) =>
        p.pageNumber === pageNumber ? { ...p, labels: label } : p
      );
      persistPages(next);
    },
    [doc, persistPages]
  );

  const handleExtractPages = useCallback(
    async (range: string) => {
      if (!doc) return;
      const indices = parsePageRange(range, doc.pages.length);
      if (!indices.length) return;
      const selected = indices.map((i) => doc.pages[i]);
      const remaining = doc.pages.filter((_, i) => !indices.includes(i));
      if (!remaining.length) return;
      const extracted = buildDocFromPages(
        `${doc.title} (extracted)`,
        selected.map((p, i) => ({ ...p, pageNumber: i + 1 })),
        doc
      );
      await createDocument(extracted);
      await persistPages(remaining);
      setCurrentPage(1);
      addToast(`Extracted ${selected.length} page(s)`, 'success');
    },
    [doc, createDocument, persistPages, addToast]
  );

  const handleSplitAt = useCallback(
    async (after: number) => {
      if (!doc) return;
      const n = Number(after);
      if (!Number.isInteger(n) || n < 1 || n >= doc.pages.length) return;
      const second = buildDocFromPages(
        `${doc.title} (part 2)`,
        doc.pages.slice(n).map((p, i) => ({ ...p, pageNumber: i + 1 })),
        doc
      );
      await createDocument(second);
      await persistPages(doc.pages.slice(0, n));
      setCurrentPage(1);
      addToast('Split into 2 documents', 'success');
    },
    [doc, createDocument, persistPages, addToast]
  );

  const handleMerge = useCallback(
    async (pages: PDFPage[]) => {
      if (!doc || !pages.length) return;
      await persistPages(pages);
      addToast('Pages merged', 'success');
    },
    [doc, persistPages, addToast]
  );

  const handleApplyCrop = useCallback(async () => {
    if (!doc) return;
    const next = doc.pages.map((p) =>
      p.pageNumber === currentPage ? { ...p, crop: { ...cropBox } } : p
    );
    const updated: PDFDocument = { ...doc, pages: next, updatedAt: Date.now() };
    setDoc(updated);
    await updateDocument(updated);
    setCropMode(false);
    addToast('Crop applied', 'success');
  }, [doc, currentPage, cropBox, updateDocument, addToast]);

  const handleClearCrop = useCallback(async () => {
    if (!doc) return;
    const next = doc.pages.map((p) =>
      p.pageNumber === currentPage ? { ...p, crop: undefined } : p
    );
    const updated: PDFDocument = { ...doc, pages: next, updatedAt: Date.now() };
    setDoc(updated);
    await updateDocument(updated);
    addToast('Crop removed', 'success');
  }, [doc, currentPage, updateDocument, addToast]);

  const handleCropMoveStart = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setCropDrag({
        mode: 'move',
        startX: e.clientX,
        startY: e.clientY,
        box: cropBox,
      });
    },
    [cropBox]
  );

  const handleCropResizeStart = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setCropDrag({
        mode: 'resize',
        startX: e.clientX,
        startY: e.clientY,
        box: cropBox,
      });
    },
    [cropBox]
  );

  const handleCropDragMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cropDrag) return;
      const dx = ((e.clientX - cropDrag.startX) * 100) / zoom;
      const dy = ((e.clientY - cropDrag.startY) * 100) / zoom;
      if (cropDrag.mode === 'move') {
        setCropBox((b) => ({
          ...b,
          x: Math.max(0, Math.min(595 - b.width, cropDrag.box.x + dx)),
          y: Math.max(0, Math.min(842 - b.height, cropDrag.box.y + dy)),
        }));
      } else {
        setCropBox({
          ...cropDrag.box,
          width: Math.max(20, cropDrag.box.width + dx),
          height: Math.max(20, cropDrag.box.height + dy),
        });
      }
    },
    [cropDrag, zoom]
  );

  const handleCropDragEnd = useCallback(() => {
    setCropDrag(null);
  }, []);

  if (!doc) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  const page = doc.pages[currentPage - 1];

  return (
    <div className="bg-base-200 flex h-screen flex-col">
      <div className="bg-base-100 border-base-300 no-print flex items-center gap-2 border-b px-4 py-2">
        <Link
          href={`/pdf?id=${id}`}
          className="btn btn-ghost btn-sm btn-circle">
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
            { tool: 'page' as const, icon: FiCopy, label: 'Page' },
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

          {activeTool === 'image' && (
            <div className="space-y-3">
              <p className="text-base-content/60 text-xs">
                Click an image on the page to select and edit it.
              </p>
              <button
                type="button"
                onClick={handleAddImage}
                className="btn btn-outline btn-sm w-full">
                Add Image
              </button>
              {currentImage && (
                <div className="space-y-3">
                  <div>
                    <label className="text-base-content/60 mb-1 text-xs">
                      Opacity: {imageOpacity}
                    </label>
                    <input
                      type="range"
                      min={0.1}
                      max={1}
                      step={0.1}
                      value={imageOpacity}
                      onChange={(e) => {
                        setImageOpacity(Number(e.target.value));
                        handleImageChange({ opacity: Number(e.target.value) });
                      }}
                      className="range range-sm w-full"
                      aria-label="Image opacity"
                    />
                  </div>
                  <div>
                    <label className="text-base-content/60 mb-1 text-xs">
                      Rotation: {imageRotation}°
                    </label>
                    <input
                      type="range"
                      min={-90}
                      max={90}
                      value={imageRotation}
                      onChange={(e) => {
                        setImageRotation(Number(e.target.value));
                        handleImageChange({ rotation: Number(e.target.value) });
                      }}
                      className="range range-sm w-full"
                      aria-label="Image rotation"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="btn btn-error btn-sm w-full gap-1">
                    <FiTrash2 className="size-3" /> Delete Image
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTool === 'watermark' && (
            <div className="space-y-3">
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setWatermarkType('text')}
                  className={`btn btn-sm btn-xs flex-1 ${watermarkType === 'text' ? 'btn-primary' : 'btn-ghost'}`}
                  aria-label="Text watermark">
                  Text
                </button>
                <button
                  type="button"
                  onClick={() => setWatermarkType('image')}
                  className={`btn btn-sm btn-xs flex-1 ${watermarkType === 'image' ? 'btn-primary' : 'btn-ghost'}`}
                  aria-label="Image watermark">
                  Image
                </button>
              </div>
              {watermarkType === 'text' ? (
                <>
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
                      onChange={(e) =>
                        setWatermarkOpacity(Number(e.target.value))
                      }
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
                      onChange={(e) =>
                        setWatermarkRotation(Number(e.target.value))
                      }
                      className="range range-sm w-full"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="text-base-content/60 mb-1 text-xs">
                    Color
                  </label>
                  <div className="flex gap-1">
                    {WATERMARK_COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setWatermarkColor(color)}
                        className={`size-5 rounded-full border-2 ${watermarkColor === color ? 'border-white' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <p className="text-base-content/60 mt-2 text-[10px]">
                    Image watermark preview uses the selected color.
                  </p>
                </div>
              )}
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={watermarkAllPages}
                  onChange={(e) => setWatermarkAllPages(e.target.checked)}
                  className="checkbox checkbox-xs"
                />
                Apply to all pages
              </label>
              <button
                type="button"
                onClick={handleApplyWatermark}
                className="btn btn-primary btn-sm w-full">
                Apply Watermark
              </button>
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

          {activeTool === 'page' && (
            <PageOrganizer
              pages={doc.pages}
              currentPage={currentPage}
              cropMode={cropMode}
              otherDocuments={documents.filter((d) => d.id !== doc.id)}
              onSelect={setCurrentPage}
              onReorder={handleReorder}
              onLabelChange={handleLabelChange}
              onRotate={handleRotatePage}
              onDuplicate={handleDuplicatePage}
              onDelete={handleDeletePage}
              onExtract={handleExtractPages}
              onSplit={handleSplitAt}
              onMerge={handleMerge}
              onToggleCropMode={() => setCropMode((c) => !c)}
              onApplyCrop={handleApplyCrop}
              onClearCrop={handleClearCrop}
            />
          )}
        </div>

        <div className="flex flex-1 justify-center overflow-auto p-4">
          <div
            className="relative bg-white shadow-lg"
            style={{
              width: `${(595 * zoom) / 100}px`,
              minHeight: `${(842 * zoom) / 100}px`,
              clipPath: page?.crop
                ? `inset(${(page.crop.y * zoom) / 100}px ${((595 - page.crop.x - page.crop.width) * zoom) / 100}px ${((842 - page.crop.y - page.crop.height) * zoom) / 100}px ${(page.crop.x * zoom) / 100}px)`
                : undefined,
            }}
            onMouseMove={(e) => {
              if (resizing) handleResizeMove(e);
              if (cropDrag) handleCropDragMove(e);
            }}
            onMouseUp={() => {
              if (resizing) handleResizeEnd();
              if (cropDrag) handleCropDragEnd();
            }}
            onMouseLeave={() => {
              if (resizing) setResizing(null);
              if (cropDrag) setCropDrag(null);
            }}>
            {page?.textBlocks.map((tb) => (
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
            {page?.images.map((img) => (
              <div
                key={img.id}
                className={`absolute flex items-center justify-center rounded ${selectedImageId === img.id ? 'ring-primary ring-2' : ''}`}
                style={{
                  left: `${(img.x * zoom) / 100}px`,
                  top: `${(img.y * zoom) / 100}px`,
                  width: `${(img.width * zoom) / 100}px`,
                  height: `${(img.height * zoom) / 100}px`,
                  backgroundColor: img.color,
                  opacity: img.opacity,
                  transform: img.rotation
                    ? `rotate(${img.rotation}deg)`
                    : undefined,
                }}
                onClick={() => {
                  setSelectedImageId(img.id);
                  setImageOpacity(img.opacity);
                  setImageRotation(img.rotation ?? 0);
                }}>
                {img.src ? (
                  <img
                    src={img.src}
                    alt={img.label}
                    className="h-full w-full rounded object-contain"
                  />
                ) : (
                  <span className="text-xs text-gray-500">{img.label}</span>
                )}
                {selectedImageId === img.id && (
                  <>
                    <div
                      className="bg-primary absolute -top-1 -left-1 size-3 cursor-nwse-resize"
                      onMouseDown={handleResizeStart(img)}
                      aria-label="Resize image"
                    />
                    <div
                      className="bg-primary absolute -right-1 -bottom-1 size-3 cursor-nwse-resize"
                      onMouseDown={handleResizeStart(img)}
                      aria-label="Resize image"
                    />
                  </>
                )}
              </div>
            ))}
            {page?.watermark && (
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                style={{ opacity: page.watermark.opacity }}>
                {page.watermark.type === 'image' ? (
                  page.watermark.image ? (
                    <img
                      src={page.watermark.image}
                      alt={page.watermark.label ?? 'Watermark'}
                      className="max-h-full max-w-full object-contain"
                      style={{
                        transform: `rotate(${page.watermark.rotation}deg)`,
                      }}
                    />
                  ) : (
                    <div
                      className="h-40 w-56 rounded"
                      style={{
                        backgroundColor: page.watermark.color,
                        transform: `rotate(${page.watermark.rotation}deg)`,
                      }}
                    />
                  )
                ) : (
                  <span
                    className="font-bold text-gray-400"
                    style={{
                      fontSize: `${page.watermark.fontSize}px`,
                      transform: `rotate(${page.watermark.rotation}deg)`,
                    }}>
                    {page.watermark.text}
                  </span>
                )}
              </div>
            )}
            {cropMode && (
              <div
                className="border-primary/70 bg-primary/10 absolute cursor-move border-2"
                style={{
                  left: `${(cropBox.x * zoom) / 100}px`,
                  top: `${(cropBox.y * zoom) / 100}px`,
                  width: `${(cropBox.width * zoom) / 100}px`,
                  height: `${(cropBox.height * zoom) / 100}px`,
                }}
                onMouseDown={handleCropMoveStart}
                aria-label="Crop box">
                <div
                  className="bg-primary absolute -right-1 -bottom-1 size-3 cursor-se-resize"
                  onMouseDown={handleCropResizeStart}
                  aria-label="Resize crop box"
                />
              </div>
            )}
            {activeTool === 'watermark' && watermarkType === 'text' && (
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
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      }>
      <PDFEditorContent />
    </Suspense>
  </Providers>
);

export default EditPage;

'use client';

import {
  type FC,
  Suspense,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import {
  FiArrowLeft,
  FiZoomIn,
  FiZoomOut,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiChevronDown,
  FiRotateCw,
  FiBookmark,
  FiSearch,
  FiEdit2,
  FiSidebar,
  FiEye,
  FiUnderline,
  FiDelete,
  FiMessageSquare,
  FiPenTool,
  FiSquare,
  FiCircle,
  FiArrowRight,
  FiMinus,
  FiX,
  FiPrinter,
  FiMaximize,
  FiInfo,
  FiDownload,
} from 'react-icons/fi';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { formatPageNumber, formatDate, formatFileSize } from '@/utils/format';
import type {
  Annotation,
  AnnotationComment,
  AnnotationType,
  Bookmark,
  FormField,
  PDFDocument,
} from '@/types';
import { generateId } from '@/data/models';
import PageView from '@/components/molecules/PageView';
import ViewerSkeleton from '@/components/molecules/ViewerSkeleton';
import { FormFieldsLayer } from '@/components/molecules/FormFieldsLayer';
import { SignaturePad } from '@/components/molecules/SignaturePad';

interface DrawState {
  pageNumber: number;
  tool: AnnotationType;
  start: { x: number; y: number };
  current: { x: number; y: number };
  points: { x: number; y: number }[];
}

const ANNOTATION_COLORS = [
  '#facc15',
  '#3b82f6',
  '#ef4444',
  '#10b981',
  '#f97316',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
];

const ZOOM_PRESETS = [50, 75, 100, 125, 150, 200, 300, 400];

const PDFViewerContent: FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const {
    getDocument,
    addAnnotation,
    updateAnnotation,
    deleteAnnotation,
    getAnnotationsByDocument,
    getBookmarksByDocument,
    addBookmark,
    deleteBookmark,
    openDocument,
    rotatePage,
    getFormFieldsByDocument,
    addFormField,
    updateFormField,
    deleteFormField,
    createDocument,
  } = useData();
  const { addToast } = useToast();

  const [doc, setDoc] = useState<Awaited<
    ReturnType<typeof getDocument>
  > | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [layout, setLayout] = useState<'single' | 'continuous'>('single');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarTab, setSidebarTab] = useState<
    'pages' | 'bookmarks' | 'annotations' | 'forms' | 'properties'
  >('pages');
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [fieldDrag, setFieldDrag] = useState<{
    id: string;
    mode: 'move' | 'resize';
    startX: number;
    startY: number;
  } | null>(null);
  const [signatureOpen, setSignatureOpen] = useState(false);
  const [signingFieldId, setSigningFieldId] = useState<string | null>(null);
  const [printOpen, setPrintOpen] = useState(false);
  const [printSettings, setPrintSettings] = useState({
    pages: 'all' as 'all' | 'current' | 'range',
    range: '',
    copies: 1,
    headers: true,
  });
  const [activeAnnotationTool, setActiveAnnotationTool] =
    useState<AnnotationType | null>(null);
  const [annotationColor, setAnnotationColor] = useState(ANNOTATION_COLORS[0]);
  const [drawing, setDrawing] = useState<DrawState | null>(null);
  const [past, setPast] = useState<Annotation[][]>([]);
  const [future, setFuture] = useState<Annotation[][]>([]);
  const [commentOpenId, setCommentOpenId] = useState<string | null>(null);
  const [commentDraft, setCommentDraft] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchIndex, setSearchIndex] = useState(0);
  const [fitMode, setFitMode] = useState<'width' | 'page' | 'actual'>('width');
  const [showGoToDialog, setShowGoToDialog] = useState(false);
  const [goToPage, setGoToPage] = useState('');
  const [presentation, setPresentation] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      const d = await getDocument(id);
      setDoc(d);
      if (d) await openDocument(id);
    };
    load();
  }, [id, getDocument, openDocument]);

  useEffect(() => {
    const loadAnnotations = async () => {
      if (!doc) return;
      const anns = await getAnnotationsByDocument(doc.id);
      setAnnotations(anns);
      const bms = await getBookmarksByDocument(doc.id);
      setBookmarks(bms);
      const ffs = await getFormFieldsByDocument(doc.id);
      setFormFields(ffs);
    };
    loadAnnotations();
  }, [
    doc,
    getAnnotationsByDocument,
    getBookmarksByDocument,
    getFormFieldsByDocument,
  ]);

  const totalPages = doc?.pageCount ?? 0;

  const navigateToPage = useCallback(
    (page: number) => {
      const clamped = Math.max(1, Math.min(totalPages, page));
      setCurrentPage(clamped);
      if (layout === 'continuous') {
        pageRefs.current[clamped - 1]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    },
    [totalPages, layout]
  );

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(z + 25, 400));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(z - 25, 25));
  }, []);

  const handleScroll = useCallback(() => {
    if (layout !== 'continuous' || !scrollRef.current) return;
    const container = scrollRef.current;
    const scrollTop = container.scrollTop;
    let page = 1;
    pageRefs.current.forEach((el, i) => {
      if (el && el.offsetTop <= scrollTop + container.clientHeight * 0.25) {
        page = i + 1;
      }
    });
    setCurrentPage(page);
  }, [layout]);

  const searchMatches = useMemo(() => {
    if (!doc || !searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const result: { pageNumber: number; matchId: string }[] = [];
    for (const page of doc.pages) {
      for (const tb of page.textBlocks) {
        let occurrence = 0;
        let idx = tb.content.toLowerCase().indexOf(q);
        while (idx !== -1) {
          result.push({
            pageNumber: page.pageNumber,
            matchId: `${tb.id}-m${occurrence}`,
          });
          occurrence += 1;
          idx = tb.content.toLowerCase().indexOf(q, idx + q.length);
        }
      }
    }
    return result;
  }, [doc, searchQuery]);

  const activeMatchId = searchMatches[searchIndex]?.matchId;

  useEffect(() => {
    setSearchIndex(0);
  }, [searchQuery, doc?.id]);

  const handleNextMatch = useCallback(() => {
    if (searchMatches.length === 0) return;
    const next = (searchIndex + 1) % searchMatches.length;
    setSearchIndex(next);
    navigateToPage(searchMatches[next].pageNumber);
  }, [searchMatches, searchIndex, navigateToPage]);

  const handlePrevMatch = useCallback(() => {
    if (searchMatches.length === 0) return;
    const prev =
      (searchIndex - 1 + searchMatches.length) % searchMatches.length;
    setSearchIndex(prev);
    navigateToPage(searchMatches[prev].pageNumber);
  }, [searchMatches, searchIndex, navigateToPage]);

  const handleTogglePresentation = useCallback(() => {
    if (presentation) {
      setPresentation(false);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    } else {
      setPresentation(true);
      const el = containerRef.current;
      if (el?.requestFullscreen) {
        el.requestFullscreen().catch(() => {});
      }
    }
  }, [presentation]);

  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) setPresentation(false);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const handleRotate = useCallback(async () => {
    if (!doc) return;
    const updated = await rotatePage(doc.id, currentPage, 90);
    if (updated) {
      setDoc(updated);
      addToast('Page rotated', 'success');
    }
  }, [doc, currentPage, rotatePage, addToast]);

  const handleGoToPage = useCallback(() => {
    const page = parseInt(goToPage, 10);
    if (page >= 1 && page <= totalPages) {
      navigateToPage(page);
      setShowGoToDialog(false);
      setGoToPage('');
    }
  }, [goToPage, totalPages, navigateToPage]);

  const handleAddBookmark = useCallback(async () => {
    if (!doc) return;
    await addBookmark({
      documentId: doc.id,
      pageNumber: currentPage,
      title: `Page ${currentPage}`,
    });
    addToast('Bookmark added', 'success');
  }, [doc, currentPage, addBookmark, addToast]);

  const handlePrint = useCallback(() => {
    setPrintOpen(true);
  }, []);

  const handleDoPrint = useCallback(() => {
    setPrintOpen(false);
    window.print();
  }, []);

  const handleAddFormField = useCallback(
    async (type: FormField['type']) => {
      if (!doc) return;
      const count = formFields.filter(
        (f) => f.pageNumber === currentPage
      ).length;
      const field = await addFormField({
        documentId: doc.id,
        pageNumber: currentPage,
        type,
        label:
          type === 'signature'
            ? `Signature ${count + 1}`
            : `${type} ${count + 1}`,
        value: '',
        x: 60,
        y: 80 + count * 40,
        width: type === 'signature' ? 220 : 180,
        height: type === 'signature' ? 80 : 24,
        options:
          type === 'dropdown'
            ? ['Option A', 'Option B']
            : type === 'radio'
              ? ['Yes', 'No']
              : undefined,
      });
      setFormFields((prev) => [...prev, field]);
      setSelectedFieldId(field.id);
      if (type === 'signature') {
        setSigningFieldId(field.id);
        setSignatureOpen(true);
      }
    },
    [doc, currentPage, formFields, addFormField]
  );

  const detectFormFields = useCallback(async () => {
    if (!doc) return;
    const detected: Array<Omit<FormField, 'id'> & { documentId: string }> = [];
    for (const page of doc.pages) {
      for (const tb of page.textBlocks) {
        const content = tb.content.trim();
        if (content.endsWith(':') || content.endsWith('?')) {
          detected.push({
            documentId: doc.id,
            pageNumber: page.pageNumber,
            type: 'text',
            label: content.replace(/[:?]$/, '').trim(),
            value: '',
            x: tb.x + tb.width + 12,
            y: tb.y,
            width: 180,
            height: 24,
          });
        } else if (content.includes('[]')) {
          detected.push({
            documentId: doc.id,
            pageNumber: page.pageNumber,
            type: 'checkbox',
            label: content.replace('[]', '').trim(),
            value: '',
            x: tb.x,
            y: tb.y,
            width: 20,
            height: 20,
          });
        }
      }
    }
    for (const f of detected) await addFormField(f);
    const ffs = await getFormFieldsByDocument(doc.id);
    setFormFields(ffs);
    addToast(`Detected ${detected.length} form field(s)`, 'success');
  }, [doc, addFormField, getFormFieldsByDocument, addToast]);

  const handleFieldChange = useCallback(
    async (field: FormField, value: string) => {
      const updated = { ...field, value };
      setFormFields((prev) =>
        prev.map((f) => (f.id === field.id ? updated : f))
      );
      await updateFormField(updated);
    },
    [updateFormField]
  );

  const handleFieldDragStart = useCallback(
    (field: FormField, mode: 'move' | 'resize') =>
      (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedFieldId(field.id);
        setFieldDrag({
          id: field.id,
          mode,
          startX: e.clientX,
          startY: e.clientY,
        });
      },
    []
  );

  const handleFieldDragMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!fieldDrag) return;
      const dx = ((e.clientX - fieldDrag.startX) * 100) / zoom;
      const dy = ((e.clientY - fieldDrag.startY) * 100) / zoom;
      setFormFields((prev) =>
        prev.map((f) => {
          if (f.id !== fieldDrag.id) return f;
          if (fieldDrag.mode === 'move') {
            return { ...f, x: f.x + dx, y: f.y + dy };
          }
          return {
            ...f,
            width: Math.max(40, f.width + dx),
            height: Math.max(20, f.height + dy),
          };
        })
      );
    },
    [fieldDrag, zoom]
  );

  const handleFieldDragEnd = useCallback(async () => {
    if (!fieldDrag) return;
    const updated = formFields.find((f) => f.id === fieldDrag.id);
    setFieldDrag(null);
    if (updated) await updateFormField(updated);
  }, [fieldDrag, formFields, updateFormField]);

  const handleSignatureSave = useCallback(
    async (value: string) => {
      if (!signingFieldId) return;
      const field = formFields.find((f) => f.id === signingFieldId);
      setSignatureOpen(false);
      setSigningFieldId(null);
      if (!field) return;
      await handleFieldChange(field, value);
      addToast('Signature saved', 'success');
    },
    [signingFieldId, formFields, handleFieldChange, addToast]
  );

  const handleExportForm = useCallback(async () => {
    if (!doc) return;
    const exported: PDFDocument = {
      id: `doc-${generateId()}`,
      title: `${doc.title} (filled)`,
      filename: `${doc.filename.replace(/\.pdf$/i, '')}-filled.pdf`,
      author: doc.author,
      pageCount: doc.pageCount,
      fileSize: doc.fileSize,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      lastOpenedAt: Date.now(),
      thumbnailColor: doc.thumbnailColor,
      pages: doc.pages,
    };
    await createDocument(exported);
    for (const f of formFields) {
      await addFormField({
        documentId: exported.id,
        pageNumber: f.pageNumber,
        type: f.type,
        label: f.label,
        value: f.value,
        x: f.x,
        y: f.y,
        width: f.width,
        height: f.height,
        options: f.options,
      });
    }
    addToast(`Form exported as "${exported.title}"`, 'success');
  }, [doc, formFields, createDocument, addFormField, addToast]);

  useEffect(() => {
    const handleTabNav = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || sidebarTab !== 'forms') return;
      const pageFields = formFields.filter(
        (f) =>
          f.pageNumber === currentPage &&
          f.type !== 'signature' &&
          f.type !== 'radio'
      );
      if (!pageFields.length) return;
      e.preventDefault();
      const idx = pageFields.findIndex((f) => f.id === selectedFieldId);
      const next = pageFields[(idx + 1) % pageFields.length];
      setSelectedFieldId(next.id);
      const box = document.querySelector(`[data-field-id="${next.id}"]`);
      (box?.querySelector('input, select') as HTMLElement | null)?.focus();
    };
    window.addEventListener('keydown', handleTabNav);
    return () => window.removeEventListener('keydown', handleTabNav);
  }, [sidebarTab, formFields, currentPage, selectedFieldId]);

  const getPagePos = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, el: HTMLDivElement) => {
      const rect = el.getBoundingClientRect();
      return {
        x: ((e.clientX - rect.left) * 100) / zoom,
        y: ((e.clientY - rect.top) * 100) / zoom,
      };
    },
    [zoom]
  );

  const buildAnnotation = useCallback(
    (
      d: DrawState
    ): Omit<Annotation, 'id' | 'createdAt' | 'updatedAt'> | null => {
      if (!doc) return null;
      const base = {
        documentId: doc.id,
        pageNumber: d.pageNumber,
        type: d.tool,
        color: annotationColor,
        content: '',
        points: undefined,
      };
      if (d.tool === 'sticky-note') {
        return {
          ...base,
          x: d.start.x,
          y: d.start.y,
          width: 30,
          height: 30,
          content: 'New note',
        };
      }
      if (d.tool === 'freehand') {
        const xs = d.points.map((p) => p.x);
        const ys = d.points.map((p) => p.y);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        return {
          ...base,
          x: minX,
          y: minY,
          width: Math.max(maxX - minX, 1),
          height: Math.max(maxY - minY, 1),
          points: d.points,
        };
      }
      if (d.tool === 'line' || d.tool === 'arrow') {
        const end =
          Math.hypot(d.current.x - d.start.x, d.current.y - d.start.y) < 5
            ? { x: d.start.x + 100, y: d.start.y }
            : d.current;
        return {
          ...base,
          x: Math.min(d.start.x, end.x),
          y: Math.min(d.start.y, end.y),
          width: Math.abs(end.x - d.start.x),
          height: Math.abs(end.y - d.start.y),
          points: [d.start, end],
        };
      }
      const x = Math.min(d.start.x, d.current.x);
      const y = Math.min(d.start.y, d.current.y);
      const width = Math.abs(d.current.x - d.start.x) || 100;
      const height = Math.abs(d.current.y - d.start.y) || 30;
      return { ...base, x, y, width, height };
    },
    [doc, annotationColor]
  );

  const handleDrawStart = useCallback(
    (pageNumber: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      if (!activeAnnotationTool || !doc) return;
      e.preventDefault();
      const pos = getPagePos(e, e.currentTarget);
      setDrawing({
        pageNumber,
        tool: activeAnnotationTool,
        start: pos,
        current: pos,
        points: [pos],
      });
    },
    [activeAnnotationTool, doc, getPagePos]
  );

  const handleDrawMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!drawing) return;
      const pos = getPagePos(e, e.currentTarget);
      setDrawing((d) =>
        d ? { ...d, current: pos, points: [...d.points, pos] } : d
      );
    },
    [drawing, getPagePos]
  );

  const handleDrawEnd = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      if (!drawing || !doc) return;
      const pos = getPagePos(e, e.currentTarget);
      const finalState = {
        ...drawing,
        current: pos,
        points: [...drawing.points, pos],
      };
      setDrawing(null);
      const base = buildAnnotation(finalState);
      if (!base) return;
      setPast((p) => [...p, annotations]);
      setFuture([]);
      const created = await addAnnotation(base);
      setAnnotations((prev) => [...prev, created]);
      addToast('Annotation added', 'success');
    },
    [
      drawing,
      doc,
      getPagePos,
      buildAnnotation,
      annotations,
      addAnnotation,
      addToast,
    ]
  );

  const handleDrawCancel = useCallback(() => {
    setDrawing(null);
  }, []);

  const handleUndo = useCallback(() => {
    setPast((prev) => {
      const last = prev[prev.length - 1];
      if (!last) return prev;
      setFuture((f) => [annotations, ...f]);
      setAnnotations(last);
      return prev.slice(0, -1);
    });
  }, [annotations]);

  const handleRedo = useCallback(() => {
    setFuture((prev) => {
      const next = prev[0];
      if (!next) return prev;
      setPast((p) => [...p, annotations]);
      setAnnotations(next);
      return prev.slice(1);
    });
  }, [annotations]);

  const handleAddComment = useCallback(
    async (ann: Annotation) => {
      const text = commentDraft[ann.id]?.trim();
      if (!text) return;
      const comment: AnnotationComment = {
        id: generateId(),
        text,
        author: 'You',
        createdAt: Date.now(),
      };
      const updated: Annotation = {
        ...ann,
        comments: [...(ann.comments ?? []), comment],
      };
      await updateAnnotation(updated);
      setAnnotations((prev) =>
        prev.map((a) => (a.id === ann.id ? updated : a))
      );
      setCommentDraft((d) => ({ ...d, [ann.id]: '' }));
    },
    [commentDraft, updateAnnotation]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === '=' || e.key === '+') {
          e.preventDefault();
          handleZoomIn();
        }
        if (e.key === '-') {
          e.preventDefault();
          handleZoomOut();
        }
        if (e.key === '0') {
          e.preventDefault();
          setZoom(100);
        }
        if (e.key === 'f') {
          e.preventDefault();
          setSearchOpen((o) => !o);
        }
        if (e.key === 'g') {
          e.preventDefault();
          setShowGoToDialog(true);
        }
        if (e.key === 'p') {
          e.preventDefault();
          handlePrint();
        }
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        navigateToPage(currentPage - 1);
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        navigateToPage(currentPage + 1);
      }
      if (e.key === 'Home') {
        e.preventDefault();
        navigateToPage(1);
      }
      if (e.key === 'End') {
        e.preventDefault();
        navigateToPage(totalPages);
      }
      if (e.key === 'Escape') {
        if (presentation) {
          setPresentation(false);
          return;
        }
        setActiveAnnotationTool(null);
        setSearchOpen(false);
        setShowGoToDialog(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handleZoomIn,
    handleZoomOut,
    handlePrint,
    navigateToPage,
    currentPage,
    totalPages,
    presentation,
  ]);

  const previewAnnotation = useMemo<Annotation | null>(() => {
    if (!drawing || !doc) return null;
    const base = buildAnnotation(drawing);
    if (!base) return null;
    return { ...base, id: 'preview', createdAt: 0, updatedAt: 0 };
  }, [drawing, doc, buildAnnotation]);

  if (!doc) {
    return <ViewerSkeleton />;
  }

  const currentRotation = doc.pages[currentPage - 1]?.rotation ?? 0;
  const currentPageAnnotations = annotations.filter(
    (a) => a.documentId === doc.id && a.pageNumber === currentPage
  );
  const currentPageFormFields = formFields.filter(
    (f) => f.pageNumber === currentPage
  );

  return (
    <div ref={containerRef} className="bg-base-200 flex h-screen flex-col">
      <div className="bg-base-100 border-base-300 no-print flex items-center gap-2 border-b px-4 py-2">
        <Link
          href="/"
          className="btn btn-ghost btn-sm btn-circle"
          aria-label="Back to library">
          <FiArrowLeft className="size-4" />
        </Link>
        <h1 className="text-base-content truncate text-sm font-medium">
          {doc.title}
        </h1>
        <div className="ml-auto flex items-center gap-1">
          {searchOpen && (
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-sm w-48"
              autoFocus
            />
          )}
          <button
            type="button"
            onClick={() => setSearchOpen((o) => !o)}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Search">
            <FiSearch className="size-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Zoom out">
            <FiZoomOut className="size-4" />
          </button>
          <span
            className="text-base-content/60 min-w-[4rem] text-center text-xs"
            aria-label="Zoom level">
            {zoom}%
          </span>
          <input
            type="range"
            min={25}
            max={400}
            step={25}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="range range-primary range-xs hidden w-24 sm:block"
            aria-label="Zoom slider"
          />
          <select
            value={ZOOM_PRESETS.includes(zoom) ? zoom : ''}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="select select-ghost select-sm hidden w-20 text-xs lg:block"
            aria-label="Zoom presets">
            <option value="" disabled>
              Presets
            </option>
            {ZOOM_PRESETS.map((preset) => (
              <option key={preset} value={preset}>
                {preset}%
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleZoomIn}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Zoom in">
            <FiZoomIn className="size-4" />
          </button>
          <div className="divider divider-horizontal" />
          <button
            type="button"
            onClick={() =>
              setFitMode(
                fitMode === 'width'
                  ? 'page'
                  : fitMode === 'page'
                    ? 'actual'
                    : 'width'
              )
            }
            className="btn btn-ghost btn-sm text-xs">
            {fitMode === 'width'
              ? 'Fit Width'
              : fitMode === 'page'
                ? 'Fit Page'
                : 'Actual'}
          </button>
          <button
            type="button"
            onClick={() =>
              setLayout(layout === 'single' ? 'continuous' : 'single')
            }
            className="btn btn-ghost btn-sm text-xs"
            aria-label={`Switch to ${layout === 'single' ? 'continuous' : 'single'} scroll`}>
            {layout === 'single' ? 'Continuous' : 'Single'}
          </button>
          <button
            type="button"
            onClick={handleRotate}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Rotate page">
            <FiRotateCw className="size-4" />
          </button>
          <div className="divider divider-horizontal" />
          <button
            type="button"
            onClick={() => navigateToPage(currentPage - 1)}
            className="btn btn-ghost btn-sm btn-circle"
            disabled={currentPage <= 1}
            aria-label="Previous page">
            <FiChevronLeft className="size-4" />
          </button>
          <span className="text-base-content/60 text-xs">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => navigateToPage(currentPage + 1)}
            className="btn btn-ghost btn-sm btn-circle"
            disabled={currentPage >= totalPages}
            aria-label="Next page">
            <FiChevronRight className="size-4" />
          </button>
          <div className="divider divider-horizontal" />
          <Link
            href={`/pdf/edit?id=${id}`}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Edit">
            <FiEdit2 className="size-4" />
          </Link>
          <button
            type="button"
            onClick={handlePrint}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Print">
            <FiPrinter className="size-4" />
          </button>
          <button
            type="button"
            onClick={handleTogglePresentation}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Presentation mode">
            <FiMaximize className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setSidebarOpen((o) => !o)}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Toggle sidebar">
            <FiSidebar className="size-4" />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="bg-base-100 border-base-300 no-print flex items-center gap-2 border-b px-4 py-1 text-xs">
          <span className="text-base-content/60 w-24">
            {searchQuery.trim() && searchMatches.length > 0
              ? `${searchIndex + 1} / ${searchMatches.length} matches`
              : 'No matches'}
          </span>
          <button
            type="button"
            onClick={handlePrevMatch}
            className="btn btn-ghost btn-xs btn-circle"
            aria-label="Previous match">
            <FiChevronUp className="size-3" />
          </button>
          <button
            type="button"
            onClick={handleNextMatch}
            className="btn btn-ghost btn-xs btn-circle"
            aria-label="Next match">
            <FiChevronDown className="size-3" />
          </button>
          <div className="flex-1" />
          <button
            type="button"
            onClick={() => {
              setSearchOpen(false);
              setSearchQuery('');
            }}
            className="btn btn-ghost btn-xs"
            aria-label="Clear search">
            Clear
          </button>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <div className="bg-base-100 border-base-300 no-print flex w-48 flex-col border-r">
            <div className="flex border-b">
              {(
                [
                  'pages',
                  'bookmarks',
                  'annotations',
                  'forms',
                  'properties',
                ] as const
              ).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSidebarTab(tab)}
                  className={`flex-1 p-2 text-xs capitalize ${sidebarTab === tab ? 'border-primary text-primary border-b-2' : 'text-base-content/60'}`}>
                  {tab === 'properties' ? (
                    <FiInfo className="inline size-3" />
                  ) : null}
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {sidebarTab === 'pages' &&
                doc.pages.map((page) => (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => navigateToPage(page.pageNumber)}
                    className={`mb-2 w-full rounded p-1 text-left ${currentPage === page.pageNumber ? 'bg-primary/20 ring-primary ring-1' : 'bg-base-200 hover:bg-base-300'}`}>
                    <div className="flex h-20 items-center justify-center rounded bg-white text-xs">
                      {page.pageNumber}
                    </div>
                    <p className="text-base-content/60 mt-1 text-center text-[10px]">
                      {page.pageNumber}
                    </p>
                  </button>
                ))}
              {sidebarTab === 'bookmarks' && (
                <>
                  <button
                    type="button"
                    onClick={handleAddBookmark}
                    className="btn btn-ghost btn-xs mb-2 w-full gap-1">
                    <FiBookmark className="size-3" /> Add Bookmark
                  </button>
                  {bookmarks.map((bm) => (
                    <button
                      key={bm.id}
                      type="button"
                      onClick={() => navigateToPage(bm.pageNumber)}
                      className="hover:bg-base-300 mb-1 flex w-full items-center gap-2 rounded p-2 text-left text-xs">
                      <FiBookmark className="text-warning size-3 shrink-0" />
                      <span className="truncate">{bm.title}</span>
                    </button>
                  ))}
                </>
              )}
              {sidebarTab === 'annotations' && (
                <>
                  <div className="mb-2 flex flex-wrap gap-1">
                    {[
                      { type: 'highlight' as const, icon: FiEye },
                      { type: 'underline' as const, icon: FiUnderline },
                      { type: 'strikethrough' as const, icon: FiDelete },
                      { type: 'sticky-note' as const, icon: FiMessageSquare },
                      { type: 'freehand' as const, icon: FiPenTool },
                      { type: 'rectangle' as const, icon: FiSquare },
                      { type: 'circle' as const, icon: FiCircle },
                      { type: 'arrow' as const, icon: FiArrowRight },
                      { type: 'line' as const, icon: FiMinus },
                    ].map(({ type, icon: Icon }) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setActiveAnnotationTool(
                            activeAnnotationTool === type ? null : type
                          )
                        }
                        className={`btn btn-xs btn-circle ${activeAnnotationTool === type ? 'btn-primary' : 'btn-ghost'}`}
                        aria-label={type}>
                        <Icon className="size-3" />
                      </button>
                    ))}
                  </div>
                  <div className="mb-2 flex gap-1">
                    {ANNOTATION_COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setAnnotationColor(color)}
                        className={`size-4 rounded-full border-2 ${annotationColor === color ? 'border-white' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="mb-2 flex gap-1">
                    <button
                      type="button"
                      onClick={handleUndo}
                      disabled={past.length === 0}
                      className="btn btn-ghost btn-xs"
                      aria-label="Undo annotation">
                      Undo
                    </button>
                    <button
                      type="button"
                      onClick={handleRedo}
                      disabled={future.length === 0}
                      className="btn btn-ghost btn-xs"
                      aria-label="Redo annotation">
                      Redo
                    </button>
                  </div>
                  {annotations
                    .filter((a) => a.documentId === doc.id)
                    .map((ann) => (
                      <div key={ann.id} className="mb-1 rounded text-xs">
                        <div className="hover:bg-base-300 flex items-center gap-2 rounded p-2">
                          <div
                            className="size-2 rounded-full"
                            style={{ backgroundColor: ann.color }}
                          />
                          <button
                            type="button"
                            onClick={() => navigateToPage(ann.pageNumber)}
                            className="flex-1 truncate text-left">
                            {ann.content || ann.type} (p.{ann.pageNumber})
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setCommentOpenId(
                                commentOpenId === ann.id ? null : ann.id
                              )
                            }
                            className="btn btn-ghost btn-xs btn-circle"
                            aria-label={`Comments for ${ann.type} annotation`}>
                            <FiMessageSquare className="size-3" />
                          </button>
                          <button
                            type="button"
                            onClick={async () => {
                              await deleteAnnotation(ann.id);
                              setAnnotations((prev) =>
                                prev.filter((a) => a.id !== ann.id)
                              );
                            }}
                            className="btn btn-ghost btn-xs btn-circle"
                            aria-label={`Delete ${ann.type} annotation`}>
                            <FiX className="size-2" />
                          </button>
                        </div>
                        {commentOpenId === ann.id && (
                          <div className="bg-base-200 space-y-1 rounded p-2">
                            {(ann.comments ?? []).map((c) => (
                              <div key={c.id} className="text-base-content/80">
                                <span className="font-medium">
                                  {c.author}:{' '}
                                </span>
                                {c.text}
                              </div>
                            ))}
                            <div className="flex gap-1">
                              <input
                                type="text"
                                placeholder="Add a comment..."
                                value={commentDraft[ann.id] ?? ''}
                                onChange={(e) =>
                                  setCommentDraft((d) => ({
                                    ...d,
                                    [ann.id]: e.target.value,
                                  }))
                                }
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleAddComment(ann);
                                }}
                                className="input input-xs w-full"
                                aria-label={`Comment input for ${ann.type} annotation`}
                              />
                              <button
                                type="button"
                                onClick={() => handleAddComment(ann)}
                                className="btn btn-primary btn-xs"
                                aria-label={`Add comment to ${ann.type} annotation`}>
                                Add
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </>
              )}
              {sidebarTab === 'forms' && (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={detectFormFields}
                    className="btn btn-ghost btn-xs w-full gap-1">
                    <FiSearch className="size-3" /> Detect Fields
                  </button>
                  <div className="flex flex-wrap gap-1">
                    {(
                      ['text', 'checkbox', 'radio', 'dropdown', 'date'] as const
                    ).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleAddFormField(type)}
                        className="btn btn-ghost btn-xs"
                        aria-label={`Add ${type} field`}>
                        {type}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddFormField('signature')}
                    className="btn btn-outline btn-xs w-full gap-1">
                    <FiPenTool className="size-3" /> Add Signature
                  </button>
                  <p className="text-base-content/50 text-[10px]">
                    Click a field to select it, drag its handles to move or
                    resize. Press Tab to jump between fields.
                  </p>
                  {formFields
                    .filter((f) => f.pageNumber === currentPage)
                    .map((f) => (
                      <div
                        key={f.id}
                        className="bg-base-200 flex items-center gap-2 rounded px-2 py-1 text-xs">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFieldId(f.id);
                            navigateToPage(f.pageNumber);
                          }}
                          className="flex-1 truncate text-left">
                          {f.label}
                        </button>
                        <span className="text-base-content/40 text-[10px]">
                          {f.type}
                        </span>
                        <button
                          type="button"
                          onClick={async () => {
                            await deleteFormField(f.id);
                            setFormFields((prev) =>
                              prev.filter((x) => x.id !== f.id)
                            );
                          }}
                          className="btn btn-ghost btn-xs btn-circle"
                          aria-label={`Delete ${f.label} field`}>
                          <FiX className="size-2" />
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={handleExportForm}
                    className="btn btn-primary btn-xs w-full gap-1">
                    <FiDownload className="size-3" /> Export Filled Form
                  </button>
                </div>
              )}
              {sidebarTab === 'properties' && (
                <div className="space-y-3 p-1 text-xs">
                  {[
                    { label: 'Title', value: doc.title },
                    { label: 'File name', value: doc.filename },
                    { label: 'Author', value: doc.author },
                    { label: 'Pages', value: String(doc.pageCount) },
                    { label: 'Size', value: formatFileSize(doc.fileSize) },
                    { label: 'Created', value: formatDate(doc.createdAt) },
                    { label: 'Modified', value: formatDate(doc.updatedAt) },
                    {
                      label: 'Last opened',
                      value: formatDate(doc.lastOpenedAt),
                    },
                  ].map((row) => (
                    <div key={row.label}>
                      <p className="text-base-content/50 mb-0.5">{row.label}</p>
                      <p className="text-base-content break-all">{row.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseMove={handleFieldDragMove}
          onMouseUp={handleFieldDragEnd}
          onMouseLeave={handleFieldDragEnd}
          className="relative flex flex-1 justify-center overflow-auto p-4">
          {showGoToDialog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-base-100 rounded-lg p-6 shadow-xl">
                <h3 className="text-base-content mb-4 font-semibold">
                  Go to Page
                </h3>
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={goToPage}
                  onChange={(e) => setGoToPage(e.target.value)}
                  className="input input-bordered mb-4 w-full"
                  placeholder={`1-${totalPages}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleGoToPage();
                  }}
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowGoToDialog(false)}
                    className="btn btn-ghost btn-sm">
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleGoToPage}
                    className="btn btn-primary btn-sm">
                    Go
                  </button>
                </div>
              </div>
            </div>
          )}
          {layout === 'single' ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.15 }}>
                <div className="relative" data-page-number={currentPage}>
                  <PageView
                    page={doc.pages[currentPage - 1]}
                    zoom={zoom}
                    rotation={currentRotation}
                    annotations={currentPageAnnotations}
                    searchQuery={searchQuery}
                    activeMatchId={activeMatchId}
                    preview={previewAnnotation}
                    onMouseDown={handleDrawStart(currentPage)}
                    onMouseMove={handleDrawMove}
                    onMouseUp={handleDrawEnd}
                    onMouseLeave={handleDrawCancel}
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      transform: currentRotation
                        ? `rotate(${currentRotation}deg)`
                        : undefined,
                      transformOrigin: 'center top',
                    }}>
                    <FormFieldsLayer
                      fields={currentPageFormFields}
                      zoom={zoom}
                      editable={sidebarTab === 'forms'}
                      selectedId={selectedFieldId}
                      onSelect={setSelectedFieldId}
                      onChange={handleFieldChange}
                      onDragStart={handleFieldDragStart}
                      onSign={(field) => {
                        setSigningFieldId(field.id);
                        setSignatureOpen(true);
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div
              className="flex w-full flex-col items-center gap-8"
              aria-label="Continuous pages">
              {doc.pages.map((page) => (
                <div
                  key={page.id}
                  ref={(el) => {
                    pageRefs.current[page.pageNumber - 1] = el;
                  }}
                  onClick={() => setCurrentPage(page.pageNumber)}>
                  <div className="relative">
                    <PageView
                      page={page}
                      zoom={zoom}
                      rotation={page.rotation}
                      annotations={annotations.filter(
                        (a) => a.documentId === doc.id
                      )}
                      searchQuery={searchQuery}
                      activeMatchId={activeMatchId}
                      preview={previewAnnotation}
                      onMouseDown={handleDrawStart(page.pageNumber)}
                      onMouseMove={handleDrawMove}
                      onMouseUp={handleDrawEnd}
                      onMouseLeave={handleDrawCancel}
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        transform: page.rotation
                          ? `rotate(${page.rotation}deg)`
                          : undefined,
                        transformOrigin: 'center top',
                      }}>
                      <FormFieldsLayer
                        fields={formFields.filter(
                          (f) => f.pageNumber === page.pageNumber
                        )}
                        zoom={zoom}
                        editable={sidebarTab === 'forms'}
                        selectedId={selectedFieldId}
                        onSelect={setSelectedFieldId}
                        onChange={handleFieldChange}
                        onDragStart={handleFieldDragStart}
                        onSign={(field) => {
                          setSigningFieldId(field.id);
                          setSignatureOpen(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <AnimatePresence>
            {presentation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black"
                aria-label="Presentation view">
                <div className="absolute top-4 right-4 flex items-center gap-3">
                  <span className="text-xs text-white/60">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={handleTogglePresentation}
                    className="btn btn-ghost btn-sm btn-circle text-white"
                    aria-label="Exit presentation">
                    <FiX className="size-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => navigateToPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="btn btn-ghost btn-circle absolute left-4 text-white"
                  aria-label="Previous slide">
                  <FiChevronLeft className="size-8" />
                </button>
                <PageView
                  page={doc.pages[currentPage - 1]}
                  zoom={120}
                  rotation={currentRotation}
                  annotations={currentPageAnnotations}
                />
                <button
                  type="button"
                  onClick={() => navigateToPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="btn btn-ghost btn-circle absolute right-4 text-white"
                  aria-label="Next slide">
                  <FiChevronRight className="size-8" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {signatureOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
              role="dialog"
              aria-label="Signature dialog">
              <SignaturePad
                initialValue={
                  formFields.find((f) => f.id === signingFieldId)?.value ?? ''
                }
                onSave={handleSignatureSave}
                onClose={() => {
                  setSignatureOpen(false);
                  setSigningFieldId(null);
                }}
              />
            </div>
          )}

          {printOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
              role="dialog"
              aria-label="Print dialog">
              <div className="bg-base-100 w-full max-w-sm rounded-lg p-6 shadow-xl">
                <h3 className="text-base-content mb-4 font-semibold">Print</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <p className="text-base-content/60 mb-1">Pages</p>
                    <div className="flex gap-3">
                      {(['all', 'current', 'range'] as const).map((p) => (
                        <label key={p} className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="print-pages"
                            checked={printSettings.pages === p}
                            onChange={() =>
                              setPrintSettings((s) => ({ ...s, pages: p }))
                            }
                            className="radio radio-xs"
                          />
                          {p}
                        </label>
                      ))}
                    </div>
                    {printSettings.pages === 'range' && (
                      <input
                        type="text"
                        value={printSettings.range}
                        onChange={(e) =>
                          setPrintSettings((s) => ({
                            ...s,
                            range: e.target.value,
                          }))
                        }
                        placeholder="e.g. 1-3,5"
                        className="input input-bordered input-xs mt-1 w-full"
                        aria-label="Print page range"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-base-content/60 mb-1">Copies</p>
                    <input
                      type="number"
                      min={1}
                      value={printSettings.copies}
                      onChange={(e) =>
                        setPrintSettings((s) => ({
                          ...s,
                          copies: Number(e.target.value),
                        }))
                      }
                      className="input input-bordered input-xs w-full"
                      aria-label="Print copies"
                    />
                  </div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={printSettings.headers}
                      onChange={(e) =>
                        setPrintSettings((s) => ({
                          ...s,
                          headers: e.target.checked,
                        }))
                      }
                      className="checkbox checkbox-xs"
                    />
                    Include headers and footers
                  </label>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setPrintOpen(false)}
                    className="btn btn-ghost btn-sm">
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDoPrint}
                    className="btn btn-primary btn-sm"
                    aria-label="Print document">
                    Print
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-base-100 border-base-300 no-print flex items-center justify-between border-t px-4 py-1">
        <span className="text-base-content/50 text-xs">
          {formatPageNumber(currentPage, totalPages)}
        </span>
        <div className="flex items-center gap-2">
          <Link href={`/pdf/merge?id=${id}`} className="btn btn-ghost btn-xs">
            Merge/Split
          </Link>
          <Link href={`/pdf/compare?id=${id}`} className="btn btn-ghost btn-xs">
            Compare
          </Link>
        </div>
      </div>
    </div>
  );
};

const ViewerPage: FC = () => (
  <Providers>
    <Suspense fallback={<ViewerSkeleton />}>
      <PDFViewerContent />
    </Suspense>
  </Providers>
);

export default ViewerPage;

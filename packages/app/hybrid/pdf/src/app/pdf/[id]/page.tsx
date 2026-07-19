'use client';

import { type FC, useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  FiArrowLeft,
  FiZoomIn,
  FiZoomOut,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
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
  FiCheck,
  FiPrinter,
  FiMaximize,
  FiMinimize,
  FiType,
} from 'react-icons/fi';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { formatPageNumber } from '@/utils/format';
import type { Annotation, AnnotationType, Bookmark } from '@/types';
import { generateId } from '@/data/models';

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

const PDFViewer: FC = () => {
  const params = useParams();
  const id = params.id as string;
  const {
    getDocument,
    addAnnotation,
    deleteAnnotation,
    addBookmark,
    deleteBookmark,
    openDocument,
  } = useData();
  const { addToast } = useToast();

  const [doc, setDoc] = useState<Awaited<
    ReturnType<typeof getDocument>
  > | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarTab, setSidebarTab] = useState<
    'pages' | 'bookmarks' | 'annotations'
  >('pages');
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [activeAnnotationTool, setActiveAnnotationTool] =
    useState<AnnotationType | null>(null);
  const [annotationColor, setAnnotationColor] = useState(ANNOTATION_COLORS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [fitMode, setFitMode] = useState<'width' | 'page' | 'actual'>('width');
  const [showGoToDialog, setShowGoToDialog] = useState(false);
  const [goToPage, setGoToPage] = useState('');
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      const d = await getDocument(id);
      setDoc(d);
      if (d) await openDocument(id);
    };
    load();
  }, [id, getDocument, openDocument]);

  useEffect(() => {
    const loadAnnotations = async () => {
      if (!doc) return;
      const anns = await useData().getAnnotationsByDocument(doc.id);
      setAnnotations(anns);
      const bms = await useData().getBookmarksByDocument(doc.id);
      setBookmarks(bms);
    };
    loadAnnotations();
  }, [doc]);

  const totalPages = doc?.pageCount ?? 0;

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(z + 25, 400));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(z - 25, 25));
  }, []);

  const handleGoToPage = useCallback(() => {
    const page = parseInt(goToPage, 10);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setShowGoToDialog(false);
      setGoToPage('');
    }
  }, [goToPage, totalPages]);

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
    window.print();
  }, []);

  const handlePageClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!activeAnnotationTool || !doc) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const addAnnotationFn = useData().addAnnotation;
      addAnnotationFn({
        documentId: doc.id,
        pageNumber: currentPage,
        type: activeAnnotationTool,
        color: annotationColor,
        x,
        y,
        width: 100,
        height: 30,
        content: activeAnnotationTool === 'sticky-note' ? 'New note' : '',
      });
      addToast('Annotation added', 'success');
    },
    [activeAnnotationTool, doc, currentPage, annotationColor, addToast]
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
        setCurrentPage((p) => Math.max(1, p - 1));
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setCurrentPage((p) => Math.min(totalPages, p + 1));
      }
      if (e.key === 'Home') {
        e.preventDefault();
        setCurrentPage(1);
      }
      if (e.key === 'End') {
        e.preventDefault();
        setCurrentPage(totalPages);
      }
      if (e.key === 'Escape') {
        setActiveAnnotationTool(null);
        setSearchOpen(false);
        setShowGoToDialog(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleZoomIn, handleZoomOut, handlePrint, totalPages]);

  if (!doc) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  const currentRotation = doc.pages[currentPage - 1]?.rotation ?? 0;

  return (
    <div className="bg-base-200 flex h-screen flex-col">
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
          <span className="text-base-content/60 min-w-[4rem] text-center text-xs">
            {zoom}%
          </span>
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
          <div className="divider divider-horizontal" />
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="btn btn-ghost btn-sm btn-circle"
            disabled={currentPage <= 1}>
            <FiChevronLeft className="size-4" />
          </button>
          <span className="text-base-content/60 text-xs">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="btn btn-ghost btn-sm btn-circle"
            disabled={currentPage >= totalPages}>
            <FiChevronRight className="size-4" />
          </button>
          <div className="divider divider-horizontal" />
          <Link
            href={`/pdf/${id}/edit`}
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
            onClick={() => setSidebarOpen((o) => !o)}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Toggle sidebar">
            <FiSidebar className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <div className="bg-base-100 border-base-300 no-print flex w-48 flex-col border-r">
            <div className="flex border-b">
              {(['pages', 'bookmarks', 'annotations'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSidebarTab(tab)}
                  className={`flex-1 p-2 text-xs capitalize ${sidebarTab === tab ? 'border-primary text-primary border-b-2' : 'text-base-content/60'}`}>
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
                    onClick={() => setCurrentPage(page.pageNumber)}
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
                      onClick={() => setCurrentPage(bm.pageNumber)}
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
                  {annotations
                    .filter((a) => a.documentId === doc.id)
                    .map((ann) => (
                      <div
                        key={ann.id}
                        className="hover:bg-base-300 mb-1 flex items-center gap-2 rounded p-2 text-xs">
                        <div
                          className="size-2 rounded-full"
                          style={{ backgroundColor: ann.color }}
                        />
                        <button
                          type="button"
                          onClick={() => setCurrentPage(ann.pageNumber)}
                          className="flex-1 truncate text-left">
                          {ann.content || ann.type} (p.{ann.pageNumber})
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            await deleteAnnotation(ann.id);
                            setAnnotations((prev) =>
                              prev.filter((a) => a.id !== ann.id)
                            );
                          }}
                          className="btn btn-ghost btn-xs btn-circle">
                          <FiX className="size-2" />
                        </button>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        )}

        <div
          ref={viewerRef}
          className="flex flex-1 justify-center overflow-auto p-4">
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
          <div
            className="bg-white shadow-lg"
            style={{
              width: `${(595 * zoom) / 100}px`,
              minHeight: `${(842 * zoom) / 100}px`,
              transform: `rotate(${currentRotation}deg)`,
              transformOrigin: 'center top',
            }}
            onClick={handlePageClick}
            role="button"
            tabIndex={0}
            aria-label={`Page ${currentPage}`}>
            <div className="p-8">
              {doc.pages[currentPage - 1]?.textBlocks.map((tb) => (
                <div
                  key={tb.id}
                  className="absolute"
                  style={{
                    left: `${(tb.x * zoom) / 100}px`,
                    top: `${(tb.y * zoom) / 100}px`,
                    width: `${(tb.width * zoom) / 100}px`,
                    fontSize: `${(tb.fontSize * zoom) / 100}px`,
                    fontFamily: tb.fontFamily,
                    fontWeight: tb.bold ? 'bold' : 'normal',
                    fontStyle: tb.italic ? 'italic' : 'normal',
                    color: tb.color,
                    lineHeight: 1.4,
                  }}>
                  {tb.content}
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
              {annotations
                .filter(
                  (a) => a.documentId === doc.id && a.pageNumber === currentPage
                )
                .map((ann) => (
                  <div
                    key={ann.id}
                    className="absolute"
                    style={{
                      left: `${(ann.x * zoom) / 100}px`,
                      top: `${(ann.y * zoom) / 100}px`,
                      width: `${(ann.width * zoom) / 100}px`,
                      height: `${(ann.height * zoom) / 100}px`,
                      backgroundColor:
                        ann.type === 'highlight'
                          ? ann.color + '40'
                          : 'transparent',
                      border: ['rectangle', 'circle', 'arrow', 'line'].includes(
                        ann.type
                      )
                        ? `2px solid ${ann.color}`
                        : undefined,
                      borderRadius: ann.type === 'circle' ? '50%' : undefined,
                    }}>
                    {ann.type === 'sticky-note' && (
                      <div className="bg-warning rounded p-1 text-[10px] shadow">
                        {ann.content}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-base-100 border-base-300 no-print flex items-center justify-between border-t px-4 py-1">
        <span className="text-base-content/50 text-xs">
          {formatPageNumber(currentPage, totalPages)}
        </span>
        <div className="flex items-center gap-2">
          <Link href={`/pdf/${id}/merge`} className="btn btn-ghost btn-xs">
            Merge/Split
          </Link>
          <Link href={`/pdf/${id}/compare`} className="btn btn-ghost btn-xs">
            Compare
          </Link>
        </div>
      </div>
    </div>
  );
};

const ViewerPage: FC = () => (
  <Providers>
    <PDFViewer />
  </Providers>
);

export default ViewerPage;

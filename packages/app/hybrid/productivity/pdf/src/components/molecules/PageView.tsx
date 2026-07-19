import { type FC, type ReactNode } from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import type { PDFPage, Annotation, TextBlock } from '@/types';

interface PageViewProps {
  page: PDFPage;
  zoom: number;
  rotation?: number;
  annotations?: Annotation[];
  searchQuery?: string;
  activeMatchId?: string;
  preview?: Annotation | null;
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const VECTOR_TYPES = ['freehand', 'line', 'arrow'];

const renderHighlighted = (
  block: TextBlock,
  searchQuery: string,
  activeMatchId?: string
): ReactNode => {
  if (!searchQuery.trim()) return block.content;
  const q = searchQuery.toLowerCase();
  const lower = block.content.toLowerCase();
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let occurrence = 0;
  let match = lower.indexOf(q, cursor);
  while (match !== -1) {
    if (match > cursor) nodes.push(block.content.slice(cursor, match));
    const matchId = `${block.id}-m${occurrence}`;
    nodes.push(
      <mark
        key={matchId}
        className={`rounded-sm px-0.5 ${activeMatchId === matchId ? 'bg-yellow-400 text-black' : 'bg-yellow-200 text-black'}`}>
        {block.content.slice(match, match + q.length)}
      </mark>
    );
    occurrence += 1;
    cursor = match + q.length;
    match = lower.indexOf(q, cursor);
  }
  nodes.push(block.content.slice(cursor));
  return nodes;
};

const scale = (value: number, zoom: number): number => (value * zoom) / 100;

const renderBoxAnnotation = (
  ann: Annotation,
  zoom: number,
  isPreview: boolean
): ReactNode => {
  const base = {
    left: scale(ann.x, zoom),
    top: scale(ann.y, zoom),
    width: scale(ann.width, zoom),
    height: scale(ann.height, zoom),
  };
  const previewClass = isPreview ? 'opacity-60' : undefined;

  if (ann.type === 'highlight') {
    return (
      <div
        key={ann.id}
        className={`absolute rounded-sm ${previewClass ?? ''}`}
        style={{
          ...base,
          backgroundColor: ann.color + '40',
          outline: isPreview ? `1px dashed ${ann.color}` : undefined,
        }}
      />
    );
  }
  if (ann.type === 'underline') {
    return (
      <div
        key={ann.id}
        className={`absolute ${previewClass ?? ''}`}
        style={{
          left: base.left,
          top: base.top + base.height - 1,
          width: base.width,
          height: 2,
          backgroundColor: ann.color,
        }}
      />
    );
  }
  if (ann.type === 'strikethrough') {
    return (
      <div
        key={ann.id}
        className={`absolute ${previewClass ?? ''}`}
        style={{
          left: base.left,
          top: base.top + base.height / 2,
          width: base.width,
          height: 2,
          backgroundColor: ann.color,
        }}
      />
    );
  }
  if (ann.type === 'sticky-note') {
    return (
      <div
        key={ann.id}
        className={`absolute ${previewClass ?? ''}`}
        style={{
          ...base,
          backgroundColor: '#fde047',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }}>
        <div className="flex flex-col items-center gap-0.5 p-1 text-[10px] text-black">
          <FiMessageSquare className="size-3" />
          <span className="max-w-full leading-tight break-words">
            {ann.content}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div
      key={ann.id}
      className={`absolute ${previewClass ?? ''}`}
      style={{
        ...base,
        border: `2px solid ${ann.color}`,
        borderRadius: ann.type === 'circle' ? '50%' : '2px',
        borderStyle: isPreview ? 'dashed' : 'solid',
      }}
    />
  );
};

const renderVectorAnnotation = (
  ann: Annotation,
  isPreview: boolean
): ReactNode => {
  if (ann.type === 'freehand') {
    const points = ann.points?.map((p) => `${p.x},${p.y}`).join(' ') ?? '';
    return (
      <polyline
        key={ann.id}
        points={points}
        fill="none"
        stroke={ann.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray={isPreview ? '6 3' : undefined}
      />
    );
  }
  return (
    <line
      key={ann.id}
      x1={ann.points?.[0]?.x ?? ann.x}
      y1={ann.points?.[0]?.y ?? ann.y}
      x2={ann.points?.[1]?.x ?? ann.x + ann.width}
      y2={ann.points?.[1]?.y ?? ann.y + ann.height}
      stroke={ann.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeDasharray={isPreview ? '6 3' : undefined}
      markerEnd={ann.type === 'arrow' ? 'url(#arrowhead)' : undefined}
    />
  );
};

const PageView: FC<PageViewProps> = ({
  page,
  zoom,
  rotation = 0,
  annotations = [],
  searchQuery = '',
  activeMatchId,
  preview,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
}) => {
  const pageAnnotations = annotations.filter(
    (ann) => ann.pageNumber === page.pageNumber
  );
  const interactive = !!(onMouseDown || onMouseUp);
  const previewForPage =
    preview && preview.pageNumber === page.pageNumber ? preview : null;

  const boxes = pageAnnotations.filter(
    (ann) => !VECTOR_TYPES.includes(ann.type)
  );
  const vectors = pageAnnotations.filter((ann) =>
    VECTOR_TYPES.includes(ann.type)
  );

  return (
    <div
      className="relative bg-white shadow-lg"
      style={{
        width: `${scale(page.width, zoom)}px`,
        height: `${scale(page.height, zoom)}px`,
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        transformOrigin: 'center top',
      }}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Page ${page.pageNumber}` : undefined}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}>
      <div className="h-full w-full p-8">
        {page.textBlocks.map((tb) => (
          <div
            key={tb.id}
            className="absolute"
            style={{
              left: `${scale(tb.x, zoom)}px`,
              top: `${scale(tb.y, zoom)}px`,
              width: `${scale(tb.width, zoom)}px`,
              fontSize: `${scale(tb.fontSize, zoom)}px`,
              fontFamily: tb.fontFamily,
              fontWeight: tb.bold ? 'bold' : 'normal',
              fontStyle: tb.italic ? 'italic' : 'normal',
              color: tb.color,
              lineHeight: 1.4,
            }}>
            {renderHighlighted(tb, searchQuery, activeMatchId)}
          </div>
        ))}
        {page.images.map((img) => (
          <div
            key={img.id}
            className="absolute flex items-center justify-center rounded"
            style={{
              left: `${scale(img.x, zoom)}px`,
              top: `${scale(img.y, zoom)}px`,
              width: `${scale(img.width, zoom)}px`,
              height: `${scale(img.height, zoom)}px`,
              backgroundColor: img.color,
              opacity: img.opacity,
              transform: img.rotation
                ? `rotate(${img.rotation}deg)`
                : undefined,
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
          </div>
        ))}
        {page.watermark && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{ opacity: page.watermark.opacity }}>
            {page.watermark.type === 'image' ? (
              page.watermark.image ? (
                <img
                  src={page.watermark.image}
                  alt={page.watermark.label ?? 'Watermark'}
                  className="max-h-full max-w-full object-contain"
                  style={{ transform: `rotate(${page.watermark.rotation}deg)` }}
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
                  fontSize: `${scale(page.watermark.fontSize, zoom)}px`,
                  transform: `rotate(${page.watermark.rotation}deg)`,
                }}>
                {page.watermark.text}
              </span>
            )}
          </div>
        )}
        {boxes.map((ann) => renderBoxAnnotation(ann, zoom, false))}
        {previewForPage &&
          !VECTOR_TYPES.includes(previewForPage.type) &&
          renderBoxAnnotation(previewForPage, zoom, true)}
        {(vectors.length > 0 ||
          (previewForPage && VECTOR_TYPES.includes(previewForPage.type))) && (
          <svg
            className="pointer-events-none absolute inset-0"
            viewBox={`0 0 ${page.width} ${page.height}`}
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            data-testid="vector-layer">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="context-stroke" />
              </marker>
            </defs>
            {vectors.map((ann) => renderVectorAnnotation(ann, false))}
            {previewForPage &&
              VECTOR_TYPES.includes(previewForPage.type) &&
              renderVectorAnnotation(previewForPage, true)}
          </svg>
        )}
      </div>
    </div>
  );
};

export default PageView;

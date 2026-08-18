'use client';

import { type FC, useMemo, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FiArrowLeft } from 'react-icons/fi';
import { CATEGORIES, TOOLS, type PdfToolConfig } from '@/data/pdf-tools';
import { PdfToFormatTool } from '@/components/tools/PdfToFormatTool';
import { EbookConvertTool } from '@/components/tools/EbookConvertTool';
import { PdfPlaceholderTool } from '@/components/tools/PdfPlaceholderTool';
import { PdfToImagesTool } from '@/components/tools/PdfToImagesTool';
import { CreateTextToPdfTool } from '@/components/tools/CreateTextToPdfTool';
import { ImagesToPdfTool } from '@/components/tools/ImagesToPdfTool';
import { UrlToPdfTool } from '@/components/tools/UrlToPdfTool';
import { CreateUrlToPdfTool } from '@/components/tools/CreateUrlToPdfTool';
import { PdfCompressTool } from '@/components/tools/PdfCompressTool';
import { PdfRotateTool } from '@/components/tools/PdfRotateTool';
import { PdfSplitTool } from '@/components/tools/PdfSplitTool';
import { PdfWatermarkTool } from '@/components/tools/PdfWatermarkTool';
import { PdfDeletePagesTool } from '@/components/tools/PdfDeletePagesTool';
import { PdfMergeTool } from '@/components/tools/PdfMergeTool';
import { PdfRearrangeTool } from '@/components/tools/PdfRearrangeTool';
import { PdfAnnotateTool } from '@/components/tools/PdfAnnotateTool';
import { PdfCropTool } from '@/components/tools/PdfCropTool';
import { PdfPageNumbersTool } from '@/components/tools/PdfPageNumbersTool';
import { PdfEsignTool } from '@/components/tools/PdfEsignTool';
import { PdfExtractImagesTool } from '@/components/tools/PdfExtractImagesTool';
import { PdfExtractTextTool } from '@/components/tools/PdfExtractTextTool';
import { PdfInfoTool } from '@/components/tools/PdfInfoTool';
import { PdfMetadataTool } from '@/components/tools/PdfMetadataTool';
import { PdfOcrTool } from '@/components/tools/PdfOcrTool';
import { PdfRepairTool } from '@/components/tools/PdfRepairTool';
import { PdfSecurityTool } from '@/components/tools/PdfSecurityTool';
import { PdfTranslateTool } from '@/components/tools/PdfTranslateTool';

const PdfRedactTool = dynamic(
  () => import('@/components/tools/PdfRedactTool').then((m) => m.PdfRedactTool),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <span className="loading loading-spinner" />
      </div>
    ),
  }
);

const TOOL_COMPONENTS: Record<string, FC<{ config: PdfToolConfig }>> = {
  'pdf-to-images': PdfToImagesTool as FC<{ config: PdfToolConfig }>,
  'create-text-to-pdf': CreateTextToPdfTool as FC<{ config: PdfToolConfig }>,
  'images-to-pdf': ImagesToPdfTool as FC<{ config: PdfToolConfig }>,
  'url-to-pdf': UrlToPdfTool as FC<{ config: PdfToolConfig }>,
  'create-url-to-pdf': CreateUrlToPdfTool as FC<{ config: PdfToolConfig }>,
  'pdf-compress': PdfCompressTool as FC<{ config: PdfToolConfig }>,
  'pdf-rotate': PdfRotateTool as FC<{ config: PdfToolConfig }>,
  'pdf-split': PdfSplitTool as FC<{ config: PdfToolConfig }>,
  'pdf-watermark': PdfWatermarkTool as FC<{ config: PdfToolConfig }>,
  'pdf-delete-pages': PdfDeletePagesTool as FC<{ config: PdfToolConfig }>,
  'pdf-merge': PdfMergeTool as FC<{ config: PdfToolConfig }>,
  'pdf-rearrange': PdfRearrangeTool as FC<{ config: PdfToolConfig }>,
  'pdf-redact': PdfRedactTool as FC<{ config: PdfToolConfig }>,
  'pdf-annotate': PdfAnnotateTool as FC<{ config: PdfToolConfig }>,
  'pdf-crop': PdfCropTool as FC<{ config: PdfToolConfig }>,
  'pdf-page-numbers': PdfPageNumbersTool as FC<{ config: PdfToolConfig }>,
  'pdf-esign': PdfEsignTool as FC<{ config: PdfToolConfig }>,
  'pdf-extract-images': PdfExtractImagesTool as FC<{ config: PdfToolConfig }>,
  'pdf-extract-text': PdfExtractTextTool as FC<{ config: PdfToolConfig }>,
  'pdf-info': PdfInfoTool as FC<{ config: PdfToolConfig }>,
  'pdf-metadata': PdfMetadataTool as FC<{ config: PdfToolConfig }>,
  'pdf-ocr': PdfOcrTool as FC<{ config: PdfToolConfig }>,
  'pdf-repair': PdfRepairTool as FC<{ config: PdfToolConfig }>,
  'pdf-security': PdfSecurityTool as FC<{ config: PdfToolConfig }>,
  'pdf-translate': PdfTranslateTool as FC<{ config: PdfToolConfig }>,
};

const getToolComponent = (id: string): FC<{ config: PdfToolConfig }> => {
  const tool = TOOLS.find((t) => t.id === id);
  if (!tool) return PdfToFormatTool as FC<{ config: PdfToolConfig }>;
  if (TOOL_COMPONENTS[id]) return TOOL_COMPONENTS[id];
  if (tool.category === 'convert')
    return PdfToFormatTool as FC<{ config: PdfToolConfig }>;
  if (tool.category === 'ebook')
    return EbookConvertTool as FC<{ config: PdfToolConfig }>;
  if (tool.category === 'create' && tool.accept)
    return PdfPlaceholderTool as FC<{ config: PdfToolConfig }>;
  return PdfToFormatTool as FC<{ config: PdfToolConfig }>;
};

const CATEGORY_TOOLS: Record<string, string[]> = {};
for (const t of TOOLS) {
  (CATEGORY_TOOLS[t.category] ??= []).push(t.id);
}

const toolCategoryMap: Record<string, string> = {};
for (const [cat, ids] of Object.entries(CATEGORY_TOOLS)) {
  for (const id of ids) {
    toolCategoryMap[id] = cat;
  }
}

const ToolsPage: FC = () => {
  const [activeTool, setActiveTool] = useState<PdfToolConfig | null>(null);
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CATEGORIES.map((c) => [c.key, false]))
  );

  const filteredByQuery = useMemo(
    () =>
      !query.trim()
        ? TOOLS
        : TOOLS.filter(
            (t) =>
              t.title.toLowerCase().includes(query.toLowerCase()) ||
              t.description.toLowerCase().includes(query.toLowerCase())
          ),
    [query]
  );

  const grouped = useMemo(() => {
    const map: Record<string, PdfToolConfig[]> = {};
    for (const t of filteredByQuery) {
      const cat = toolCategoryMap[t.id] ?? 'misc';
      (map[cat] ??= []).push(t);
    }
    return map;
  }, [filteredByQuery]);

  const ToolComponent = activeTool ? getToolComponent(activeTool.id) : null;

  return (
    <div className="flex h-screen flex-col">
      <header className="border-base-300 flex items-center gap-4 border-b px-4 py-3">
        <Link
          href="/"
          className="btn btn-ghost btn-sm btn-circle"
          aria-label="Back to documents">
          <FiArrowLeft className="size-4" />
        </Link>
        <h1 className="text-base-content text-lg font-bold">
          {activeTool ? activeTool.title : 'PDF Tools'}
        </h1>
      </header>
      <div className="flex flex-1 flex-row-reverse overflow-hidden">
        <aside className="border-base-300 flex w-56 shrink-0 flex-col border-l bg-inherit">
          <div className="border-base-300 border-b p-3">
            <input
              type="text"
              className="input input-bordered input-sm w-full"
              placeholder="Search tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto p-2">
            {CATEGORIES.map((cat) => {
              const tools = grouped[cat.key];
              if (!tools || tools.length === 0) return null;
              const isExpanded = query.trim().length > 0 || expanded[cat.key];
              return (
                <div key={cat.key}>
                  <button
                    className="hover:bg-base-200 flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium"
                    onClick={() =>
                      setExpanded((prev) => ({
                        ...prev,
                        [cat.key]: !prev[cat.key],
                      }))
                    }>
                    <span className="text-lg">{cat.emoji}</span>
                    <span className="flex-1">{cat.label}</span>
                    <span className="text-base-content/30 text-xs">
                      {isExpanded ? '▾' : '▸'}
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="ml-2 space-y-0.5">
                      {tools.map((tool) => (
                        <button
                          key={tool.id}
                          className={`hover:bg-base-200 flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-xs transition-colors ${
                            activeTool?.id === tool.id
                              ? 'bg-primary/10 text-primary font-medium'
                              : ''
                          }`}
                          onClick={() => setActiveTool(tool)}>
                          <span>{tool.emoji}</span>
                          <span>{tool.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>
        <div className="flex flex-1 flex-col overflow-y-auto p-8">
          {activeTool && ToolComponent ? (
            <ToolComponent config={activeTool} />
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-base-content/30 text-sm">
                Select a PDF tool from the sidebar
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;

'use client';

import { FC, useMemo, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import {
  CATEGORIES,
  TOOLS,
  type PdfToolConfig,
  popPreselectedPdfTool,
} from './config';
import { PdfToFormatTool } from './tools/PdfToFormatTool';
import { EbookConvertTool } from './tools/EbookConvertTool';
import { PdfPlaceholderTool } from './tools/PdfPlaceholderTool';
import { PdfToImagesTool } from './tools/PdfToImagesTool';
import { CreateTextToPdfTool } from './tools/CreateTextToPdfTool';
import { ImagesToPdfTool } from './tools/ImagesToPdfTool';
import { UrlToPdfTool } from './tools/UrlToPdfTool';
import { CreateUrlToPdfTool } from './tools/CreateUrlToPdfTool';
import { PdfCompressTool } from './tools/PdfCompressTool';
import { PdfRotateTool } from './tools/PdfRotateTool';
import { PdfSplitTool } from './tools/PdfSplitTool';
import { PdfWatermarkTool } from './tools/PdfWatermarkTool';
import { PdfDeletePagesTool } from './tools/PdfDeletePagesTool';
import { PdfMergeTool } from './tools/PdfMergeTool';
import { PdfRearrangeTool } from './tools/PdfRearrangeTool';
import { PdfRedactTool } from './tools/PdfRedactTool';
import { PdfAnnotateTool } from './tools/PdfAnnotateTool';
import { PdfCropTool } from './tools/PdfCropTool';
import { PdfPageNumbersTool } from './tools/PdfPageNumbersTool';
import { PdfEsignTool } from './tools/PdfEsignTool';
import { PdfExtractImagesTool } from './tools/PdfExtractImagesTool';
import { PdfExtractTextTool } from './tools/PdfExtractTextTool';
import { PdfInfoTool } from './tools/PdfInfoTool';
import { PdfMetadataTool } from './tools/PdfMetadataTool';
import { PdfOcrTool } from './tools/PdfOcrTool';
import { PdfRepairTool } from './tools/PdfRepairTool';
import { PdfSecurityTool } from './tools/PdfSecurityTool';
import { PdfTranslateTool } from './tools/PdfTranslateTool';

const UNIQUE_TOOLS: Record<string, FC<{ config: PdfToolConfig }>> = {
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
  if (UNIQUE_TOOLS[id]) return UNIQUE_TOOLS[id];
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

export const PdfModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTool, setActiveTool] = useState<PdfToolConfig | null>(() => {
    const preselectedId = popPreselectedPdfTool();
    if (preselectedId) {
      return TOOLS.find((t) => t.id === preselectedId) ?? null;
    }
    return null;
  });
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
    <FullScreen onClose={onClose} title={activeTool ? activeTool.title : 'PDF'}>
      <div className="-m-8 flex h-[calc(100%+4rem)] flex-row-reverse">
        <ToolbarSidebar
          query={query}
          onQueryChange={setQuery}
          grouped={grouped}
          expanded={expanded}
          onToggle={(key) =>
            setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
          }
          onSelect={setActiveTool}
          activeToolId={activeTool?.id ?? null}
        />
        <div className="flex flex-1 flex-col overflow-y-auto p-8">
          {activeTool && ToolComponent ? (
            <ToolComponent config={activeTool} />
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-base-content/30 text-sm">Select a PDF tool</p>
            </div>
          )}
        </div>
      </div>
    </FullScreen>
  );
};
PdfModal.displayName = 'PdfModal';

function ToolbarSidebar({
  query,
  onQueryChange,
  grouped,
  expanded,
  onToggle,
  onSelect,
  activeToolId,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  grouped: Record<string, PdfToolConfig[]>;
  expanded: Record<string, boolean>;
  onToggle: (key: string) => void;
  onSelect: (tool: PdfToolConfig) => void;
  activeToolId: string | null;
}) {
  return (
    <aside className="border-base-300 flex w-56 shrink-0 flex-col border-l bg-inherit">
      <div className="border-base-300 border-b p-3">
        <input
          type="text"
          className="input input-bordered input-sm w-full"
          placeholder="Search tools..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
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
                onClick={() => onToggle(cat.key)}>
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
                        activeToolId === tool.id
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }`}
                      onClick={() => onSelect(tool)}>
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
  );
}

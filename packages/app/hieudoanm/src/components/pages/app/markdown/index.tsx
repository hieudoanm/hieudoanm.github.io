'use client';

import { FC, useMemo, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import {
  CATEGORIES,
  TOOLS,
  type MarkdownToolConfig,
  popPreselectedMarkdownTool,
} from './config';
import { MarkdownEditorTool } from './tools/MarkdownEditorTool';
import { MarkdownConvertTool } from './tools/MarkdownConvertTool';

const UNIQUE_TOOLS: Record<string, FC<{ config: MarkdownToolConfig }>> = {
  'markdown-editor': MarkdownEditorTool,
};

const getToolComponent = (id: string): FC<{ config: MarkdownToolConfig }> => {
  const tool = TOOLS.find((t) => t.id === id);
  if (!tool) return MarkdownConvertTool;
  if (UNIQUE_TOOLS[id]) return UNIQUE_TOOLS[id];
  return MarkdownConvertTool;
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

export const MarkdownModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTool, setActiveTool] = useState<MarkdownToolConfig | null>(
    () => {
      const id = popPreselectedMarkdownTool();
      return TOOLS.find((t) => t.id === id) ?? null;
    }
  );
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
    const map: Record<string, MarkdownToolConfig[]> = {};
    for (const t of filteredByQuery) {
      const cat = toolCategoryMap[t.id] ?? 'misc';
      (map[cat] ??= []).push(t);
    }
    return map;
  }, [filteredByQuery]);

  const ToolComponent = activeTool ? getToolComponent(activeTool.id) : null;

  return (
    <FullScreen
      onClose={onClose}
      title={activeTool ? activeTool.title : 'Markdown'}>
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
        <div className="flex flex-1 flex-col overflow-hidden p-8">
          {activeTool && ToolComponent ? (
            <ToolComponent config={activeTool} />
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-base-content/30 text-sm">
                Select a markdown tool
              </p>
            </div>
          )}
        </div>
      </div>
    </FullScreen>
  );
};
MarkdownModal.displayName = 'MarkdownModal';

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
  grouped: Record<string, MarkdownToolConfig[]>;
  expanded: Record<string, boolean>;
  onToggle: (key: string) => void;
  onSelect: (tool: MarkdownToolConfig) => void;
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

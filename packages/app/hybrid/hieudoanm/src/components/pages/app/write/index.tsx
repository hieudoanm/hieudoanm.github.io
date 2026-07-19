'use client';

import { FC, useMemo, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { TOOLS, WriteToolConfig, popPreselectedTool } from './config';
import { WriteTool } from './WriteTool';

const CATEGORIES: { key: string; label: string; emoji: string }[] = [
  { key: 'article', label: 'Article', emoji: '📝' },
  { key: 'business', label: 'Business', emoji: '🏢' },
  { key: 'content', label: 'Content', emoji: '📋' },
  { key: 'edit', label: 'Edit', emoji: '✏️' },
  { key: 'misc', label: 'Misc', emoji: '🔧' },
  { key: 'real-estate', label: 'Real Estate', emoji: '🏠' },
  { key: 'social', label: 'Social', emoji: '📱' },
];

const CATEGORY_TOOLS: Record<string, string[]> = {
  article: [
    'write-article',
    'write-article-rewriter',
    'write-blog-ideas',
    'write-blog-outline',
    'write-blog-post',
    'write-essay',
    'write-listicle',
    'write-paragraph',
    'write-story',
    'write-story-ideas',
    'write-youtube-script',
  ],
  business: [
    'write-bill-of-sale',
    'write-business-name',
    'write-business-plan',
    'write-business-slogan',
    'write-cold-email',
    'write-landing-page',
    'write-nda',
    'write-podcast-script',
    'write-press-release',
    'write-privacy-policy',
    'write-purchase-agreement',
  ],
  content: [
    'write-content-brief',
    'write-content-planner',
    'write-faq',
    'write-poll',
    'write-trivia',
  ],
  edit: [
    'write-complete',
    'write-grammar',
    'write-humanizer',
    'write-improve-text',
    'write-paraphrase',
    'write-rewrite',
    'write-shorten',
    'write-summarize',
    'write-tone',
    'write-translate',
  ],
  misc: [
    'write-ai-detector',
    'write-explain',
    'write-summarize-podcast',
    'write-summarize-youtube',
    'write-title',
  ],
  'real-estate': [
    'write-real-estate-bio',
    'write-real-estate-description',
    'write-real-estate-listing',
  ],
  social: [
    'write-caption',
    'write-headline',
    'write-linkedin-post',
    'write-meta-description',
    'write-tiktok-script',
    'write-twitter-generator',
  ],
};

const toolCategoryMap: Record<string, string> = {};
for (const [cat, ids] of Object.entries(CATEGORY_TOOLS)) {
  for (const id of ids) {
    toolCategoryMap[id] = cat;
  }
}

export const WriteModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTool, setActiveTool] = useState<WriteToolConfig | null>(() => {
    const preselectedId = popPreselectedTool();
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
    const map: Record<string, WriteToolConfig[]> = {};
    for (const t of filteredByQuery) {
      const cat = toolCategoryMap[t.id] ?? 'misc';
      (map[cat] ??= []).push(t);
    }
    return map;
  }, [filteredByQuery]);

  return (
    <FullScreen
      onClose={onClose}
      title={activeTool ? activeTool.title : 'Write'}>
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
        <div className="flex flex-1 flex-col overflow-y-auto">
          {activeTool ? (
            <WriteTool config={activeTool} />
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-base-content/30 text-sm">
                Select a writing tool
              </p>
            </div>
          )}
        </div>
      </div>
    </FullScreen>
  );
};
WriteModal.displayName = 'WriteModal';

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
  grouped: Record<string, WriteToolConfig[]>;
  expanded: Record<string, boolean>;
  onToggle: (key: string) => void;
  onSelect: (tool: WriteToolConfig) => void;
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

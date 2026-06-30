import {
  Tool,
  ToolCard,
} from '@hieudoanm.github.io/components/pages/start/cards/ToolCard';
import { FC, useDeferredValue, useMemo } from 'react';
import { GRID, matchTool } from '../constants';
import { getToolSectionDefs } from '../sections';
import { Section } from './Section';

interface ToolsViewProps {
  query: string;
  toolSections: Record<string, Tool[]>;
}

export const ToolsView: FC<ToolsViewProps> = ({ query, toolSections }) => {
  const deferredQuery = useDeferredValue(query);
  const filtering = deferredQuery.trim().length > 0;

  const toolSectionDefs = useMemo(
    () => getToolSectionDefs(toolSections),
    [toolSections]
  );

  const allToolsFlat = useMemo(
    () =>
      toolSectionDefs
        .flatMap((s) => s.items)
        .sort((a, b) => a.label.localeCompare(b.label)),
    [toolSectionDefs]
  );

  const filteredAllTools = useMemo(
    () =>
      filtering
        ? allToolsFlat.filter((t) => matchTool(t, deferredQuery))
        : allToolsFlat,
    [allToolsFlat, filtering, deferredQuery]
  );

  const filteredTools = useMemo(
    () =>
      toolSectionDefs.map((s) => ({
        ...s,
        filtered: filtering
          ? s.items.filter((t) => matchTool(t, deferredQuery))
          : s.items,
      })),
    [toolSectionDefs, filtering, deferredQuery]
  );

  return (
    <>
      {filteredAllTools.length === 0 && filtering ? (
        <p className="text-base-content/30 mt-20 text-sm">
          No tools match &quot;{query}&quot;.
        </p>
      ) : (
        <>
          <div className="mb-4 flex w-full max-w-3xl justify-center gap-2">
            {/* View mode buttons are in MainContent */}
          </div>
          {filteredTools.map(({ label, filtered }) =>
            !filtering || filtered.length > 0 ? (
              <Section key={label} label={label} count={filtered.length}>
                <div className={GRID}>
                  {filtered.map((t) => (
                    <ToolCard key={t.label} {...t} />
                  ))}
                </div>
              </Section>
            ) : null
          )}
          {filtering && !filteredTools.some((s) => s.filtered.length > 0) && (
            <p className="text-base-content/30 mt-20 text-sm">
              No tools match &quot;{query}&quot;.
            </p>
          )}
        </>
      )}
    </>
  );
};
ToolsView.displayName = 'ToolsView';

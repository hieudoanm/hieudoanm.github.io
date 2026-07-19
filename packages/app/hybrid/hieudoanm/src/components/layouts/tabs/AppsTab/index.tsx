import { App, AppCard } from './AppCard';
import { FC, useDeferredValue, useMemo, useState } from 'react';
import { PiMagnifyingGlass, PiWrench } from 'react-icons/pi';

import { matchTool } from '@hieudoanm.github.io/components/pages/start/constants';
import { getToolSectionDefs } from '@hieudoanm.github.io/components/pages/start/sections';

export const AppsTab: FC<{ toolSections: Record<string, App[]> }> = ({
  toolSections,
}) => {
  const [query, setQuery] = useState('');
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

  const filteredTools = useMemo(
    () =>
      toolSectionDefs
        .map((s) => ({
          ...s,
          filtered: filtering
            ? s.items.filter((t) => matchTool(t, deferredQuery))
            : s.items,
        }))
        .filter((s) => !filtering || s.filtered.length > 0),
    [toolSectionDefs, filtering, deferredQuery]
  );

  const filteredAllTools = useMemo(
    () =>
      filtering
        ? allToolsFlat.filter((t) => matchTool(t, deferredQuery))
        : allToolsFlat,
    [allToolsFlat, filtering, deferredQuery]
  );

  return (
    <div className="flex h-full flex-col">
      <div className="border-base-300 flex items-center gap-2 border-b px-3 py-2.5">
        <PiWrench className="text-base-content/60 h-4 w-4 shrink-0" />
        <span className="text-[10px] font-normal tracking-widest uppercase">
          Tools
        </span>
        <span className="badge badge-xs ml-auto">{allToolsFlat.length}</span>
      </div>

      <div className="border-base-300 border-b px-3 py-2">
        <div className="flex items-center gap-2">
          <PiMagnifyingGlass className="text-base-content/40 h-3.5 w-3.5 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools..."
            className="input-ghost text-xs outline-none placeholder:text-[10px] placeholder:tracking-widest placeholder:uppercase"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {filtering && filteredAllTools.length === 0 ? (
          <p className="text-base-content/30 text-center text-xs">
            No tools match &quot;{query}&quot;
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredTools.map(({ label, filtered }) => (
              <div key={label}>
                <p className="text-base-content/40 mb-2 text-[10px] tracking-widest uppercase">
                  {label}
                  <span className="text-base-content/20 ml-1">
                    ({filtered.length})
                  </span>
                </p>
                <div className="flex flex-col gap-1.5">
                  {filtered.map((t) => (
                    <AppCard key={t.label} {...t} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

AppsTab.displayName = 'AppsTab';

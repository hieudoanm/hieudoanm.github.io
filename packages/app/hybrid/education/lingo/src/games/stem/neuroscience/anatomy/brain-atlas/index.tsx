'use client';

import type { FC } from 'react';
import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { BrainOutline } from './components';
import { RegionOutline, breadcrumbFor } from './region-outline';
import { RegionBody, depthLabel } from './region-body';
import { REGIONS, childrenOf, exposedAt, pageFor, regionById } from './atlas';
import { Slider, Stat } from '../../shared/controls';
import { Window } from '../../shared/Window';

const DEFAULT_DEPTH = 1;
const DEFAULT_SELECTION = 'cerebral-cortex';

const ROOTS = REGIONS.filter((region) => region.parentId === null);

/**
 * A depth scrub rather than a false 3-D slice: each structure declares how far
 * below the surface it sits, and the cut reveals everything at or above it.
 */
export const BrainAtlasExplorer: FC = () => {
  const [maxDepth, setMaxDepth] = useState(DEFAULT_DEPTH);
  const [selectedId, setSelectedId] = useState(DEFAULT_SELECTION);

  const exposed = useMemo(() => exposedAt(maxDepth), [maxDepth]);
  const exposedIds = useMemo(
    () => new Set(exposed.map((region) => region.id)),
    [exposed]
  );
  const buried = useMemo(
    () => REGIONS.filter((region) => !exposedIds.has(region.id)),
    [exposedIds]
  );

  const selected = regionById(selectedId) ?? null;
  const page = pageFor(selected ?? undefined);
  const deepest = Math.max(...exposed.map((region) => region.depth), 0);

  const select = useCallback((id: string) => setSelectedId(id), []);

  return (
    <div className="flex w-full max-w-6xl flex-col gap-8 lg:flex-row">
      <div className="flex flex-1 flex-col gap-5">
        <Window
          title="Cut depth"
          hint="Everything at or above this depth is exposed. Structures hidden by the cut stay listed, dimmed.">
          <Slider
            label="Depth below the cortical surface"
            value={maxDepth}
            min={0}
            max={1}
            step={0.05}
            format={(v) => `${(v * 100).toFixed(0)}%`}
            onChange={setMaxDepth}
          />
        </Window>

        <Window
          title="Outline"
          hint="The source outline as a tree. Pick any structure to read it.">
          <div className="max-h-96 overflow-y-auto pr-1">
            <RegionOutline
              roots={ROOTS}
              childrenOf={childrenOf}
              exposedIds={exposedIds}
              selectedId={selectedId}
              onSelect={select}
            />
          </div>
        </Window>
      </div>

      <div className="flex flex-[2] flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-primary text-xl font-bold">Lateral view</h2>
          <p className="text-base-content/60 text-xs">
            Schematic, not to scale — it shows where structures sit relative to
            one another. Faint marks are below the current cut; solid marks are
            exposed. Click a mark to select it.
          </p>
          <BrainOutline
            regions={exposed}
            buried={buried}
            selectedId={selectedId}
            onSelect={select}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Stat
            label="Structures exposed"
            value={`${exposed.length}/${REGIONS.length}`}
          />
          <Stat
            label="Deepest exposed"
            value={depthLabel(deepest)}
            colorClass="text-secondary"
          />
          <Stat
            label="Still hidden"
            value={`${buried.length}`}
            colorClass="text-base-content/50"
          />
        </div>

        <div className="card border-base-content/10 flex flex-col gap-3 border p-5">
          {selected ? (
            <>
              <p className="text-base-content/40 text-xs uppercase">
                {breadcrumbFor(selected)}
              </p>
              <h3 className="text-primary text-lg font-bold">
                {selected.name}
              </h3>
              <RegionBody region={selected} />
              {page && (
                <Link
                  href={page.route}
                  className="text-primary text-sm hover:underline">
                  Read the {selected.name} reference →
                </Link>
              )}
            </>
          ) : (
            <p className="text-base-content/60 text-sm">
              Pick a structure from the outline.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

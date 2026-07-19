'use client';

import type { FC, ReactElement } from 'react';
import { pathTo } from './atlas';
import { depthLabel } from './region-body';
import type { BrainRegion } from './types';

export interface RegionOutlineProps {
  /** The four divisions, in outline order. */
  roots: BrainRegion[];
  /** Direct children of a region id, for walking the tree. */
  childrenOf: (id: string) => BrainRegion[];
  exposedIds: ReadonlySet<string>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const Row: FC<{
  region: BrainRegion;
  depth: number;
  exposed: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
}> = ({ region, depth, exposed, selected, onSelect }) => (
  <button
    type="button"
    aria-label={region.name}
    aria-current={selected ? 'true' : undefined}
    onClick={() => onSelect(region.id)}
    className={[
      'flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left transition-colors',
      selected ? 'bg-primary/15 text-primary' : 'hover:bg-base-200/60',
      exposed ? '' : 'opacity-40',
    ].join(' ')}
    style={{ paddingLeft: `${8 + depth * 14}px` }}>
    <span className="text-sm font-medium">{region.name}</span>
    {/* Supplementary, so kept out of the button's accessible name. */}
    <span aria-hidden className="text-base-content/40 text-[10px] uppercase">
      {depthLabel(region.depth)}
    </span>
  </button>
);

/**
 * The outline as a collapsible tree. Hidden structures stay visible but dimmed,
 * so the full map is legible while the cut shows what it reaches.
 */
export const RegionOutline: FC<RegionOutlineProps> = ({
  roots,
  childrenOf,
  exposedIds,
  selectedId,
  onSelect,
}) => {
  const renderBranch = (region: BrainRegion, depth: number): ReactElement => (
    <div key={region.id} className="flex flex-col">
      <Row
        region={region}
        depth={depth}
        exposed={exposedIds.has(region.id)}
        selected={region.id === selectedId}
        onSelect={onSelect}
      />
      {childrenOf(region.id).map((child) => renderBranch(child, depth + 1))}
    </div>
  );

  return (
    <div
      className="flex flex-col gap-0.5"
      role="tree"
      aria-label="Brain structures by division">
      {roots.map((root) => renderBranch(root, 0))}
    </div>
  );
};

/** The breadcrumb for a selected structure, e.g. Cerebrum › Limbic › Amygdala. */
export const breadcrumbFor = (region: BrainRegion | null): string =>
  region
    ? pathTo(region.id)
        .map((link) => link.name)
        .join(' › ')
    : '';

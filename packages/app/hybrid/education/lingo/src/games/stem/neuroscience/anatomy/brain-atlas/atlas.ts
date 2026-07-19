import { CEREBRUM_REGIONS } from './structures-cerebrum';
import { HINDBRAIN_REGIONS } from './structures-hindbrain';
import type { BrainRegion } from './types';

/** Every structure in the atlas, in outline order. */
export const REGIONS: BrainRegion[] = [
  ...CEREBRUM_REGIONS,
  ...HINDBRAIN_REGIONS,
];

const REGION_BY_ID: ReadonlyMap<string, BrainRegion> = new Map(
  REGIONS.map((region) => [region.id, region])
);

export interface DivisionRoute {
  /** Id of the division this page covers. */
  id: string;
  /** URL path of the division's own page. */
  route: string;
}

/**
 * One page per `###` heading of the source outline, so no page has to carry
 * more anatomy than it can present clearly.
 */
export const DIVISION_ROUTES: DivisionRoute[] = [
  { id: 'cerebral-cortex', route: '/neuroscience/brain-atlas/cerebral-cortex' },
  { id: 'white-matter', route: '/neuroscience/brain-atlas/white-matter' },
  { id: 'basal-ganglia', route: '/neuroscience/brain-atlas/basal-ganglia' },
  {
    id: 'limbic-structures',
    route: '/neuroscience/brain-atlas/limbic-structures',
  },
  {
    id: 'corpus-callosum',
    route: '/neuroscience/brain-atlas/corpus-callosum',
  },
  { id: 'diencephalon', route: '/neuroscience/brain-atlas/diencephalon' },
  { id: 'cerebellum', route: '/neuroscience/brain-atlas/cerebellum' },
  { id: 'brainstem', route: '/neuroscience/brain-atlas/brainstem' },
];

export const regionById = (id: string): BrainRegion | undefined =>
  REGION_BY_ID.get(id);

/** Direct children of a region, in outline order. */
export const childrenOf = (id: string): BrainRegion[] =>
  REGIONS.filter((region) => region.parentId === id);

/** Every structure beneath a region, breadth-first, excluding the region. */
export const descendantsOf = (id: string): BrainRegion[] => {
  const found: BrainRegion[] = [];
  const walk = (parentId: string): void => {
    childrenOf(parentId).forEach((child) => {
      found.push(child);
      walk(child.id);
    });
  };
  walk(id);
  return found;
};

/** Walks parents from a region to the root, stopping if a cycle is hit. */
const chainFrom = (
  byId: ReadonlyMap<string, BrainRegion>,
  id: string
): BrainRegion[] => {
  const chain: BrainRegion[] = [];
  const visited = new Set<string>();
  let cursor = byId.get(id);
  while (cursor && !visited.has(cursor.id)) {
    visited.add(cursor.id);
    chain.unshift(cursor);
    cursor = cursor.parentId ? byId.get(cursor.parentId) : undefined;
  }
  return chain;
};

/** The chain from the root division down to a region, inclusive. */
export const pathTo = (id: string): BrainRegion[] =>
  chainFrom(REGION_BY_ID, id);

/** Structures sitting at or above a cut-off depth, i.e. the exposed ones. */
export const exposedAt = (maxDepth: number): BrainRegion[] =>
  REGIONS.filter((region) => region.depth <= maxDepth);

/**
 * The reference page covering a structure: its own division page, or the page of
 * the division that contains it.
 */
export const pageFor = (
  region: BrainRegion | undefined
): DivisionRoute | undefined => {
  if (!region) return undefined;
  const own = DIVISION_ROUTES.find((route) => route.id === region.id);
  if (own) return own;
  const parent = region.parentId ? regionById(region.parentId) : undefined;
  return DIVISION_ROUTES.find((route) => route.id === parent?.id);
};

const regionFaults = (
  regions: readonly BrainRegion[],
  byId: ReadonlyMap<string, BrainRegion>
): string[] => {
  const problems: string[] = [];
  const seen = new Set<string>();
  regions.forEach((region) => {
    if (seen.has(region.id)) problems.push(`duplicate id: ${region.id}`);
    seen.add(region.id);
    if (region.parentId && !byId.has(region.parentId)) {
      problems.push(`${region.id} has unknown parent: ${region.parentId}`);
    }
    if (region.depth < 0 || region.depth > 1) {
      problems.push(`${region.id} has depth outside 0..1: ${region.depth}`);
    }
    if (region.anchor) {
      const { x, y } = region.anchor;
      if (x < 0 || x > 1 || y < 0 || y > 1) {
        problems.push(`${region.id} has an anchor outside the canvas`);
      }
    }
    if (region.seeAlso && !region.seeAlso.href.startsWith('/')) {
      problems.push(`${region.id} has a non-absolute cross-link`);
    }
    // A chain that cannot reach a root means a cycle or a missing parent.
    const chain = chainFrom(byId, region.id);
    if (chain[0]?.parentId !== null) {
      problems.push(`${region.id} does not resolve to a root division`);
    }
  });
  return problems;
};

const routeFaults = (
  routes: readonly DivisionRoute[],
  byId: ReadonlyMap<string, BrainRegion>
): string[] =>
  routes.flatMap(({ id, route }) => {
    const problems: string[] = [];
    if (!byId.has(id)) {
      problems.push(`division route ${route} points at unknown region ${id}`);
    }
    if (!route.startsWith('/neuroscience/brain-atlas/')) {
      problems.push(`division route is outside the atlas: ${route}`);
    }
    return problems;
  });

/**
 * Structural faults in the given atlas, as human-readable messages. Pure, so the
 * tests can feed it deliberately broken trees instead of trusting one dataset.
 */
export const validateAtlas = (
  regions: readonly BrainRegion[],
  routes: readonly DivisionRoute[]
): string[] => {
  const byId: ReadonlyMap<string, BrainRegion> = new Map(
    regions.map((region) => [region.id, region])
  );
  return [...regionFaults(regions, byId), ...routeFaults(routes, byId)];
};

/**
 * Structural faults in the real atlas data. Empty when the tree is sound; the
 * tests assert exactly that.
 */
export const atlasProblems = (): string[] =>
  validateAtlas(REGIONS, DIVISION_ROUTES);

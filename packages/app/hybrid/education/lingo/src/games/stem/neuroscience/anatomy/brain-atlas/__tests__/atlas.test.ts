import {
  DIVISION_ROUTES,
  REGIONS,
  atlasProblems,
  childrenOf,
  descendantsOf,
  exposedAt,
  pageFor,
  pathTo,
  regionById,
  validateAtlas,
} from '../atlas';
import type { BrainRegion } from '../types';

describe('atlas data integrity', () => {
  it('has no structural faults', () => {
    expect(atlasProblems()).toEqual([]);
  });

  it('covers every heading of the source outline below Brain itself', () => {
    // The outline lists 25 headings, but "Brain" is the whole organ — the atlas
    // itself — so the structures modelled are the 24 beneath it.
    expect(REGIONS).toHaveLength(24);
  });

  it('gives every region an id, a name, and all three prose fields', () => {
    REGIONS.forEach((region) => {
      expect(region.id).toMatch(/^[a-z][a-z-]*[a-z]$/);
      expect(region.name.length).toBeGreaterThan(0);
      expect(region.summary.length).toBeGreaterThan(20);
      expect(region.function.length).toBeGreaterThan(20);
      expect(region.note.length).toBeGreaterThan(20);
    });
  });

  it('anchors only structures that sit on the outer silhouette', () => {
    const anchored = REGIONS.filter((region) => region.anchor).map((r) => r.id);
    expect(anchored).toEqual(
      expect.arrayContaining([
        'frontal-lobe',
        'parietal-lobe',
        'temporal-lobe',
        'occipital-lobe',
        'insular-lobe',
        'cerebellum',
        'brainstem',
        'midbrain',
        'pons',
        'medulla-oblongata',
      ])
    );
  });
});

describe('atlas tree', () => {
  it('starts from the four brain divisions', () => {
    expect(REGIONS.filter((r) => r.parentId === null).map((r) => r.id)).toEqual(
      ['cerebrum', 'diencephalon', 'cerebellum', 'brainstem']
    );
  });

  it('finds direct children in outline order', () => {
    expect(childrenOf('cerebrum').map((r) => r.id)).toEqual([
      'cerebral-cortex',
      'white-matter',
      'basal-ganglia',
      'limbic-structures',
      'corpus-callosum',
    ]);
  });

  it('collects every descendant of a division', () => {
    // 6 cortical, white matter, basal ganglia, 4 limbic, corpus callosum.
    expect(descendantsOf('cerebrum')).toHaveLength(13);
    expect(descendantsOf('cerebellum')).toHaveLength(0);
  });

  it('walks from a root down to a leaf', () => {
    expect(pathTo('cingulate-cortex').map((r) => r.id)).toEqual([
      'cerebrum',
      'limbic-structures',
      'cingulate-cortex',
    ]);
  });

  it('returns just the region for a root', () => {
    expect(pathTo('cerebellum').map((r) => r.id)).toEqual(['cerebellum']);
  });

  it('returns an empty chain for an unknown id', () => {
    expect(pathTo('not-a-region')).toEqual([]);
  });
});

describe('exposedAt', () => {
  it('exposes nothing at zero depth and the sheet just below it', () => {
    expect(exposedAt(0)).toEqual([]);
    expect(exposedAt(0.05).map((r) => r.id)).toEqual(['cerebral-cortex']);
  });

  it('reveals the cortex before the deep nuclei', () => {
    const shallow = exposedAt(0.1).map((r) => r.id);
    expect(shallow).toContain('frontal-lobe');
    expect(shallow).not.toContain('thalamus');
  });

  it('exposes everything by full depth', () => {
    expect(exposedAt(1)).toHaveLength(REGIONS.length);
  });
});

describe('division routes', () => {
  it('gives every routed division a page', () => {
    DIVISION_ROUTES.forEach(({ id }) => {
      expect(regionById(id)).toBeDefined();
    });
  });

  it('covers every non-root structure that heads a page', () => {
    expect(DIVISION_ROUTES).toHaveLength(8);
  });
});

describe('validateAtlas', () => {
  const base = (over: Partial<BrainRegion> = {}): BrainRegion => ({
    id: 'cortex',
    name: 'Cortex',
    parentId: 'cerebrum',
    depth: 0.5,
    summary: 's',
    function: 'f',
    note: 'n',
    ...over,
  });
  const root: BrainRegion = { ...base(), id: 'cerebrum', parentId: null };

  it('accepts a sound tree', () => {
    expect(validateAtlas([root, base()], [])).toEqual([]);
  });

  it('reports a duplicate id', () => {
    const problems = validateAtlas([root, base(), base()], []);
    expect(problems).toContain('duplicate id: cortex');
  });

  it('reports an unknown parent', () => {
    const problems = validateAtlas([root, base({ parentId: 'ghost' })], []);
    expect(problems).toContain('cortex has unknown parent: ghost');
  });

  it('reports a depth outside 0..1', () => {
    expect(validateAtlas([root, base({ depth: 1.5 })], [])).toContain(
      'cortex has depth outside 0..1: 1.5'
    );
  });

  it('reports an anchor off the canvas', () => {
    const problems = validateAtlas(
      [root, base({ anchor: { x: 1.4, y: 0.5 } })],
      []
    );
    expect(problems).toContain('cortex has an anchor outside the canvas');
  });

  it('accepts an anchor at the canvas edge', () => {
    expect(validateAtlas([root, base({ anchor: { x: 0, y: 1 } })], [])).toEqual(
      []
    );
  });

  it('reports a cross-link that is not absolute', () => {
    const problems = validateAtlas(
      [root, base({ seeAlso: { href: 'neuroscience/eeg/', label: 'EEG' } })],
      []
    );
    expect(problems).toContain('cortex has a non-absolute cross-link');
  });

  it('reports a parent cycle instead of looping forever', () => {
    const problems = validateAtlas(
      [base({ id: 'a', parentId: 'b' }), base({ id: 'b', parentId: 'a' })],
      []
    );
    expect(problems).toContain('a does not resolve to a root division');
  });

  it('reports a division route pointing at no region', () => {
    const problems = validateAtlas(
      [root],
      [{ id: 'ghost', route: '/neuroscience/brain-atlas/ghost' }]
    );
    expect(problems).toContain(
      'division route /neuroscience/brain-atlas/ghost points at unknown region ghost'
    );
  });

  it('reports a division route outside the atlas', () => {
    const problems = validateAtlas(
      [root],
      [{ id: 'cerebrum', route: '/psychology/biology' }]
    );
    expect(problems).toContain(
      'division route is outside the atlas: /psychology/biology'
    );
  });
});

describe('pageFor', () => {
  it('returns a division its own page', () => {
    expect(pageFor(regionById('cerebellum'))?.route).toBe(
      '/neuroscience/brain-atlas/cerebellum'
    );
  });

  it('returns the containing division page for a child structure', () => {
    expect(pageFor(regionById('hippocampus'))?.route).toBe(
      '/neuroscience/brain-atlas/limbic-structures'
    );
  });

  it('returns nothing for a region with no routed page', () => {
    expect(pageFor(regionById('cerebrum'))).toBeUndefined();
  });

  it('returns nothing when given no region', () => {
    expect(pageFor(undefined)).toBeUndefined();
  });
});

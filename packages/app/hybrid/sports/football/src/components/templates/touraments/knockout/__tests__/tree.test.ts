import {
  buildTree,
  computeAngles,
  collectNodes,
  buildParentMap,
  getLeaves,
  getAllMatches,
  nodeRadius,
  nodePos,
  resetMatchIdCounter,
} from '../tree';
import { R_OUTER } from '../constants';

beforeEach(() => {
  resetMatchIdCounter();
});

describe('tree', () => {
  const leaf = (id: string) => ({
    kind: 'leaf' as const,
    team: id,
    angle: 0,
    angleIndex: 0,
  });

  describe('buildTree', () => {
    it('builds a leaf node from a string', () => {
      const node = buildTree('A');
      expect(node).toEqual({
        kind: 'leaf',
        team: 'A',
        angle: 0,
        angleIndex: 0,
      });
    });

    it('builds a match node from a pair', () => {
      const node = buildTree(['A', 'B'] as any);
      expect(node.kind).toBe('match');
      if (node.kind === 'match') {
        expect(node.kids).toHaveLength(2);
        expect(node.level).toBe(1);
      }
    });

    it('builds a nested bracket tree', () => {
      const tree = buildTree([
        ['A', 'B'],
        ['C', 'D'],
      ] as any);
      expect(tree.kind).toBe('match');
      if (tree.kind === 'match') {
        expect(tree.level).toBe(2);
      }
    });
  });

  describe('computeAngles', () => {
    it('returns 0 for leaf nodes', () => {
      expect(computeAngles(leaf('A'))).toBe(0);
    });

    it('computes average angle for match nodes', () => {
      const node = buildTree(['A', 'B'] as any);
      const angle = computeAngles(node);
      expect(typeof angle).toBe('number');
    });
  });

  describe('collectNodes', () => {
    it('collects all nodes from a tree', () => {
      const tree = buildTree([
        ['A', 'B'],
        ['C', 'D'],
      ] as any);
      const nodes = collectNodes(tree);
      expect(nodes.length).toBeGreaterThan(0);
    });

    it('returns a single node for a leaf', () => {
      const nodes = collectNodes(leaf('A'));
      expect(nodes).toHaveLength(1);
    });
  });

  describe('buildParentMap', () => {
    it('maps each node to its parent', () => {
      const tree = buildTree(['A', 'B'] as any);
      const map = buildParentMap(tree);
      expect(map.size).toBe(2);
    });

    it('root node has no parent', () => {
      const tree = buildTree(['A', 'B'] as any);
      const map = buildParentMap(tree);
      expect(map.has(tree)).toBe(false);
    });
  });

  describe('getLeaves', () => {
    it('returns all leaf nodes', () => {
      const tree = buildTree([
        ['A', 'B'],
        ['C', 'D'],
      ] as any);
      const leaves = getLeaves(tree);
      expect(leaves).toHaveLength(4);
      expect(leaves.every((l) => l.kind === 'leaf')).toBe(true);
    });
  });

  describe('getAllMatches', () => {
    it('returns all match nodes', () => {
      const tree = buildTree([
        ['A', 'B'],
        ['C', 'D'],
      ] as any);
      const matches = getAllMatches(tree);
      expect(matches.length).toBe(3);
      expect(matches.every((m) => m.kind === 'match')).toBe(true);
    });
  });

  describe('nodeRadius', () => {
    it('returns R_OUTER for leaves', () => {
      expect(nodeRadius(leaf('A'), 5)).toBe(R_OUTER);
    });

    it('returns reduced radius for match nodes', () => {
      const tree = buildTree(['A', 'B'] as any);
      const r = nodeRadius(tree, 5);
      expect(r).toBeLessThan(R_OUTER);
    });
  });

  describe('nodePos', () => {
    it('returns x,y coordinates', () => {
      const pos = nodePos(leaf('A'), 5);
      expect(typeof pos.x).toBe('number');
      expect(typeof pos.y).toBe('number');
    });
  });

  describe('resetMatchIdCounter', () => {
    it('resets the match id counter', () => {
      buildTree(['A', 'B'] as any);
      resetMatchIdCounter();
      const tree = buildTree(['C', 'D'] as any);
      if (tree.kind === 'match') {
        expect(tree.id).toBe('m0');
      }
    });
  });
});

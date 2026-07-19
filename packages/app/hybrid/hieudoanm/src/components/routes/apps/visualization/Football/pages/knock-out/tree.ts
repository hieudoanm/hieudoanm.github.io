import type {
  BracketNode,
  BracketRaw,
  BracketLeaf,
  BracketMatch,
} from './types';
import { R_OUTER } from './constants';

let matchIdCounter = 0;

export const buildTree = (node: BracketRaw): BracketNode => {
  if (typeof node === 'string') {
    return { kind: 'leaf', team: node, angle: 0, angleIndex: 0 };
  }
  const [first, second] = node;
  const a = buildTree(first);
  const b = buildTree(second);
  const level =
    Math.max(
      a.kind === 'leaf' ? 0 : (a as BracketMatch).level,
      b.kind === 'leaf' ? 0 : (b as BracketMatch).level
    ) + 1;
  const match: BracketMatch = {
    kind: 'match',
    id: 'm' + matchIdCounter++,
    level,
    kids: [a, b],
    winner: null,
    angle: 0,
  };
  return match;
};

export const computeAngles = (node: BracketNode): number => {
  if (node.kind === 'leaf') return node.angle;
  const a = computeAngles(node.kids[0]);
  const b = computeAngles(node.kids[1]);
  node.angle = (a + b) / 2;
  return node.angle;
};

export const collectNodes = (root: BracketNode): BracketNode[] => {
  const nodes: BracketNode[] = [];
  const walk = (n: BracketNode) => {
    nodes.push(n);
    if (n.kind === 'match') {
      walk(n.kids[0]);
      walk(n.kids[1]);
    }
  };
  walk(root);
  return nodes;
};

export const buildParentMap = (
  root: BracketNode
): Map<BracketNode, BracketMatch> => {
  const map = new Map<BracketNode, BracketMatch>();
  const walk = (n: BracketNode, parent?: BracketMatch) => {
    if (parent) map.set(n, parent);
    if (n.kind === 'match') {
      walk(n.kids[0], n);
      walk(n.kids[1], n);
    }
  };
  walk(root);
  return map;
};

export const getLeaves = (root: BracketNode): BracketLeaf[] => {
  const leaves: BracketLeaf[] = [];
  const walk = (n: BracketNode) => {
    if (n.kind === 'leaf') leaves.push(n);
    else {
      walk(n.kids[0]);
      walk(n.kids[1]);
    }
  };
  walk(root);
  return leaves;
};

export const getAllMatches = (root: BracketNode): BracketMatch[] => {
  const matches: BracketMatch[] = [];
  const walk = (n: BracketNode) => {
    if (n.kind === 'match') {
      matches.push(n);
      walk(n.kids[0]);
      walk(n.kids[1]);
    }
  };
  walk(root);
  return matches;
};

export const nodeRadius = (node: BracketNode, step: number): number => {
  if (node.kind === 'leaf') return R_OUTER;
  return R_OUTER - node.level * step;
};

export const nodePos = (node: BracketNode, step: number) => {
  const ang = (node.angle * Math.PI) / 180;
  const r = nodeRadius(node, step);
  return {
    x: 50 + r * Math.cos(ang),
    y: 50 + r * Math.sin(ang),
  };
};

export const resetMatchIdCounter = () => {
  matchIdCounter = 0;
};

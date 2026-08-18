import type { PositionedNode } from '@/lib/types';

export const ICON_SIZE = 18;
export const ICON_GAP = 8;
export const NODE_MIN_WIDTH = 120;
export const NODE_HEIGHT = 52;
export const TALL_NODE_HEIGHT = 68;
export const LINE_HEIGHT = 16;
export const CHAR_WIDTH = 8;

export const isTallShape = (shape: PositionedNode['shape']): boolean =>
  shape === 'ellipse' ||
  shape === 'diamond' ||
  shape === 'cylinder' ||
  shape === 'hexagon' ||
  shape === 'note' ||
  shape === 'actor' ||
  shape === 'cloud';

export const textWidth = (text: string): number => text.length * CHAR_WIDTH;

export const splitLines = (label: string): string[] => label.split('\n');

export const lineCount = (label: string): number => splitLines(label).length;

export const maxLineWidth = (label: string): number =>
  Math.max(1, ...splitLines(label).map((line) => textWidth(line)));

export const labelBlockHeight = (label: string): number =>
  lineCount(label) * LINE_HEIGHT;

export const nodeWidth = (
  label: string,
  icon: PositionedNode['icon'] | undefined
): number =>
  Math.max(
    NODE_MIN_WIDTH,
    maxLineWidth(label) + 44 + (icon ? ICON_SIZE + ICON_GAP : 0)
  );

export const nodeHeight = (
  node: Pick<PositionedNode, 'shape' | 'label'>
): number =>
  Math.max(
    isTallShape(node.shape) ? TALL_NODE_HEIGHT : NODE_HEIGHT,
    labelBlockHeight(node.label) + 18
  );

export const nodeContentWidth = (
  node: Pick<PositionedNode, 'label' | 'icon'>
): number => maxLineWidth(node.label) + (node.icon ? ICON_SIZE + ICON_GAP : 0);

export const contentLeft = (node: PositionedNode): number =>
  node.x - nodeContentWidth(node) / 2;

export const nodeIconCenterX = (node: PositionedNode): number =>
  contentLeft(node) + ICON_SIZE / 2;

export const nodeLabelCenterX = (node: PositionedNode): number =>
  contentLeft(node) +
  (node.icon ? ICON_SIZE + ICON_GAP : 0) +
  maxLineWidth(node.label) / 2;

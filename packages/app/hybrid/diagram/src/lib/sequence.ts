import { maxLineWidth, nodeWidth } from '@/lib/measure';
import type {
  Diagram,
  EdgePath,
  Layout,
  Lifeline,
  PositionedActivation,
  PositionedNode,
  PositionedNote,
  PositionedSequenceFragment,
} from '@/lib/types';

const PAD = 48;
const NODE_MIN_WIDTH = 120;
const SEQUENCE_HEADER_HEIGHT = 44;
const SEQUENCE_HEADER_Y = 60;
const SEQUENCE_COL_GAP = 90;
const SEQUENCE_FIRST_ROW_Y = 116;
const SEQUENCE_ROW_GAP = 40;
const SEQUENCE_BOTTOM_PAD = 60;
const FRAGMENT_PAD = 14;
const FRAGMENT_LABEL_HEIGHT = 18;
const ACTIVATION_WIDTH = 10;
const NOTE_HEIGHT = 30;
const NOTE_MIN_WIDTH = 120;

const rowY = (index: number): number =>
  SEQUENCE_FIRST_ROW_Y + index * SEQUENCE_ROW_GAP;

export const layoutSequence = (diagram: Diagram): Layout => {
  if (diagram.nodes.length === 0) {
    return {
      kind: 'sequence',
      direction: 'horizontal',
      nodes: [],
      edges: [],
      lifelines: [],
      width: PAD * 2,
      height: PAD * 2,
    };
  }

  const positioned: PositionedNode[] = [];
  let cursorX = PAD;
  for (const node of diagram.nodes) {
    const width = Math.max(NODE_MIN_WIDTH, nodeWidth(node.label, node.icon));
    positioned.push({
      ...node,
      x: cursorX + width / 2,
      y: SEQUENCE_HEADER_Y,
      width,
      height: SEQUENCE_HEADER_HEIGHT,
    });
    cursorX += width + SEQUENCE_COL_GAP;
  }

  const edges: EdgePath[] = diagram.edges
    .map((edge, index) => buildSequenceEdge(edge, index, positioned))
    .filter((edge): edge is EdgePath => edge !== null);

  const lastMessageY =
    edges.length > 0
      ? SEQUENCE_FIRST_ROW_Y + (edges.length - 1) * SEQUENCE_ROW_GAP
      : SEQUENCE_FIRST_ROW_Y - SEQUENCE_ROW_GAP;

  const notes = layoutNotes(diagram, positioned, edges.length, lastMessageY);
  const fragments = layoutFragments(diagram, positioned, lastMessageY);
  const activations = layoutActivations(diagram, positioned);

  const bottom = Math.max(
    lastMessageY + SEQUENCE_ROW_GAP,
    ...notes.map((note) => note.y + note.height / 2 + SEQUENCE_ROW_GAP / 2),
    ...activations.map((activation) => activation.bottom),
    ...fragments.map((fragment) => fragment.y + fragment.height / 2)
  );

  const lifelines: Lifeline[] = positioned.map((node) => ({
    x: node.x,
    top: SEQUENCE_HEADER_Y + SEQUENCE_HEADER_HEIGHT / 2 + 8,
    bottom,
  }));

  const rightEdge = cursorX - SEQUENCE_COL_GAP;
  const contentWidth = Math.max(
    rightEdge,
    ...notes.map((note) => note.x + note.width / 2)
  );

  return {
    kind: 'sequence',
    direction: 'horizontal',
    nodes: positioned,
    edges,
    width: contentWidth + PAD,
    height: bottom + SEQUENCE_BOTTOM_PAD,
    lifelines,
    fragments,
    activations,
    notes,
  };
};

const layoutNotes = (
  diagram: Diagram,
  positioned: PositionedNode[],
  edgeCount: number,
  lastMessageY: number
): PositionedNote[] => {
  const notes = diagram.notes ?? [];
  const rightEdge = Math.max(
    ...positioned.map((node) => node.x + node.width / 2)
  );
  return notes
    .map((note, index) => {
      const participant = note.over
        ? positioned.find((node) => node.id === note.over)
        : undefined;
      const width = Math.max(NOTE_MIN_WIDTH, maxLineWidth(note.text) + 32);
      const x = participant ? participant.x : rightEdge + 60;
      const y =
        edgeCount + index > 0
          ? rowY(edgeCount + index)
          : lastMessageY + SEQUENCE_ROW_GAP;
      return { id: note.id, text: note.text, x, y, width, height: NOTE_HEIGHT };
    })
    .filter((note) => note.x > 0);
};

const layoutFragments = (
  diagram: Diagram,
  positioned: PositionedNode[],
  lastMessageY: number
): PositionedSequenceFragment[] => {
  const fragments = diagram.fragments ?? [];
  return fragments
    .map((fragment) => {
      if (fragment.edgeStart > fragment.edgeEnd) return null;
      const involved = new Set<string>();
      for (const edge of diagram.edges) {
        involved.add(edge.source);
        involved.add(edge.target);
      }
      const members = positioned.filter((node) => involved.has(node.id));
      const leftX =
        members.length > 0
          ? Math.min(...members.map((n) => n.x - n.width / 2))
          : PAD;
      const rightX =
        members.length > 0
          ? Math.max(...members.map((n) => n.x + n.width / 2))
          : PAD + 100;
      const top =
        rowY(fragment.edgeStart) -
        SEQUENCE_ROW_GAP * 0.6 -
        FRAGMENT_LABEL_HEIGHT;
      const rowBottom = rowY(fragment.edgeEnd) + SEQUENCE_ROW_GAP * 0.6;
      const dividers = (diagram.dividers ?? [])
        .filter(
          (divider) =>
            divider.fragmentId === fragment.id &&
            divider.edgeIndex >= fragment.edgeStart &&
            divider.edgeIndex <= fragment.edgeEnd
        )
        .map((divider) => ({
          y: Math.min(
            rowY(divider.edgeIndex) + SEQUENCE_ROW_GAP / 2,
            rowBottom - 2
          ),
          label: divider.label,
        }));
      const height = rowBottom - top;
      return {
        id: fragment.id,
        type: fragment.type,
        label: fragment.label,
        x: (leftX + rightX) / 2,
        y: top + height / 2,
        width: rightX - leftX + FRAGMENT_PAD * 2,
        height,
        dividers,
      };
    })
    .filter(
      (fragment): fragment is PositionedSequenceFragment => fragment !== null
    )
    .filter((fragment) => fragment.height >= SEQUENCE_ROW_GAP / 2);
};

const layoutActivations = (
  diagram: Diagram,
  positioned: PositionedNode[]
): PositionedActivation[] => {
  const activations = diagram.activations ?? [];
  return activations
    .map((activation) => {
      if (activation.edgeStart > activation.edgeEnd) return null;
      const participant = positioned.find(
        (node) => node.id === activation.participant
      );
      if (!participant) return null;
      return {
        participant: activation.participant,
        x: participant.x,
        top: rowY(activation.edgeStart) - SEQUENCE_ROW_GAP * 0.3,
        bottom: rowY(activation.edgeEnd) + SEQUENCE_ROW_GAP * 0.3,
      };
    })
    .filter(
      (activation): activation is PositionedActivation => activation !== null
    );
};

const buildSequenceEdge = (
  edge: Diagram['edges'][number],
  index: number,
  positioned: PositionedNode[]
): EdgePath | null => {
  const source = positioned.find((node) => node.id === edge.source);
  const target = positioned.find((node) => node.id === edge.target);
  if (!source || !target) return null;

  const y = rowY(index);

  if (source.id === target.id) {
    const x0 = source.x + source.width / 2 + 6;
    const path = `M ${x0} ${y} A 16 16 0 1 1 ${x0} ${y + 0.01}`;
    return { edge, path, labelX: x0 + 24, labelY: y };
  }

  const path = `M ${source.x} ${y} L ${target.x} ${y}`;
  return {
    edge,
    path,
    labelX: (source.x + target.x) / 2,
    labelY: y - 10,
  };
};

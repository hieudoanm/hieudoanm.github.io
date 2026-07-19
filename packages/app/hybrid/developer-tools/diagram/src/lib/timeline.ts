import { formatDay, parseDay } from '@/lib/dates';
import { maxLineWidth } from '@/lib/measure';
import type {
  Diagram,
  Layout,
  PositionedNode,
  TimelineLayout,
} from '@/lib/types';

const PAD = 48;
const DAY_WIDTH = 16;
const BAR_HEIGHT = 26;
const ROW_GAP = 24;
const HEADER_HEIGHT = 40;
const LABEL_GAP = 28;
const MIN_BAR_WIDTH = 10;
const DEFAULT_SPAN_DAYS = 30;

const STEP_OPTIONS = [1, 2, 7, 14, 30, 90, 182, 365, 730, 1825];

const chooseStep = (totalDays: number): number =>
  STEP_OPTIONS.find((step) => totalDays / step <= 24) ??
  STEP_OPTIONS[STEP_OPTIONS.length - 1];

const nodeDay = (value: string | undefined, fallback: number): number => {
  if (!value) return fallback;
  return parseDay(value) ?? fallback;
};

const emptyTimeline = (diagram: Diagram): Layout => ({
  kind: 'timeline',
  direction: 'horizontal',
  nodes: [],
  edges: [],
  width: PAD * 2,
  height: PAD * 2,
  timeline: {
    columns: [],
    columnWidth: DAY_WIDTH,
    barHeight: BAR_HEIGHT,
    rowGap: ROW_GAP,
    headerHeight: HEADER_HEIGHT,
    labelWidth: 0,
    startX: 0,
    startY: HEADER_HEIGHT,
  },
});

export const layoutTimeline = (diagram: Diagram): Layout => {
  if (diagram.nodes.length === 0) return emptyTimeline(diagram);

  const days = diagram.nodes.flatMap((node) =>
    [node.start, node.end].flatMap((value) =>
      value ? [parseDay(value)].filter((d): d is number => d !== null) : []
    )
  );
  const minDay = days.length > 0 ? Math.min(...days) : 0;
  const maxDay = days.length > 0 ? Math.max(...days) : DEFAULT_SPAN_DAYS;

  const labelWidth =
    Math.max(...diagram.nodes.map((node) => maxLineWidth(node.label))) +
    LABEL_GAP;

  const positioned: PositionedNode[] = diagram.nodes.map((node, index) => {
    const start = nodeDay(node.start, minDay);
    const end = nodeDay(node.end, node.start ? start : maxDay);
    const safeEnd = Math.max(end, start);
    const left = labelWidth + (start - minDay) * DAY_WIDTH;
    const right = labelWidth + (safeEnd - minDay + 1) * DAY_WIDTH;
    const width = Math.max(right - left, MIN_BAR_WIDTH);
    const y = HEADER_HEIGHT + index * (BAR_HEIGHT + ROW_GAP) + BAR_HEIGHT / 2;
    return {
      ...node,
      x: left + width / 2,
      y,
      width,
      height: BAR_HEIGHT,
    };
  });

  const totalDays = maxDay - minDay + 1;
  const step = chooseStep(totalDays);
  const columns: TimelineLayout['columns'] = [];
  for (let day = minDay; day <= maxDay; day += step) {
    columns.push({
      label: formatDay(day),
      x: labelWidth + (day - minDay) * DAY_WIDTH,
    });
  }

  const timeline: TimelineLayout = {
    columns,
    columnWidth: DAY_WIDTH,
    barHeight: BAR_HEIGHT,
    rowGap: ROW_GAP,
    headerHeight: HEADER_HEIGHT,
    labelWidth,
    startX: labelWidth,
    startY: HEADER_HEIGHT + BAR_HEIGHT / 2,
  };

  const contentWidth = labelWidth + (maxDay - minDay + 1) * DAY_WIDTH;
  const contentHeight =
    HEADER_HEIGHT + diagram.nodes.length * (BAR_HEIGHT + ROW_GAP);

  return {
    kind: 'timeline',
    direction: 'horizontal',
    nodes: positioned,
    edges: [],
    width: contentWidth + PAD,
    height: contentHeight + PAD,
    timeline,
  };
};

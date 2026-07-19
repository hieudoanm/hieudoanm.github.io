'use client';

import { FC, PointerEvent as ReactPointerEvent, useRef } from 'react';
import { colorPair } from '@/lib/colors';
import { ICON_BODY } from '@/lib/icons';
import {
  ICON_SIZE,
  actorParts,
  cloudTransform,
  CLOUD_PATH,
  nodeIconCenterX,
  nodeLabelCenterX,
  noteTransform,
  NOTE_PATH,
} from '@/lib/layout';
import type {
  DiagramEdge,
  Layout,
  PositionedActivation,
  PositionedNode,
  PositionedNote,
  PositionedSequenceFragment,
  PositionedSubgraph,
} from '@/lib/types';

interface CanvasProps {
  layout: Layout;
  title: string;
  zoom: number;
  selectedId?: string | null;
  onSelectNode?: (id: string | null) => void;
  onDragNode?: (id: string, dx: number, dy: number) => void;
}

const edgeStroke = 'var(--color-neutral)';
const nodeFill = 'var(--color-base-200)';
const nodeStroke = 'var(--color-primary)';
const nodeText = 'var(--color-base-content)';
const titleFill = 'var(--color-base-content)';
const halo = 'var(--color-base-100)';
const iconStroke = 'var(--color-primary)';
const selectStroke = 'var(--color-secondary)';
const subgraphFill = 'var(--color-base-200)';
const subgraphText = 'var(--color-base-content)';

const nodeColors = (node: PositionedNode): { fill: string; stroke: string } =>
  node.color ? colorPair(node.color) : { fill: nodeFill, stroke: nodeStroke };

const edgeStyleAttrs = (
  edge: DiagramEdge
): {
  stroke: string;
  strokeWidth: number;
  strokeDasharray: string | undefined;
} => {
  const style = edge.style;
  return {
    stroke: style?.color ? colorPair(style.color).stroke : edgeStroke,
    strokeWidth: style?.width ?? 1.5,
    strokeDasharray: style?.dashed ? '6 4' : style?.dotted ? '2 4' : undefined,
  };
};

const ShapeNode: FC<{ node: PositionedNode }> = ({ node }) => {
  const { x, y, width, height, shape } = node;
  const { fill, stroke } = nodeColors(node);
  const common = { fill, stroke, strokeWidth: 1.5 };
  const rx = width / 2;
  const ry = height / 2;
  switch (shape) {
    case 'round':
      return (
        <rect
          height={height}
          rx={24}
          width={width}
          x={x - rx}
          y={y - ry}
          {...common}
        />
      );
    case 'ellipse':
      return <ellipse cx={x} cy={y} rx={rx} ry={ry} {...common} />;
    case 'diamond':
      return (
        <polygon
          points={`${x},${y - ry} ${x + rx},${y} ${x},${y + ry} ${x - rx},${y}`}
          {...common}
        />
      );
    case 'hexagon':
      return (
        <polygon
          points={`${x - rx},${y} ${x - rx * 0.5},${y - ry} ${x + rx * 0.5},${y - ry} ${x + rx},${y} ${x + rx * 0.5},${y + ry} ${x - rx * 0.5},${y + ry}`}
          {...common}
        />
      );
    case 'parallelogram': {
      const skew = ry * 0.4;
      return (
        <polygon
          points={`${x - rx + skew},${y - ry} ${x + rx + skew},${y - ry} ${x + rx - skew},${y + ry} ${x - rx - skew},${y + ry}`}
          {...common}
        />
      );
    }
    case 'cloud':
      return (
        <path d={CLOUD_PATH} transform={cloudTransform(node)} {...common} />
      );
    case 'note':
      return <path d={NOTE_PATH} transform={noteTransform(node)} {...common} />;
    case 'actor':
      return <ActorBody node={node} />;
    case 'cylinder':
      return (
        <>
          <rect
            height={height - 16}
            width={width}
            x={x - rx}
            y={y - ry + 8}
            {...common}
          />
          <ellipse cx={x} cy={y - ry + 8} rx={rx} ry={8} {...common} />
          <ellipse
            cx={x}
            cy={y + ry - 8}
            rx={rx}
            ry={8}
            fill="none"
            stroke={stroke}
            strokeWidth={1.5}
          />
        </>
      );
    default:
      return (
        <rect
          height={height}
          rx={6}
          width={width}
          x={x - rx}
          y={y - ry}
          {...common}
        />
      );
  }
};

const ActorBody: FC<{ node: PositionedNode }> = ({ node }) => {
  const parts = actorParts(node);
  const stroke = nodeColors(node).stroke;
  return (
    <g>
      <circle
        cx={parts.cx}
        cy={parts.cy}
        r={parts.r}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
      />
      {parts.lines.map((line, index) => (
        <line
          key={index}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          fill="none"
          stroke={stroke}
          strokeWidth={1.5}
        />
      ))}
    </g>
  );
};

const NodeIcon: FC<{ node: PositionedNode }> = ({ node }) => {
  const body =
    node.icon === 'glyph' ? (
      node.glyph ? (
        <path d={node.glyph} />
      ) : null
    ) : node.icon ? (
      <g dangerouslySetInnerHTML={{ __html: ICON_BODY[node.icon] }} />
    ) : null;
  if (!body) return null;
  return (
    <svg
      aria-hidden="true"
      data-icon={node.icon}
      fill="none"
      height={ICON_SIZE}
      stroke={iconStroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
      width={ICON_SIZE}
      x={nodeIconCenterX(node) - ICON_SIZE / 2}
      y={node.y - ICON_SIZE / 2}>
      {body}
    </svg>
  );
};

const NodeLabel: FC<{ node: PositionedNode }> = ({ node }) => (
  <text
    className="font-sans"
    dominantBaseline="middle"
    fill={nodeText}
    fontSize="13"
    fontWeight="500"
    textAnchor="middle"
    x={nodeLabelCenterX(node)}
    y={node.y}>
    {node.label}
  </text>
);

const SelectionRect: FC<{ node: PositionedNode }> = ({ node }) => (
  <rect
    fill="none"
    height={node.height + 12}
    rx={8}
    stroke={selectStroke}
    strokeDasharray="4 4"
    strokeWidth={2}
    width={node.width + 12}
    x={node.x - node.width / 2 - 6}
    y={node.y - node.height / 2 - 6}
  />
);

const SubgraphShape: FC<{ subgraph: PositionedSubgraph }> = ({ subgraph }) => (
  <g pointerEvents="none">
    <rect
      height={subgraph.height}
      rx={12}
      stroke={subgraph.color ? colorPair(subgraph.color).stroke : edgeStroke}
      strokeWidth={1.5}
      width={subgraph.width}
      x={subgraph.x - subgraph.width / 2}
      y={subgraph.y - subgraph.height / 2}
      fill={subgraph.color ? colorPair(subgraph.color).fill : subgraphFill}
    />
    <text
      className="font-sans"
      fill={subgraphText}
      fontSize="12"
      fontWeight="600"
      x={subgraph.x - subgraph.width / 2 + 12}
      y={subgraph.y - subgraph.height / 2 + 17}>
      {subgraph.label}
    </text>
  </g>
);

const SequenceFragmentShape: FC<{
  fragment: PositionedSequenceFragment;
}> = ({ fragment }) => {
  const left = fragment.x - fragment.width / 2;
  const top = fragment.y - fragment.height / 2;
  return (
    <g pointerEvents="none">
      <rect
        height={fragment.height}
        rx={6}
        stroke={edgeStroke}
        strokeDasharray="5 4"
        strokeWidth={1.2}
        width={fragment.width}
        x={left}
        y={top}
        fill="none"
      />
      <text
        className="font-sans"
        fill={edgeStroke}
        fontSize="11"
        fontWeight="500"
        x={left + 8}
        y={top + 14}>
        {`${fragment.type} ${fragment.label}`.trim()}
      </text>
      {fragment.dividers.map((divider) => (
        <g key={divider.y}>
          <line
            x1={left}
            y1={divider.y}
            x2={left + fragment.width}
            y2={divider.y}
            stroke={edgeStroke}
            strokeDasharray="5 4"
            strokeWidth={1.2}
          />
          <text
            className="font-sans"
            fill={edgeStroke}
            fontSize="11"
            x={left + 8}
            y={divider.y - 4}>
            {divider.label}
          </text>
        </g>
      ))}
    </g>
  );
};

const ActivationBar: FC<{ activation: PositionedActivation }> = ({
  activation,
}) => (
  <rect
    fill={nodeFill}
    height={Math.max(activation.bottom - activation.top, 2)}
    rx={2}
    stroke={nodeStroke}
    strokeWidth={1}
    width={10}
    x={activation.x - 5}
    y={activation.top}
  />
);

const NoteShape: FC<{ note: PositionedNote }> = ({ note }) => {
  const left = note.x - note.width / 2;
  const top = note.y - note.height / 2;
  const fold = 10;
  const lines = note.text.split('\n');
  return (
    <g pointerEvents="none">
      <rect
        height={note.height}
        rx={3}
        stroke={edgeStroke}
        strokeWidth={1.2}
        width={note.width}
        x={left}
        y={top}
        fill={subgraphFill}
      />
      <path
        d={`M ${left + note.width - fold} ${top} L ${left + note.width} ${top + fold} L ${left + note.width - fold} ${top + fold} Z`}
        fill={subgraphFill}
        stroke={edgeStroke}
        strokeWidth={1.2}
      />
      <text
        className="font-sans"
        fill={nodeText}
        fontSize="12"
        textAnchor="middle"
        x={note.x}
        y={note.y - ((lines.length - 1) * 14) / 2}>
        {lines.map((line, index) => (
          <tspan key={index} dy={index === 0 ? 0 : 14} x={note.x}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
};

const TimelineView: FC<{ layout: Layout }> = ({ layout }) => {
  const timeline = layout.timeline!;
  const { columns, columnWidth, headerHeight, labelWidth } = timeline;
  return (
    <>
      {columns.map((column) => (
        <g key={column.label} pointerEvents="none">
          <line
            x1={column.x}
            y1={headerHeight}
            x2={column.x}
            y2={layout.height}
            stroke={edgeStroke}
            strokeOpacity={0.25}
            strokeWidth={1}
          />
          <text
            className="font-sans"
            fill={nodeText}
            fontSize="11"
            textAnchor="middle"
            x={column.x + columnWidth / 2}
            y={headerHeight - 14}>
            {column.label}
          </text>
        </g>
      ))}
      {layout.nodes.map((node) => {
        const { fill, stroke } = nodeColors(node);
        return (
          <g key={node.id}>
            <rect
              height={node.height}
              rx={4}
              stroke={stroke}
              strokeWidth={1.2}
              width={node.width}
              x={node.x - node.width / 2}
              y={node.y - node.height / 2}
              fill={fill}
            />
            <text
              className="font-sans"
              dominantBaseline="middle"
              fill={nodeText}
              fontSize="12"
              textAnchor="end"
              x={labelWidth - 14}
              y={node.y}>
              {node.label}
            </text>
          </g>
        );
      })}
    </>
  );
};

const VennView: FC<{ layout: Layout }> = ({ layout }) => (
  <>
    {layout.nodes.map((node) => {
      const { fill, stroke } = nodeColors(node);
      return (
        <g key={node.id} pointerEvents="none">
          <circle
            cx={node.x}
            cy={node.y}
            fill={fill}
            r={node.width / 2}
            stroke={stroke}
            strokeWidth={1.5}
          />
          <text
            className="font-sans"
            dominantBaseline="middle"
            fill={nodeText}
            fontSize="13"
            fontWeight="500"
            textAnchor="middle"
            x={node.x}
            y={node.y}>
            {node.label}
          </text>
        </g>
      );
    })}
  </>
);

const Canvas: FC<CanvasProps> = ({
  layout,
  title,
  zoom,
  selectedId,
  onSelectNode,
  onDragNode,
}) => {
  const { nodes, edges, width, height, kind } = layout;
  const dragRef = useRef<{ id: string; lastX: number; lastY: number } | null>(
    null
  );
  const style = { width: `${width * zoom}px`, height: `${height * zoom}px` };

  const markerColors = Array.from(
    new Set(
      edges
        .filter(({ edge }) => edge.directed && edge.style?.arrow !== false)
        .map(({ edge }) => edgeStyleAttrs(edge).stroke)
    )
  );
  const markerIds = new Map(
    markerColors.map((color, index) => [color, `diagram-canvas-arrow-${index}`])
  );

  const markerEnd = (edge: DiagramEdge): string | undefined =>
    edge.directed && edge.style?.arrow !== false
      ? `url(#${markerIds.get(edgeStyleAttrs(edge).stroke)})`
      : undefined;

  const handleNodePointerDown = (
    event: ReactPointerEvent<SVGGElement>,
    node: PositionedNode
  ): void => {
    event.stopPropagation();
    onSelectNode?.(node.id);
    if (!onDragNode) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      id: node.id,
      lastX: event.clientX,
      lastY: event.clientY,
    };
  };

  const handleNodePointerMove = (
    event: ReactPointerEvent<SVGGElement>
  ): void => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = (event.clientX - drag.lastX) / zoom;
    const dy = (event.clientY - drag.lastY) / zoom;
    if (dx === 0 && dy === 0) return;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    onDragNode?.(drag.id, dx, dy);
  };

  const handleNodePointerUp = (): void => {
    dragRef.current = null;
  };

  const handleBackgroundPointerDown = (
    event: ReactPointerEvent<SVGSVGElement>
  ): void => {
    if (event.target === event.currentTarget) {
      onSelectNode?.(null);
    }
  };

  return (
    <div
      aria-label="Diagram canvas"
      className="bg-base-100 min-h-0 flex-1 overflow-auto p-6"
      role="img">
      <svg
        className="block"
        onPointerDown={handleBackgroundPointerDown}
        style={style}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg">
        <defs>
          {markerColors.map((color, index) => (
            <marker
              id={`diagram-canvas-arrow-${index}`}
              key={color}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
            </marker>
          ))}
        </defs>
        {title && (
          <text
            className="font-sans"
            fill={titleFill}
            fontSize="18"
            fontWeight="600"
            x="48"
            y="30">
            {title}
          </text>
        )}
        {kind === 'sequence' ? (
          <>
            {(layout.fragments ?? []).map((fragment) => (
              <SequenceFragmentShape key={fragment.id} fragment={fragment} />
            ))}
            {(layout.lifelines ?? []).map((lifeline) => (
              <line
                key={lifeline.x}
                x1={lifeline.x}
                y1={lifeline.top}
                x2={lifeline.x}
                y2={lifeline.bottom}
                stroke={edgeStroke}
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            ))}
            {(layout.activations ?? []).map((activation) => (
              <ActivationBar
                key={`${activation.participant}-${activation.top}`}
                activation={activation}
              />
            ))}
            {edges.map(({ path, edge, labelX, labelY }) => {
              const { stroke, strokeWidth, strokeDasharray } =
                edgeStyleAttrs(edge);
              return (
                <g key={edge.id}>
                  <path
                    d={path}
                    fill="none"
                    markerEnd={markerEnd(edge)}
                    stroke={stroke}
                    strokeDasharray={strokeDasharray}
                    strokeWidth={strokeWidth}
                  />
                  {edge.label && (
                    <EdgeLabel label={edge.label} x={labelX} y={labelY} />
                  )}
                </g>
              );
            })}
            {(layout.notes ?? []).map((note) => (
              <NoteShape key={note.id} note={note} />
            ))}
            {nodes.map((node) => {
              const { fill, stroke } = nodeColors(node);
              return (
                <g key={node.id}>
                  <rect
                    height={node.height}
                    rx={10}
                    width={node.width}
                    x={node.x - node.width / 2}
                    y={node.y - node.height / 2}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={1.5}
                  />
                  <NodeIcon node={node} />
                  <NodeLabel node={node} />
                </g>
              );
            })}
          </>
        ) : kind === 'timeline' ? (
          <TimelineView layout={layout} />
        ) : kind === 'venn' ? (
          <VennView layout={layout} />
        ) : (
          <>
            {(layout.subgraphs ?? []).map((subgraph) => (
              <SubgraphShape key={subgraph.id} subgraph={subgraph} />
            ))}
            {edges.map(({ path, edge, labelX, labelY }) => {
              const { stroke, strokeWidth, strokeDasharray } =
                edgeStyleAttrs(edge);
              return (
                <g key={edge.id}>
                  <path
                    d={path}
                    fill="none"
                    markerEnd={markerEnd(edge)}
                    stroke={stroke}
                    strokeDasharray={strokeDasharray}
                    strokeWidth={strokeWidth}
                  />
                  {edge.label && (
                    <EdgeLabel label={edge.label} x={labelX} y={labelY} />
                  )}
                </g>
              );
            })}
            {nodes.map((node) => (
              <g
                className={onDragNode ? 'cursor-move' : undefined}
                key={node.id}
                onPointerDown={(event) => handleNodePointerDown(event, node)}
                onPointerMove={handleNodePointerMove}
                onPointerUp={handleNodePointerUp}>
                <ShapeNode node={node} />
                <NodeIcon node={node} />
                <NodeLabel node={node} />
                {node.id === selectedId && <SelectionRect node={node} />}
              </g>
            ))}
          </>
        )}
      </svg>
    </div>
  );
};

const EdgeLabel: FC<{ label: string; x: number; y: number }> = ({
  label,
  x,
  y,
}) => (
  <text
    className="font-sans"
    fill={edgeStroke}
    fontSize="12"
    paintOrder="stroke"
    pointerEvents="none"
    stroke={halo}
    strokeWidth="4"
    textAnchor="middle"
    x={x}
    y={y}>
    {label}
  </text>
);

export default Canvas;

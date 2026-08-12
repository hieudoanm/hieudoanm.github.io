'use client';

import { FC, PointerEvent as ReactPointerEvent, useRef } from 'react';
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
import type { Layout, PositionedNode } from '@/lib/types';

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

const common = {
  fill: nodeFill,
  stroke: nodeStroke,
  strokeWidth: 1.5,
};

const ShapeNode: FC<{ node: PositionedNode }> = ({ node }) => {
  const { x, y, width, height, shape } = node;
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
            stroke={nodeStroke}
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
  return (
    <g>
      <circle
        cx={parts.cx}
        cy={parts.cy}
        r={parts.r}
        fill="none"
        stroke={nodeStroke}
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
          stroke={nodeStroke}
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
          <marker
            id="diagram-canvas-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={edgeStroke} />
          </marker>
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
            {edges.map(({ path, edge, labelX, labelY }) => (
              <g key={edge.id}>
                <path
                  d={path}
                  fill="none"
                  markerEnd="url(#diagram-canvas-arrow)"
                  stroke={edgeStroke}
                  strokeWidth="1.5"
                />
                {edge.label && (
                  <EdgeLabel label={edge.label} x={labelX} y={labelY} />
                )}
              </g>
            ))}
            {nodes.map((node) => (
              <g key={node.id}>
                <rect
                  height={node.height}
                  rx={10}
                  width={node.width}
                  x={node.x - node.width / 2}
                  y={node.y - node.height / 2}
                  {...common}
                />
                <NodeIcon node={node} />
                <NodeLabel node={node} />
              </g>
            ))}
          </>
        ) : (
          <>
            {edges.map(({ path, edge, labelX, labelY }) => (
              <g key={edge.id}>
                <path
                  d={path}
                  fill="none"
                  markerEnd={
                    edge.directed ? 'url(#diagram-canvas-arrow)' : undefined
                  }
                  stroke={edgeStroke}
                  strokeWidth="1.5"
                />
                {edge.label && (
                  <EdgeLabel label={edge.label} x={labelX} y={labelY} />
                )}
              </g>
            ))}
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

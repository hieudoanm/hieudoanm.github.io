'use client';

import { FC } from 'react';
import { ICON_BODY } from '@/lib/icons';
import { ICON_SIZE, nodeIconCenterX, nodeLabelCenterX } from '@/lib/layout';
import type { Layout, PositionedNode } from '@/lib/types';

interface CanvasProps {
  layout: Layout;
  title: string;
  zoom: number;
}

const edgeStroke = 'var(--color-neutral)';
const nodeFill = 'var(--color-base-200)';
const nodeStroke = 'var(--color-primary)';
const nodeText = 'var(--color-base-content)';
const titleFill = 'var(--color-base-content)';
const halo = 'var(--color-base-100)';
const iconStroke = 'var(--color-primary)';

const ShapeNode: FC<{ node: PositionedNode }> = ({ node }) => {
  const { x, y, width, height, shape } = node;
  const rx = width / 2;
  const ry = height / 2;
  const common = {
    fill: nodeFill,
    stroke: nodeStroke,
    strokeWidth: 1.5,
  };
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

const Canvas: FC<CanvasProps> = ({ layout, title, zoom }) => {
  const { nodes, edges, width, height } = layout;
  const style = { width: `${width * zoom}px`, height: `${height * zoom}px` };

  return (
    <div
      aria-label="Diagram canvas"
      className="bg-base-100 min-h-0 flex-1 overflow-auto p-6"
      role="img">
      <svg
        className="block"
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
              <text
                className="font-sans"
                fill={edgeStroke}
                fontSize="12"
                paintOrder="stroke"
                stroke={halo}
                strokeWidth="4"
                textAnchor="middle"
                x={labelX}
                y={labelY}>
                {edge.label}
              </text>
            )}
          </g>
        ))}
        {nodes.map((node) => (
          <g key={node.id}>
            <ShapeNode node={node} />
            {node.icon && (
              <svg
                aria-hidden="true"
                data-icon={node.icon}
                dangerouslySetInnerHTML={{ __html: ICON_BODY[node.icon] }}
                fill="none"
                height={ICON_SIZE}
                stroke={iconStroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
                width={ICON_SIZE}
                x={nodeIconCenterX(node) - ICON_SIZE / 2}
                y={node.y - ICON_SIZE / 2}
              />
            )}
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
          </g>
        ))}
      </svg>
    </div>
  );
};

export default Canvas;

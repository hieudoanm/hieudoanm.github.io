'use client';

import { useEffect, useRef, useState } from 'react';
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
} from 'd3-force';
import type { GraphEdge, GraphNode } from '@/types/doi';

interface CitationGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const WIDTH = 1200;
const HEIGHT = 700;
const RADIUS_MIN = 4;
const RADIUS_MAX = 16;
const MAX_DEGREE = 200;
const PAN_STEP = 120;

interface SimNode extends GraphNode {
  x: number;
  y: number;
}

interface SimLink {
  source: string | SimNode;
  target: string | SimNode;
  line: SVGLineElement | null;
}

const radiusFor = (node: GraphNode): number => {
  const t = Math.min(1, node.inDegree / MAX_DEGREE);
  return RADIUS_MIN + t * (RADIUS_MAX - RADIUS_MIN);
};

const CitationGraph = ({ nodes, edges }: CitationGraphProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selected, setSelected] = useState<GraphNode | null>(null);

  const [zoom, setZoom] = useState(1);
  const zoomRef = useRef(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const panRef = useRef({ x: 0, y: 0 });
  const pinchRef = useRef(0);
  const contentRef = useRef<SVGGElement | null>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    panX: number;
    panY: number;
    moved: boolean;
    active: boolean;
  } | null>(null);

  const applyTransform = () => {
    const { x, y } = panRef.current;
    const k = zoomRef.current;
    contentRef.current?.setAttribute(
      'transform',
      `translate(${x}, ${y}) scale(${k})`
    );
  };

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;
    const svg = svgRef.current;
    const simNodes: SimNode[] = nodes.map((n) => ({ ...n, x: 0, y: 0 }));
    const simEdges: SimLink[] = edges.map((e) => ({
      source: e.source,
      target: e.target,
      line: null,
    }));

    const simulation = forceSimulation(simNodes)
      .force(
        'link',
        forceLink<SimNode, SimLink>(simEdges)
          .id((d) => d.doi)
          .distance(80)
      )
      .force('charge', forceManyBody().strength(-200))
      .force('center', forceCenter(WIDTH / 2, HEIGHT / 2))
      .force('collide', forceCollide().radius(14))
      .force('x', forceX(WIDTH / 2).strength(0.05))
      .force('y', forceY(HEIGHT / 2).strength(0.05));

    const circles = new Map<string, SVGCircleElement>();
    const labels = new Map<string, SVGTextElement>();
    const edgesGroup = svg.querySelector('#edges');
    const nodesGroup = svg.querySelector('#nodes');

    if (!edgesGroup || !nodesGroup) return;
    edgesGroup.innerHTML = '';
    nodesGroup.innerHTML = '';

    for (const edge of simEdges) {
      const line = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'line'
      );
      line.setAttribute('stroke', 'currentColor');
      line.setAttribute('stroke-opacity', '0.25');
      line.classList.add('dot');
      edgesGroup.appendChild(line);
      edge.line = line;
    }

    for (const node of simNodes) {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'node');
      g.style.cursor = 'pointer';

      const circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );
      circle.setAttribute('r', String(radiusFor(node)));
      circle.setAttribute('fill', 'var(--color-primary, #4f46e5)');
      const title = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'title'
      );
      title.textContent = `${node.doi}\n${node.title}`;
      circle.appendChild(title);

      const text = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'text'
      );
      text.textContent = node.year || '?';
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dy', '0.35em');
      text.setAttribute('font-size', '9');
      text.setAttribute('fill', 'var(--color-base-content, #1f2140)');

      g.appendChild(circle);
      g.appendChild(text);
      g.addEventListener('click', () => {
        if (dragRef.current?.moved) return;
        setSelected(node);
      });

      circles.set(node.doi, circle);
      labels.set(node.doi, text);
      nodesGroup.appendChild(g);
    }

    simulation.on('tick', () => {
      for (const simEdge of simEdges) {
        const l = simEdge.line;
        if (!l) continue;
        const s = simEdge.source as SimNode;
        const t = simEdge.target as SimNode;
        l.setAttribute('x1', String(s.x));
        l.setAttribute('y1', String(s.y));
        l.setAttribute('x2', String(t.x));
        l.setAttribute('y2', String(t.y));
      }
      for (const node of simNodes) {
        const c = circles.get(node.doi);
        const l = labels.get(node.doi);
        if (c) {
          c.setAttribute('cx', String(node.x));
          c.setAttribute('cy', String(node.y));
        }
        if (l) {
          l.setAttribute('x', String(node.x));
          l.setAttribute('y', String(node.y));
        }
      }
    });

    return () => {
      simulation.stop();
    };
  }, [nodes, edges]);

  /** Maps a client (screen) point to viewBox coordinates, honoring the SVG's
   *  `preserveAspectRatio` letterboxing. Falls back to the viewBox center. */
  const viewBoxPoint = (clientX: number, clientY: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) {
      return { x: WIDTH / 2, y: HEIGHT / 2 };
    }
    const scale = Math.min(rect.width / WIDTH, rect.height / HEIGHT);
    const offsetX = (rect.width - WIDTH * scale) / 2;
    const offsetY = (rect.height - HEIGHT * scale) / 2;
    return {
      x: (clientX - rect.left - offsetX) / scale,
      y: (clientY - rect.top - offsetY) / scale,
    };
  };

  const zoomAt = (anchor: { x: number; y: number }, factor: number) => {
    const k = zoomRef.current;
    const next = Math.min(3, Math.max(0.5, k * factor));
    // Keep the point under the anchor fixed while zooming.
    const { x, y } = panRef.current;
    const newX = anchor.x - (anchor.x - x) * factor;
    const newY = anchor.y - (anchor.y - y) * factor;
    panRef.current = { x: newX, y: newY };
    setPan(panRef.current);
    zoomRef.current = next;
    setZoom(next);
    applyTransform();
  };

  const zoomTo = (factor: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const anchor = viewBoxPoint(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2
    );
    zoomAt(anchor, factor);
  };

  const zoomReset = () => {
    zoomRef.current = 1;
    panRef.current = { x: 0, y: 0 };
    setPan({ x: 0, y: 0 });
    setZoom(1);
    applyTransform();
  };

  const panBy = (dx: number, dy: number) => {
    panRef.current = {
      x: panRef.current.x + dx,
      y: panRef.current.y + dy,
    };
    setPan(panRef.current);
    applyTransform();
  };

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      panX: panRef.current.x,
      panY: panRef.current.y,
      moved: false,
      active: true,
    };
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragRef.current?.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragRef.current.moved = true;
    if (dragRef.current.moved) {
      panRef.current = {
        x: dragRef.current.panX + dx,
        y: dragRef.current.panY + dy,
      };
      setPan(panRef.current);
      applyTransform();
    }
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.1 : 0.9;
      const anchor = viewBoxPoint(e.clientX, e.clientY);
      zoomAt(anchor, factor);
    };
    svg.addEventListener('wheel', onWheel, { passive: false });
    return () => svg.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="card bg-base-200 card-body min-w-0 flex-1">
        <div className="relative h-[60vh] w-full overflow-hidden">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className={`h-full w-full touch-none ${dragRef.current?.moved ? 'cursor-grabbing' : 'cursor-grab'}`}
            role="img"
            aria-label="Citation network graph"
            data-testid="citation-graph"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerUp}
            onTouchMove={(e) => {
              if (e.touches.length === 2) {
                const t = e.touches;
                const dx = Math.abs(t[0].clientX - t[1].clientX);
                const dy = Math.abs(t[0].clientY - t[1].clientY);
                const dist = Math.hypot(dx, dy);
                const ratio = dist / pinchRef.current;
                if (Number.isFinite(ratio)) zoomTo(ratio);
                pinchRef.current = dist;
              }
            }}
            onTouchEnd={() => {
              pinchRef.current = 0;
            }}>
            <g ref={contentRef} id="content">
              <g id="edges" />
              <g id="nodes" />
            </g>
          </svg>
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => zoomTo(1.2)}
              className="btn btn-circle btn-sm bg-base-100 shadow"
              aria-label="Zoom in"
              title="Zoom in">
              +
            </button>
            <button
              type="button"
              onClick={() => zoomTo(0.8)}
              className="btn btn-circle btn-sm bg-base-100 shadow"
              aria-label="Zoom out"
              title="Zoom out">
              −
            </button>
            <button
              type="button"
              onClick={zoomReset}
              disabled={zoom === 1}
              className="btn btn-circle btn-sm bg-base-100 disabled:text-base-content/30 shadow"
              aria-label="Reset zoom"
              title={`Reset zoom (${Math.round(zoom * 100)}%)`}>
              ↺
            </button>
          </div>
          <div className="absolute right-3 bottom-3 flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={() => panBy(0, PAN_STEP)}
              className="btn btn-circle btn-sm bg-base-100 shadow"
              aria-label="Pan up"
              title="Pan up">
              ▲
            </button>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => panBy(PAN_STEP, 0)}
                className="btn btn-circle btn-sm bg-base-100 shadow"
                aria-label="Pan left"
                title="Pan left">
                ◀
              </button>
              <button
                type="button"
                onClick={() => panBy(0, -PAN_STEP)}
                className="btn btn-circle btn-sm bg-base-100 shadow"
                aria-label="Pan down"
                title="Pan down">
                ▼
              </button>
              <button
                type="button"
                onClick={() => panBy(-PAN_STEP, 0)}
                className="btn btn-circle btn-sm bg-base-100 shadow"
                aria-label="Pan right"
                title="Pan right">
                ▶
              </button>
            </div>
          </div>
        </div>
      </div>
      <aside className="card bg-base-200 card-body w-full lg:w-80">
        {selected ? (
          <>
            <h2 className="text-lg font-bold break-all">
              {selected.title || selected.doi}
            </h2>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-base-content/50">DOI</dt>
                <dd className="break-all">{selected.doi}</dd>
              </div>
              <div>
                <dt className="text-base-content/50">Year</dt>
                <dd>{selected.year || '—'}</dd>
              </div>
              {selected.type && (
                <div>
                  <dt className="text-base-content/50">Type</dt>
                  <dd className="break-all">{selected.type}</dd>
                </div>
              )}
              <div>
                <dt className="text-base-content/50">Citations (in-degree)</dt>
                <dd>{selected.inDegree}</dd>
              </div>
              {selected.author && (
                <div>
                  <dt className="text-base-content/50">Author</dt>
                  <dd>{selected.author}</dd>
                </div>
              )}
            </dl>
          </>
        ) : (
          <p className="text-base-content/50 text-sm">
            Click a node to inspect its metadata.
          </p>
        )}
      </aside>
    </div>
  );
};

export default CitationGraph;

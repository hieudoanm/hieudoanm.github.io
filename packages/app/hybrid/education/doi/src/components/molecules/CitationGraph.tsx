'use client';

import { FC, useEffect, useRef, useState } from 'react';
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

const CitationGraph: FC<CitationGraphProps> = ({ nodes, edges }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selected, setSelected] = useState<GraphNode | null>(null);

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
      g.addEventListener('click', () => setSelected(node));

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

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="card bg-base-200 card-body min-w-0 flex-1">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full"
          role="img"
          aria-label="Citation network graph"
          data-testid="citation-graph">
          <g id="edges" />
          <g id="nodes" />
        </svg>
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

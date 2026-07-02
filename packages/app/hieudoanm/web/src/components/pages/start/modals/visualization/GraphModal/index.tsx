import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  type Simulation,
} from 'd3-force';

import { exampleGraph, GROUP_COLORS, GRAPH_MODAL_SIZE } from './constants';
import type { GraphData, SimLink, SimNode } from './types';

export const GraphModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<GraphData | null>(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ nodes: 0, links: 0 });
  const [hoveredNode, setHoveredNode] = useState<SimNode | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  const loadFile = useCallback((file: File) => {
    setFileName(file.name);
    setError('');
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string) as GraphData;
        if (!Array.isArray(json.nodes) || json.nodes.length === 0) {
          setError('JSON must contain a "nodes" array with at least one entry');
          return;
        }
        setData(json);
        setStats({ nodes: json.nodes.length, links: json.links?.length ?? 0 });
      } catch {
        setError('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  }, []);

  const loadExample = useCallback(() => {
    setFileName('example.json');
    setError('');
    setData(exampleGraph);
    setStats({
      nodes: exampleGraph.nodes.length,
      links: exampleGraph.links?.length ?? 0,
    });
  }, []);

  useEffect(() => {
    if (!data || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const nodeMap = new Map<string, SimNode>();

    const simNodes: SimNode[] = data.nodes.map((n) => {
      const node: SimNode = {
        id: n.id,
        label: n.label || n.id,
        path: n.path ?? '',
        group: n.group ?? 0,
        size: n.size ?? 5,
        x: width / 2 + (Math.random() - 0.5) * width * 0.6,
        y: height / 2 + (Math.random() - 0.5) * height * 0.6,
        vx: 0,
        vy: 0,
        fx: null,
        fy: null,
      };
      nodeMap.set(node.id, node);
      return node;
    });

    const simLinks: SimLink[] = (data.links ?? []).flatMap((l) => {
      const source = nodeMap.get(l.source);
      const target = nodeMap.get(l.target);
      if (!source || !target) return [];
      return [{ source, target, weight: l.weight ?? 1 }];
    });

    const sim: Simulation<SimNode, SimLink> = forceSimulation(simNodes)
      .force(
        'link',
        forceLink<SimNode, SimLink>(simLinks)
          .id((d: SimNode) => d.id)
          .distance(100)
          .strength(0.4)
      )
      .force('charge', forceManyBody().strength(-300))
      .force('center', forceCenter(width / 2, height / 2))
      .force(
        'collide',
        forceCollide().radius((d) => (d as SimNode).size + 6)
      )
      .alphaDecay(0.03)
      .velocityDecay(0.3);

    let transform = { x: 0, y: 0, k: 1 };
    let redrawPending = false;

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      ctx.translate(transform.x, transform.y);
      ctx.scale(transform.k, transform.k);

      for (const link of simLinks) {
        ctx.beginPath();
        ctx.moveTo(link.source.x, link.source.y);
        ctx.lineTo(link.target.x, link.target.y);
        ctx.strokeStyle = 'rgba(255,255,255,0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (const node of simNodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = GROUP_COLORS[node.group] ?? '#888';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      if (transform.k > 0.4) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = 'rgba(255,255,255,0.75)';
        ctx.font = '11px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        for (const node of simNodes) {
          const sx = node.x * transform.k + transform.x;
          const sy = node.y * transform.k + transform.y;
          if (sx >= -50 && sx <= width + 50 && sy >= -50 && sy <= height + 50) {
            ctx.fillText(node.label, sx, sy - node.size * transform.k - 3);
          }
        }
      }
    };

    const requestRedraw = () => {
      if (!redrawPending) {
        redrawPending = true;
        requestAnimationFrame(() => {
          redrawPending = false;
          draw();
        });
      }
    };

    sim.on('tick', requestRedraw);

    let isPointerDown = false;
    let isDraggingNode = false;
    let dragNode: SimNode | null = null;
    let pointerStart = { x: 0, y: 0 };
    let transformStart = { x: 0, y: 0 };

    const getTransformedPoint = (px: number, py: number) => ({
      x: (px - transform.x) / transform.k,
      y: (py - transform.y) / transform.k,
    });

    const findNode = (px: number, py: number): SimNode | null => {
      const tp = getTransformedPoint(px, py);
      for (let i = simNodes.length - 1; i >= 0; i--) {
        const n = simNodes[i];
        const dx = tp.x - n.x;
        const dy = tp.y - n.y;
        if (dx * dx + dy * dy <= (n.size + 5) * (n.size + 5)) return n;
      }
      return null;
    };

    const onPointerDown = (e: MouseEvent) => {
      isPointerDown = true;
      pointerStart = { x: e.offsetX, y: e.offsetY };
      transformStart = { ...transform };

      const hit = findNode(e.offsetX, e.offsetY);
      if (hit) {
        isDraggingNode = true;
        dragNode = hit;
        hit.fx = hit.x;
        hit.fy = hit.y;
        (sim as Simulation<SimNode, SimLink>).alphaTarget(0.3).restart();
        return;
      }
    };

    const onPointerMove = (e: MouseEvent) => {
      if (isPointerDown) {
        if (isDraggingNode && dragNode) {
          const tp = getTransformedPoint(e.offsetX, e.offsetY);
          dragNode.fx = tp.x;
          dragNode.fy = tp.y;
          return;
        }
        transform.x = transformStart.x + (e.offsetX - pointerStart.x);
        transform.y = transformStart.y + (e.offsetY - pointerStart.y);
        requestRedraw();
        return;
      }

      const hit = findNode(e.offsetX, e.offsetY);
      if (hit) {
        setHoveredNode(hit);
        setHoverPos({ x: e.offsetX, y: e.offsetY });
      } else {
        setHoveredNode(null);
      }
    };

    const onPointerUp = () => {
      if (dragNode) {
        dragNode.fx = null;
        dragNode.fy = null;
        (sim as Simulation<SimNode, SimLink>).alphaTarget(0);
      }
      isPointerDown = false;
      isDraggingNode = false;
      dragNode = null;
    };

    const onPointerLeave = () => {
      if (dragNode) {
        dragNode.fx = null;
        dragNode.fy = null;
        (sim as Simulation<SimNode, SimLink>).alphaTarget(0);
      }
      isPointerDown = false;
      isDraggingNode = false;
      dragNode = null;
      setHoveredNode(null);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.001;
      const newK = Math.max(0.1, Math.min(4, transform.k * (1 + delta)));
      const mx = e.offsetX;
      const my = e.offsetY;
      transform.x = mx - (mx - transform.x) * (newK / transform.k);
      transform.y = my - (my - transform.y) * (newK / transform.k);
      transform.k = newK;
      requestRedraw();
    };

    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('mousedown', onPointerDown);
    canvas.addEventListener('mousemove', onPointerMove);
    canvas.addEventListener('mouseup', onPointerUp);
    canvas.addEventListener('mouseleave', onPointerLeave);

    sim.alpha(0.8).restart();
    requestRedraw();

    return () => {
      sim.stop();
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('mousedown', onPointerDown);
      canvas.removeEventListener('mousemove', onPointerMove);
      canvas.removeEventListener('mouseup', onPointerUp);
      canvas.removeEventListener('mouseleave', onPointerLeave);
    };
  }, [data]);

  return (
    <ModalWrapper
      onClose={onClose}
      title="Graph Visualization"
      size={GRAPH_MODAL_SIZE}
      fullHeight>
      <div className="flex flex-1 flex-col p-4 pt-2">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="btn btn-xs btn-ghost" onClick={loadExample}>
              Load Example
            </button>
            {fileName && (
              <span className="text-base-content/40 ml-1 max-w-40 truncate text-[11px]">
                {fileName}
              </span>
            )}
          </div>
          {stats.nodes > 0 && (
            <span className="text-base-content/40 text-[11px] whitespace-nowrap">
              {stats.nodes} nodes / {stats.links} links
            </span>
          )}
        </div>

        {error && (
          <div className="bg-base-content/10 text-base-content/60 mb-3 rounded px-3 py-2 text-xs">
            {error}
          </div>
        )}

        {!data ? (
          <div className="flex min-h-0 flex-1 flex-col gap-3">
            <Dropzone
              accept=".json,application/json"
              onFile={loadFile}
              className="flex-1"
              label="Drop a JSON file here or click to browse"
            />
            <button
              className="btn btn-xs btn-ghost self-center"
              onClick={loadExample}>
              Load example graph
            </button>
          </div>
        ) : (
          <div ref={containerRef} className="relative min-h-0 flex-1">
            <canvas
              ref={canvasRef}
              className="border-base-content/10 h-full w-full rounded-lg border"
            />
            {hoveredNode && hoveredNode.path && (
              <div
                className="pointer-events-none absolute z-10 max-w-64 rounded-md bg-black/80 px-2.5 py-1.5 text-[11px] text-white shadow-lg"
                style={{ left: hoverPos.x + 12, top: hoverPos.y - 10 }}>
                <div className="font-normal">{hoveredNode.label}</div>
                <div className="text-white/60">{hoveredNode.path}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
GraphModal.displayName = 'GraphModal';

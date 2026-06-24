import type { GraphData } from './types';

export const exampleGraph: GraphData = {
  nodes: [
    { id: 'obsidian', label: 'Obsidian', group: 1, size: 8 },
    { id: 'd3-force', label: 'd3-force', group: 2, size: 6 },
    { id: 'canvas', label: 'Canvas 2D', group: 2, size: 5 },
    { id: 'webgl', label: 'WebGL', group: 2, size: 4 },
    { id: 'pixi', label: 'PixiJS', group: 3, size: 5 },
    { id: 'three', label: 'Three.js', group: 3, size: 5 },
    { id: 'svg', label: 'SVG', group: 2, size: 4 },
    { id: 'react', label: 'React', group: 4, size: 6 },
    { id: 'nextjs', label: 'Next.js', group: 4, size: 6 },
    { id: 'typescript', label: 'TypeScript', group: 4, size: 7 },
    { id: 'graphviz', label: 'GraphViz', group: 5, size: 4 },
    { id: 'cytoscape', label: 'Cytoscape.js', group: 5, size: 4 },
    { id: 'visjs', label: 'vis.js', group: 5, size: 4 },
    { id: 'sigma', label: 'Sigma.js', group: 5, size: 4 },
    { id: 'layout', label: 'Force Layout', group: 6, size: 5 },
    { id: 'physics', label: 'Physics Sim', group: 6, size: 5 },
    { id: 'rendering', label: 'Rendering', group: 6, size: 5 },
    { id: 'interaction', label: 'Interaction', group: 6, size: 4 },
  ],
  links: [
    { source: 'obsidian', target: 'd3-force' },
    { source: 'obsidian', target: 'canvas' },
    { source: 'd3-force', target: 'layout' },
    { source: 'd3-force', target: 'physics' },
    { source: 'canvas', target: 'rendering' },
    { source: 'webgl', target: 'rendering' },
    { source: 'pixi', target: 'webgl' },
    { source: 'three', target: 'webgl' },
    { source: 'svg', target: 'rendering' },
    { source: 'react', target: 'canvas' },
    { source: 'react', target: 'svg' },
    { source: 'nextjs', target: 'react' },
    { source: 'typescript', target: 'nextjs' },
    { source: 'typescript', target: 'react' },
    { source: 'graphviz', target: 'layout' },
    { source: 'cytoscape', target: 'layout' },
    { source: 'visjs', target: 'layout' },
    { source: 'sigma', target: 'webgl' },
    { source: 'sigma', target: 'canvas' },
    { source: 'd3-force', target: 'interaction' },
    { source: 'canvas', target: 'interaction' },
    { source: 'rendering', target: 'interaction' },
  ],
};

export const GROUP_COLORS: Record<number, string> = {
  1: '#6c5ce7',
  2: '#00b894',
  3: '#fdcb6e',
  4: '#e17055',
  5: '#0984e3',
  6: '#00cec9',
};

export const GRAPH_MODAL_SIZE = 'max-w-4xl';

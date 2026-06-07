import * as vscode from 'vscode';
import { GraphData } from './graphData';

export class GraphView {
  private panel: vscode.WebviewPanel | undefined;
  private ready = false;

  async show(data: GraphData): Promise<void> {
    if (!this.panel) {
      this.panel = vscode.window.createWebviewPanel(
        'obsidianFlow.graph',
        'Knowledge Graph',
        vscode.ViewColumn.Beside,
        { enableScripts: true, retainContextWhenHidden: true }
      );

      this.panel.webview.html = this.getHtml(this.panel.webview);
      this.panel.onDidDispose(() => {
        this.panel = undefined;
        this.ready = false;
      });

      this.panel.webview.onDidReceiveMessage((msg) => {
        if (msg.type === 'ready') {
          this.ready = true;
          this.postData(data);
        } else if (msg.type === 'openFile') {
          vscode.commands.executeCommand(
            'vscode.open',
            vscode.Uri.file(msg.path)
          );
        }
      });
    } else {
      this.panel.reveal(vscode.ViewColumn.Beside);
      if (this.ready) {
        this.postData(data);
      }
    }
  }

  private postData(data: GraphData): void {
    this.panel?.webview.postMessage({ type: 'graphData', data });
  }

  private getHtml(webview: vscode.Webview): string {
    const d3Uri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        vscode.Uri.file(__dirname),
        '..',
        'media',
        'd3.v7.min.js'
      )
    );
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' ${webview.cspSource}; style-src 'unsafe-inline';">
<title>Knowledge Graph</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: var(--vscode-editor-background); overflow: hidden; }
svg { width: 100vw; height: 100vh; }
.node circle { fill: var(--vscode-symbolIcon-classForeground, #569cd6); stroke: var(--vscode-editor-foreground); stroke-width: 1.5; cursor: pointer; transition: fill 0.2s; }
.node circle:hover { fill: var(--vscode-symbolIcon-eventForeground, #c586c0); }
.node text { fill: var(--vscode-editor-foreground); font-size: 11px; font-family: var(--vscode-font-family); pointer-events: none; }
.link { stroke: var(--vscode-editor-foreground); stroke-opacity: 0.3; stroke-width: 1.5; }
.link.highlight { stroke-opacity: 0.8; stroke-width: 2.5; }
.node.highlight circle { fill: var(--vscode-symbolIcon-eventForeground, #c586c0); }
.node.dim { opacity: 0.2; }
.link.dim { stroke-opacity: 0.05; }
.info { position: absolute; bottom: 12px; left: 12px; color: var(--vscode-editor-foreground); font-size: 12px; font-family: var(--vscode-font-family); opacity: 0.6; }
.tooltip { position: absolute; padding: 6px 10px; background: var(--vscode-editor-background); border: 1px solid var(--vscode-editor-foreground); border-radius: 4px; font-size: 12px; font-family: var(--vscode-font-family); color: var(--vscode-editor-foreground); pointer-events: none; display: none; white-space: nowrap; }
</style>
</head>
<body>
<svg></svg>
<div class="info"></div>
<div class="tooltip" id="tooltip"></div>
<script src="${d3Uri}"></script>
<script>
const vscode = acquireVsCodeApi();
const svg = d3.select('svg');
const tooltip = document.getElementById('tooltip');
const info = document.querySelector('.info');

let width, height;
let simulation;
let linkElements, nodeElements;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  svg.attr('width', width).attr('height', height);
}

function draw(data) {
  resize();
  svg.selectAll('*').remove();

  const g = svg.append('g');
  const zoom = d3.zoom().scaleExtent([0.1, 4]).on('zoom', (e) => g.attr('transform', e.transform));
  svg.call(zoom);

  const nodeMap = new Map(data.nodes.map(n => [n.id, n]));
  const maxLinks = Math.max(...data.nodes.map(n => n.links), 1);

  linkElements = g.append('g').selectAll('line')
    .data(data.edges)
    .join('line')
    .attr('class', 'link');

  nodeElements = g.append('g').selectAll('g')
    .data(data.nodes)
    .join('g')
    .attr('class', 'node')
    .call(d3.drag()
      .on('start', (e, d) => { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
      .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; })
      .on('end', (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }));

  nodeElements.append('circle')
    .attr('r', d => 4 + (d.links / maxLinks) * 12)
    .on('mouseenter', (e, d) => {
      tooltip.style.display = 'block';
      tooltip.textContent = d.name;
      const connected = new Set();
      data.edges.forEach(e => {
        if (e.source === d.id || e.target === d.id) {
          connected.add(e.source);
          connected.add(e.target);
        }
      });
      nodeElements.classed('dim', n => !connected.has(n.id) && n.id !== d.id);
      linkElements.classed('highlight', e => e.source === d.id || e.target === d.id);
      linkElements.classed('dim', e => e.source !== d.id && e.target !== d.id);
    })
    .on('mousemove', (e) => {
      tooltip.style.left = (e.offsetX + 12) + 'px';
      tooltip.style.top = (e.offsetY - 10) + 'px';
    })
    .on('mouseleave', () => {
      tooltip.style.display = 'none';
      nodeElements.classed('dim', false);
      linkElements.classed('highlight', false);
      linkElements.classed('dim', false);
    })
    .on('click', (e, d) => {
      vscode.postMessage({ type: 'openFile', path: d.path });
    });

  nodeElements.append('text')
    .text(d => d.name)
    .attr('dx', d => 8 + (4 + (d.links / maxLinks) * 12))
    .attr('dy', '0.35em');

  simulation = d3.forceSimulation(data.nodes)
    .force('link', d3.forceLink(data.edges).id(d => d.id).distance(120))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(d => 20 + (d.links / maxLinks) * 20))
    .on('tick', () => {
      linkElements
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
      nodeElements.attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');
    });

  info.textContent = data.nodes.length + ' nodes, ' + data.edges.length + ' edges, ' + data.orphan + ' orphaned';
}

window.addEventListener('message', event => {
  const msg = event.data;
  if (msg.type === 'graphData') {
    draw(msg.data);
  }
});

window.addEventListener('resize', resize);

vscode.postMessage({ type: 'ready' });
</script>
</body>
</html>`;
  }
}

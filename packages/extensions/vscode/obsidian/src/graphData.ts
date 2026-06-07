import * as vscode from 'vscode';
import * as path from 'node:path';
import * as fs from 'node:fs';

export interface GraphNode {
  id: string;
  name: string;
  path: string;
  links: number;
}

export interface GraphEdge {
  source: string;
  target: string;
}

export interface GraphData {
  root: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  orphan: number;
}

const wikiLinkRe = /\[\[([^\]|]+)(?:\|[^\]|]+)?\]\]/g;

export class KnowledgeGraph {
  private disposables: vscode.Disposable[] = [];

  async refresh(): Promise<GraphData | null> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage('Open a markdown file first');
      return null;
    }

    const docPath = editor.document.uri.fsPath;
    if (!docPath.endsWith('.md')) {
      vscode.window.showInformationMessage(
        'Active file must be a markdown file'
      );
      return null;
    }

    const root = path.dirname(docPath);
    const config = vscode.workspace.getConfiguration('obsidianFlow');
    const excludePatterns = config.get<string[]>('excludePatterns', []);

    return this.buildGraph(root, excludePatterns);
  }

  private async buildGraph(
    root: string,
    excludePatterns: string[]
  ): Promise<GraphData> {
    const excludeSet = new Set(
      excludePatterns.map((p) => p.replace('**/', '').replace('/**', ''))
    );

    const markdownFiles = new Map<string, string>();
    const links = new Map<string, string[]>();

    const entries = fs.readdirSync(root, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith('.') || excludeSet.has(entry.name)) continue;
      const fullPath = path.join(root, entry.name);
      if (entry.isDirectory()) {
        await this.walkDir(fullPath, excludeSet, markdownFiles, links);
      } else if (entry.name.endsWith('.md')) {
        const name = entry.name.replace(/\.md$/i, '');
        markdownFiles.set(fullPath, name);
        const fileLinks = this.extractLinks(fullPath);
        if (fileLinks.length > 0) {
          links.set(fullPath, fileLinks);
        }
      }
    }

    const lookup = new Map<string, string>();
    for (const [absPath, displayName] of markdownFiles) {
      lookup.set(displayName.toLowerCase(), absPath);
    }

    const sortedPaths = [...markdownFiles.keys()].sort();
    const nodeMap = new Map<string, number>();
    const nodes: GraphNode[] = [];

    for (const p of sortedPaths) {
      nodeMap.set(p, nodes.length);
      nodes.push({ id: p, name: markdownFiles.get(p)!, path: p, links: 0 });
    }

    const edgeSet = new Set<string>();
    const edges: GraphEdge[] = [];

    for (const [sourcePath, targets] of links) {
      const srcIdx = nodeMap.get(sourcePath);
      if (srcIdx === undefined) continue;
      for (const t of targets) {
        const targetPath = lookup.get(t.toLowerCase());
        if (!targetPath) continue;
        const tgtIdx = nodeMap.get(targetPath);
        if (tgtIdx === undefined) continue;
        const key = `${srcIdx}->${tgtIdx}`;
        if (edgeSet.has(key)) continue;
        edgeSet.add(key);
        edges.push({ source: sourcePath, target: targetPath });
        nodes[srcIdx].links++;
      }
    }

    const orphan = nodes.filter((n) => n.links === 0).length;

    return { root, nodes, edges, orphan };
  }

  private async walkDir(
    dir: string,
    excludeSet: Set<string>,
    markdownFiles: Map<string, string>,
    links: Map<string, string[]>
  ): Promise<void> {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.name.startsWith('.') || excludeSet.has(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await this.walkDir(fullPath, excludeSet, markdownFiles, links);
      } else if (entry.name.endsWith('.md')) {
        const name = entry.name.replace(/\.md$/i, '');
        markdownFiles.set(fullPath, name);
        const fileLinks = this.extractLinks(fullPath);
        if (fileLinks.length > 0) {
          links.set(fullPath, fileLinks);
        }
      }
    }
  }

  private extractLinks(filePath: string): string[] {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const links: string[] = [];
      let match: RegExpExecArray | null;
      while ((match = wikiLinkRe.exec(content)) !== null) {
        links.push(match[1]);
      }
      return links;
    } catch {
      return [];
    }
  }

  async loadFromFile(filePath: string): Promise<GraphData | null> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const raw = JSON.parse(content) as {
        root?: string;
        nodes: Array<{
          id: string;
          name?: string;
          path?: string;
          links?: number;
        }>;
        edges: Array<{ source: string; target: string }>;
        orphan?: number;
      };

      const nodes: GraphNode[] = raw.nodes.map((n) => ({
        id: n.id,
        name: n.name ?? n.id.replace(/\.md$/i, '').split('/').pop() ?? n.id,
        path: n.path ?? n.id,
        links: n.links ?? 0,
      }));

      const edges: GraphEdge[] = raw.edges.map((e) => ({
        source: e.source,
        target: e.target,
      }));

      const orphan = raw.orphan ?? nodes.filter((n) => n.links === 0).length;

      return { root: raw.root ?? filePath, nodes, edges, orphan };
    } catch (err) {
      vscode.window.showErrorMessage(
        `Failed to load graph from file: ${err instanceof Error ? err.message : String(err)}`
      );
      return null;
    }
  }

  dispose(): void {
    for (const d of this.disposables) d.dispose();
  }
}

/**
 * The tree-shaped structures: trie, segment tree, Fenwick tree, and
 * disjoint set.
 *
 * Each exposes a uniform "apply this operation and return the frames" shape so
 * a single visualiser can drive all four.
 */

export interface TreeStep {
  note: string;
  /** Node label to highlight, or undefined for a whole-structure update. */
  focus?: string;
  /** Extra rows of text, e.g. the Fenwick tree's `i += i & -i` walk. */
  trace?: string[];
  snapshot: string[];
}

export const lettersOf = (word: string): string[] =>
  word.toLowerCase().split('');

// ---------------------------------------------------------------- trie

export interface TrieNode {
  children: Record<string, TrieNode>;
  terminal: boolean;
}

export const emptyTrie = (): TrieNode => ({ children: {}, terminal: false });

export const insertWord = (root: TrieNode, word: string): TrieNode => {
  let node = root;
  for (const ch of lettersOf(word)) {
    if (!node.children[ch]) node.children[ch] = emptyTrie();
    node = node.children[ch];
  }
  node.terminal = true;
  return root;
};

/** Depth-first listing with a depth cap, so a long word cannot blow up the UI. */
export const renderTrie = (root: TrieNode, maxDepth = 4): string[] => {
  const lines: string[] = [];
  const walk = (node: TrieNode, prefix: string, depth: number): void => {
    if (depth > maxDepth) {
      lines.push(`${prefix}…`);
      return;
    }
    const keys = Object.keys(node.children).sort();
    keys.forEach((key, i) => {
      const last = i === keys.length - 1;
      const child = node.children[key];
      const mark = child.terminal ? '*' : '';
      lines.push(`${prefix}${last ? '`-' : '|-'}${key}${mark}`);
      walk(child, `${prefix}${last ? '  ' : '| '}`, depth + 1);
    });
  };
  walk(root, '', 1);
  return lines;
};

export const searchWord = (root: TrieNode, word: string): boolean => {
  let node = root;
  for (const ch of lettersOf(word)) {
    const next = node.children[ch];
    if (!next) return false;
    node = next;
  }
  return node.terminal;
};

// ------------------------------------------------------------ union-find

export class DisjointSet {
  private parent: number[];

  constructor(size: number) {
    this.parent = Array.from({ length: size }, (_, i) => i);
  }

  find(x: number): number {
    let root = x;
    while (this.parent[root] !== root) root = this.parent[root];
    let cur = x;
    while (this.parent[cur] !== cur) {
      const next = this.parent[cur];
      this.parent[cur] = root;
      cur = next;
    }
    return root;
  }

  union(a: number, b: number): [number, number] {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra !== rb) this.parent[rb] = ra;
    return [ra, rb];
  }

  get groups(): number[] {
    return [...this.parent];
  }

  clone(): DisjointSet {
    const copy = new DisjointSet(this.parent.length);
    copy.parent = [...this.parent];
    return copy;
  }

  get componentCount(): number {
    return new Set(
      Array.from({ length: this.parent.length }, (_, i) => this.find(i))
    ).size;
  }
}

export const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.svn',
  '.hg',
  '.next',
  'dist',
  'build',
  '.cache',
  'target',
  'vendor',
  '__pycache__',
  '.venv',
  '.idea',
  '.vscode',
  'coverage',
  '.nyc_output',
]);

export interface FileNode {
  type: 'file' | 'dir';
  name: string;
  path: string;
  children?: FileNode[];
}

export interface OpenTab {
  path: string;
  content: string;
  original: string;
}

export const buildTree = (paths: string[], rootPath: string): FileNode => {
  const rootName = rootPath.split('/').filter(Boolean).pop() || 'root';
  const root: FileNode = {
    type: 'dir',
    name: rootName,
    path: rootPath,
    children: [],
  };

  for (const p of paths) {
    const relative = p.startsWith(rootPath + '/')
      ? p.slice(rootPath.length + 1)
      : p;
    const parts = relative.split('/');
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;
      const relPath = parts.slice(0, i + 1).join('/');
      const fullPath = rootPath + '/' + relPath;

      let existing = current.children?.find((c) => c.name === part);
      if (!existing) {
        if (isFile) {
          existing = { type: 'file', name: part, path: fullPath };
        } else {
          existing = {
            type: 'dir',
            name: part,
            path: fullPath,
            children: [],
          };
        }
        current.children = current.children ?? [];
        current.children.push(existing);
      }
      current = existing;
    }
  }

  return root;
};

export const sortTree = (node: FileNode): void => {
  if (node.children) {
    node.children.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    node.children.forEach(sortTree);
  }
};

export const sortChildren = (children: FileNode[]): void => {
  children.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
};

export const removeFromTree = (node: FileNode, path: string): FileNode => {
  if (node.path === path) return node;
  if (!node.children) return node;
  return {
    ...node,
    children: node.children
      .map((child) => removeFromTree(child, path))
      .filter((child) => child.path !== path),
  };
};

export const mergeChildren = (
  node: FileNode,
  path: string,
  children: FileNode[]
): FileNode => {
  if (node.path === path) {
    return { ...node, children };
  }
  if (node.children) {
    return {
      ...node,
      children: node.children.map((child) =>
        mergeChildren(child, path, children)
      ),
    };
  }
  return node;
};

import {
  buildTree,
  sortTree,
  sortChildren,
  removeFromTree,
  mergeChildren,
  SKIP_DIRS,
} from '../tree';
import type { FileNode } from '../tree';

describe('buildTree', () => {
  it('builds a tree from flat file paths', () => {
    const paths = ['/root/src/index.ts', '/root/src/app.ts', '/root/README.md'];
    const tree = buildTree(paths, '/root');

    expect(tree.type).toBe('dir');
    expect(tree.name).toBe('root');
    expect(tree.children).toHaveLength(2);
    expect(tree.children![0].name).toBe('src');
    expect(tree.children![0].type).toBe('dir');
    expect(tree.children![0].children).toHaveLength(2);
    expect(tree.children![1].name).toBe('README.md');
    expect(tree.children![1].type).toBe('file');
  });

  it('handles single file', () => {
    const tree = buildTree(['/root/file.txt'], '/root');

    expect(tree.children).toHaveLength(1);
    expect(tree.children![0].name).toBe('file.txt');
    expect(tree.children![0].type).toBe('file');
  });

  it('handles empty paths', () => {
    const tree = buildTree([], '/root');

    expect(tree.children).toHaveLength(0);
  });

  it('strips root path prefix', () => {
    const paths = ['/home/user/project/src/index.ts'];
    const tree = buildTree(paths, '/home/user/project');

    expect(tree.children![0].name).toBe('src');
  });
});

describe('sortTree', () => {
  it('sorts directories before files', () => {
    const tree: FileNode = {
      type: 'dir',
      name: 'root',
      path: '/root',
      children: [
        { type: 'file', name: 'z.txt', path: '/root/z.txt' },
        { type: 'dir', name: 'a_dir', path: '/root/a_dir' },
      ],
    };

    sortTree(tree);

    expect(tree.children![0].name).toBe('a_dir');
    expect(tree.children![1].name).toBe('z.txt');
  });

  it('sorts alphabetically within same type', () => {
    const tree: FileNode = {
      type: 'dir',
      name: 'root',
      path: '/root',
      children: [
        { type: 'file', name: 'c.ts', path: '/root/c.ts' },
        { type: 'file', name: 'a.ts', path: '/root/a.ts' },
        { type: 'file', name: 'b.ts', path: '/root/b.ts' },
      ],
    };

    sortTree(tree);

    expect(tree.children![0].name).toBe('a.ts');
    expect(tree.children![1].name).toBe('b.ts');
    expect(tree.children![2].name).toBe('c.ts');
  });
});

describe('sortChildren', () => {
  it('sorts children directories before files alphabetically', () => {
    const children: FileNode[] = [
      { type: 'file', name: 'main.ts', path: '/root/main.ts' },
      { type: 'dir', name: 'utils', path: '/root/utils' },
      { type: 'dir', name: 'api', path: '/root/api' },
    ];

    sortChildren(children);

    expect(children[0].name).toBe('api');
    expect(children[1].name).toBe('utils');
    expect(children[2].name).toBe('main.ts');
  });
});

describe('removeFromTree', () => {
  it('removes a leaf file node', () => {
    const tree: FileNode = {
      type: 'dir',
      name: 'root',
      path: '/root',
      children: [
        { type: 'file', name: 'keep.ts', path: '/root/keep.ts' },
        { type: 'file', name: 'remove.ts', path: '/root/remove.ts' },
      ],
    };

    const result = removeFromTree(tree, '/root/remove.ts');

    expect(result.children).toHaveLength(1);
    expect(result.children![0].name).toBe('keep.ts');
  });

  it('removes a nested file', () => {
    const tree: FileNode = {
      type: 'dir',
      name: 'root',
      path: '/root',
      children: [
        {
          type: 'dir',
          name: 'src',
          path: '/root/src',
          children: [
            { type: 'file', name: 'app.ts', path: '/root/src/app.ts' },
            { type: 'file', name: 'main.ts', path: '/root/src/main.ts' },
          ],
        },
      ],
    };

    const result = removeFromTree(tree, '/root/src/main.ts');

    expect(result.children![0].children).toHaveLength(1);
    expect(result.children![0].children![0].name).toBe('app.ts');
  });

  it('returns node unchanged when path does not match', () => {
    const tree: FileNode = {
      type: 'dir',
      name: 'root',
      path: '/root',
      children: [{ type: 'file', name: 'keep.ts', path: '/root/keep.ts' }],
    };

    const result = removeFromTree(tree, '/other/path');

    expect(result).toStrictEqual(tree);
  });
});

describe('mergeChildren', () => {
  it('sets children on the matching directory node', () => {
    const tree: FileNode = {
      type: 'dir',
      name: 'root',
      path: '/root',
      children: [
        {
          type: 'dir',
          name: 'src',
          path: '/root/src',
          children: undefined,
        },
      ],
    };

    const newChildren: FileNode[] = [
      { type: 'file', name: 'index.ts', path: '/root/src/index.ts' },
    ];

    const result = mergeChildren(tree, '/root/src', newChildren);

    expect(result.children![0].children).toEqual(newChildren);
  });

  it('returns node unchanged when path not found', () => {
    const tree: FileNode = {
      type: 'dir',
      name: 'root',
      path: '/root',
      children: [{ type: 'file', name: 'a.ts', path: '/root/a.ts' }],
    };

    const result = mergeChildren(tree, '/nowhere', []);

    expect(result).toStrictEqual(tree);
  });
});

describe('SKIP_DIRS', () => {
  it('contains common dependency directories', () => {
    expect(SKIP_DIRS.has('node_modules')).toBe(true);
    expect(SKIP_DIRS.has('.git')).toBe(true);
    expect(SKIP_DIRS.has('.next')).toBe(true);
    expect(SKIP_DIRS.has('dist')).toBe(true);
    expect(SKIP_DIRS.has('build')).toBe(true);
    expect(SKIP_DIRS.has('target')).toBe(true);
    expect(SKIP_DIRS.has('vendor')).toBe(true);
    expect(SKIP_DIRS.has('__pycache__')).toBe(true);
    expect(SKIP_DIRS.has('coverage')).toBe(true);
  });

  it('does not contain regular directory names', () => {
    expect(SKIP_DIRS.has('src')).toBe(false);
    expect(SKIP_DIRS.has('lib')).toBe(false);
    expect(SKIP_DIRS.has('docs')).toBe(false);
  });
});

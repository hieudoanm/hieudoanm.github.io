import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TreeNode, type TreeNodeProps } from '../TreeNode';
import type { FileNode } from '../../utils/tree';

const fileNode: FileNode = {
  type: 'file',
  name: 'index.ts',
  path: 'root/index.ts',
};
const dirNode: FileNode = {
  type: 'dir',
  name: 'src',
  path: 'root/src',
  children: [{ type: 'file', name: 'app.ts', path: 'root/src/app.ts' }],
};

const defaultProps: TreeNodeProps = {
  node: fileNode,
  depth: 0,
  onOpenFile: jest.fn(),
  onDeleteFile: jest.fn(),
  onToggleDir: jest.fn(),
  onContextMenu: jest.fn(),
};

describe('TreeNode', () => {
  it('renders file name', () => {
    render(<TreeNode {...defaultProps} />);
    expect(screen.getByText('index.ts')).toBeInTheDocument();
  });

  it('renders directory name', () => {
    render(<TreeNode {...defaultProps} node={dirNode} />);
    expect(screen.getByText('src')).toBeInTheDocument();
  });

  it('calls onOpenFile when file is clicked', async () => {
    const onOpenFile = jest.fn();
    render(<TreeNode {...defaultProps} onOpenFile={onOpenFile} />);
    await userEvent.click(screen.getByText('index.ts'));
    expect(onOpenFile).toHaveBeenCalledWith('root/index.ts');
  });

  it('calls onToggleDir when unloaded directory is clicked', async () => {
    const onToggleDir = jest.fn();
    const unloadedDir: FileNode = {
      type: 'dir',
      name: 'lib',
      path: 'root/lib',
    };
    render(
      <TreeNode
        {...defaultProps}
        node={unloadedDir}
        onToggleDir={onToggleDir}
      />
    );
    await userEvent.click(screen.getByText('lib'));
    expect(onToggleDir).toHaveBeenCalledWith('root/lib');
  });

  it('does not call onToggleDir when loaded directory is toggled', async () => {
    const onToggleDir = jest.fn();
    render(
      <TreeNode {...defaultProps} node={dirNode} onToggleDir={onToggleDir} />
    );
    await userEvent.click(screen.getByText('src'));
    expect(onToggleDir).not.toHaveBeenCalled();
  });

  it('shows children when directory is expanded', async () => {
    render(<TreeNode {...defaultProps} node={dirNode} />);
    await userEvent.click(screen.getByText('src'));
    expect(screen.getByText('app.ts')).toBeInTheDocument();
  });

  it('hides children when directory is collapsed', async () => {
    render(<TreeNode {...defaultProps} node={dirNode} />);
    await userEvent.click(screen.getByText('src'));
    expect(screen.getByText('app.ts')).toBeInTheDocument();
    await userEvent.click(screen.getByText('src'));
    expect(screen.queryByText('app.ts')).not.toBeInTheDocument();
  });

  it('calls onDeleteFile when delete button is clicked', async () => {
    const onDeleteFile = jest.fn();
    render(<TreeNode {...defaultProps} onDeleteFile={onDeleteFile} />);
    const deleteBtn = screen.getByTitle('Delete file');
    await userEvent.click(deleteBtn);
    expect(onDeleteFile).toHaveBeenCalledWith('root/index.ts');
  });

  it('does not show delete button for directories', () => {
    render(<TreeNode {...defaultProps} node={dirNode} />);
    expect(screen.queryByTitle('Delete file')).not.toBeInTheDocument();
  });

  it('calls onContextMenu on right-click', async () => {
    const onContextMenu = jest.fn();
    render(<TreeNode {...defaultProps} onContextMenu={onContextMenu} />);
    const row = screen.getByText('index.ts').closest('div');
    if (row) {
      await userEvent.setup();
      const event = new MouseEvent('contextmenu', { bubbles: true });
      row.dispatchEvent(event);
    }
    expect(onContextMenu).toHaveBeenCalledWith(
      expect.any(Object),
      'root/index.ts',
      'index.ts',
      false
    );
  });

  it('applies correct padding based on depth', () => {
    render(<TreeNode {...defaultProps} depth={2} />);
    const row = screen.getByText('index.ts').closest('div');
    expect(row).toHaveStyle('padding-left: 40px');
  });

  it('renders expand arrow for directory', () => {
    const { container } = render(<TreeNode {...defaultProps} node={dirNode} />);
    const chevron = container.querySelector('svg');
    expect(chevron).toBeInTheDocument();
  });
});

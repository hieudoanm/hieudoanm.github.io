import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileTree } from '../FileTree';
import type { FileNode } from '../../utils/tree';

const mockTree: FileNode = {
  type: 'dir',
  name: 'root',
  path: 'root',
  children: [
    {
      type: 'dir',
      name: 'src',
      path: 'root/src',
      children: [
        { type: 'file', name: 'index.ts', path: 'root/src/index.ts' },
        { type: 'file', name: 'app.ts', path: 'root/src/app.ts' },
      ],
    },
    { type: 'file', name: 'README.md', path: 'root/README.md' },
  ],
};

describe('FileTree', () => {
  const defaultProps = {
    onOpenFile: () => {},
    onOpenFolder: () => {},
    onOpenFileDialog: () => {},
    onCloseSidebar: () => {},
    onAddFile: () => {},
    onAddDir: () => {},
    onDeleteFile: () => {},
    onToggleDir: () => {},
    onContextMenu: () => {},
    onRefresh: () => {},
    activePath: null,
  };

  it('renders empty state when root is null', () => {
    render(<FileTree root={null} {...defaultProps} />);
    expect(screen.getByText('Open a folder to start')).toBeInTheDocument();
  });

  it('renders file and folder names', async () => {
    render(<FileTree root={mockTree} {...defaultProps} />);
    await userEvent.click(screen.getByText('root'));
    expect(screen.getByText('src')).toBeInTheDocument();
    expect(screen.getByText('README.md')).toBeInTheDocument();
  });

  it('shows children when folder is expanded', async () => {
    render(<FileTree root={mockTree} {...defaultProps} />);
    await userEvent.click(screen.getByText('root'));
    await userEvent.click(screen.getByText('src'));
    expect(screen.getByText('index.ts')).toBeInTheDocument();
    expect(screen.getByText('app.ts')).toBeInTheDocument();
  });

  it('calls onOpenFile when a file is clicked', async () => {
    const onOpenFile = jest.fn();
    render(
      <FileTree root={mockTree} {...defaultProps} onOpenFile={onOpenFile} />
    );
    await userEvent.click(screen.getByText('root'));
    await userEvent.click(screen.getByText('README.md'));
    expect(onOpenFile).toHaveBeenCalledWith('root/README.md');
  });

  it('calls onAddFile when new file button is clicked', async () => {
    const onAddFile = jest.fn();
    render(<FileTree root={null} {...defaultProps} onAddFile={onAddFile} />);
    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[0]);
    expect(onAddFile).toHaveBeenCalled();
  });

  it('calls onOpenFolder when folder button is clicked', async () => {
    const onOpenFolder = jest.fn();
    render(
      <FileTree root={null} {...defaultProps} onOpenFolder={onOpenFolder} />
    );
    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[2]);
    expect(onOpenFolder).toHaveBeenCalled();
  });

  it('toggles folder expansion on click', async () => {
    render(<FileTree root={mockTree} {...defaultProps} />);
    await userEvent.click(screen.getByText('root'));
    await userEvent.click(screen.getByText('src'));
    expect(screen.getByText('index.ts')).toBeInTheDocument();
    await userEvent.click(screen.getByText('src'));
    expect(screen.queryByText('index.ts')).not.toBeInTheDocument();
  });

  it('calls onToggleDir when an unloaded directory is clicked', async () => {
    const onToggleDir = jest.fn();
    const unloadedTree: FileNode = {
      type: 'dir',
      name: 'root',
      path: 'root',
      children: [{ type: 'dir', name: 'unloaded', path: 'root/unloaded' }],
    };
    render(
      <FileTree
        root={unloadedTree}
        {...defaultProps}
        onToggleDir={onToggleDir}
      />
    );
    await userEvent.click(screen.getByText('root'));
    await userEvent.click(screen.getByText('unloaded'));
    expect(onToggleDir).toHaveBeenCalledWith('root/unloaded');
  });

  it('does not call onToggleDir when a loaded directory is toggled', async () => {
    const onToggleDir = jest.fn();
    render(
      <FileTree root={mockTree} {...defaultProps} onToggleDir={onToggleDir} />
    );
    await userEvent.click(screen.getByText('root'));
    await userEvent.click(screen.getByText('src'));
    expect(onToggleDir).not.toHaveBeenCalled();
  });
});

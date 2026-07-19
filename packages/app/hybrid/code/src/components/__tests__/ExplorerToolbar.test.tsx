import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExplorerToolbar } from '../ExplorerToolbar';

describe('ExplorerToolbar', () => {
  const defaultProps = {
    hasRoot: true,
    onAddFile: jest.fn(),
    onAddDir: jest.fn(),
    onOpenFolder: jest.fn(),
    onExpandAll: jest.fn(),
    onCollapseAll: jest.fn(),
    onCloseSidebar: jest.fn(),
  };

  it('renders Explorer heading', () => {
    render(<ExplorerToolbar {...defaultProps} />);
    expect(screen.getByText('Explorer')).toBeInTheDocument();
  });

  it('renders all toolbar buttons when hasRoot is true', () => {
    render(<ExplorerToolbar {...defaultProps} />);
    expect(screen.getByTitle('New File')).toBeInTheDocument();
    expect(screen.getByTitle('New Folder')).toBeInTheDocument();
    expect(screen.getByTitle('Open Folder')).toBeInTheDocument();
    expect(screen.getByTitle('Expand all')).toBeInTheDocument();
    expect(screen.getByTitle('Collapse all')).toBeInTheDocument();
    expect(screen.getByTitle('Close sidebar')).toBeInTheDocument();
  });

  it('hides expand/collapse when hasRoot is false', () => {
    render(<ExplorerToolbar {...defaultProps} hasRoot={false} />);
    expect(screen.getByTitle('New File')).toBeInTheDocument();
    expect(screen.getByTitle('Close sidebar')).toBeInTheDocument();
    expect(screen.queryByTitle('Expand all')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Collapse all')).not.toBeInTheDocument();
  });

  it('calls onAddFile when New File button is clicked', async () => {
    const onAddFile = jest.fn();
    render(<ExplorerToolbar {...defaultProps} onAddFile={onAddFile} />);
    await userEvent.click(screen.getByTitle('New File'));
    expect(onAddFile).toHaveBeenCalled();
  });

  it('calls onAddDir when New Folder button is clicked', async () => {
    const onAddDir = jest.fn();
    render(<ExplorerToolbar {...defaultProps} onAddDir={onAddDir} />);
    await userEvent.click(screen.getByTitle('New Folder'));
    expect(onAddDir).toHaveBeenCalled();
  });

  it('calls onOpenFolder when Open Folder button is clicked', async () => {
    const onOpenFolder = jest.fn();
    render(<ExplorerToolbar {...defaultProps} onOpenFolder={onOpenFolder} />);
    await userEvent.click(screen.getByTitle('Open Folder'));
    expect(onOpenFolder).toHaveBeenCalled();
  });

  it('calls onExpandAll when Expand all button is clicked', async () => {
    const onExpandAll = jest.fn();
    render(<ExplorerToolbar {...defaultProps} onExpandAll={onExpandAll} />);
    await userEvent.click(screen.getByTitle('Expand all'));
    expect(onExpandAll).toHaveBeenCalled();
  });

  it('calls onCollapseAll when Collapse all button is clicked', async () => {
    const onCollapseAll = jest.fn();
    render(<ExplorerToolbar {...defaultProps} onCollapseAll={onCollapseAll} />);
    await userEvent.click(screen.getByTitle('Collapse all'));
    expect(onCollapseAll).toHaveBeenCalled();
  });

  it('calls onCloseSidebar when Close sidebar button is clicked', async () => {
    const onCloseSidebar = jest.fn();
    render(
      <ExplorerToolbar {...defaultProps} onCloseSidebar={onCloseSidebar} />
    );
    await userEvent.click(screen.getByTitle('Close sidebar'));
    expect(onCloseSidebar).toHaveBeenCalled();
  });
});

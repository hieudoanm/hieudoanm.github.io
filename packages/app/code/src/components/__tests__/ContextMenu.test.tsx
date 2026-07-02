import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextMenu } from '../ContextMenu';

Object.assign(navigator, {
  clipboard: { writeText: jest.fn() },
});

describe('ContextMenu', () => {
  let defaultProps: ReturnType<typeof makeProps>;

  function makeProps(overrides = {}) {
    return {
      x: 100,
      y: 200,
      path: '/project/file.ts',
      name: 'file.ts',
      isDir: false,
      rootPath: '/project',
      onClose: jest.fn(),
      onRename: jest.fn(),
      onDelete: jest.fn(),
      onDuplicate: jest.fn(),
      onAddFile: jest.fn(),
      onAddDir: jest.fn(),
      ...overrides,
    };
  }

  beforeEach(() => {
    defaultProps = makeProps();
  });

  it('renders all actions for a file', () => {
    render(<ContextMenu {...defaultProps} />);
    expect(screen.queryByText('New File')).not.toBeInTheDocument();
    expect(screen.queryByText('New Folder')).not.toBeInTheDocument();
    expect(screen.getByText('Copy path')).toBeInTheDocument();
    expect(screen.getByText('Copy relative path')).toBeInTheDocument();
    expect(screen.getByText('Rename')).toBeInTheDocument();
    expect(screen.getByText('Duplicate')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('shows New File and New Folder for a directory', () => {
    render(
      <ContextMenu
        {...defaultProps}
        isDir={true}
        path="/project/src"
        name="src"
      />
    );
    expect(screen.getByText('New File')).toBeInTheDocument();
    expect(screen.getByText('New Folder')).toBeInTheDocument();
    expect(screen.getByText('Copy path')).toBeInTheDocument();
  });

  it('calls onAddFile when New File is clicked on a directory', async () => {
    const onAddFile = jest.fn();
    render(
      <ContextMenu
        {...defaultProps}
        isDir={true}
        path="/project/src"
        name="src"
        onAddFile={onAddFile}
      />
    );
    await userEvent.click(screen.getByText('New File'));
    expect(onAddFile).toHaveBeenCalledWith('/project/src');
  });

  it('calls onAddDir when New Folder is clicked on a directory', async () => {
    const onAddDir = jest.fn();
    render(
      <ContextMenu
        {...defaultProps}
        isDir={true}
        path="/project/src"
        name="src"
        onAddDir={onAddDir}
      />
    );
    await userEvent.click(screen.getByText('New Folder'));
    expect(onAddDir).toHaveBeenCalledWith('/project/src');
  });

  it('copies full path to clipboard', async () => {
    const writeText = jest.fn();
    Object.assign(navigator, {
      clipboard: { writeText },
    });
    render(<ContextMenu {...defaultProps} />);
    await userEvent.click(screen.getByText('Copy path'));
    expect(writeText).toHaveBeenCalledWith('/project/file.ts');
  });

  it('copies relative path to clipboard', async () => {
    const writeText = jest.fn();
    Object.assign(navigator, {
      clipboard: { writeText },
    });
    render(<ContextMenu {...defaultProps} />);
    await userEvent.click(screen.getByText('Copy relative path'));
    expect(writeText).toHaveBeenCalledWith('file.ts');
  });

  it('copies full path when no rootPath', async () => {
    const writeText = jest.fn();
    Object.assign(navigator, {
      clipboard: { writeText },
    });
    render(<ContextMenu {...defaultProps} rootPath={null} />);
    await userEvent.click(screen.getByText('Copy relative path'));
    expect(writeText).toHaveBeenCalledWith('/project/file.ts');
  });

  it('calls onRename when Rename is clicked', async () => {
    render(<ContextMenu {...defaultProps} />);
    await userEvent.click(screen.getByText('Rename'));
    expect(defaultProps.onRename).toHaveBeenCalledWith('/project/file.ts');
  });

  it('calls onDelete when Delete is clicked', async () => {
    render(<ContextMenu {...defaultProps} />);
    await userEvent.click(screen.getByText('Delete'));
    expect(defaultProps.onDelete).toHaveBeenCalledWith('/project/file.ts');
  });

  it('calls onDuplicate when Duplicate is clicked', async () => {
    render(<ContextMenu {...defaultProps} />);
    await userEvent.click(screen.getByText('Duplicate'));
    expect(defaultProps.onDuplicate).toHaveBeenCalledWith('/project/file.ts');
  });

  it('disables Duplicate for directories', () => {
    render(<ContextMenu {...defaultProps} isDir={true} />);
    expect(screen.getByText('Duplicate')).toBeDisabled();
  });

  it('positions menu at given coordinates', () => {
    const { container } = render(
      <ContextMenu {...defaultProps} x={50} y={75} />
    );
    const menu = container.firstChild as HTMLElement;
    expect(menu.style.left).toBe('50px');
    expect(menu.style.top).toBe('75px');
  });
});

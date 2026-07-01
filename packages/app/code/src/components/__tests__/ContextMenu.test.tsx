import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextMenu } from '../ContextMenu';

describe('ContextMenu', () => {
  let defaultProps: ReturnType<typeof makeProps>;

  function makeProps(overrides = {}) {
    return {
      x: 100,
      y: 200,
      path: '/project/file.ts',
      name: 'file.ts',
      isDir: false,
      onClose: jest.fn(),
      onRename: jest.fn(),
      onDelete: jest.fn(),
      onDuplicate: jest.fn(),
      ...overrides,
    };
  }

  beforeEach(() => {
    defaultProps = makeProps();
  });

  it('renders all actions', () => {
    render(<ContextMenu {...defaultProps} />);
    expect(screen.getByText('Rename')).toBeInTheDocument();
    expect(screen.getByText('Duplicate')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
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

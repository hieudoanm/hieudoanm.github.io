import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StatusBar } from '../StatusBar';

jest.mock('../../utils/editor-languages', () => ({
  getFileIcon: jest.fn(() => null),
}));

describe('StatusBar', () => {
  const defaultProps = {
    path: '/project/src/index.ts',
    line: 10,
    col: 5,
    selectionCount: 0,
    fileSize: 1024,
    autoSave: true,
    dirty: false,
    wordWrap: false,
    sidebarOpen: true,
    onToggleSidebar: () => {},
    onToggleWordWrap: () => {},
    onToggleAutoSave: () => {},
  };

  it('renders cursor position', () => {
    render(<StatusBar {...defaultProps} />);
    expect(screen.getByText('Ln 10, Col 5')).toBeInTheDocument();
  });

  it('renders file extension badge', () => {
    render(<StatusBar {...defaultProps} />);
    expect(screen.getByText('TS')).toBeInTheDocument();
  });

  it('renders dirty indicator when dirty is true', () => {
    render(<StatusBar {...defaultProps} dirty={true} />);
    expect(screen.getByText('●')).toBeInTheDocument();
  });

  it('does not render dirty indicator when not dirty', () => {
    render(<StatusBar {...defaultProps} dirty={false} />);
    expect(screen.queryByText('●')).not.toBeInTheDocument();
  });

  it('shows selection count when text is selected', () => {
    render(<StatusBar {...defaultProps} selectionCount={42} />);
    expect(screen.getByText('(42 sel)')).toBeInTheDocument();
  });

  it('hides selection count when nothing is selected', () => {
    render(<StatusBar {...defaultProps} selectionCount={0} />);
    expect(screen.queryByText(/sel/)).not.toBeInTheDocument();
  });

  it('renders sidebar close icon when sidebar is open', () => {
    render(<StatusBar {...defaultProps} sidebarOpen={true} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0].innerHTML).toContain('svg');
  });

  it('renders sidebar open icon when sidebar is closed', () => {
    render(<StatusBar {...defaultProps} sidebarOpen={false} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0].innerHTML).toContain('svg');
  });

  it('calls onToggleSidebar when button is clicked', async () => {
    const onToggleSidebar = jest.fn();
    render(<StatusBar {...defaultProps} onToggleSidebar={onToggleSidebar} />);
    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[0]);
    expect(onToggleSidebar).toHaveBeenCalled();
  });

  it('uses basename for extension extraction', () => {
    const { rerender } = render(
      <StatusBar {...defaultProps} path="/a/b/c/MyComponent.tsx" />
    );
    expect(screen.getByText('TSX')).toBeInTheDocument();
  });

  it('renders file size in bytes', () => {
    render(<StatusBar {...defaultProps} fileSize={512} />);
    expect(screen.getByText('512 B')).toBeInTheDocument();
  });

  it('renders file size in KB', () => {
    render(<StatusBar {...defaultProps} fileSize={2048} />);
    expect(screen.getByText('2.0 KB')).toBeInTheDocument();
  });

  it('renders file size in MB', () => {
    render(<StatusBar {...defaultProps} fileSize={2 * 1024 * 1024} />);
    expect(screen.getByText('2.0 MB')).toBeInTheDocument();
  });

  it('shows TEXT badge for files without an extension', () => {
    render(<StatusBar {...defaultProps} path="/project/LICENSE" />);
    expect(screen.getByText('TEXT')).toBeInTheDocument();
  });

  it('calls onToggleAutoSave when auto-save button is clicked', async () => {
    const onToggleAutoSave = jest.fn();
    render(<StatusBar {...defaultProps} onToggleAutoSave={onToggleAutoSave} />);
    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[1]);
    expect(onToggleAutoSave).toHaveBeenCalled();
  });

  it('calls onToggleWordWrap when word wrap button is clicked', async () => {
    const onToggleWordWrap = jest.fn();
    render(<StatusBar {...defaultProps} onToggleWordWrap={onToggleWordWrap} />);
    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[2]);
    expect(onToggleWordWrap).toHaveBeenCalled();
  });
});

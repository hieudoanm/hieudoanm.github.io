import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActivityBar } from '../ActivityBar';

describe('ActivityBar', () => {
  const defaultProps = {
    sidebarState: 'explorer' as const,
    theme: 'code-dark' as const,
    onOpenExplorer: jest.fn(),
    onOpenSearch: jest.fn(),
    onToggleTheme: jest.fn(),
  };

  it('renders all buttons', () => {
    render(<ActivityBar {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  it('shows Close Explorer title when sidebar is open showing explorer', () => {
    render(<ActivityBar {...defaultProps} sidebarState="explorer" />);
    expect(screen.getByTitle('Close Explorer')).toBeInTheDocument();
  });

  it('shows Open Explorer title when sidebar is closed', () => {
    render(<ActivityBar {...defaultProps} sidebarState="closed" />);
    expect(screen.getByTitle('Open Explorer')).toBeInTheDocument();
  });

  it('shows Open Explorer title when sidebar is showing search', () => {
    render(<ActivityBar {...defaultProps} sidebarState="search" />);
    expect(screen.getByTitle('Open Explorer')).toBeInTheDocument();
  });

  it('highlights explorer button when sidebar is open showing explorer', () => {
    render(<ActivityBar {...defaultProps} sidebarState="explorer" />);
    const btn = screen.getByTitle('Close Explorer');
    expect(btn.className).toContain('text-primary');
  });

  it('does not highlight explorer button when sidebar shows search', () => {
    render(<ActivityBar {...defaultProps} sidebarState="search" />);
    const btn = screen.getByTitle('Open Explorer');
    expect(btn.className).not.toContain('text-primary');
  });

  it('highlights search button when global search is open', () => {
    render(<ActivityBar {...defaultProps} sidebarState="search" />);
    const btn = screen.getByTitle('Search (Cmd+Shift+F)');
    expect(btn.className).toContain('text-primary');
  });

  it('highlights theme button when winter theme is active', () => {
    render(<ActivityBar {...defaultProps} theme="code-light" />);
    const btn = screen.getByTitle(/Switch to code-dark/);
    expect(btn.className).toContain('text-primary');
  });

  it('calls onOpenExplorer when explorer button is clicked', async () => {
    const onOpenExplorer = jest.fn();
    render(<ActivityBar {...defaultProps} onOpenExplorer={onOpenExplorer} />);
    await userEvent.click(screen.getByTitle('Close Explorer'));
    expect(onOpenExplorer).toHaveBeenCalledTimes(1);
  });

  it('calls onOpenSearch when search button is clicked', async () => {
    const onOpenSearch = jest.fn();
    render(<ActivityBar {...defaultProps} onOpenSearch={onOpenSearch} />);
    await userEvent.click(screen.getByTitle('Search (Cmd+Shift+F)'));
    expect(onOpenSearch).toHaveBeenCalledTimes(1);
  });

  it('calls onToggleTheme when theme button is clicked', async () => {
    const onToggleTheme = jest.fn();
    render(<ActivityBar {...defaultProps} onToggleTheme={onToggleTheme} />);
    await userEvent.click(screen.getByTitle(/Switch to/));
    expect(onToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('shows correct theme toggle title for dim theme', () => {
    render(<ActivityBar {...defaultProps} theme="code-dark" />);
    expect(screen.getByTitle('Switch to code-light theme')).toBeInTheDocument();
  });

  it('shows correct theme toggle title for winter theme', () => {
    render(<ActivityBar {...defaultProps} theme="code-light" />);
    expect(screen.getByTitle('Switch to code-dark theme')).toBeInTheDocument();
  });
});

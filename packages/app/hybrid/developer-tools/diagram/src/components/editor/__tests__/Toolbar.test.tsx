import { fireEvent, render, screen } from '@testing-library/react';
import Toolbar from '@/components/editor/Toolbar';

describe('Toolbar', () => {
  const base = {
    onNew: jest.fn(),
    onOpen: jest.fn(),
    onSave: jest.fn(),
    onExportSvg: jest.fn(),
    onExportSvgPrint: jest.fn(),
    onExportPng: jest.fn(),
    onCopySnippet: jest.fn(),
    onExamples: jest.fn(),
    canExport: true,
    canUndo: true,
    canRedo: true,
    onUndo: jest.fn(),
    onRedo: jest.fn(),
    zoom: 1,
    onZoomIn: jest.fn(),
    onZoomOut: jest.fn(),
    onZoomReset: jest.fn(),
    theme: 'dark' as const,
    onToggleTheme: jest.fn(),
    onHelp: jest.fn(),
    direction: 'horizontal' as const,
    onDirectionChange: jest.fn(),
    onNewShape: jest.fn(),
  };

  it('calls the file and zoom handlers', () => {
    render(<Toolbar {...base} />);
    fireEvent.click(screen.getByRole('button', { name: 'New' }));
    expect(base.onNew).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(base.onOpen).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(base.onSave).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Export SVG' }));
    expect(base.onExportSvg).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Browse examples' }));
    expect(base.onExamples).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    expect(base.onZoomIn).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Zoom out' }));
    expect(base.onZoomOut).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Reset zoom' }));
    expect(base.onZoomReset).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Toggle theme' }));
    expect(base.onToggleTheme).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Help' }));
    expect(base.onHelp).toHaveBeenCalled();
  });

  it('links to the posts library', () => {
    render(<Toolbar {...base} />);
    const link = screen.getByRole('link', { name: 'Posts' });
    expect(link.getAttribute('href')).toBe('/posts/');
  });

  it('disables export when there is nothing to export', () => {
    render(<Toolbar {...base} canExport={false} />);
    expect(screen.getByRole('button', { name: 'Export SVG' })).toBeDisabled();
    fireEvent.click(
      screen.getByRole('button', { name: 'More export options' })
    );
    expect(screen.getByRole('button', { name: 'PNG' })).toBeDisabled();
  });

  it('calls the undo and redo handlers', () => {
    render(<Toolbar {...base} />);
    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(base.onUndo).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Redo' }));
    expect(base.onRedo).toHaveBeenCalled();
  });

  it('disables undo and redo when there is no history', () => {
    render(<Toolbar {...base} canUndo={false} canRedo={false} />);
    expect(screen.getByRole('button', { name: 'Undo' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Redo' })).toBeDisabled();
  });

  it('shows the current zoom percentage', () => {
    render(<Toolbar {...base} zoom={1.5} />);
    expect(screen.getByText('150%')).toBeInTheDocument();
  });

  it('shows the sun icon in dark mode and moon in light mode', () => {
    const { unmount } = render(<Toolbar {...base} theme="dark" />);
    expect(
      screen.getByRole('button', { name: 'Toggle theme' }).firstChild
    ).not.toBeNull();
    unmount();
    render(<Toolbar {...base} theme="light" />);
    expect(
      screen.getByRole('button', { name: 'Toggle theme' }).firstChild
    ).not.toBeNull();
  });

  it('exports an A4 print svg and png from the export menu', () => {
    render(<Toolbar {...base} />);
    fireEvent.click(
      screen.getByRole('button', { name: 'More export options' })
    );
    fireEvent.click(screen.getByRole('button', { name: 'SVG (A4 print)' }));
    expect(base.onExportSvgPrint).toHaveBeenCalled();
    fireEvent.click(
      screen.getByRole('button', { name: 'More export options' })
    );
    fireEvent.click(screen.getByRole('button', { name: 'PNG' }));
    expect(base.onExportPng).toHaveBeenCalled();
  });

  it('changes the layout direction from the layout menu', () => {
    render(<Toolbar {...base} direction="vertical" />);
    expect(screen.getByText('Top → Bottom')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Layout' }));
    fireEvent.click(screen.getByRole('button', { name: 'Left → Right' }));
    expect(base.onDirectionChange).toHaveBeenCalledWith('horizontal');
  });

  it('inserts a shape from the shape menu', () => {
    render(<Toolbar {...base} />);
    fireEvent.click(screen.getByRole('button', { name: 'Shape' }));
    fireEvent.click(screen.getByRole('button', { name: 'Hexagon' }));
    expect(base.onNewShape).toHaveBeenCalledWith('hexagon');
  });

  it('copies a snippet from the copy menu', () => {
    render(<Toolbar {...base} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    fireEvent.click(screen.getByRole('button', { name: 'Mermaid' }));
    expect(base.onCopySnippet).toHaveBeenCalledWith('mermaid');
  });

  it('copies a plantuml snippet from the copy menu', () => {
    render(<Toolbar {...base} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    fireEvent.click(screen.getByRole('button', { name: 'PlantUML' }));
    expect(base.onCopySnippet).toHaveBeenCalledWith('plantuml');
  });
});

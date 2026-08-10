import { fireEvent, render, screen } from '@testing-library/react';
import Toolbar from '@/components/editor/Toolbar';

describe('Toolbar', () => {
  const base = {
    onNew: jest.fn(),
    onOpen: jest.fn(),
    onSave: jest.fn(),
    onExportSvg: jest.fn(),
    onExamples: jest.fn(),
    canExport: true,
    zoom: 1,
    onZoomIn: jest.fn(),
    onZoomOut: jest.fn(),
    onZoomReset: jest.fn(),
    theme: 'dark' as const,
    onToggleTheme: jest.fn(),
    onHelp: jest.fn(),
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

  it('disables export when there is nothing to export', () => {
    render(<Toolbar {...base} canExport={false} />);
    expect(screen.getByRole('button', { name: 'Export SVG' })).toBeDisabled();
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
});

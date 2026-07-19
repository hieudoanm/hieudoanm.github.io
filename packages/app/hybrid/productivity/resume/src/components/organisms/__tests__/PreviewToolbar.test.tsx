import { fireEvent, render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { PreviewToolbar } from '../PreviewToolbar';

type ToolbarProps = ComponentProps<typeof PreviewToolbar>;

const renderToolbar = (overrides: Partial<ToolbarProps> = {}) => {
  const props: ToolbarProps = {
    paperId: 'a4',
    density: 'normal',
    accentColor: '#334155',
    scale: 1,
    zoom: 1,
    overflows: false,
    words: 320,
    onPaperChange: jest.fn(),
    onDensityChange: jest.fn(),
    onAccentChange: jest.fn(),
    onZoomChange: jest.fn(),
    onDownload: jest.fn(),
    onPrint: jest.fn(),
    canUndo: false,
    canRedo: false,
    onUndo: jest.fn(),
    onRedo: jest.fn(),
    onReset: jest.fn(),
    ...overrides,
  };
  render(<PreviewToolbar {...props} />);
  return props;
};

describe('PreviewToolbar', () => {
  it('changes the paper size', () => {
    const props = renderToolbar();
    fireEvent.change(screen.getByLabelText('Paper size'), {
      target: { value: 'a3' },
    });
    expect(props.onPaperChange).toHaveBeenCalledWith('a3');
  });

  it('changes the text density', () => {
    const props = renderToolbar();
    fireEvent.change(screen.getByLabelText('Text density'), {
      target: { value: 'compact' },
    });
    expect(props.onDensityChange).toHaveBeenCalledWith('compact');
  });

  it('changes the accent color', () => {
    const props = renderToolbar();
    fireEvent.change(screen.getByLabelText('Accent color'), {
      target: { value: '#ff0000' },
    });
    expect(props.onAccentChange).toHaveBeenCalledWith('#ff0000');
  });

  it('zooms in, out, and resets through the zoom controls', () => {
    const props = renderToolbar({ zoom: 1 });
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    expect(props.onZoomChange).toHaveBeenLastCalledWith(1.1);
    fireEvent.click(screen.getByRole('button', { name: 'Zoom out' }));
    expect(props.onZoomChange).toHaveBeenLastCalledWith(0.9);
    fireEvent.click(screen.getByRole('button', { name: 'Reset zoom' }));
    expect(props.onZoomChange).toHaveBeenLastCalledWith(1);
  });

  it('shows the current scale percentage', () => {
    renderToolbar({ scale: 1.5 });
    expect(screen.getByText('150%')).toBeInTheDocument();
  });

  it('warns when the resume overflows the page', () => {
    renderToolbar({ overflows: true, words: 750 });
    expect(
      screen.getByText(
        '750 words — overflows the page. Trim content or pick a denser layout.'
      )
    ).toBeInTheDocument();
  });

  it('reports the word count when the resume fits', () => {
    renderToolbar({ overflows: false, words: 320 });
    expect(
      screen.getByText('Fits on one page · 320 words')
    ).toBeInTheDocument();
  });

  it('triggers the download and print handlers', () => {
    const props = renderToolbar();
    fireEvent.click(screen.getByRole('button', { name: /html/i }));
    expect(props.onDownload).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /print \/ pdf/i }));
    expect(props.onPrint).toHaveBeenCalled();
  });

  it('disables undo when canUndo is false', () => {
    renderToolbar({ canUndo: false });
    expect(screen.getByLabelText('Undo')).toBeDisabled();
  });

  it('enables undo when canUndo is true', () => {
    const props = renderToolbar({ canUndo: true });
    fireEvent.click(screen.getByLabelText('Undo'));
    expect(props.onUndo).toHaveBeenCalled();
  });

  it('disables redo when canRedo is false', () => {
    renderToolbar({ canRedo: false });
    expect(screen.getByLabelText('Redo')).toBeDisabled();
  });

  it('enables redo when canRedo is true', () => {
    const props = renderToolbar({ canRedo: true });
    fireEvent.click(screen.getByLabelText('Redo'));
    expect(props.onRedo).toHaveBeenCalled();
  });

  it('triggers the reset handler', () => {
    const props = renderToolbar();
    fireEvent.click(screen.getByRole('button', { name: /^reset$/i }));
    expect(props.onReset).toHaveBeenCalled();
  });
});

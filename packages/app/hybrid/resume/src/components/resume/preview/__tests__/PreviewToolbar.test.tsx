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
    onPaperChange: jest.fn(),
    onDensityChange: jest.fn(),
    onAccentChange: jest.fn(),
    onZoomChange: jest.fn(),
    onDownload: jest.fn(),
    onPrint: jest.fn(),
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
    renderToolbar({ overflows: true });
    expect(screen.getByText('Overflows the page')).toBeInTheDocument();
  });

  it('hides the overflow warning when it fits', () => {
    renderToolbar({ overflows: false });
    expect(screen.queryByText('Overflows the page')).not.toBeInTheDocument();
  });

  it('triggers the download and print handlers', () => {
    const props = renderToolbar();
    fireEvent.click(screen.getByRole('button', { name: /html/i }));
    expect(props.onDownload).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /print \/ pdf/i }));
    expect(props.onPrint).toHaveBeenCalled();
  });
});

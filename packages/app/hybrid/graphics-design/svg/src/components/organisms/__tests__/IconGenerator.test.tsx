import { render, screen, fireEvent } from '@testing-library/react';
import { IconGenerator } from '../IconGenerator';
import type { GeneratedIcon } from '@/types';

const icon = (size: number): GeneratedIcon => ({
  size,
  dataUrl: `data:image/png;base64,${size}`,
  canvas: {} as HTMLCanvasElement,
});

describe('IconGenerator', () => {
  const onUseEditor = jest.fn();
  const onFile = jest.fn();
  const onDownloadSingle = jest.fn();
  const onDownloadAll = jest.fn();

  const renderGenerator = (
    overrides: Partial<Parameters<typeof IconGenerator>[0]> = {}
  ) =>
    render(
      <IconGenerator
        icons={[]}
        processing={false}
        error={null}
        sourceName={null}
        onUseEditor={onUseEditor}
        onFile={onFile}
        onDownloadSingle={onDownloadSingle}
        onDownloadAll={onDownloadAll}
        {...overrides}
      />
    );

  beforeEach(() => jest.clearAllMocks());

  it('renders dropzone and use-editor button', () => {
    renderGenerator();
    expect(screen.getByText('Use current editor SVG')).toBeInTheDocument();
    expect(screen.getByText('Drop SVG or Click to Upload')).toBeInTheDocument();
  });

  it('shows empty state when no icons generated', () => {
    renderGenerator();
    expect(screen.getByText('No icons generated yet.')).toBeInTheDocument();
  });

  it('renders generated icons grid with source name', () => {
    renderGenerator({ icons: [icon(72), icon(512)], sourceName: 'test.svg' });
    expect(screen.getByText('Generated Icons')).toBeInTheDocument();
    expect(screen.getByText('Source: test.svg')).toBeInTheDocument();
    expect(screen.getByAltText('72x72')).toBeInTheDocument();
    expect(screen.getByAltText('512x512')).toBeInTheDocument();
  });

  it('calls onUseEditor when button clicked', () => {
    renderGenerator();
    fireEvent.click(screen.getByText('Use current editor SVG'));
    expect(onUseEditor).toHaveBeenCalled();
  });

  it('calls onDownloadSingle when icon tile clicked', () => {
    renderGenerator({ icons: [icon(72)] });
    fireEvent.click(screen.getByAltText('72x72').closest('button')!);
    expect(onDownloadSingle).toHaveBeenCalledWith(
      expect.objectContaining({ size: 72 })
    );
  });

  it('calls onDownloadAll when zip button clicked', () => {
    renderGenerator({ icons: [icon(72)] });
    fireEvent.click(screen.getByText('Download ZIP (All Sizes)'));
    expect(onDownloadAll).toHaveBeenCalled();
  });

  it('shows error message', () => {
    renderGenerator({ error: 'Only SVG files are accepted.' });
    expect(
      screen.getByText('Only SVG files are accepted.')
    ).toBeInTheDocument();
  });

  it('disables controls while processing', () => {
    renderGenerator({ processing: true, icons: [icon(72)] });
    expect(screen.getByText('Rendering…')).toBeDisabled();
  });

  it('calls onFile when a file is selected', () => {
    renderGenerator();
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = new File(['<svg></svg>'], 'test.svg', {
      type: 'image/svg+xml',
    });
    Object.defineProperty(input, 'files', {
      value: [file],
      configurable: true,
    });
    fireEvent.change(input);
    expect(onFile).toHaveBeenCalledWith(file);
  });

  it('handles drag and drop on dropzone', () => {
    renderGenerator();
    const dropZone = screen
      .getByText('Drop SVG or Click to Upload')
      .closest('div')!;
    const file = new File(['<svg></svg>'], 'drop.svg', {
      type: 'image/svg+xml',
    });
    fireEvent.dragOver(dropZone);
    fireEvent.drop(dropZone, { dataTransfer: { files: [file] } });
    expect(onFile).toHaveBeenCalledWith(file);
  });
});

import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToolPalette } from '@/components/molecules/ToolPalette';
import { LayerPanel } from '@/components/molecules/LayerPanel';
import { AnalysisPanel } from '@/components/molecules/AnalysisPanel';
import type { AnnotationLayer } from '@/types/annotation';

describe('ToolPalette', () => {
  it('switches tools on click', async () => {
    const user = userEvent.setup();
    const onToolChange = jest.fn();
    render(<ToolPalette tool="pan" onToolChange={onToolChange} />);
    await user.click(screen.getByRole('button', { name: 'Polygon tool' }));
    expect(onToolChange).toHaveBeenCalledWith('polygon');
  });

  it('marks the active tool as pressed', () => {
    render(<ToolPalette tool="freehand" onToolChange={jest.fn()} />);
    expect(
      screen.getByRole('button', { name: 'Freehand tool' })
    ).toHaveAttribute('aria-pressed', 'true');
  });

  it('switches to measurement tools', async () => {
    const user = userEvent.setup();
    const onToolChange = jest.fn();
    render(<ToolPalette tool="pan" onToolChange={onToolChange} />);
    await user.click(
      screen.getByRole('button', { name: 'Measure distance tool' })
    );
    expect(onToolChange).toHaveBeenCalledWith('measureDistance');
    await user.click(
      screen.getByRole('button', { name: 'Measure angle tool' })
    );
    expect(onToolChange).toHaveBeenCalledWith('measureAngle');
    await user.click(screen.getByRole('button', { name: 'Measure area tool' }));
    expect(onToolChange).toHaveBeenCalledWith('measureArea');
  });

  it('switches to the eraser and lasso subtract tools', async () => {
    const user = userEvent.setup();
    const onToolChange = jest.fn();
    render(<ToolPalette tool="pan" onToolChange={onToolChange} />);
    await user.click(screen.getByRole('button', { name: 'Erase tool' }));
    expect(onToolChange).toHaveBeenCalledWith('erase');
    await user.click(
      screen.getByRole('button', { name: 'Lasso subtract tool' })
    );
    expect(onToolChange).toHaveBeenCalledWith('lassoSubtract');
  });
});

describe('LayerPanel', () => {
  const layer: AnnotationLayer = {
    id: 'l1',
    name: 'Neurons',
    color: '#00e5ff',
    visible: true,
    annotations: [{ id: 'a1', kind: 'polygon', points: [{ x: 0, y: 0 }] }],
  };

  it('lists layers with annotation counts', () => {
    render(
      <LayerPanel
        layers={[layer]}
        activeLayerId="l1"
        onSelect={jest.fn()}
        onToggleVisible={jest.fn()}
        onChangeColor={jest.fn()}
        onAdd={jest.fn()}
        onRemove={jest.fn()}
        onExportRoiZip={jest.fn()}
        onExportGeoJson={jest.fn()}
        onExportAnnotationsCsv={jest.fn()}
        onExportSvg={jest.fn()}
        onExportWebViewer={jest.fn()}
      />
    );
    expect(screen.getByText('Neurons')).toBeInTheDocument();
    expect(screen.getByText('1 annotation')).toBeInTheDocument();
  });

  it('reports visibility toggles and removals', async () => {
    const user = userEvent.setup();
    const onToggleVisible = jest.fn();
    const onRemove = jest.fn();
    render(
      <LayerPanel
        layers={[layer]}
        activeLayerId="l1"
        onSelect={jest.fn()}
        onToggleVisible={onToggleVisible}
        onChangeColor={jest.fn()}
        onAdd={jest.fn()}
        onRemove={onRemove}
        onExportRoiZip={jest.fn()}
        onExportGeoJson={jest.fn()}
        onExportAnnotationsCsv={jest.fn()}
        onExportSvg={jest.fn()}
        onExportWebViewer={jest.fn()}
      />
    );
    await user.click(screen.getByRole('checkbox', { name: 'Neurons visible' }));
    expect(onToggleVisible).toHaveBeenCalledWith('l1', false);
    await user.click(screen.getByRole('button', { name: 'Remove Neurons' }));
    expect(onRemove).toHaveBeenCalledWith('l1');
  });

  it('reports annotation export actions', async () => {
    const user = userEvent.setup();
    const onExportRoiZip = jest.fn();
    const onExportGeoJson = jest.fn();
    const onExportAnnotationsCsv = jest.fn();
    const onExportSvg = jest.fn();
    const onExportWebViewer = jest.fn();
    render(
      <LayerPanel
        layers={[layer]}
        activeLayerId="l1"
        onSelect={jest.fn()}
        onToggleVisible={jest.fn()}
        onChangeColor={jest.fn()}
        onAdd={jest.fn()}
        onRemove={jest.fn()}
        onExportRoiZip={onExportRoiZip}
        onExportGeoJson={onExportGeoJson}
        onExportAnnotationsCsv={onExportAnnotationsCsv}
        onExportSvg={onExportSvg}
        onExportWebViewer={onExportWebViewer}
      />
    );
    await user.click(
      screen.getByRole('button', { name: 'Export ImageJ ROI set' })
    );
    expect(onExportRoiZip).toHaveBeenCalledTimes(1);
    await user.click(
      screen.getByRole('button', { name: 'Export annotations as GeoJSON' })
    );
    expect(onExportGeoJson).toHaveBeenCalledTimes(1);
    await user.click(
      screen.getByRole('button', { name: 'Export annotations as CSV' })
    );
    expect(onExportAnnotationsCsv).toHaveBeenCalledTimes(1);
    await user.click(
      screen.getByRole('button', { name: 'Export annotations as SVG figure' })
    );
    expect(onExportSvg).toHaveBeenCalledTimes(1);
    await user.click(
      screen.getByRole('button', { name: 'Export read-only web viewer' })
    );
    expect(onExportWebViewer).toHaveBeenCalledTimes(1);
  });

  it('hides export actions when no layer has annotations', () => {
    render(
      <LayerPanel
        layers={[]}
        activeLayerId=""
        onSelect={jest.fn()}
        onToggleVisible={jest.fn()}
        onChangeColor={jest.fn()}
        onAdd={jest.fn()}
        onRemove={jest.fn()}
        onExportRoiZip={jest.fn()}
        onExportGeoJson={jest.fn()}
        onExportAnnotationsCsv={jest.fn()}
        onExportSvg={jest.fn()}
        onExportWebViewer={jest.fn()}
      />
    );
    expect(
      screen.queryByRole('button', { name: 'Export ImageJ ROI set' })
    ).not.toBeInTheDocument();
  });
});

describe('AnalysisPanel', () => {
  const baseProps = {
    status: 'idle' as const,
    progress: 0,
    error: null,
    k: 5,
    result: null,
    batch: null,
    presets: [
      {
        id: 'p1',
        name: 'Fast',
        options: { k: 3, iterations: 5, stride: 8, minRegionSize: 8 },
      },
    ],
    onApplyPreset: jest.fn(),
    onSavePreset: jest.fn(),
    onDeletePreset: jest.fn(),
    showDensity: false,
    densityRadius: 24,
    onToggleDensity: jest.fn(),
    onDensityRadiusChange: jest.fn(),
    hasRaster: true,
    fileInputRef: createRef<HTMLInputElement | null>(),
    onSetK: jest.fn(),
    onRunSingle: jest.fn(),
    onBatchFiles: jest.fn(),
    onExportCsv: jest.fn(),
    onExportJson: jest.fn(),
    onExportRegionsCsv: jest.fn(),
    onExportPng: jest.fn(),
    onOpenReport: jest.fn(),
    onShareExport: jest.fn(),
  };

  it('runs analysis on the current image', async () => {
    const user = userEvent.setup();
    const onRunSingle = jest.fn();
    render(<AnalysisPanel {...baseProps} onRunSingle={onRunSingle} />);
    await user.click(
      screen.getByRole('button', { name: 'Run analysis on current image' })
    );
    expect(onRunSingle).toHaveBeenCalledTimes(1);
  });

  it('disables the run button without a raster', () => {
    render(<AnalysisPanel {...baseProps} hasRaster={false} />);
    expect(
      screen.getByRole('button', { name: 'Run analysis on current image' })
    ).toBeDisabled();
  });

  it('shows a batch summary once analysis completes', () => {
    render(
      <AnalysisPanel
        {...baseProps}
        status="done"
        progress={1}
        batch={{
          results: [],
          aggregate: {
            imageCount: 3,
            totalPixels: 90,
            totalRegions: 12,
            meanDiversity: 0.5,
          },
        }}
      />
    );
    expect(screen.getByText('3 images analyzed')).toBeInTheDocument();
    expect(screen.getByText('12 regions detected')).toBeInTheDocument();
  });

  it('reports density overlay toggles and radius changes', async () => {
    const user = userEvent.setup();
    const onToggleDensity = jest.fn();
    const onDensityRadiusChange = jest.fn();
    render(
      <AnalysisPanel
        {...baseProps}
        status="done"
        progress={1}
        result={{
          k: 2,
          centers: [
            { r: 255, g: 0, b: 0 },
            { r: 0, g: 0, b: 255 },
          ],
          classified: new Uint8Array(4),
          counts: [2, 2],
          regions: [1, 1],
          regionStats: [],
          summary: {
            totalPixels: 4,
            clusters: [],
            diversity: 0,
          },
        }}
        onToggleDensity={onToggleDensity}
        onDensityRadiusChange={onDensityRadiusChange}
      />
    );
    await user.click(
      screen.getByRole('checkbox', { name: 'Density heatmap overlay' })
    );
    expect(onToggleDensity).toHaveBeenCalledWith(true);
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Density radius' }),
      '48'
    );
    expect(onDensityRadiusChange).toHaveBeenCalledWith(48);
  });

  it('applies, saves and deletes presets', async () => {
    const user = userEvent.setup();
    const onApplyPreset = jest.fn();
    const onSavePreset = jest.fn();
    const onDeletePreset = jest.fn();
    render(
      <AnalysisPanel
        {...baseProps}
        onApplyPreset={onApplyPreset}
        onSavePreset={onSavePreset}
        onDeletePreset={onDeletePreset}
      />
    );
    await user.click(
      screen.getByRole('button', { name: 'Apply selected preset' })
    );
    expect(onApplyPreset).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'p1', name: 'Fast' })
    );
    await user.type(
      screen.getByRole('textbox', { name: 'Preset name' }),
      'Lab A'
    );
    await user.click(
      screen.getByRole('button', { name: 'Save current parameters as preset' })
    );
    expect(onSavePreset).toHaveBeenCalledWith('Lab A');
    await user.click(
      screen.getByRole('button', { name: 'Delete selected preset' })
    );
    expect(onDeletePreset).toHaveBeenCalledWith('p1');
  });
});

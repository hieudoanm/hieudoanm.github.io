import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnalysisPanel } from '@/components/molecules/AnalysisPanel';

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

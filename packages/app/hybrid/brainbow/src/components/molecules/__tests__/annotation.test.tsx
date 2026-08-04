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
    await user.click(screen.getByRole('button', { name: 'polygon tool' }));
    expect(onToolChange).toHaveBeenCalledWith('polygon');
  });

  it('marks the active tool as pressed', () => {
    render(<ToolPalette tool="freehand" onToolChange={jest.fn()} />);
    expect(
      screen.getByRole('button', { name: 'freehand tool' })
    ).toHaveAttribute('aria-pressed', 'true');
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
      />
    );
    await user.click(screen.getByRole('checkbox', { name: 'Neurons visible' }));
    expect(onToggleVisible).toHaveBeenCalledWith('l1', false);
    await user.click(screen.getByRole('button', { name: 'Remove Neurons' }));
    expect(onRemove).toHaveBeenCalledWith('l1');
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
    hasRaster: true,
    fileInputRef: createRef<HTMLInputElement | null>(),
    onSetK: jest.fn(),
    onRunSingle: jest.fn(),
    onBatchFiles: jest.fn(),
    onExportCsv: jest.fn(),
    onExportJson: jest.fn(),
    onExportPng: jest.fn(),
    onOpenReport: jest.fn(),
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
});

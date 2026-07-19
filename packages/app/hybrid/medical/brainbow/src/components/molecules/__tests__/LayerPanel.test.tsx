import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LayerPanel } from '@/components/molecules/LayerPanel';
import type { AnnotationLayer } from '@/types/annotation';

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

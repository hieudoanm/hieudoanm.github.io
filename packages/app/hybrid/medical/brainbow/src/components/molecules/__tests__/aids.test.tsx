import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Minimap } from '@/components/molecules/Minimap';
import { GuideControls } from '@/components/molecules/GuideControls';
import { CompareControls } from '@/components/molecules/CompareControls';
import type { ImageRaster } from '@/types/image';

const raster: ImageRaster = {
  width: 2,
  height: 2,
  data: new Uint8ClampedArray(16),
};

describe('Minimap', () => {
  it('reports a navigated image coordinate on click', () => {
    const onNavigate = jest.fn();
    render(
      <Minimap
        raster={raster}
        imageWidth={400}
        imageHeight={300}
        transform={{ scale: 1, offsetX: 0, offsetY: 0 }}
        size={{ width: 800, height: 600 }}
        onNavigate={onNavigate}
      />
    );
    const minimap = screen.getByTestId('minimap');
    minimap.getBoundingClientRect = () =>
      ({
        left: 0,
        top: 0,
        width: 200,
        height: 120,
        right: 200,
        bottom: 120,
      }) as DOMRect;
    fireEvent(
      minimap,
      new MouseEvent('pointerdown', {
        bubbles: true,
        cancelable: true,
        clientX: 100,
        clientY: 60,
      })
    );
    expect(onNavigate).toHaveBeenCalledWith(200, 150);
  });

  it('renders nothing when the raster is missing', () => {
    render(
      <Minimap
        raster={null}
        imageWidth={400}
        imageHeight={300}
        transform={{ scale: 1, offsetX: 0, offsetY: 0 }}
        size={{ width: 800, height: 600 }}
        onNavigate={jest.fn()}
      />
    );
    expect(screen.getByTestId('minimap')).toBeInTheDocument();
  });
});

describe('GuideControls', () => {
  it('toggles snapping and the guide grid', async () => {
    const user = userEvent.setup();
    const onToggleSnap = jest.fn();
    const onToggleGrid = jest.fn();
    render(
      <GuideControls
        snapEnabled={false}
        gridVisible={false}
        onToggleSnap={onToggleSnap}
        onToggleGrid={onToggleGrid}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Snap to vertices' }));
    expect(onToggleSnap).toHaveBeenCalledWith(true);
    await user.click(screen.getByRole('button', { name: 'Guide grid' }));
    expect(onToggleGrid).toHaveBeenCalledWith(true);
  });
});

describe('CompareControls', () => {
  it('loads a compare image from the file input', async () => {
    const user = userEvent.setup();
    const onLoadFiles = jest.fn();
    render(
      <CompareControls
        compareRaster={null}
        mode="off"
        onModeChange={jest.fn()}
        onLoadFiles={onLoadFiles}
        onClear={jest.fn()}
      />
    );
    const input = screen.getByTestId('compare-input');
    const file = new File(['x'], 'other.png', { type: 'image/png' });
    await user.upload(input, file);
    expect(onLoadFiles).toHaveBeenCalledWith([file]);
  });

  it('switches compare modes once a compare image is loaded', async () => {
    const user = userEvent.setup();
    const onModeChange = jest.fn();
    render(
      <CompareControls
        compareRaster={raster}
        mode="off"
        onModeChange={onModeChange}
        onLoadFiles={jest.fn()}
        onClear={jest.fn()}
      />
    );
    await user.click(
      screen.getByRole('button', { name: 'Compare mode: side by side' })
    );
    expect(onModeChange).toHaveBeenCalledWith('side');
    await user.click(
      screen.getByRole('button', { name: 'Compare mode: swipe divider' })
    );
    expect(onModeChange).toHaveBeenCalledWith('swipe');
  });

  it('clears the loaded compare image', async () => {
    const user = userEvent.setup();
    const onClear = jest.fn();
    render(
      <CompareControls
        compareRaster={raster}
        mode="side"
        onModeChange={jest.fn()}
        onLoadFiles={jest.fn()}
        onClear={onClear}
      />
    );
    await user.click(
      screen.getByRole('button', { name: 'Clear compare image' })
    );
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});

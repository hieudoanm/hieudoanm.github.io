import { act, fireEvent, render, screen } from '@testing-library/react';
import { Minimap } from '@/components/molecules/Minimap';
import type { ViewTransform } from '@/types/image';

jest.mock('@/lib/canvas/draw', () => ({
  drawRasterToCanvas: jest.fn(),
}));

jest.mock('@/lib/geometry/viewport', () => ({
  fitTransform: jest.fn(() => ({
    scale: 0.5,
    offsetX: 10,
    offsetY: 20,
  })),
}));

jest.mock('@/lib/geometry/minimap', () => ({
  minimapRect: jest.fn(() => ({
    x: 0,
    y: 0,
    width: 50,
    height: 30,
  })),
  minimapToImage: jest.fn(() => ({ x: 100, y: 200 })),
  visibleImageBounds: jest.fn(() => ({
    minX: 0,
    minY: 0,
    maxX: 800,
    maxY: 600,
  })),
}));

import { drawRasterToCanvas } from '@/lib/canvas/draw';
import { minimapToImage } from '@/lib/geometry/minimap';

const defaultRaster = {
  width: 4,
  height: 4,
  data: new Uint8ClampedArray(4 * 4 * 4),
};

const defaultTransform: ViewTransform = {
  scale: 1,
  offsetX: 0,
  offsetY: 0,
};

const defaultSize = { width: 800, height: 600 };

const mockBoundingClientRect = (el: HTMLElement) => {
  jest.spyOn(el, 'getBoundingClientRect').mockReturnValue({
    x: 0,
    y: 0,
    width: 176,
    height: 128,
    top: 0,
    left: 0,
    bottom: 128,
    right: 176,
    toJSON: () => {},
  });
};

const setupCanvasContext = (): CanvasRenderingContext2D => {
  const ctx = {
    strokeStyle: '',
    lineWidth: 1,
    strokeRect: jest.fn(),
  } as unknown as CanvasRenderingContext2D;

  HTMLCanvasElement.prototype.getContext = jest.fn(() => ctx) as any;
  return ctx;
};

describe('Minimap', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupCanvasContext();
    Object.defineProperty(HTMLCanvasElement.prototype, 'clientWidth', {
      configurable: true,
      get: () => 176,
    });
    Object.defineProperty(HTMLCanvasElement.prototype, 'clientHeight', {
      configurable: true,
      get: () => 128,
    });
  });

  it('renders the minimap container with correct role', () => {
    render(
      <Minimap
        raster={defaultRaster}
        imageWidth={100}
        imageHeight={100}
        transform={defaultTransform}
        size={defaultSize}
        onNavigate={jest.fn()}
      />
    );
    expect(screen.getByTestId('minimap')).toHaveAttribute(
      'aria-label',
      'Zoom minimap'
    );
  });

  it('draws the raster to canvas when raster is provided', () => {
    render(
      <Minimap
        raster={defaultRaster}
        imageWidth={100}
        imageHeight={100}
        transform={defaultTransform}
        size={defaultSize}
        onNavigate={jest.fn()}
      />
    );
    expect(drawRasterToCanvas).toHaveBeenCalled();
  });

  it('does not draw when raster is null', () => {
    render(
      <Minimap
        raster={null}
        imageWidth={100}
        imageHeight={100}
        transform={defaultTransform}
        size={defaultSize}
        onNavigate={jest.fn()}
      />
    );
    expect(drawRasterToCanvas).not.toHaveBeenCalled();
  });

  it('does not draw when imageWidth is zero', () => {
    render(
      <Minimap
        raster={defaultRaster}
        imageWidth={0}
        imageHeight={100}
        transform={defaultTransform}
        size={defaultSize}
        onNavigate={jest.fn()}
      />
    );
    expect(drawRasterToCanvas).not.toHaveBeenCalled();
  });

  it('does not draw when imageHeight is zero', () => {
    render(
      <Minimap
        raster={defaultRaster}
        imageWidth={100}
        imageHeight={0}
        transform={defaultTransform}
        size={defaultSize}
        onNavigate={jest.fn()}
      />
    );
    expect(drawRasterToCanvas).not.toHaveBeenCalled();
  });

  it('calls onNavigate when clicking the minimap', () => {
    const onNavigate = jest.fn();
    render(
      <Minimap
        raster={defaultRaster}
        imageWidth={100}
        imageHeight={100}
        transform={defaultTransform}
        size={defaultSize}
        onNavigate={onNavigate}
      />
    );
    const minimap = screen.getByTestId('minimap');
    mockBoundingClientRect(minimap);
    fireEvent.pointerDown(minimap, { clientX: 50, clientY: 50 });
    expect(minimapToImage).toHaveBeenCalled();
    expect(onNavigate).toHaveBeenCalledWith(100, 200);
  });

  it('does not navigate when rect has zero width', () => {
    const onNavigate = jest.fn();
    render(
      <Minimap
        raster={defaultRaster}
        imageWidth={100}
        imageHeight={100}
        transform={defaultTransform}
        size={defaultSize}
        onNavigate={onNavigate}
      />
    );
    const minimap = screen.getByTestId('minimap');
    jest.spyOn(minimap, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      width: 0,
      height: 100,
      top: 0,
      left: 0,
      bottom: 100,
      right: 0,
      toJSON: () => {},
    });
    fireEvent.pointerDown(minimap, { clientX: 50, clientY: 50 });
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('does not navigate on pointermove when not dragging', () => {
    const onNavigate = jest.fn();
    render(
      <Minimap
        raster={defaultRaster}
        imageWidth={100}
        imageHeight={100}
        transform={defaultTransform}
        size={defaultSize}
        onNavigate={onNavigate}
      />
    );
    const minimap = screen.getByTestId('minimap');
    mockBoundingClientRect(minimap);
    fireEvent.pointerMove(minimap, { clientX: 50, clientY: 50 });
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('navigates on pointermove when dragging', () => {
    const onNavigate = jest.fn();
    render(
      <Minimap
        raster={defaultRaster}
        imageWidth={100}
        imageHeight={100}
        transform={defaultTransform}
        size={defaultSize}
        onNavigate={onNavigate}
      />
    );
    const minimap = screen.getByTestId('minimap');
    mockBoundingClientRect(minimap);
    fireEvent.pointerDown(minimap, { clientX: 50, clientY: 50 });
    fireEvent.pointerMove(minimap, { clientX: 60, clientY: 60 });
    expect(onNavigate).toHaveBeenCalledTimes(2);
  });

  it('stops dragging on pointerup', () => {
    const onNavigate = jest.fn();
    render(
      <Minimap
        raster={defaultRaster}
        imageWidth={100}
        imageHeight={100}
        transform={defaultTransform}
        size={defaultSize}
        onNavigate={onNavigate}
      />
    );
    const minimap = screen.getByTestId('minimap');
    mockBoundingClientRect(minimap);
    fireEvent.pointerDown(minimap, { clientX: 50, clientY: 50 });
    fireEvent.pointerUp(minimap, { clientX: 50, clientY: 50 });
    fireEvent.pointerMove(minimap, { clientX: 60, clientY: 60 });
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });

  it('sets up a ResizeObserver on mount', () => {
    const observe = jest.fn();
    const disconnect = jest.fn();
    const OriginalResizeObserver = window.ResizeObserver;
    window.ResizeObserver = jest.fn(() => ({
      observe,
      disconnect,
      unobserve: jest.fn(),
    })) as any;

    render(
      <Minimap
        raster={defaultRaster}
        imageWidth={100}
        imageHeight={100}
        transform={defaultTransform}
        size={defaultSize}
        onNavigate={jest.fn()}
      />
    );
    expect(observe).toHaveBeenCalled();
    window.ResizeObserver = OriginalResizeObserver;
  });
});

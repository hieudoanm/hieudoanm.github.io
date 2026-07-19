import { act, fireEvent, render, screen } from '@testing-library/react';
import { AnnotatorCanvas } from '@/components/organisms/AnnotatorCanvas';
import type { Annotation, AnnotationLayer } from '@/types/annotation';
import type { ViewTransform } from '@/types/image';

type PointerInit = {
  pointerId: number;
  clientX: number;
  clientY: number;
};

const pointerEvent = (
  type: 'pointerdown' | 'pointermove' | 'pointerup',
  { pointerId, clientX, clientY }: PointerInit
): MouseEvent => {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    clientX,
    clientY,
  });
  Object.defineProperty(event, 'pointerId', { value: pointerId });
  return event;
};

const baseProps = {
  raster: {
    width: 4,
    height: 4,
    data: new Uint8ClampedArray(4 * 4 * 4),
  },
  transform: { scale: 1, offsetX: 0, offsetY: 0 } as ViewTransform,
  layers: [],
  activeLayer: null,
  tool: 'pan' as const,
  calibration: { pixelsPerMicron: null },
  onTransformChange: jest.fn(),
  onSizeChange: jest.fn(),
  onAddAnnotation: jest.fn(),
  onRemoveAnnotations: jest.fn(),
};

const click = (canvas: HTMLElement, x: number, y: number): void => {
  fireEvent(
    canvas,
    pointerEvent('pointerdown', { pointerId: 1, clientX: x, clientY: y })
  );
};

const clickWithGap = (canvas: HTMLElement, x: number, y: number): void => {
  click(canvas, x, y);
  act(() => {
    jest.advanceTimersByTime(400);
  });
};

const drawClosedPolygon = (
  canvas: HTMLElement,
  points: Array<[number, number]>
): void => {
  for (const [x, y] of points) {
    clickWithGap(canvas, x, y);
  }
  const [lastX, lastY] = points[points.length - 1];
  click(canvas, lastX, lastY);
  click(canvas, lastX, lastY);
};

describe('AnnotatorCanvas gestures', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('pans with a single pointer drag', () => {
    const onTransformChange = jest.fn();
    render(
      <AnnotatorCanvas {...baseProps} onTransformChange={onTransformChange} />
    );
    const canvas = screen.getByTestId('annotator-canvas');
    fireEvent(
      canvas,
      pointerEvent('pointerdown', { pointerId: 1, clientX: 100, clientY: 100 })
    );
    fireEvent(
      canvas,
      pointerEvent('pointermove', { pointerId: 1, clientX: 130, clientY: 140 })
    );
    expect(onTransformChange).toHaveBeenCalledWith(
      expect.objectContaining({ offsetX: 30, offsetY: 40 })
    );
  });

  it('zooms with a two-finger pinch', () => {
    const onTransformChange = jest.fn();
    render(
      <AnnotatorCanvas {...baseProps} onTransformChange={onTransformChange} />
    );
    const canvas = screen.getByTestId('annotator-canvas');
    fireEvent(
      canvas,
      pointerEvent('pointerdown', { pointerId: 1, clientX: 100, clientY: 100 })
    );
    fireEvent(
      canvas,
      pointerEvent('pointerdown', { pointerId: 2, clientX: 200, clientY: 100 })
    );
    fireEvent(
      canvas,
      pointerEvent('pointermove', { pointerId: 2, clientX: 200, clientY: 150 })
    );
    const last = onTransformChange.mock.calls.at(-1)?.[0] as ViewTransform;
    expect(last.scale).toBeGreaterThan(1);
  });

  it('does not pan while two pointers are down', () => {
    const onTransformChange = jest.fn();
    render(
      <AnnotatorCanvas {...baseProps} onTransformChange={onTransformChange} />
    );
    const canvas = screen.getByTestId('annotator-canvas');
    fireEvent(
      canvas,
      pointerEvent('pointerdown', { pointerId: 1, clientX: 100, clientY: 100 })
    );
    fireEvent(
      canvas,
      pointerEvent('pointerdown', { pointerId: 2, clientX: 200, clientY: 100 })
    );
    fireEvent(
      canvas,
      pointerEvent('pointermove', { pointerId: 2, clientX: 200, clientY: 150 })
    );
    const calls = onTransformChange.mock.calls.map(
      (call) => call[0] as ViewTransform
    );
    expect(calls.length).toBeGreaterThan(0);
    for (const transform of calls) {
      expect(transform.scale).toBeGreaterThan(1);
      expect(transform.offsetX).toBeCloseTo(150 * (1 - transform.scale), 5);
      expect(transform.offsetY).toBeCloseTo(100 * (1 - transform.scale), 5);
    }
  });
});

describe('AnnotatorCanvas eraser', () => {
  const trace: Annotation = {
    id: 'trace',
    kind: 'freehand',
    points: [
      { x: 105, y: 100 },
      { x: 105, y: 102 },
    ],
  };
  const layers: AnnotationLayer[] = [
    {
      id: 'l1',
      name: 'Neurons',
      color: '#00e5ff',
      visible: true,
      annotations: [trace],
    },
  ];

  it('removes annotations hit by an erase stroke', () => {
    const onRemoveAnnotations = jest.fn();
    render(
      <AnnotatorCanvas
        {...baseProps}
        layers={layers}
        activeLayer={layers[0]}
        tool="erase"
        onRemoveAnnotations={onRemoveAnnotations}
      />
    );
    const canvas = screen.getByTestId('annotator-canvas');
    fireEvent(
      canvas,
      pointerEvent('pointerdown', { pointerId: 1, clientX: 100, clientY: 100 })
    );
    fireEvent(
      canvas,
      pointerEvent('pointermove', { pointerId: 1, clientX: 130, clientY: 100 })
    );
    fireEvent(
      canvas,
      pointerEvent('pointerup', { pointerId: 1, clientX: 130, clientY: 100 })
    );
    expect(onRemoveAnnotations).toHaveBeenCalledWith(['trace']);
  });

  it('leaves annotations that miss the erase stroke', () => {
    const onRemoveAnnotations = jest.fn();
    render(
      <AnnotatorCanvas
        {...baseProps}
        layers={layers}
        activeLayer={layers[0]}
        tool="erase"
        onRemoveAnnotations={onRemoveAnnotations}
      />
    );
    const canvas = screen.getByTestId('annotator-canvas');
    fireEvent(
      canvas,
      pointerEvent('pointerdown', { pointerId: 1, clientX: 300, clientY: 300 })
    );
    fireEvent(
      canvas,
      pointerEvent('pointermove', { pointerId: 1, clientX: 330, clientY: 300 })
    );
    fireEvent(
      canvas,
      pointerEvent('pointerup', { pointerId: 1, clientX: 330, clientY: 300 })
    );
    expect(onRemoveAnnotations).not.toHaveBeenCalled();
  });
});

describe('AnnotatorCanvas lasso subtract', () => {
  const inside: Annotation = {
    id: 'inside',
    kind: 'polygon',
    points: [
      { x: 110, y: 110 },
      { x: 120, y: 110 },
      { x: 110, y: 120 },
    ],
  };
  const outside: Annotation = {
    id: 'outside',
    kind: 'polygon',
    points: [
      { x: 310, y: 310 },
      { x: 320, y: 310 },
      { x: 310, y: 320 },
    ],
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('removes annotations fully enclosed by the lasso', () => {
    const onRemoveAnnotations = jest.fn();
    render(
      <AnnotatorCanvas
        {...baseProps}
        layers={[
          {
            id: 'l1',
            name: 'Neurons',
            color: '#00e5ff',
            visible: true,
            annotations: [inside, outside],
          },
        ]}
        activeLayer={{
          id: 'l1',
          name: 'Neurons',
          color: '#00e5ff',
          visible: true,
          annotations: [inside, outside],
        }}
        tool="lassoSubtract"
        onRemoveAnnotations={onRemoveAnnotations}
      />
    );
    drawClosedPolygon(screen.getByTestId('annotator-canvas'), [
      [100, 100],
      [200, 100],
      [200, 200],
      [100, 200],
    ]);
    expect(onRemoveAnnotations).toHaveBeenCalledWith(['inside']);
  });

  it('keeps annotations that cross the lasso boundary', () => {
    const crossing: Annotation = {
      id: 'crossing',
      kind: 'polygon',
      points: [
        { x: 150, y: 50 },
        { x: 150, y: 300 },
        { x: 160, y: 300 },
      ],
    };
    const onRemoveAnnotations = jest.fn();
    const layers = {
      id: 'l1',
      name: 'Neurons',
      color: '#00e5ff',
      visible: true,
      annotations: [crossing, outside],
    } satisfies AnnotationLayer;
    render(
      <AnnotatorCanvas
        {...baseProps}
        layers={[layers]}
        activeLayer={layers}
        tool="lassoSubtract"
        onRemoveAnnotations={onRemoveAnnotations}
      />
    );
    drawClosedPolygon(screen.getByTestId('annotator-canvas'), [
      [100, 100],
      [200, 100],
      [200, 200],
      [100, 200],
    ]);
    expect(onRemoveAnnotations).not.toHaveBeenCalled();
  });
});

describe('AnnotatorCanvas snapping and grid', () => {
  const vertexLayer: AnnotationLayer = {
    id: 'l1',
    name: 'Guide',
    color: '#fff',
    visible: true,
    annotations: [{ id: 'a1', kind: 'polygon', points: [{ x: 150, y: 150 }] }],
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('snaps new polygon vertices to existing annotation vertices', () => {
    const onAddAnnotation = jest.fn();
    render(
      <AnnotatorCanvas
        {...baseProps}
        layers={[vertexLayer]}
        activeLayer={vertexLayer}
        tool="polygon"
        snapEnabled
        onAddAnnotation={onAddAnnotation}
      />
    );
    drawClosedPolygon(screen.getByTestId('annotator-canvas'), [
      [153, 154],
      [200, 200],
      [240, 200],
    ]);
    const annotation = onAddAnnotation.mock.calls.at(-1)?.[0] as Annotation;
    expect(annotation.points[0]).toEqual({ x: 150, y: 150 });
  });

  it('snaps new polygon vertices to the guide grid', () => {
    const onAddAnnotation = jest.fn();
    render(
      <AnnotatorCanvas
        {...baseProps}
        layers={[]}
        activeLayer={null}
        tool="polygon"
        gridVisible
        gridSpacing={50}
        onAddAnnotation={onAddAnnotation}
      />
    );
    drawClosedPolygon(screen.getByTestId('annotator-canvas'), [
      [23, 47],
      [200, 200],
      [240, 200],
    ]);
    const annotation = onAddAnnotation.mock.calls.at(-1)?.[0] as Annotation;
    expect(annotation.points[0]).toEqual({ x: 0, y: 50 });
  });
});

describe('AnnotatorCanvas compare swipe divider', () => {
  it('draws the compare raster on the right of the divider', () => {
    render(
      <AnnotatorCanvas
        {...baseProps}
        compareRaster={{ width: 2, height: 2, data: new Uint8ClampedArray(16) }}
        compareDivider={0.5}
        onCompareDividerChange={jest.fn()}
      />
    );
    expect(screen.getByTestId('compare-divider')).toBeInTheDocument();
  });

  it('reports divider drags as a relative position', () => {
    const onCompareDividerChange = jest.fn();
    render(
      <AnnotatorCanvas
        {...baseProps}
        compareRaster={{ width: 2, height: 2, data: new Uint8ClampedArray(16) }}
        compareDivider={0.5}
        onCompareDividerChange={onCompareDividerChange}
      />
    );
    const container = screen.getByTestId('annotator-canvas');
    container.getBoundingClientRect = () =>
      ({
        left: 0,
        top: 0,
        width: 400,
        height: 300,
        right: 400,
        bottom: 300,
      }) as DOMRect;
    const divider = screen.getByTestId('compare-divider');
    fireEvent(
      divider,
      pointerEvent('pointerdown', { pointerId: 1, clientX: 200, clientY: 150 })
    );
    fireEvent(
      divider,
      pointerEvent('pointermove', { pointerId: 1, clientX: 260, clientY: 150 })
    );
    expect(onCompareDividerChange).toHaveBeenCalledWith(0.65);
  });

  it('hides the divider without a compare raster', () => {
    render(<AnnotatorCanvas {...baseProps} />);
    expect(screen.queryByTestId('compare-divider')).not.toBeInTheDocument();
  });
});

describe('AnnotatorCanvas tool switching', () => {
  it('clears the draft when the tool changes', () => {
    const onAddAnnotation = jest.fn();
    const { rerender } = render(
      <AnnotatorCanvas
        {...baseProps}
        tool="polygon"
        onAddAnnotation={onAddAnnotation}
      />
    );
    const canvas = screen.getByTestId('annotator-canvas');
    fireEvent(
      canvas,
      pointerEvent('pointerdown', { pointerId: 1, clientX: 100, clientY: 100 })
    );
    rerender(
      <AnnotatorCanvas
        {...baseProps}
        tool="pan"
        onAddAnnotation={onAddAnnotation}
      />
    );
    fireEvent(
      canvas,
      pointerEvent('pointerdown', { pointerId: 1, clientX: 200, clientY: 200 })
    );
    expect(onAddAnnotation).not.toHaveBeenCalled();
  });
});

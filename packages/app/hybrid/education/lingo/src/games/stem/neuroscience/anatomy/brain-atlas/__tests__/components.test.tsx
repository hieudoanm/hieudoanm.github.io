import { fireEvent, render, screen } from '@testing-library/react';
import { BrainOutline } from '../components';
import { HEIGHT, WIDTH, toX, toY } from '../outline-geometry';
import type { BrainRegion } from '../types';

const region = (id: string, x: number, y: number): BrainRegion => ({
  id,
  name: id,
  parentId: null,
  depth: 0.5,
  summary: '',
  function: '',
  note: '',
  anchor: { x, y },
});

const regions = [region('frontal', 0.2, 0.2), region('occipital', 0.8, 0.3)];

/** jsdom reports a zero-sized box, which would short-circuit every click. */
const stubBox = (width: number, height: number): jest.SpyInstance =>
  jest
    .spyOn(HTMLCanvasElement.prototype, 'getBoundingClientRect')
    .mockReturnValue({
      width,
      height,
      top: 0,
      left: 0,
      right: width,
      bottom: height,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect);

const setup = (boxW = WIDTH, boxH = HEIGHT) => {
  const onSelect = jest.fn();
  const view = render(
    <BrainOutline
      regions={regions}
      buried={[]}
      selectedId={null}
      onSelect={onSelect}
    />
  );
  stubBox(boxW, boxH);
  return { onSelect, canvas: view.container.querySelector('canvas')! };
};

afterEach(() => jest.restoreAllMocks());

describe('BrainOutline', () => {
  it('exposes the canvas as an image with a description', () => {
    render(
      <BrainOutline
        regions={regions}
        buried={[]}
        selectedId={null}
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('selects the structure whose hotspot was clicked', () => {
    const { onSelect, canvas } = setup();
    fireEvent.click(canvas, { clientX: toX(0.2), clientY: toY(0.2) });
    expect(onSelect).toHaveBeenCalledWith('frontal');
  });

  it('ignores a click that lands between hotspots', () => {
    const { onSelect, canvas } = setup();
    fireEvent.click(canvas, { clientX: toX(0.5), clientY: toY(0.9) });
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('scales clicks from a resized canvas back into drawing pixels', () => {
    // Half-size display: the same visual point arrives as half the CSS pixels.
    const { onSelect, canvas } = setup(WIDTH / 2, HEIGHT / 2);
    fireEvent.click(canvas, { clientX: toX(0.2) / 2, clientY: toY(0.2) / 2 });
    expect(onSelect).toHaveBeenCalledWith('frontal');
  });

  it('ignores clicks while the canvas has no layout box', () => {
    const { onSelect, canvas } = setup(0, 0);
    fireEvent.click(canvas, { clientX: toX(0.2), clientY: toY(0.2) });
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('ignores structures with no anchor when picking', () => {
    const onSelect = jest.fn();
    const unanchored: BrainRegion = { ...region('deep', 0.2, 0.2) };
    delete unanchored.anchor;
    const { container } = render(
      <BrainOutline
        regions={[unanchored]}
        buried={[]}
        selectedId={null}
        onSelect={onSelect}
      />
    );
    stubBox(WIDTH, HEIGHT);
    fireEvent.click(container.querySelector('canvas')!, {
      clientX: toX(0.2),
      clientY: toY(0.2),
    });
    expect(onSelect).not.toHaveBeenCalled();
  });
});

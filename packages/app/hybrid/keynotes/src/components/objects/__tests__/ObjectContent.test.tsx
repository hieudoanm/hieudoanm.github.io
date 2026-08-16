import { render, screen } from '@testing-library/react';
import { ObjectRenderer } from '@/components/canvas/ObjectRenderer';
import { newShapeObject, newTextObject } from '@/utils/deckFactory';

const shape = (partial: Parameters<typeof newShapeObject>[0]) =>
  newShapeObject(partial);

const text = (partial: Parameters<typeof newTextObject>[0]) =>
  newTextObject(partial);

const innerDiv = (container: HTMLElement) =>
  container.querySelector('div.h-full.w-full:not(.relative)') as HTMLElement;

describe('TextContent transforms', () => {
  it('renders wave transform per line', () => {
    render(
      <ObjectRenderer
        obj={text({
          text: 'A\nB',
          style: { ...newTextObject().style, transform: 'wave' },
        })}
      />
    );
    const b = screen.getByText('B');
    expect(b.getAttribute('style')).toContain('translateY(0.25em)');
    expect(b.getAttribute('style')).toContain('skewX(-8deg)');
  });

  it('renders tilt transform on the content wrapper', () => {
    render(
      <ObjectRenderer
        obj={text({
          text: 'Tilted',
          style: { ...newTextObject().style, transform: 'tilt' },
        })}
      />
    );
    expect(screen.getByText('Tilted').getAttribute('style')).toContain(
      'rotate(-6deg)'
    );
  });

  it('renders arc transform as an SVG textPath', () => {
    const { container } = render(
      <ObjectRenderer
        obj={text({
          text: 'Curved',
          style: { ...newTextObject().style, transform: 'arc' },
        })}
      />
    );
    const tp = container.querySelector('textPath');
    expect(tp).toBeTruthy();
    expect(tp?.getAttribute('href')).toContain('arc-');
  });

  it('renders rotate-cw transform', () => {
    render(
      <ObjectRenderer
        obj={text({
          text: 'Spun',
          style: { ...newTextObject().style, transform: 'rotate-cw' },
        })}
      />
    );
    expect(screen.getByText('Spun').getAttribute('style')).toContain(
      'rotate(90deg)'
    );
  });

  it('renders columns via CSS multicol', () => {
    render(
      <ObjectRenderer
        obj={text({
          text: 'Two',
          style: { ...newTextObject().style, columns: 2, columnGap: 16 },
        })}
      />
    );
    const el = screen.getByText('Two') as HTMLElement;
    expect(el.style.columnCount).toBe('2');
    expect(el.style.columnGap).toBe('16px');
  });
});

describe('ShapeContent gradient', () => {
  it('renders multi-stop gradient on a div shape', () => {
    const { container } = render(
      <ObjectRenderer
        obj={shape({
          fill: {
            type: 'gradient',
            from: '#ff0000',
            to: '#0000ff',
            angle: 45,
            opacity: 1,
            stops: [
              { color: '#ff0000', offset: 0 },
              { color: '#00ff00', offset: 0.5 },
              { color: '#0000ff', offset: 1 },
            ],
          },
        })}
      />
    );
    const style = innerDiv(container).getAttribute('style') ?? '';
    expect(style).toContain('linear-gradient(45deg');
    expect(style).toContain('#ff0000 0%');
    expect(style).toContain('#00ff00 50%');
    expect(style).toContain('#0000ff 100%');
  });

  it('falls back to from/to stops when no stops are defined', () => {
    const { container } = render(
      <ObjectRenderer
        obj={shape({
          fill: {
            type: 'gradient',
            from: '#112233',
            to: '#445566',
            angle: 90,
            opacity: 1,
          },
        })}
      />
    );
    const style = innerDiv(container).getAttribute('style') ?? '';
    expect(style).toContain('#112233 0%');
    expect(style).toContain('#445566 100%');
  });

  it('renders stops as SVG <stop> elements for svg shapes', () => {
    const { container } = render(
      <ObjectRenderer
        obj={shape({
          shapeType: 'ellipse',
          fill: {
            type: 'gradient',
            from: '#ff0000',
            to: '#0000ff',
            angle: 0,
            opacity: 1,
            stops: [
              { color: '#ff0000', offset: 0 },
              { color: '#00ff00', offset: 0.5 },
              { color: '#0000ff', offset: 1 },
            ],
          },
        })}
      />
    );
    const stops = container.querySelectorAll('stop');
    expect(stops).toHaveLength(3);
    expect(stops[1].getAttribute('offset')).toBe('50%');
    expect(stops[1].getAttribute('stop-color')).toBe('#00ff00');
  });

  it('renders an image fill on a div shape', () => {
    const { container } = render(
      <ObjectRenderer
        obj={shape({
          fill: {
            type: 'image',
            imageUrl: 'https://example.com/pic.png',
            opacity: 1,
          },
        })}
      />
    );
    expect(innerDiv(container).style.backgroundImage).toContain('pic.png');
  });
});

describe('ShapeContent arrowheads', () => {
  it('renders arrow markers on a line', () => {
    const { container } = render(
      <ObjectRenderer
        obj={shape({
          shapeType: 'line',
          stroke: {
            color: '#ffffff',
            width: 4,
            dash: 'solid',
            arrowStart: true,
            arrowEnd: true,
          },
        })}
      />
    );
    expect(container.querySelectorAll('marker')).toHaveLength(2);
    const line = container.querySelector('line');
    expect(line?.getAttribute('marker-start')).toContain('ast-');
    expect(line?.getAttribute('marker-end')).toContain('aen-');
  });
});

describe('ShapeContent effects', () => {
  it('applies glow and reflection to a div shape', () => {
    const { container } = render(
      <ObjectRenderer
        obj={shape({
          fill: { type: 'solid', color: '#22c55e', opacity: 1 },
          effect: { glowColor: '#22c55e', glowBlur: 18, reflection: true },
        })}
      />
    );
    expect(innerDiv(container).style.boxShadow).toBe('0 0 18px #22c55e');
    const wrapper = container.querySelector('div.relative') as HTMLElement;
    expect(wrapper).toBeTruthy();
    expect(wrapper.querySelector('div.absolute.inset-0')).toBeTruthy();
  });

  it('combines shadow and glow on a div shape', () => {
    const { container } = render(
      <ObjectRenderer
        obj={shape({
          fill: { type: 'solid', color: '#111111', opacity: 1 },
          shadow: {
            enabled: true,
            color: '#000000',
            blur: 12,
            offsetX: 3,
            offsetY: 4,
          },
          effect: { glowColor: '#00ff00', glowBlur: 8 },
        })}
      />
    );
    const shadow = innerDiv(container).style.boxShadow;
    expect(shadow).toContain('3px 4px 12px #000000');
    expect(shadow).toContain('0 0 8px #00ff00');
  });

  it('applies a blur filter for soft edges on svg shapes', () => {
    const { container } = render(
      <ObjectRenderer
        obj={shape({
          shapeType: 'ellipse',
          fill: { type: 'solid', color: '#8b5cf6', opacity: 1 },
          effect: { softEdges: 10 },
        })}
      />
    );
    expect(container.querySelector('path')?.getAttribute('filter')).toBe(
      'blur(10px)'
    );
  });

  it('applies a drop-shadow filter for glow on svg shapes', () => {
    const { container } = render(
      <ObjectRenderer
        obj={shape({
          shapeType: 'ellipse',
          fill: { type: 'solid', color: '#22c55e', opacity: 1 },
          effect: { glowColor: '#22c55e', glowBlur: 18 },
        })}
      />
    );
    const filter = container.querySelector('filter');
    expect(filter).toBeTruthy();
    expect(filter?.querySelector('feDropShadow')).toBeTruthy();
    expect(container.querySelector('path')?.getAttribute('filter')).toContain(
      'url(#fx-'
    );
  });
});

import { fireEvent, render } from '@testing-library/react';
import { PresentSlide } from '@/components/present/PresentSlide';
import { newDeck, newShapeObject, newSlide } from '@/utils/deckFactory';
import type { ObjectAnimation, Slide, SlideObject } from '@/types/deck';

const anim = (overrides: Partial<ObjectAnimation> = {}): ObjectAnimation => ({
  type: 'entrance',
  effect: 'fade-up',
  duration: 600,
  delay: 0,
  trigger: 'click',
  easing: 'ease-out',
  repeat: 1,
  ...overrides,
});

const shapeAt = (
  id: string,
  x: number,
  y: number,
  a?: ObjectAnimation
): SlideObject =>
  newShapeObject({ id, x, y, w: 200, h: 100, z: 1, animation: a });

const buildSlide = (objects: Slide['objects']): Slide => ({
  ...newSlide('blank', newDeck().theme),
  objects,
});

const wrapperFor = (left: string): HTMLElement => {
  const el = Array.from(
    document.querySelectorAll<HTMLElement>('div.absolute')
  ).find((w) => w.style.left === left);
  if (!el) throw new Error(`No object wrapper at left=${left}`);
  return el;
};

const rendererFor = (left: string): HTMLElement => {
  const el = wrapperFor(left).firstElementChild as HTMLElement;
  if (!el) throw new Error(`No renderer inside wrapper at left=${left}`);
  return el;
};

const renderSlide = (slide: Slide, step = 0, morphFrom?: Slide | null) => {
  const deck = newDeck({ slides: [slide] });
  return render(
    <PresentSlide deck={deck} slide={slide} step={step} morphFrom={morphFrom} />
  );
};

describe('PresentSlide positioning', () => {
  it('positions every object absolutely at its coordinates', () => {
    const slide = buildSlide([
      shapeAt('a', 120, 80, anim()),
      shapeAt('b', 300, 200, anim()),
    ]);
    renderSlide(slide, 1);
    expect(wrapperFor('120px').style.top).toBe('80px');
    expect(wrapperFor('300px').style.top).toBe('200px');
  });
});

describe('PresentSlide hover trigger', () => {
  it('keeps hover objects visible and animates on mouse enter', () => {
    const slide = buildSlide([
      shapeAt(
        'a',
        0,
        0,
        anim({ type: 'emphasis', effect: 'pulse', trigger: 'hover' })
      ),
    ]);
    renderSlide(slide, 0);
    const renderer = rendererFor('0px');
    expect(renderer.className).not.toContain('anim-emphasis-pulse');
    fireEvent.mouseEnter(wrapperFor('0px'));
    expect(renderer.className).toContain('anim-emphasis-pulse');
  });
});

describe('PresentSlide timing options', () => {
  it('applies reverse direction when set', () => {
    const slide = buildSlide([shapeAt('a', 0, 0, anim({ reverse: true }))]);
    renderSlide(slide, 1);
    expect(rendererFor('0px').style.animationDirection).toBe('reverse');
  });

  it('applies stagger delay per position among animated objects', () => {
    const slide = buildSlide([
      shapeAt('a', 0, 0, anim({ delay: 0, stagger: 200 })),
      shapeAt('b', 0, 0, anim({ delay: 0, stagger: 200 })),
    ]);
    renderSlide(slide, 1);
    const objs = Array.from(
      document.querySelectorAll<HTMLElement>('div.absolute')
    );
    const delays = objs.map(
      (o) => (o.firstElementChild as HTMLElement).style.animationDelay
    );
    expect(delays).toContain('0ms');
    expect(delays).toContain('200ms');
  });
});

describe('PresentSlide morph', () => {
  it('does not throw in environments without the Web Animations API', () => {
    const prev = buildSlide([shapeAt('a', 0, 0)]);
    const next = buildSlide([shapeAt('a', 50, 40)]);
    expect(() => renderSlide(next, 0, prev)).not.toThrow();
  });
});

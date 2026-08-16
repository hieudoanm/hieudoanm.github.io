import {
  exportDeckJson,
  exportHtml,
  exportSlideSvg,
  exportSlidePng,
  parseDeckJson,
  serializeDeckJson,
  serializeThemeFile,
  slideStorySvg,
  slideToSvg,
} from '@/utils/exporters';
import {
  newChartObject,
  newDeck,
  newDiagramObject,
  newEquationObject,
  newIconObject,
  newShapeObject,
  newTableObject,
  newTextObject,
  newSlide,
} from '@/utils/deckFactory';
import { themeById } from '@/data/themes';

const deckWithSlide = () =>
  newDeck({ slides: [newSlide('cover', themeById('midnight'), 1)] });

describe('serialize/parse deck json', () => {
  it('round-trips a deck', () => {
    const deck = newDeck({ title: 'Roundtrip' });
    const parsed = parseDeckJson(serializeDeckJson(deck));
    expect(parsed).toEqual(deck);
  });

  it('rejects invalid payloads', () => {
    expect(() => parseDeckJson('{"foo":1}')).toThrow();
    expect(() => parseDeckJson('not json')).toThrow();
  });
});

describe('slideToSvg', () => {
  it('renders a text object into svg text', () => {
    const deck = deckWithSlide();
    const slide = deck.slides[0];
    slide.objects = [newTextObject({ text: 'Hello', x: 100, y: 100 })];
    const svg = slideToSvg(slide, deck);
    expect(svg).toContain('<svg');
    expect(svg).toContain('Hello');
    expect(svg).toContain(`viewBox="0 0 ${deck.width} ${deck.height}"`);
  });

  it('renders every supported object kind', () => {
    const deck = deckWithSlide();
    const slide = deck.slides[0];
    slide.objects = [
      newShapeObject({ shapeType: 'ellipse' }),
      newChartObject(),
      newTableObject(),
      newDiagramObject(),
      newIconObject(),
      newEquationObject(),
      newTextObject(),
    ];
    const svg = slideToSvg(slide, deck);
    expect(svg).toContain('<svg');
    expect(svg).toContain('<path');
    expect(svg).toContain('<rect');
  });

  it('bakes the slide background', () => {
    const deck = deckWithSlide();
    const slide = deck.slides[0];
    slide.background = { type: 'solid', color: '#123456', opacity: 1 };
    expect(slideToSvg(slide, deck)).toContain('#123456');
  });
});

describe('export helpers', () => {
  let createUrl: jest.Mock;
  let click: jest.Mock;

  beforeEach(() => {
    createUrl = jest.fn().mockReturnValue('blob:test');
    URL.createObjectURL = createUrl as unknown as typeof URL.createObjectURL;
    URL.revokeObjectURL = jest.fn();
    click = jest.fn();
    HTMLAnchorElement.prototype.click = click;
  });

  it('exportSlideSvg downloads a single slide', () => {
    const deck = deckWithSlide();
    exportSlideSvg(deck.slides[0], deck, 0);
    expect(click).toHaveBeenCalled();
  });

  it('exportDeckJson downloads the deck file', () => {
    const deck = newDeck({ title: 'Export Me' });
    exportDeckJson(deck);
    expect(click).toHaveBeenCalled();
  });

  it('exportSlidePng draws the slide to a canvas', async () => {
    HTMLCanvasElement.prototype.getContext = (() =>
      ({
        drawImage: jest.fn(),
        fillRect: jest.fn(),
      }) as unknown as CanvasRenderingContext2D) as unknown as typeof HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.toBlob = jest.fn((cb: BlobCallback) =>
      cb(new Blob(['png']))
    );
    global.Image = class {
      set src(_v: string) {
        setTimeout(() => this.onload?.(), 0);
      }
      onload?: () => void;
    } as unknown as typeof Image;

    const deck = deckWithSlide();
    await exportSlidePng(deck.slides[0], deck, 0);
    expect(click).toHaveBeenCalled();
  });

  it('exportHtml produces a navigable document', () => {
    const deck = newDeck({ title: 'My Deck' });
    const html = exportHtml(deck);
    expect(html).toContain('My Deck');
    expect(html).toContain('.slide');
    expect(html).toContain('ArrowRight');
  });

  it('slideStorySvg stacks visible slides into one tall svg', () => {
    const deck = newDeck({
      title: 'Story',
      slides: [
        newSlide('cover', themeById('midnight'), 1),
        newSlide('title', themeById('midnight'), 2),
      ],
    });
    deck.slides[1].hidden = true;
    const svg = slideStorySvg(deck);
    expect(svg).toContain(`height="${deck.height * 1}"`);
    expect(svg.match(/<svg x="0" y=/g)).toHaveLength(1);
  });

  it('serializeThemeFile emits a shareable theme payload', () => {
    const deck = newDeck({ title: 'Theme deck' });
    const theme = JSON.parse(serializeThemeFile(deck)) as {
      format: string;
      name: string;
      colors: Record<string, string>;
    };
    expect(theme.format).toBe('keynotes-theme');
    expect(theme.name).toBe(deck.theme.name);
    expect(theme.colors.primary).toBe(deck.theme.colors.primary);
  });
});

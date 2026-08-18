import {
  LOGO_SHAPES,
  ICON_SET_SHAPES,
  ILLUSTRATION_SHAPES,
  LOGO_LAYERS,
  ICON_LAYERS,
  ILLUSTRATION_LAYERS,
  DEMO_GRADIENTS,
  DEMO_SYMBOLS,
  LOGO_DOCUMENT,
  ICON_DOCUMENT,
  ILLUSTRATION_DOCUMENT,
  SVG_TEMPLATES,
} from '@/data/models';

describe('models', () => {
  it('exposes demo shape collections', () => {
    expect(LOGO_SHAPES.map((s) => s.type)).toEqual([
      'rect',
      'ellipse',
      'polygon',
    ]);
    expect(ICON_SET_SHAPES.map((s) => s.type)).toEqual([
      'path',
      'star',
      'path',
      'path',
      'path',
      'path',
    ]);
    expect(ILLUSTRATION_SHAPES.length).toBe(8);
  });

  it('exposes demo layers keyed by document', () => {
    expect(LOGO_LAYERS).toHaveLength(2);
    expect(ICON_LAYERS).toHaveLength(1);
    expect(ILLUSTRATION_LAYERS).toHaveLength(2);
  });

  it('exposes demo gradients and symbols', () => {
    expect(DEMO_GRADIENTS[0].type).toBe('linear');
    expect(DEMO_SYMBOLS[0].id).toBe('sym-star');
  });

  it('exposes the three demo documents', () => {
    expect(LOGO_DOCUMENT.id).toBe('doc-logo');
    expect(ICON_DOCUMENT.id).toBe('doc-icons');
    expect(ILLUSTRATION_DOCUMENT.gradients).toHaveLength(1);
  });

  it('exposes the four templates', () => {
    expect(SVG_TEMPLATES.map((t) => t.id)).toEqual([
      'tpl-blank',
      'tpl-icon-set',
      'tpl-illustration',
      'tpl-logo',
    ]);
  });
});

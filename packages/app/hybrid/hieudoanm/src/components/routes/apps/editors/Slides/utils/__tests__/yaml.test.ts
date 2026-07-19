import { validate, mapYamlToSlides } from '../yaml';
import { PitchDeck } from '../../types';

describe('validate', () => {
  it('returns error for non-object', () => {
    const errors = validate(null as unknown as PitchDeck);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].path).toBe('');
  });

  it('returns errors for missing title', () => {
    const errors = validate({} as PitchDeck);
    expect(errors.some((e) => e.path === 'title')).toBe(true);
  });

  it('returns errors for missing product name', () => {
    const errors = validate({ title: {} } as PitchDeck);
    expect(errors.some((e) => e.path === 'title.product')).toBe(true);
  });

  it('returns error for missing tagline', () => {
    const errors = validate({ title: { product: 'App' } } as PitchDeck);
    expect(errors.some((e) => e.path === 'title.tagline')).toBe(true);
  });

  it('returns error for missing audience', () => {
    const errors = validate({
      title: { product: 'App', tagline: 'Tag' },
    } as PitchDeck);
    expect(errors.some((e) => e.path === 'title.audience')).toBe(true);
  });

  it('returns no errors for valid data', () => {
    const errors = validate({
      title: { product: 'App', tagline: 'Tag', audience: 'Devs' },
    });
    expect(errors).toHaveLength(0);
  });

  it('returns hint for non-object input', () => {
    const errors = validate(null as unknown as PitchDeck);
    expect(errors[0].hint).toBeTruthy();
  });
});

describe('mapYamlToSlides', () => {
  it('returns slides for valid data', () => {
    const data: PitchDeck = {
      title: {
        product: 'TestApp',
        tagline: 'Best App',
        audience: 'Developers',
      },
    };
    const slides = mapYamlToSlides(data);
    expect(slides.length).toBeGreaterThan(0);
    expect(slides[0].kicker).toBe('Introduction');
  });

  it('handles empty data without crashing', () => {
    const slides = mapYamlToSlides({});
    slides.forEach((slide) => expect(slide.blocks).toBeDefined());
  });

  it('includes pricing slides when data provided', () => {
    const data: PitchDeck = {
      title: { product: 'App', tagline: 'Tag', audience: 'All' },
      pricing: {
        title: 'Pricing',
        subtitle: 'Plans',
        currency: 'USD',
        plans: [{ name: 'Pro', amount: 99, frequency: 'monthly' }],
      },
    };
    const slides = mapYamlToSlides(data);
    expect(slides.length).toBe(5);
    expect(slides[4].kicker).toBe('Pricing Model');
  });

  it('maps problems section', () => {
    const data: PitchDeck = {
      title: { product: 'App', tagline: 'Tag', audience: 'All' },
      problems: {
        title: 'Problems',
        subtitle: 'Key issues',
        items: [{ emoji: '⚠️', title: 'Problem 1', description: 'Desc' }],
      },
    };
    const slides = mapYamlToSlides(data);
    expect(slides[0].kicker).toBe('Introduction');
    expect(slides[1].kicker).toBe('Problems');
  });

  it('maps solutions section', () => {
    const data: PitchDeck = {
      title: { product: 'App', tagline: 'Tag', audience: 'All' },
      solutions: {
        title: 'Solutions',
        subtitle: 'How we solve',
        items: [{ emoji: '💡', title: 'Solution 1', description: 'Desc' }],
      },
    };
    const slides = mapYamlToSlides(data);
    expect(slides[2].kicker).toBe('Solution');
  });

  it('maps product section with features', () => {
    const data: PitchDeck = {
      title: { product: 'App', tagline: 'Tag', audience: 'All' },
      product: {
        title: 'Product',
        subtitle: 'Features',
        features: [{ emoji: '🚀', title: 'Feature 1', description: 'Desc' }],
      },
    };
    const slides = mapYamlToSlides(data);
    expect(slides[3].kicker).toBe('Product');
  });
});

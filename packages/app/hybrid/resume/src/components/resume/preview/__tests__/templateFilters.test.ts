import type { ResumeTemplate } from '../../templates';
import { RESUME_TEMPLATES } from '../../templates';
import {
  filterTemplates,
  matchesTemplateQuery,
  templateCategories,
  TEMPLATE_CATEGORIES,
} from '../templateFilters';
import type { TemplateCategory } from '../templateFilters';

const template = (
  id: string,
  name: string,
  description: string
): ResumeTemplate =>
  ({ id, name, description, component: () => null }) as ResumeTemplate;

describe('templateCategories', () => {
  it('maps description keywords to categories', () => {
    expect(
      templateCategories(template('a', 'A', 'Timeless serif layout'))
    ).toEqual(['Serif']);
    expect(
      templateCategories(
        template('b', 'B', 'Monospace styling and cyan accents')
      )
    ).toEqual(['Monospace', 'Colorful']);
    expect(
      templateCategories(
        template('c', 'C', 'Dark futuristic layout with neon accents')
      )
    ).toEqual(['Dark', 'Colorful']);
    expect(
      templateCategories(template('d', 'D', 'Plain, direct, and easy to scan'))
    ).toEqual(['Minimal']);
    expect(
      templateCategories(template('e', 'E', 'Finance-focused navy header'))
    ).toEqual(['Dark', 'Professional']);
  });

  it('returns an empty list when nothing matches', () => {
    expect(
      templateCategories(template('f', 'F', 'Geometric dotted grid'))
    ).toEqual([]);
  });
});

describe('matchesTemplateQuery', () => {
  it('matches against name and description, case-insensitively', () => {
    const t = template('classic', 'Classic', 'Timeless serif layout.');
    expect(matchesTemplateQuery(t, 'CLASSIC')).toBe(true);
    expect(matchesTemplateQuery(t, 'serif')).toBe(true);
    expect(matchesTemplateQuery(t, 'layout')).toBe(true);
    expect(matchesTemplateQuery(t, 'nope')).toBe(false);
  });

  it('matches a blank or whitespace-only query', () => {
    const t = template('classic', 'Classic', 'Timeless serif layout.');
    expect(matchesTemplateQuery(t, '')).toBe(true);
    expect(matchesTemplateQuery(t, '   ')).toBe(true);
  });
});

describe('filterTemplates', () => {
  const fixture = RESUME_TEMPLATES;

  it('returns everything with no query and no category', () => {
    expect(filterTemplates(fixture, '', null)).toHaveLength(fixture.length);
  });

  it('filters by query', () => {
    const result = filterTemplates(fixture, 'serif', null);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((t) => /serif/i.test(t.description))).toBe(true);
  });

  it('filters by category', () => {
    const result = filterTemplates(fixture, '', 'Dark');
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((t) => templateCategories(t).includes('Dark'))).toBe(
      true
    );
  });

  it('combines query and category', () => {
    const result = filterTemplates(fixture, 'navy', 'Dark');
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((t) => templateCategories(t).includes('Dark'))).toBe(
      true
    );
  });

  it('returns an empty list when nothing matches', () => {
    expect(
      filterTemplates(fixture, 'zzz-no-such-template', 'Dark')
    ).toHaveLength(0);
  });
});

describe('TEMPLATE_CATEGORIES', () => {
  it('is a stable set of categories used by the picker', () => {
    expect(TEMPLATE_CATEGORIES).toEqual([
      'Serif',
      'Monospace',
      'Dark',
      'Colorful',
      'Minimal',
      'Professional',
    ]);
    const all: TemplateCategory[] = [...TEMPLATE_CATEGORIES];
    expect(all.length).toBeGreaterThan(0);
  });
});

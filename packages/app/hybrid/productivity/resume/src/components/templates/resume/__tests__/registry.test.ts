import { RESUME_TEMPLATES, TEMPLATE_GROUPS, getTemplate } from '../index';

describe('resume template registry', () => {
  it('registers exactly 64 free templates', () => {
    expect(RESUME_TEMPLATES).toHaveLength(64);
  });

  it('splits the templates into 8 groups of 8', () => {
    expect(TEMPLATE_GROUPS).toHaveLength(8);
    for (const group of TEMPLATE_GROUPS) {
      expect(
        RESUME_TEMPLATES.filter((template) => template.group === group.id)
      ).toHaveLength(8);
    }
  });

  it('assigns every template to a known group', () => {
    const groupIds = new Set(TEMPLATE_GROUPS.map((group) => group.id));
    for (const template of RESUME_TEMPLATES) {
      expect(groupIds.has(template.group)).toBe(true);
    }
  });

  it('exposes unique ids and non-empty names', () => {
    const ids = new Set(RESUME_TEMPLATES.map((template) => template.id));
    expect(ids.size).toBe(RESUME_TEMPLATES.length);
    for (const template of RESUME_TEMPLATES) {
      expect(template.name).toBeTruthy();
      expect(template.description).toBeTruthy();
    }
  });

  it('falls back to the first template for unknown ids', () => {
    expect(getTemplate('unknown').id).toBe(RESUME_TEMPLATES[0].id);
  });
});

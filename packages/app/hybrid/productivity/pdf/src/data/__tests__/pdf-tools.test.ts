import { CATEGORIES, TOOLS, CATEGORY_TOOLS } from '@/data/pdf-tools';

describe('CATEGORIES', () => {
  it('provides six categories', () => {
    expect(CATEGORIES).toHaveLength(6);
    expect(CATEGORIES.map((c) => c.key)).toEqual([
      'convert',
      'create',
      'ebook',
      'edit',
      'extract',
      'misc',
    ]);
  });
});

describe('TOOLS', () => {
  it('provides tools with ids, titles, and categories', () => {
    expect(TOOLS.length).toBeGreaterThan(0);
    const ids = TOOLS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const tool of TOOLS) {
      expect(tool.title).toBeTruthy();
      expect(tool.description).toBeTruthy();
      expect([
        'convert',
        'create',
        'ebook',
        'edit',
        'extract',
        'misc',
      ]).toContain(tool.category);
    }
  });

  it('includes the redaction tool config', () => {
    const redact = TOOLS.find((t) => t.id === 'pdf-redact');
    expect(redact).toMatchObject({
      title: 'Redact',
      category: 'edit',
      accept: '.pdf',
    });
  });

  it('groups tools by category in CATEGORY_TOOLS', () => {
    for (const category of CATEGORIES) {
      expect(CATEGORY_TOOLS[category.key].length).toBeGreaterThan(0);
    }
    for (const tool of TOOLS) {
      expect(CATEGORY_TOOLS[tool.category]).toContain(tool.id);
    }
  });
});

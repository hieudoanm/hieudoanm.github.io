import type { ResumeTemplate } from '../templates';

export const TEMPLATE_CATEGORIES = [
  'Serif',
  'Monospace',
  'Dark',
  'Colorful',
  'Minimal',
  'Professional',
] as const;

export type TemplateCategory = (typeof TEMPLATE_CATEGORIES)[number];

const CATEGORY_RULES: ReadonlyArray<{
  category: TemplateCategory;
  pattern: RegExp;
}> = [
  { category: 'Serif', pattern: /serif/ },
  { category: 'Monospace', pattern: /mono/ },
  { category: 'Dark', pattern: /dark|navy|black/ },
  { category: 'Colorful', pattern: /color|gradient|palette|accent/ },
  { category: 'Minimal', pattern: /minimal|clean|plain|simple|airy/ },
  {
    category: 'Professional',
    pattern: /professional|leadership|finance|formal/,
  },
];

export const templateCategories = (
  template: ResumeTemplate
): TemplateCategory[] => {
  const description = template.description.toLowerCase();
  return CATEGORY_RULES.filter((rule) => rule.pattern.test(description)).map(
    (rule) => rule.category
  );
};

export const matchesTemplateQuery = (
  template: ResumeTemplate,
  query: string
): boolean => {
  const term = query.trim().toLowerCase();
  if (!term) return true;
  return `${template.name} ${template.description}`
    .toLowerCase()
    .includes(term);
};

export const filterTemplates = (
  templates: ResumeTemplate[],
  query: string,
  category: TemplateCategory | null
): ResumeTemplate[] =>
  templates.filter(
    (template) =>
      matchesTemplateQuery(template, query) &&
      (category === null || templateCategories(template).includes(category))
  );

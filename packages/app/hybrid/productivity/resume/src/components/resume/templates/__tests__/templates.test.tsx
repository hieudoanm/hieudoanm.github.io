import { render, screen } from '@testing-library/react';
import { seedResumeData } from '../../../../data/seed';
import { RESUME_TEMPLATES, getTemplate } from '../index';

describe('resume template registry', () => {
  it('registers exactly 32 free templates', () => {
    expect(RESUME_TEMPLATES).toHaveLength(32);
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

describe('template rendering', () => {
  it.each(
    RESUME_TEMPLATES.map((template) => [template.id, template.name] as const)
  )('renders the %s template with seed data', (id) => {
    const { component: Template } = getTemplate(id);
    render(<Template data={seedResumeData} />);
    expect(
      screen.getByText(seedResumeData.personal.fullName)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/experience/i).length).toBeGreaterThan(0);
  });

  it('renders empty sections gracefully', () => {
    const data = {
      ...seedResumeData,
      summary: '',
      experience: [],
      education: [],
      projects: [],
      skills: [],
      certifications: [],
      languages: [],
      interests: '',
    };
    for (const template of RESUME_TEMPLATES) {
      const { component: Template } = template;
      const { container } = render(<Template data={data} />);
      expect(container.textContent).toContain(data.personal.fullName);
    }
  });
});

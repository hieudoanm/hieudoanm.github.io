import { EXAMPLE_RESUMES, getExampleById } from '../examples';

describe('resume examples', () => {
  it('exposes examples with unique ids and labels', () => {
    const ids = EXAMPLE_RESUMES.map((example) => example.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const example of EXAMPLE_RESUMES) {
      expect(example.label).toBeTruthy();
      expect(example.data.personal.fullName).toBeTruthy();
    }
  });

  it('includes the sample, graduate, and creative resumes', () => {
    const labels = EXAMPLE_RESUMES.map((example) => example.label);
    expect(labels).toContain('John Smith — Sample');
    expect(labels).toContain('Maya Chen — Fresh Graduate');
    expect(labels).toContain('Sam Rivera — Creative');
  });

  it('returns the data for a known id', () => {
    expect(getExampleById('graduate')?.personal.fullName).toBe('Maya Chen');
    expect(getExampleById('creative')?.personal.fullName).toBe('Sam Rivera');
  });

  it('returns undefined for an unknown id', () => {
    expect(getExampleById('does-not-exist')).toBeUndefined();
  });
});

import { seedResumeData } from '../seed';

describe('seedResumeData', () => {
  it('provides sample data for every section', () => {
    expect(seedResumeData.personal.fullName).toBeTruthy();
    expect(seedResumeData.summary).toBeTruthy();
    expect(seedResumeData.experience.length).toBeGreaterThan(0);
    expect(seedResumeData.education.length).toBeGreaterThan(0);
    expect(seedResumeData.projects.length).toBeGreaterThan(0);
    expect(seedResumeData.skills.length).toBeGreaterThan(0);
    expect(seedResumeData.certifications.length).toBeGreaterThan(0);
    expect(seedResumeData.languages.length).toBeGreaterThan(0);
    expect(seedResumeData.interests).toBeTruthy();
  });

  it('gives every item a unique id', () => {
    const ids = [
      ...seedResumeData.experience.map((item) => item.id),
      ...seedResumeData.education.map((item) => item.id),
      ...seedResumeData.projects.map((item) => item.id),
      ...seedResumeData.skills.map((item) => item.id),
    ];
    expect(new Set(ids).size).toBe(ids.length);
  });
});

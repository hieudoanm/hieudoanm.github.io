import type { ResumeData } from '../types/resume';

export const countWords = (value: string): number => {
  const matches = (value ?? '').trim().match(/[\p{L}\p{N}]+/gu);
  return matches ? matches.length : 0;
};

export const countResumeWords = (data: ResumeData): number => {
  const sections = [
    ...Object.values(data.personal),
    data.summary,
    ...data.experience.flatMap((item) => [
      item.company,
      item.role,
      item.location,
      item.description,
    ]),
    ...data.education.flatMap((item) => [
      item.school,
      item.degree,
      item.field,
      item.description,
    ]),
    ...data.projects.flatMap((item) => [
      item.name,
      item.link,
      item.description,
      item.technologies,
    ]),
    ...data.skills.flatMap((item) => [item.category, item.items]),
    ...data.certifications.flatMap((item) => [
      item.name,
      item.issuer,
      item.date,
    ]),
    ...data.languages.flatMap((item) => [item.name, item.proficiency]),
    data.interests,
  ];
  return sections.reduce((total, text) => total + countWords(text), 0);
};

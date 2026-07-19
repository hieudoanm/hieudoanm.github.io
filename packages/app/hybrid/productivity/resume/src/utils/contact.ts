import type { ResumeData } from '../types/resume';

export const collectContact = (data: ResumeData): string[] => {
  const { personal } = data;
  const items = [
    personal.email,
    personal.phone,
    personal.address,
    personal.website,
    personal.linkedin,
    personal.github,
  ];
  return items.filter((item) => item.trim().length > 0);
};

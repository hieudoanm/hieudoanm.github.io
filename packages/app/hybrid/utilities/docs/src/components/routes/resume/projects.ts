import { DOWNLOAD_SECTIONS } from '../downloads/data/downloads';
import type { ResumeProject } from './data';

const SECTION_TECH: Record<string, string[]> = {
  'Apps (Desktop)': ['Tauri', 'React', 'TypeScript'],
  'Apps (Mobile)': ['Expo', 'React Native', 'TypeScript'],
  CLIs: ['TypeScript'],
  Extensions: ['TypeScript'],
};

export const RESUME_PROJECTS: ResumeProject[] = [
  {
    name: 'hieudoanm.github.io',
    description:
      'Personal portfolio and app hub — 100+ tools built with Next.js, React, and Tauri.',
    tech: ['Next.js', 'TypeScript', 'Tauri', 'Tailwind CSS'],
    url: 'https://github.com/hieudoanm/hieudoanm.github.io',
  },
  ...DOWNLOAD_SECTIONS.flatMap((section) =>
    section.items.map((tool) => ({
      name: tool.label,
      description: tool.description,
      tech: SECTION_TECH[section.label] ?? ['TypeScript'],
      url: tool.href,
    }))
  ),
];

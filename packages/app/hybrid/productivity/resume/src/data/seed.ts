import { createId } from '../utils/id';
import type { ResumeData } from '../types/resume';

const createSeedData = (): ResumeData => ({
  personal: {
    fullName: 'John Smith',
    jobTitle: 'Senior Frontend Engineer',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
    website: 'johnsmith.dev',
    linkedin: 'linkedin.com/in/johnsmith',
    github: 'github.com/johnsmith',
  },
  summary:
    'Senior Frontend Engineer with 8+ years of experience building fast, accessible web applications. Passionate about design systems, performance optimisation, and mentoring junior engineers.',
  experience: [
    {
      id: createId(),
      company: 'TechCorp',
      role: 'Senior Frontend Engineer',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description:
        'Lead the migration of a legacy monolith to a modular React architecture.\nCut initial load time by 45% through code-splitting and caching strategies.\nMentored a team of 5 engineers and introduced a shared design system.',
    },
    {
      id: createId(),
      company: 'WebStudio',
      role: 'Frontend Engineer',
      location: 'New York, NY',
      startDate: 'Mar 2019',
      endDate: 'Dec 2021',
      description:
        'Built customer-facing dashboards used by 2M+ users.\nIntroduced unit and integration testing, raising coverage from 20% to 85%.\nCollaborated with designers to ship a consistent component library.',
    },
  ],
  education: [
    {
      id: createId(),
      school: 'State University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2013',
      endDate: '2017',
      description:
        'Graduated with honours. Focused on algorithms and software engineering.',
    },
  ],
  projects: [
    {
      id: createId(),
      name: 'OpenResume',
      link: 'github.com/johnsmith/openresume',
      description:
        'A free, open-source resume builder with live preview and PDF export.',
      technologies: 'React, Next.js, TypeScript',
    },
    {
      id: createId(),
      name: 'DevMetrics',
      link: 'github.com/johnsmith/devmetrics',
      description: 'Developer productivity analytics dashboard.',
      technologies: 'Node.js, PostgreSQL, React',
    },
  ],
  skills: [
    {
      id: createId(),
      category: 'Frontend',
      items: 'React, Next.js, TypeScript, Tailwind CSS',
    },
    {
      id: createId(),
      category: 'Backend',
      items: 'Node.js, GraphQL, PostgreSQL, Redis',
    },
    {
      id: createId(),
      category: 'Tooling',
      items: 'Webpack, Vite, Jest, Playwright, Docker',
    },
  ],
  certifications: [
    {
      id: createId(),
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
    },
    {
      id: createId(),
      name: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      date: '2021',
    },
  ],
  languages: [
    { id: createId(), name: 'English', proficiency: 'Native' },
    { id: createId(), name: 'Spanish', proficiency: 'Professional' },
  ],
  interests: 'Open source, hiking, photography, coffee brewing',
});

export const seedResumeData: ResumeData = createSeedData();

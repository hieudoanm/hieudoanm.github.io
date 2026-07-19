import { createId } from '../utils/id';
import { seedResumeData } from './seed';
import type { ResumeData } from '../types/resume';

const graduateResumeData: ResumeData = {
  personal: {
    fullName: 'Maya Chen',
    jobTitle: 'Computer Science Graduate',
    email: 'maya.chen@example.com',
    phone: '+1 (555) 987-6543',
    address: 'Seattle, WA',
    website: 'mayachen.dev',
    linkedin: 'linkedin.com/in/mayachen',
    github: 'github.com/mayachen',
  },
  summary:
    'Recent Computer Science graduate passionate about full-stack development and accessibility. Strong foundation in algorithms, modern JavaScript, and collaborative problem-solving.',
  experience: [
    {
      id: createId(),
      company: 'Campus IT Services',
      role: 'Software Engineering Intern',
      location: 'Seattle, WA',
      startDate: 'Jun 2025',
      endDate: 'Aug 2025',
      description:
        'Built an internal course-scheduling dashboard used by 3,000+ students.\nWrote unit tests and improved test coverage across two legacy services.',
    },
  ],
  education: [
    {
      id: createId(),
      school: 'Pacific University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2021',
      endDate: '2025',
      description:
        'Dean’s list. Coursework in data structures, databases, and human-computer interaction.',
    },
  ],
  projects: [
    {
      id: createId(),
      name: 'StudyBuddy',
      link: 'github.com/mayachen/studybuddy',
      description:
        'A study-group matching app with real-time chat and shared flashcards.',
      technologies: 'React, TypeScript, Firebase',
    },
    {
      id: createId(),
      name: 'MealPlanner',
      link: 'github.com/mayachen/mealplanner',
      description:
        'A weekly meal planning tool that generates shopping lists from recipes.',
      technologies: 'Next.js, PostgreSQL',
    },
  ],
  skills: [
    {
      id: createId(),
      category: 'Languages',
      items: 'TypeScript, JavaScript, Python, SQL',
    },
    {
      id: createId(),
      category: 'Tools',
      items: 'React, Next.js, Git, Figma, Jest',
    },
  ],
  certifications: [
    {
      id: createId(),
      name: 'Responsive Web Design',
      issuer: 'freeCodeCamp',
      date: '2024',
    },
  ],
  languages: [
    { id: createId(), name: 'English', proficiency: 'Native' },
    { id: createId(), name: 'Mandarin', proficiency: 'Fluent' },
  ],
  interests: 'Rock climbing, hackathons, UI design',
};

const creativeResumeData: ResumeData = {
  personal: {
    fullName: 'Sam Rivera',
    jobTitle: 'Creative Director',
    email: 'sam.rivera@example.com',
    phone: '+1 (555) 246-8101',
    address: 'Austin, TX',
    website: 'samrivera.studio',
    linkedin: 'linkedin.com/in/samrivera',
    github: 'github.com/samrivera',
  },
  summary:
    'Award-winning Creative Director with 12+ years turning bold ideas into brands people remember. Blends strategy, motion, and hands-on craft across print, web, and film.',
  experience: [
    {
      id: createId(),
      company: 'Brightline Agency',
      role: 'Creative Director',
      location: 'Austin, TX',
      startDate: 'Mar 2020',
      endDate: 'Present',
      description:
        'Leads a 9-person creative team across branding and campaign work.\nDirected the rebrand of a national coffee chain, lifting recognition by 30%.\nMentored junior designers and built the agency’s motion practice.',
    },
    {
      id: createId(),
      company: 'Studio Fen',
      role: 'Senior Art Director',
      location: 'Portland, OR',
      startDate: 'Feb 2015',
      endDate: 'Jan 2020',
      description:
        'Shipped identity systems for 40+ startup and cultural clients.\nWon two regional design awards for packaging and editorial work.',
    },
  ],
  education: [
    {
      id: createId(),
      school: 'Art Institute of the West',
      degree: 'Bachelor of Fine Arts',
      field: 'Graphic Design',
      startDate: '2009',
      endDate: '2013',
      description:
        'Graduated with distinction. Focused on typography and brand identity.',
    },
  ],
  projects: [
    {
      id: createId(),
      name: 'The Palette Archive',
      link: 'samrivera.studio/palette',
      description:
        'A curated collection of color systems and their cultural histories.',
      technologies: 'Web design, editorial',
    },
  ],
  skills: [
    {
      id: createId(),
      category: 'Design',
      items: 'Branding, Art Direction, Typography, Motion',
    },
    {
      id: createId(),
      category: 'Tools',
      items: 'Figma, After Effects, Photoshop, Illustrator',
    },
  ],
  certifications: [
    {
      id: createId(),
      name: 'Certified Brand Strategist',
      issuer: 'Brand Management Institute',
      date: '2021',
    },
  ],
  languages: [
    { id: createId(), name: 'English', proficiency: 'Native' },
    { id: createId(), name: 'Spanish', proficiency: 'Professional' },
  ],
  interests: 'Street photography, vintage print, live music',
};

export interface ResumeExample {
  id: string;
  label: string;
  data: ResumeData;
}

export const EXAMPLE_RESUMES: ResumeExample[] = [
  { id: 'sample', label: 'John Smith — Sample', data: seedResumeData },
  {
    id: 'graduate',
    label: 'Maya Chen — Fresh Graduate',
    data: graduateResumeData,
  },
  { id: 'creative', label: 'Sam Rivera — Creative', data: creativeResumeData },
];

export const getExampleById = (id: string): ResumeData | undefined =>
  EXAMPLE_RESUMES.find((example) => example.id === id)?.data;

import { ResumeTemplate } from '@/components/templates/landing';

const profile = {
  name: 'Jane Doe',
  title: 'Software Engineer',
  tagline:
    'Full-stack engineer with 6+ years of experience building fast, accessible, and scalable web applications.',
  email: 'jane.doe@example.com',
  location: 'San Francisco, CA',
  website: 'https://janedoe.dev',
  summary:
    'I help startups and product teams ship reliable software. I specialise in TypeScript, React, and cloud infrastructure, and I care deeply about developer experience, clean architecture, and measurable outcomes.',
};

const experiences = [
  {
    role: 'Senior Frontend Engineer',
    company: 'Acme Corp',
    period: '2023 - Present',
    description:
      'Leading the design system and platform team for a B2B analytics product used by 40k+ companies.',
    highlights: [
      'Cut page load time by 58% through code splitting and edge rendering',
      'Built a component library adopted by 12 product teams',
      'Mentored 5 engineers through the senior track',
    ],
  },
  {
    role: 'Full-stack Engineer',
    company: 'Globex',
    period: '2020 - 2023',
    description:
      'Shipped customer-facing features across the checkout and payments stack.',
    highlights: [
      'Reduced checkout abandonment by 21% with a redesigned flow',
      'Scaled the payments API to handle 2M+ requests per day',
      'Drove the migration from a monolith to microservices',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Initech',
    period: '2018 - 2020',
    description:
      'Built internal tools and dashboards that automated reporting for 200+ users.',
    highlights: [
      'Automated quarterly reporting, saving 300+ hours a year',
      'Introduced automated testing to a legacy codebase',
    ],
  },
];

const projects = [
  {
    name: 'Openmetrics',
    description:
      'Open-source dashboard for visualising web performance budgets in CI.',
    tech: ['TypeScript', 'Next.js', 'Turbopack'],
    url: 'https://github.com/janedoe/openmetrics',
  },
  {
    name: 'Promptkit',
    description:
      'A library of reusable, typed React components for building chat UIs.',
    tech: ['React', 'Tailwind CSS', 'Vite'],
    url: 'https://github.com/janedoe/promptkit',
  },
  {
    name: 'Deployd',
    description:
      'GitHub Action that previews pull requests on ephemeral edge environments.',
    tech: ['TypeScript', 'Cloudflare Workers'],
  },
  {
    name: 'Tauri Notes',
    description:
      'A privacy-first notes app that runs offline on macOS, Linux, and Windows.',
    tech: ['Tauri', 'React', 'Rust'],
    url: 'https://github.com/janedoe/tauri-notes',
  },
];

const education = [
  {
    degree: 'B.Sc. in Computer Science',
    school: 'University of California, Berkeley',
    period: '2014 - 2018',
    details:
      'Graduated with honours. Focus on distributed systems and human-computer interaction.',
  },
];

const skills = [
  {
    label: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Rust', 'SQL'],
  },
  {
    label: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'React Native'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'PostgreSQL', 'Redis', 'GraphQL'],
  },
  {
    label: 'Tooling',
    skills: ['Docker', 'Turbopack', 'Playwright', 'GitHub Actions'],
  },
];

const ResumePage = () => (
  <ResumeTemplate
    profile={profile}
    experiences={experiences}
    projects={projects}
    education={education}
    skills={skills}
  />
);

export default ResumePage;

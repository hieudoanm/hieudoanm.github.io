import { render, screen } from '@testing-library/react';
import { ResumeTemplate } from '../ResumeTemplate';

const profile = {
  name: 'Jane Doe',
  title: 'Senior Software Engineer',
  tagline: 'Building reliable systems',
  email: 'jane@test.com',
  location: 'San Francisco, CA',
  website: 'https://jane.dev',
  summary: 'Experienced engineer focused on web platforms.',
};

const experiences = [
  {
    role: 'Staff Engineer',
    company: 'Acme Corp',
    period: '2022 - Present',
    description: 'Lead platform work.',
    highlights: ['Shipped new architecture', 'Mentored team'],
  },
];

const projects = [
  {
    name: 'Project Alpha',
    description: 'A demo project',
    tech: ['Rust', 'Next.js'],
    url: 'https://github.com/alpha',
  },
  {
    name: 'Project Beta',
    description: 'A closed project',
    tech: ['Go'],
  },
];

const education = [
  {
    degree: 'BS Computer Science',
    school: 'State University',
    period: '2015 - 2019',
    details: 'Graduated with honors.',
  },
];

const skills = [
  { label: 'Languages', skills: ['TypeScript', 'Rust'] },
  { label: 'Tools', skills: ['Git', 'Docker'] },
];

describe('ResumeTemplate', () => {
  it('renders profile header', () => {
    render(
      <ResumeTemplate
        profile={profile}
        experiences={experiences}
        projects={projects}
        education={education}
        skills={skills}
      />
    );
    expect(
      screen.getByRole('heading', { name: 'Jane Doe' })
    ).toBeInTheDocument();
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    expect(screen.getByText('jane@test.com')).toBeInTheDocument();
    expect(screen.getByText('https://jane.dev')).toBeInTheDocument();
    expect(
      screen.getByText('Experienced engineer focused on web platforms.')
    ).toBeInTheDocument();
  });

  it('renders experience section', () => {
    render(
      <ResumeTemplate
        profile={profile}
        experiences={experiences}
        projects={projects}
        education={education}
        skills={skills}
      />
    );
    expect(screen.getByText('Work experience')).toBeInTheDocument();
    expect(screen.getByText('Staff Engineer')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Shipped new architecture')).toBeInTheDocument();
  });

  it('renders projects with and without external links', () => {
    render(
      <ResumeTemplate
        profile={profile}
        experiences={experiences}
        projects={projects}
        education={education}
        skills={skills}
      />
    );
    expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Open Project Alpha' })
    ).toHaveAttribute('href', 'https://github.com/alpha');
    expect(screen.getByText('Project Beta')).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Open Project Beta' })
    ).not.toBeInTheDocument();
  });

  it('renders skills and education sections', () => {
    render(
      <ResumeTemplate
        profile={profile}
        experiences={experiences}
        projects={projects}
        education={education}
        skills={skills}
      />
    );
    expect(screen.getByText('Skills & tools')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getAllByText('Education').length).toBeGreaterThan(0);
    expect(screen.getByText('BS Computer Science')).toBeInTheDocument();
    expect(screen.getByText('Graduated with honors.')).toBeInTheDocument();
  });

  it('renders footer links and actions', () => {
    render(
      <ResumeTemplate
        profile={profile}
        experiences={experiences}
        projects={projects}
        education={education}
        skills={skills}
      />
    );
    expect(
      screen.getByRole('button', { name: /Download resume/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /View experience/ })
    ).toHaveAttribute('href', '#experience');
    expect(screen.getByRole('link', { name: 'Website' })).toHaveAttribute(
      'href',
      'https://jane.dev'
    );
  });
});

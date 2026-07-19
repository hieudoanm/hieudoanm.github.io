import type { ResumeData } from '../../types/resume';
import { countResumeWords, countWords } from '../count';

const emptyResume = (): ResumeData => ({
  personal: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    linkedin: '',
    github: '',
  },
  summary: '',
  experience: [],
  education: [],
  projects: [],
  skills: [],
  certifications: [],
  languages: [],
  interests: '',
});

describe('countWords', () => {
  it('counts plain words', () => {
    expect(countWords('the quick brown fox')).toBe(4);
  });

  it('ignores punctuation and collapses whitespace', () => {
    expect(countWords('  Hello,   world!\nHow are you? ')).toBe(5);
  });

  it('counts unicode letters and digits', () => {
    expect(countWords('café 中文 übung 123')).toBe(4);
  });

  it('returns zero for blank input', () => {
    expect(countWords('')).toBe(0);
    expect(countWords('   ')).toBe(0);
    expect(countWords('.,;:-')).toBe(0);
  });
});

describe('countResumeWords', () => {
  it('returns zero for an empty resume', () => {
    expect(countResumeWords(emptyResume())).toBe(0);
  });

  it('counts words across personal details and summary', () => {
    const data = emptyResume();
    data.personal.fullName = 'Ada Lovelace';
    data.personal.jobTitle = 'Software Engineer';
    data.summary = 'Builder of systems and machines.';
    expect(countResumeWords(data)).toBe(9);
  });

  it('counts words across every list section', () => {
    const data = emptyResume();
    data.experience = [
      {
        id: '1',
        company: 'Acme',
        role: 'Lead Engineer',
        location: 'Remote',
        startDate: '',
        endDate: '',
        description: 'Shipped the flagship platform.',
      },
    ];
    data.education = [
      {
        id: '1',
        school: 'MIT',
        degree: 'BS',
        field: 'CS',
        startDate: '',
        endDate: '',
        description: 'Thesis on compilers.',
      },
    ];
    data.projects = [
      {
        id: '1',
        name: 'Compiler',
        link: 'github.com/acme/compiler',
        description: 'A tiny compiler.',
        technologies: 'TypeScript, Rust',
      },
    ];
    data.skills = [{ id: '1', category: 'Languages', items: 'TS, Rust' }];
    data.certifications = [
      { id: '1', name: 'AWS', issuer: 'Amazon', date: '2024' },
    ];
    data.languages = [{ id: '1', name: 'English', proficiency: 'Native' }];
    data.interests = 'Sailing and reading.';

    expect(countResumeWords(data)).toBe(35);
  });
});

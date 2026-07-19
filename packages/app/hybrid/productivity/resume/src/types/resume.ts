export interface PersonalDetails {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  linkedin: string;
  github: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  link: string;
  description: string;
  technologies: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  items: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: string;
}

export type ResumeDensity = 'compact' | 'normal' | 'spacious';

export interface ResumeOptions {
  accentColor: string;
  density: ResumeDensity;
}

export const DEFAULT_RESUME_OPTIONS: ResumeOptions = {
  accentColor: '',
  density: 'normal',
};

export const RESUME_DENSITIES: ResumeDensity[] = [
  'compact',
  'normal',
  'spacious',
];

export const DENSITY_ZOOM: Record<ResumeDensity, number> = {
  compact: 0.92,
  normal: 1,
  spacious: 1.08,
};

export interface ResumeData {
  personal: PersonalDetails;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: SkillGroup[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  interests: string;
}

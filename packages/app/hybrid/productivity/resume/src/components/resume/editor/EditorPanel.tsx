'use client';

import type { FC, ReactNode } from 'react';
import type { ResumeData } from '../../../types/resume';
import { TextAreaField } from './Field';
import { PersonalForm } from './PersonalForm';
import { SummaryForm } from './SummaryForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { ProjectForm } from './ProjectForm';
import { SkillsForm } from './SkillsForm';
import { CertificationsForm } from './CertificationsForm';
import { LanguagesForm } from './LanguagesForm';
import { InterestsForm } from './InterestsForm';

interface FormAccordionProps {
  title: string;
  children: ReactNode;
}

const FormAccordion: FC<FormAccordionProps> = ({ title, children }) => (
  <div className="collapse-arrow border-base-300 collapse rounded-none border-b">
    <input type="checkbox" defaultChecked />
    <div className="collapse-title text-sm font-bold">{title}</div>
    <div className="collapse-content">{children}</div>
  </div>
);

FormAccordion.displayName = 'FormAccordion';

interface EditorPanelProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const EditorPanel: FC<EditorPanelProps> = ({ data, onChange }) => {
  const set = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="flex flex-col">
      <FormAccordion title="Personal Details">
        <PersonalForm
          value={data.personal}
          onChange={(personal) => set('personal', personal)}
        />
      </FormAccordion>

      <FormAccordion title="Summary">
        <SummaryForm
          value={data.summary}
          onChange={(summary) => set('summary', summary)}
        />
      </FormAccordion>

      <FormAccordion title="Experience">
        <ExperienceForm
          value={data.experience}
          onChange={(experience) => set('experience', experience)}
        />
      </FormAccordion>

      <FormAccordion title="Education">
        <EducationForm
          value={data.education}
          onChange={(education) => set('education', education)}
        />
      </FormAccordion>

      <FormAccordion title="Projects">
        <ProjectForm
          value={data.projects}
          onChange={(projects) => set('projects', projects)}
        />
      </FormAccordion>

      <FormAccordion title="Skills">
        <SkillsForm
          value={data.skills}
          onChange={(skills) => set('skills', skills)}
        />
      </FormAccordion>

      <FormAccordion title="Certifications">
        <CertificationsForm
          value={data.certifications}
          onChange={(certifications) => set('certifications', certifications)}
        />
      </FormAccordion>

      <FormAccordion title="Languages">
        <LanguagesForm
          value={data.languages}
          onChange={(languages) => set('languages', languages)}
        />
      </FormAccordion>

      <FormAccordion title="Interests">
        <InterestsForm
          value={data.interests}
          onChange={(interests) => set('interests', interests)}
        />
      </FormAccordion>
    </div>
  );
};

EditorPanel.displayName = 'EditorPanel';

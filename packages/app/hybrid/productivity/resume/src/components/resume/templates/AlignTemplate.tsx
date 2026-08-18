import type { CSSProperties, FC, ReactNode } from 'react';
import { collectContact } from '../../../utils/contact';
import { splitComma } from '../../../utils/text';
import type { ResumeData } from '../../../types/resume';
import {
  TextBlock,
  BulletList,
  HeaderRow,
  ContactList,
} from '../template/primitives';
import type { TemplateProps } from './types';

const ink = '#111827';
const DEFAULT_ACCENT = '#4b5563';
const muted = '#6b7280';
const rule = '#e5e7eb';

const SectionRow = ({
  label,
  labelStyle,
  children,
}: {
  label: string;
  labelStyle: CSSProperties;
  children: ReactNode;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '150px 1fr',
      gap: 20,
      borderTop: `1px solid ${rule}`,
      padding: '12px 0',
    }}>
    <div style={labelStyle}>{label}</div>
    <div>{children}</div>
  </div>
);

export const AlignTemplate: FC<TemplateProps> = ({ data, options }) => {
  const accent = options?.accentColor || DEFAULT_ACCENT;
  const labelStyle: CSSProperties = {
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    color: accent,
  };
  const {
    personal,
    summary,
    experience,
    education,
    projects,
    skills,
    certifications,
    languages,
    interests,
  } = data;

  return (
    <div
      style={{
        height: '100%',
        color: ink,
        padding: '34px 40px',
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}>
      <header style={{ marginBottom: 18 }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 800,
            margin: '0 0 2px',
            color: ink,
            letterSpacing: -0.5,
          }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 12, color: accent, marginBottom: 8 }}>
          {personal.jobTitle}
        </div>
        <ContactList
          items={collectContact(data)}
          style={{ fontSize: 9.5, color: muted }}
        />
      </header>

      {summary && (
        <SectionRow labelStyle={labelStyle} label="Summary">
          <TextBlock text={summary} />
        </SectionRow>
      )}

      {experience.length > 0 && (
        <SectionRow labelStyle={labelStyle} label="Experience">
          {experience.map((item) => (
            <div key={item.id} style={{ marginBottom: 10 }}>
              <HeaderRow
                primary={item.company}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' – ')}
                primaryStyle={{ fontSize: 12, color: ink }}
                rightStyle={{ color: muted }}
              />
              <div style={{ fontSize: 11, color: accent, marginBottom: 4 }}>
                {item.role}
                {item.location && ` · ${item.location}`}
              </div>
              <BulletList text={item.description} />
            </div>
          ))}
        </SectionRow>
      )}

      {education.length > 0 && (
        <SectionRow labelStyle={labelStyle} label="Education">
          {education.map((item) => (
            <div key={item.id} style={{ marginBottom: 8 }}>
              <HeaderRow
                primary={item.school}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' – ')}
                primaryStyle={{ fontSize: 12, color: ink }}
                rightStyle={{ color: muted }}
              />
              <div style={{ fontSize: 11, color: accent }}>
                {item.degree}
                {item.field && ` in ${item.field}`}
              </div>
            </div>
          ))}
        </SectionRow>
      )}

      {projects.length > 0 && (
        <SectionRow labelStyle={labelStyle} label="Projects">
          {projects.map((item) => (
            <div key={item.id} style={{ marginBottom: 8 }}>
              <HeaderRow
                primary={item.name}
                right={item.link}
                primaryStyle={{ fontSize: 12, color: ink }}
                rightStyle={{ color: muted }}
              />
              {item.technologies && (
                <div style={{ fontSize: 10, color: muted, marginBottom: 2 }}>
                  {item.technologies}
                </div>
              )}
              <TextBlock text={item.description} style={{ marginTop: 2 }} />
            </div>
          ))}
        </SectionRow>
      )}

      {skills.length > 0 && (
        <SectionRow labelStyle={labelStyle} label="Skills">
          {skills.map((group) => (
            <div key={group.id} style={{ fontSize: 10.5, marginBottom: 4 }}>
              <strong>{group.category}: </strong>
              {group.items}
            </div>
          ))}
        </SectionRow>
      )}

      {(certifications.length > 0 || languages.length > 0) && (
        <SectionRow labelStyle={labelStyle} label="Credentials">
          {certifications.length > 0 && (
            <div style={{ fontSize: 10.5, marginBottom: 6 }}>
              {certifications.map((item) => item.name).join(' · ')}
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ fontSize: 10.5 }}>
              {languages
                .map((item) =>
                  item.proficiency
                    ? `${item.name} (${item.proficiency})`
                    : item.name
                )
                .join(' · ')}
            </div>
          )}
        </SectionRow>
      )}

      {interests && (
        <SectionRow labelStyle={labelStyle} label="Interests">
          <div style={{ fontSize: 10.5 }}>
            {splitComma(interests).join(' · ')}
          </div>
        </SectionRow>
      )}
    </div>
  );
};

AlignTemplate.displayName = 'AlignTemplate';

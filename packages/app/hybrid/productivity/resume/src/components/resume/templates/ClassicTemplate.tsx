import type { FC } from 'react';
import { collectContact } from '../../../utils/contact';
import { splitComma } from '../../../utils/text';
import type { ResumeData } from '../../../types/resume';
import {
  Section,
  TextBlock,
  BulletList,
  HeaderRow,
  ContactList,
} from '../template/primitives';
import type { TemplateProps } from './types';

const ink = '#1f2937';
const DEFAULT_ACCENT = '#334155';
const muted = '#6b7280';

const sectionStyle = { marginBottom: 14 } as const;

export const ClassicTemplate: FC<TemplateProps> = ({ data, options }) => {
  const accent = options?.accentColor || DEFAULT_ACCENT;
  const titleStyle = {
    color: accent,
    borderBottom: `1px solid ${accent}22`,
    paddingBottom: 3,
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
        padding: '36px 40px',
        color: ink,
        fontFamily: 'Georgia, "Times New Roman", serif',
        height: '100%',
      }}>
      <header style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            margin: '0 0 4px',
            letterSpacing: 0.5,
          }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 13, color: accent, marginBottom: 8 }}>
          {personal.jobTitle}
        </div>
        <ContactList
          items={collectContact(data)}
          style={{ justifyContent: 'center', fontSize: 10 }}
        />
      </header>

      {summary && (
        <Section
          title="Professional Summary"
          style={sectionStyle}
          titleStyle={titleStyle}>
          <TextBlock text={summary} />
        </Section>
      )}

      {experience.length > 0 && (
        <Section
          title="Experience"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {experience.map((item) => (
            <div key={item.id} style={{ marginBottom: 10 }}>
              <HeaderRow
                primary={item.company}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' – ')}
                primaryStyle={{ fontSize: 12 }}
                rightStyle={{ color: muted }}
              />
              <div style={{ fontStyle: 'italic', fontSize: 11, color: accent }}>
                {item.role}
              </div>
              {item.location && (
                <div style={{ fontSize: 10, color: muted }}>
                  {item.location}
                </div>
              )}
              <BulletList text={item.description} style={{ marginTop: 4 }} />
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education" style={sectionStyle} titleStyle={titleStyle}>
          {education.map((item) => (
            <div key={item.id} style={{ marginBottom: 8 }}>
              <HeaderRow
                primary={item.school}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' – ')}
                primaryStyle={{ fontSize: 12 }}
                rightStyle={{ color: muted }}
              />
              <div style={{ fontSize: 11, color: accent }}>
                {item.degree}
                {item.field && ` in ${item.field}`}
              </div>
              {item.description && (
                <TextBlock text={item.description} style={{ marginTop: 3 }} />
              )}
            </div>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills" style={sectionStyle} titleStyle={titleStyle}>
          {skills.map((group) => (
            <div key={group.id} style={{ fontSize: 10.5, marginBottom: 5 }}>
              <strong style={{ color: accent }}>{group.category}: </strong>
              {group.items}
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects" style={sectionStyle} titleStyle={titleStyle}>
          {projects.map((item) => (
            <div key={item.id} style={{ marginBottom: 8 }}>
              <HeaderRow
                primary={item.name}
                right={item.link}
                primaryStyle={{ fontSize: 12 }}
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
        </Section>
      )}

      {certifications.length > 0 && (
        <Section
          title="Certifications"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {certifications.map((item) => (
            <div key={item.id} style={{ fontSize: 10.5, marginBottom: 4 }}>
              <strong>{item.name}</strong>
              {item.issuer && ` — ${item.issuer}`}
              {item.date && (
                <span style={{ color: muted }}> ({item.date})</span>
              )}
            </div>
          ))}
        </Section>
      )}

      {languages.length > 0 && (
        <Section title="Languages" style={sectionStyle} titleStyle={titleStyle}>
          <div style={{ fontSize: 10.5 }}>
            {languages.map((item) => (
              <span key={item.id} style={{ marginRight: 16 }}>
                <strong>{item.name}</strong>
                {item.proficiency && (
                  <span style={{ color: muted }}> — {item.proficiency}</span>
                )}
              </span>
            ))}
          </div>
        </Section>
      )}

      {interests && (
        <Section title="Interests" style={sectionStyle} titleStyle={titleStyle}>
          <div style={{ fontSize: 10.5 }}>
            {splitComma(interests).join(' · ')}
          </div>
        </Section>
      )}
    </div>
  );
};

ClassicTemplate.displayName = 'ClassicTemplate';

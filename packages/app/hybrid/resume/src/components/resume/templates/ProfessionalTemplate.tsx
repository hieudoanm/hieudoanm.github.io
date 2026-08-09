import type { FC } from 'react';
import { collectContact } from '../../../utils/contact';
import type { ResumeData } from '../../../types/resume';
import {
  Section,
  TextBlock,
  BulletList,
  HeaderRow,
  ContactList,
} from '../template/primitives';
import type { TemplateProps } from './types';

const ink = '#2d3436';
const accent = '#0d47a1';
const muted = '#636e72';

const sectionStyle = { marginBottom: 16 } as const;
const titleStyle = {
  color: accent,
  fontSize: 11.5,
  fontVariant: 'small-caps',
  letterSpacing: 2,
  borderBottom: `1px solid ${accent}33`,
  paddingBottom: 4,
} as const;

export const ProfessionalTemplate: FC<TemplateProps> = ({ data }) => {
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
        padding: '34px 40px',
        color: ink,
        fontFamily: "Georgia, 'Times New Roman', serif",
        height: '100%',
      }}>
      <header
        style={{
          borderBottom: `3px solid ${accent}`,
          paddingBottom: 14,
          marginBottom: 18,
        }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            margin: '0 0 2px',
            color: ink,
            letterSpacing: 0.5,
          }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 13, color: accent, marginBottom: 6 }}>
          {personal.jobTitle}
        </div>
        <ContactList
          items={collectContact(data)}
          style={{ fontSize: 10, color: muted }}
        />
      </header>

      {summary && (
        <Section title="Summary" style={sectionStyle} titleStyle={titleStyle}>
          <TextBlock text={summary} />
        </Section>
      )}

      {experience.length > 0 && (
        <Section
          title="Professional Experience"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {experience.map((item) => (
            <div key={item.id} style={{ marginBottom: 12 }}>
              <HeaderRow
                primary={item.role}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' — ')}
                primaryStyle={{ fontSize: 12.5 }}
                rightStyle={{ color: muted, fontSize: 10 }}
              />
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: accent,
                  marginBottom: 4,
                }}>
                {item.company}
                {item.location && (
                  <span style={{ fontWeight: 400, color: muted }}>
                    {' '}
                    — {item.location}
                  </span>
                )}
              </div>
              <BulletList text={item.description} />
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education" style={sectionStyle} titleStyle={titleStyle}>
          {education.map((item) => (
            <div key={item.id} style={{ marginBottom: 10 }}>
              <HeaderRow
                primary={item.school}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' — ')}
                primaryStyle={{ fontSize: 12.5 }}
                rightStyle={{ color: muted, fontSize: 10 }}
              />
              <div style={{ fontSize: 11, color: accent }}>
                {item.degree}
                {item.field && ` in ${item.field}`}
              </div>
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section
          title="Selected Projects"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {projects.map((item) => (
            <div key={item.id} style={{ marginBottom: 10 }}>
              <HeaderRow
                primary={item.name}
                right={item.link}
                primaryStyle={{ fontSize: 12.5 }}
                rightStyle={{ color: muted, fontSize: 10 }}
              />
              {item.technologies && (
                <div style={{ fontSize: 10, color: muted, marginBottom: 3 }}>
                  {item.technologies}
                </div>
              )}
              <TextBlock text={item.description} />
            </div>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills" style={sectionStyle} titleStyle={titleStyle}>
          {skills.map((group) => (
            <div key={group.id} style={{ fontSize: 10.5, marginBottom: 4 }}>
              <strong style={{ color: accent }}>{group.category}: </strong>
              {group.items}
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
          <div style={{ fontSize: 10.5 }}>{interests}</div>
        </Section>
      )}
    </div>
  );
};

ProfessionalTemplate.displayName = 'ProfessionalTemplate';

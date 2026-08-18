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

const ink = '#262626';
const DEFAULT_ACCENT = '#334155';
const muted = '#78716c';

const sectionStyle = { marginBottom: 16 } as const;

export const AcademicTemplate: FC<TemplateProps> = ({ data, options }) => {
  const accent = options?.accentColor || DEFAULT_ACCENT;
  const titleStyle = {
    color: accent,
    fontSize: 11,
    letterSpacing: 1.5,
    fontVariant: 'small-caps',
  } as const;
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
        padding: '38px 46px',
        color: ink,
        fontFamily: "Garamond, 'Times New Roman', serif",
        height: '100%',
      }}>
      <header
        style={{
          textAlign: 'center',
          borderBottom: '2px solid',
          paddingBottom: 12,
          marginBottom: 18,
        }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            margin: '0 0 2px',
            letterSpacing: 1,
          }}>
          {personal.fullName}
        </h1>
        <div
          style={{
            fontSize: 12.5,
            fontStyle: 'italic',
            color: muted,
            marginBottom: 6,
          }}>
          {personal.jobTitle}
        </div>
        <ContactList
          items={collectContact(data)}
          style={{ justifyContent: 'center', fontSize: 10, color: muted }}
        />
      </header>

      {summary && (
        <Section
          title="Research Summary"
          style={sectionStyle}
          titleStyle={titleStyle}>
          <TextBlock text={summary} />
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education" style={sectionStyle} titleStyle={titleStyle}>
          {education.map((item) => (
            <div key={item.id} style={{ marginBottom: 12 }}>
              <HeaderRow
                primary={item.degree}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' – ')}
                primaryStyle={{ fontSize: 12.5, fontStyle: 'italic' }}
                rightStyle={{ color: muted, fontSize: 10 }}
              />
              <div style={{ fontSize: 11.5, fontWeight: 700 }}>
                {item.school}
              </div>
              {item.field && (
                <div style={{ fontSize: 11, color: muted }}>{item.field}</div>
              )}
              {item.description && (
                <TextBlock text={item.description} style={{ marginTop: 3 }} />
              )}
            </div>
          ))}
        </Section>
      )}

      {experience.length > 0 && (
        <Section
          title="Academic Appointments"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {experience.map((item) => (
            <div key={item.id} style={{ marginBottom: 12 }}>
              <HeaderRow
                primary={item.role}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' – ')}
                primaryStyle={{ fontSize: 12.5, fontStyle: 'italic' }}
                rightStyle={{ color: muted, fontSize: 10 }}
              />
              <div style={{ fontSize: 11.5, fontWeight: 700 }}>
                {item.company}
              </div>
              <BulletList text={item.description} style={{ marginTop: 4 }} />
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section
          title="Publications & Projects"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {projects.map((item) => (
            <div
              key={item.id}
              style={{ marginBottom: 10, paddingLeft: 18, textIndent: -18 }}>
              <span style={{ fontSize: 11 }}>{item.name}</span>
              {item.technologies && (
                <span style={{ fontSize: 10, color: muted }}>
                  {' '}
                  ({item.technologies})
                </span>
              )}
              <div
                style={{
                  fontSize: 10.5,
                  color: ink,
                  textIndent: 0,
                  marginTop: 2,
                }}>
                {item.description}
              </div>
            </div>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section
          title="Skills & Methods"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {skills.map((group) => (
            <div key={group.id} style={{ fontSize: 10.5, marginBottom: 4 }}>
              <strong>{group.category}: </strong>
              {group.items}
            </div>
          ))}
        </Section>
      )}

      {(certifications.length > 0 || languages.length > 0) && (
        <Section
          title="Credentials"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {certifications.length > 0 && (
            <div style={{ fontSize: 10.5, marginBottom: 4 }}>
              {certifications
                .map((item) => `${item.name} (${item.issuer})`)
                .join(', ')}
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
                .join(', ')}
            </div>
          )}
        </Section>
      )}

      {interests && (
        <Section
          title="Service & Interests"
          style={sectionStyle}
          titleStyle={titleStyle}>
          <div style={{ fontSize: 10.5 }}>{interests}</div>
        </Section>
      )}

      <div
        style={{
          textAlign: 'center',
          fontSize: 9.5,
          fontStyle: 'italic',
          color: muted,
          marginTop: 14,
        }}>
        References available upon request
      </div>
    </div>
  );
};

AcademicTemplate.displayName = 'AcademicTemplate';

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

const ink = '#3f3f46';
const DEFAULT_ACCENT = '#8d8d8d';
const muted = '#a1a1aa';
const nameColor = '#27272a';

const sectionStyle = { marginBottom: 22 } as const;

export const ElegantTemplate: FC<TemplateProps> = ({ data, options }) => {
  const accent = options?.accentColor || DEFAULT_ACCENT;
  const titleStyle = { color: accent, fontSize: 10, letterSpacing: 3 } as const;
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
        padding: '46px 56px',
        color: ink,
        fontFamily: "'Cormorant Garamond', Garamond, 'Times New Roman', serif",
        height: '100%',
      }}>
      <header style={{ textAlign: 'center', marginBottom: 28 }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 500,
            margin: '0 0 6px',
            color: nameColor,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}>
          {personal.fullName}
        </h1>
        <div
          style={{
            fontSize: 13,
            color: accent,
            letterSpacing: 2,
            marginBottom: 12,
          }}>
          {personal.jobTitle}
        </div>
        <div
          style={{
            width: 48,
            height: 1,
            background: accent,
            margin: '0 auto 12px',
          }}
        />
        <ContactList
          items={collectContact(data)}
          style={{
            justifyContent: 'center',
            fontSize: 10,
            color: muted,
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
          }}
        />
      </header>

      {summary && (
        <Section title="SUMMARY" style={sectionStyle} titleStyle={titleStyle}>
          <TextBlock
            text={summary}
            style={{ fontSize: 11, textAlign: 'center' }}
          />
        </Section>
      )}

      {experience.length > 0 && (
        <Section
          title="EXPERIENCE"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {experience.map((item) => (
            <div key={item.id} style={{ marginBottom: 16 }}>
              <HeaderRow
                primary={item.company}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' — ')}
                primaryStyle={{ fontSize: 14, color: nameColor }}
                rightStyle={{
                  color: muted,
                  fontSize: 10,
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                }}
              />
              <div
                style={{
                  fontSize: 12,
                  fontStyle: 'italic',
                  color: accent,
                  marginBottom: 6,
                }}>
                {item.role}
                {item.location && ` · ${item.location}`}
              </div>
              <BulletList text={item.description} />
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="EDUCATION" style={sectionStyle} titleStyle={titleStyle}>
          {education.map((item) => (
            <div key={item.id} style={{ marginBottom: 12 }}>
              <HeaderRow
                primary={item.school}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' — ')}
                primaryStyle={{ fontSize: 14, color: nameColor }}
                rightStyle={{
                  color: muted,
                  fontSize: 10,
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                }}
              />
              <div style={{ fontSize: 12, fontStyle: 'italic', color: accent }}>
                {item.degree}
                {item.field && ` in ${item.field}`}
              </div>
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section
          title="SELECTED PROJECTS"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {projects.map((item) => (
            <div key={item.id} style={{ marginBottom: 12 }}>
              <HeaderRow
                primary={item.name}
                right={item.link}
                primaryStyle={{ fontSize: 14, color: nameColor }}
                rightStyle={{
                  color: muted,
                  fontSize: 10,
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                }}
              />
              {item.technologies && (
                <div
                  style={{
                    fontSize: 10.5,
                    color: muted,
                    marginBottom: 3,
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  }}>
                  {item.technologies}
                </div>
              )}
              <TextBlock text={item.description} />
            </div>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="SKILLS" style={sectionStyle} titleStyle={titleStyle}>
          {skills.map((group) => (
            <div key={group.id} style={{ fontSize: 11, marginBottom: 5 }}>
              <strong style={{ color: nameColor }}>{group.category}:</strong>{' '}
              {group.items}
            </div>
          ))}
        </Section>
      )}

      {(certifications.length > 0 || languages.length > 0) && (
        <Section
          title="CREDENTIALS"
          style={sectionStyle}
          titleStyle={titleStyle}>
          <div style={{ fontSize: 11, lineHeight: 1.8 }}>
            {certifications
              .map((item) => `${item.name} — ${item.issuer}`)
              .join('   ·   ')}
          </div>
          <div style={{ fontSize: 11, lineHeight: 1.8 }}>
            {languages
              .map((item) =>
                item.proficiency
                  ? `${item.name} — ${item.proficiency}`
                  : item.name
              )
              .join('   ·   ')}
          </div>
          {interests && (
            <div style={{ fontSize: 11, lineHeight: 1.8 }}>{interests}</div>
          )}
        </Section>
      )}
    </div>
  );
};

ElegantTemplate.displayName = 'ElegantTemplate';

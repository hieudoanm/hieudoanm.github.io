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

const ink = '#111827';
const DEFAULT_ACCENT = '#2563eb';
const muted = '#6b7280';

const sectionStyle = { marginBottom: 20 } as const;
const titleStyle = {
  color: ink,
  fontSize: 13,
  fontWeight: 900,
  letterSpacing: 1,
  textTransform: 'uppercase',
} as const;

export const BoldTemplate: FC<TemplateProps> = ({ data, options }) => {
  const accent = options?.accentColor || DEFAULT_ACCENT;
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
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        height: '100%',
      }}>
      <header
        style={{
          marginBottom: 24,
          borderBottom: `4px solid ${ink}`,
          paddingBottom: 16,
        }}>
        <h1
          style={{
            fontSize: 40,
            fontWeight: 900,
            margin: '0 0 2px',
            letterSpacing: -1.5,
            lineHeight: 1.05,
          }}>
          {personal.fullName}
        </h1>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: accent,
            marginBottom: 10,
          }}>
          {personal.jobTitle}
        </div>
        <ContactList
          items={collectContact(data)}
          style={{ fontSize: 10, color: muted }}
        />
      </header>

      {summary && (
        <Section title="Summary" style={sectionStyle} titleStyle={titleStyle}>
          <TextBlock text={summary} style={{ fontSize: 11 }} />
        </Section>
      )}

      {experience.length > 0 && (
        <Section
          title="Experience"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {experience.map((item) => (
            <div key={item.id} style={{ marginBottom: 14 }}>
              <HeaderRow
                primary={item.role}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' – ')}
                primaryStyle={{ fontSize: 13, fontWeight: 800 }}
                rightStyle={{ color: muted, fontSize: 10, fontWeight: 700 }}
              />
              <div
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: accent,
                  marginBottom: 4,
                }}>
                {item.company}
                {item.location && (
                  <span style={{ fontWeight: 400, color: muted }}>
                    {' '}
                    · {item.location}
                  </span>
                )}
              </div>
              <BulletList text={item.description} style={{ marginTop: 2 }} />
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
                  .join(' – ')}
                primaryStyle={{ fontSize: 13, fontWeight: 800 }}
                rightStyle={{ color: muted, fontSize: 10, fontWeight: 700 }}
              />
              <div style={{ fontSize: 11.5, color: accent }}>
                {item.degree}
                {item.field && ` in ${item.field}`}
              </div>
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects" style={sectionStyle} titleStyle={titleStyle}>
          {projects.map((item) => (
            <div key={item.id} style={{ marginBottom: 12 }}>
              <HeaderRow
                primary={item.name}
                right={item.link}
                primaryStyle={{ fontSize: 13, fontWeight: 800 }}
                rightStyle={{ color: muted, fontSize: 10 }}
              />
              {item.technologies && (
                <div style={{ fontSize: 10, color: muted, marginBottom: 3 }}>
                  <strong>Tech:</strong> {item.technologies}
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
            <div key={group.id} style={{ fontSize: 11, marginBottom: 6 }}>
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
          <div style={{ fontSize: 11 }}>
            {certifications
              .map((item) => `${item.name} — ${item.issuer}`)
              .join('  |  ')}
          </div>
        </Section>
      )}

      {languages.length > 0 && (
        <Section title="Languages" style={sectionStyle} titleStyle={titleStyle}>
          <div style={{ fontSize: 11 }}>
            {languages
              .map((item) =>
                item.proficiency
                  ? `${item.name} (${item.proficiency})`
                  : item.name
              )
              .join('  |  ')}
          </div>
        </Section>
      )}

      {interests && (
        <Section title="Interests" style={sectionStyle} titleStyle={titleStyle}>
          <div style={{ fontSize: 11 }}>
            {splitComma(interests).join('  ·  ')}
          </div>
        </Section>
      )}
    </div>
  );
};

BoldTemplate.displayName = 'BoldTemplate';

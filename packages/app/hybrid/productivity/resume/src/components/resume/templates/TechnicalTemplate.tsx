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

const ink = '#0f172a';
const accent = '#dc2626';
const muted = '#64748b';

const sectionStyle = { marginBottom: 16 } as const;
const titleStyle = {
  color: ink,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1,
  borderBottom: `2px solid ${accent}`,
  paddingBottom: 3,
  display: 'inline-block',
} as const;

export const TechnicalTemplate: FC<TemplateProps> = ({ data }) => {
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
        padding: '34px 38px',
        color: ink,
        fontFamily: "'Courier New', ui-monospace, monospace",
        height: '100%',
      }}>
      <header style={{ marginBottom: 20 }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            margin: '0 0 2px',
            letterSpacing: 1,
          }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 12, color: accent, marginBottom: 10 }}>
          {personal.jobTitle}
        </div>
        <ContactList
          items={collectContact(data)}
          style={{ fontSize: 10, color: muted }}
        />
      </header>

      {skills.length > 0 && (
        <Section title="// Skills" style={sectionStyle} titleStyle={titleStyle}>
          {skills.map((group) => (
            <div key={group.id} style={{ marginBottom: 8 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: accent,
                  marginBottom: 3,
                }}>
                &gt; {group.category}
              </div>
              <div style={{ fontSize: 10, lineHeight: 1.5 }}>
                {splitComma(group.items).join('  |  ')}
              </div>
            </div>
          ))}
        </Section>
      )}

      {experience.length > 0 && (
        <Section
          title="// Experience"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {experience.map((item) => (
            <div key={item.id} style={{ marginBottom: 12 }}>
              <HeaderRow
                primary={item.role}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' – ')}
                primaryStyle={{ fontSize: 12 }}
                rightStyle={{ color: muted, fontSize: 9.5 }}
              />
              <div style={{ fontSize: 10.5, color: accent, marginBottom: 4 }}>
                {item.company}
                {item.location && ` — ${item.location}`}
              </div>
              <BulletList text={item.description} />
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section
          title="// Projects"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {projects.map((item) => (
            <div key={item.id} style={{ marginBottom: 10 }}>
              <HeaderRow
                primary={item.name}
                right={item.link}
                primaryStyle={{ fontSize: 12 }}
                rightStyle={{ color: muted, fontSize: 9.5 }}
              />
              {item.technologies && (
                <div style={{ fontSize: 10, color: accent, marginBottom: 2 }}>
                  {item.technologies}
                </div>
              )}
              <TextBlock text={item.description} />
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section
          title="// Education"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {education.map((item) => (
            <div key={item.id} style={{ marginBottom: 8 }}>
              <HeaderRow
                primary={item.school}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' – ')}
                primaryStyle={{ fontSize: 12 }}
                rightStyle={{ color: muted, fontSize: 9.5 }}
              />
              <div style={{ fontSize: 10.5 }}>
                {item.degree}
                {item.field && ` in ${item.field}`}
              </div>
            </div>
          ))}
        </Section>
      )}

      {summary && (
        <Section
          title="// Summary"
          style={sectionStyle}
          titleStyle={titleStyle}>
          <TextBlock text={summary} />
        </Section>
      )}

      {(certifications.length > 0 || languages.length > 0) && (
        <Section
          title="// Additional"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {certifications.length > 0 && (
            <div style={{ fontSize: 10, marginBottom: 4 }}>
              <strong>Certifications:</strong>{' '}
              {certifications.map((item) => item.name).join(', ')}
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ fontSize: 10 }}>
              <strong>Languages:</strong>{' '}
              {languages
                .map((item) =>
                  item.proficiency
                    ? `${item.name} (${item.proficiency})`
                    : item.name
                )
                .join(', ')}
            </div>
          )}
          {interests && (
            <div style={{ fontSize: 10, marginTop: 4 }}>
              <strong>Interests:</strong> {interests}
            </div>
          )}
        </Section>
      )}
    </div>
  );
};

TechnicalTemplate.displayName = 'TechnicalTemplate';

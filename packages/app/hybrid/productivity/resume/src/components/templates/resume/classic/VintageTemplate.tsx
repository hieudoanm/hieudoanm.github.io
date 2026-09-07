import type { FC } from 'react';
import { collectContact } from '../../../../utils/contact';
import { splitComma } from '../../../../utils/text';
import { BulletList } from '../../../atoms/BulletList';
import { ContactList } from '../../../atoms/ContactList';
import { HeaderRow } from '../../../atoms/HeaderRow';
import { Section } from '../../../atoms/Section';
import { TextBlock } from '../../../atoms/TextBlock';
import type { TemplateProps } from '../types';

const ink = '#1f2937';
const accent = '#0f766e';
const muted = '#6b7280';

const sectionStyle = { marginBottom: 14 } as const;
const titleStyle = {
  color: accent,
  fontSize: 10.5,
  letterSpacing: 2,
} as const;

export const VintageTemplate: FC<TemplateProps> = ({ data }) => {
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
        fontFamily: "Garamond, 'Times New Roman', serif",
      }}>
      <header style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            margin: '0 0 4px',
            letterSpacing: 1,
          }}>
          {personal.fullName}
        </h1>
        <div
          style={{
            fontSize: 12,
            fontStyle: 'italic',
            color: accent,
            marginBottom: 10,
          }}>
          {personal.jobTitle}
        </div>
        <div
          style={{
            borderTop: `1px solid ${muted}`,
            borderBottom: `1px solid ${muted}`,
            display: 'inline-block',
            padding: '4px 18px',
          }}
        />
        <ContactList
          items={collectContact(data)}
          style={{
            justifyContent: 'center',
            fontSize: 9.5,
            color: muted,
            marginTop: 8,
          }}
        />
      </header>

      {summary && (
        <Section title="Summary" style={sectionStyle} titleStyle={titleStyle}>
          <TextBlock text={summary} />
        </Section>
      )}

      {experience.length > 0 && (
        <Section
          title="Experience"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {experience.map((item) => (
            <div key={item.id} style={{ marginBottom: 11 }}>
              <HeaderRow
                primary={item.company}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' – ')}
                primaryStyle={{ fontSize: 12.5 }}
                rightStyle={{ color: muted }}
              />
              <div
                style={{
                  fontSize: 11,
                  fontStyle: 'italic',
                  color: accent,
                  marginBottom: 4,
                }}>
                {item.role}
                {item.location && ` · ${item.location}`}
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 16,
                  fontSize: 10.5,
                  lineHeight: 1.5,
                }}>
                {splitComma(item.description).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
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
                primaryStyle={{ fontSize: 12.5 }}
                rightStyle={{ color: muted }}
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
        <Section title="Projects" style={sectionStyle} titleStyle={titleStyle}>
          {projects.map((item) => (
            <div key={item.id} style={{ marginBottom: 8 }}>
              <HeaderRow
                primary={item.name}
                right={item.link}
                primaryStyle={{ fontSize: 12.5 }}
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

      {(certifications.length > 0 || languages.length > 0) && (
        <Section
          title="Credentials"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {certifications.length > 0 && (
            <div style={{ fontSize: 10.5, marginBottom: 4 }}>
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

VintageTemplate.displayName = 'VintageTemplate';

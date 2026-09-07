import type { FC } from 'react';
import { collectContact } from '../../../../utils/contact';
import { splitComma } from '../../../../utils/text';
import { BulletList } from '../../../atoms/BulletList';
import { ContactList } from '../../../atoms/ContactList';
import { HeaderRow } from '../../../atoms/HeaderRow';
import { Section } from '../../../atoms/Section';
import { TextBlock } from '../../../atoms/TextBlock';
import type { TemplateProps } from '../types';

const ink = '#1c1917';
const accent = '#9a3412';
const muted = '#a8a29e';

const sectionStyle = { marginBottom: 16 } as const;
const titleStyle = {
  color: accent,
  fontSize: 11,
  letterSpacing: 1.6,
  borderBottom: `3px solid ${accent}`,
  paddingBottom: 3,
  display: 'inline-block',
} as const;

export const CopperTemplate: FC<TemplateProps> = ({ data }) => {
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
        display: 'flex',
        height: '100%',
        color: ink,
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}>
      <aside
        style={{
          width: '32%',
          background: '#292524',
          color: '#e7e5e4',
          padding: '30px 24px',
        }}>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            margin: '0 0 4px',
            color: '#fafaf9',
          }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 11.5, color: '#f59e0b', marginBottom: 14 }}>
          {personal.jobTitle}
        </div>
        <ContactList
          items={collectContact(data)}
          style={{ flexDirection: 'column', fontSize: 9.5, marginBottom: 18 }}
        />

        {skills.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                borderBottom: `1px solid #f59e0b66`,
                paddingBottom: 4,
                marginBottom: 10,
              }}>
              Skills
            </div>
            {skills.map((group) => (
              <div key={group.id} style={{ marginBottom: 7 }}>
                <div
                  style={{
                    fontSize: 8.5,
                    textTransform: 'uppercase',
                    color: '#a8a29e',
                  }}>
                  {group.category}
                </div>
                <div style={{ fontSize: 10, lineHeight: 1.4 }}>
                  {group.items}
                </div>
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                borderBottom: `1px solid #f59e0b66`,
                paddingBottom: 4,
                marginBottom: 10,
              }}>
              Languages
            </div>
            {languages.map((item) => (
              <div key={item.id} style={{ fontSize: 10, marginBottom: 4 }}>
                <strong>{item.name}</strong>
                {item.proficiency && (
                  <span style={{ color: '#a8a29e' }}>
                    {' '}
                    — {item.proficiency}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </aside>

      <main style={{ flex: 1, padding: '28px 26px' }}>
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
              <div key={item.id} style={{ marginBottom: 10 }}>
                <HeaderRow
                  primary={item.role}
                  right={[item.startDate, item.endDate]
                    .filter(Boolean)
                    .join(' – ')}
                  primaryStyle={{ fontSize: 12 }}
                  rightStyle={{ color: muted }}
                />
                <div style={{ fontSize: 10.5, color: accent, marginBottom: 4 }}>
                  {item.company}
                  {item.location && ` · ${item.location}`}
                </div>
                <BulletList text={item.description} />
              </div>
            ))}
          </Section>
        )}

        {education.length > 0 && (
          <Section
            title="Education"
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
                  rightStyle={{ color: muted }}
                />
                <div style={{ fontSize: 10.5, color: accent }}>
                  {item.degree}
                  {item.field && ` in ${item.field}`}
                </div>
              </div>
            ))}
          </Section>
        )}

        {projects.length > 0 && (
          <Section
            title="Projects"
            style={sectionStyle}
            titleStyle={titleStyle}>
            {projects.map((item) => (
              <div key={item.id} style={{ marginBottom: 8 }}>
                <HeaderRow
                  primary={item.name}
                  right={item.link}
                  primaryStyle={{ fontSize: 12 }}
                  rightStyle={{ color: muted }}
                />
                {item.technologies && (
                  <div style={{ fontSize: 9.5, color: muted, marginBottom: 2 }}>
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
              <div key={item.id} style={{ fontSize: 10.5, marginBottom: 3 }}>
                <strong>{item.name}</strong>
                {item.issuer && ` — ${item.issuer}`}
                {item.date && (
                  <span style={{ color: muted }}> ({item.date})</span>
                )}
              </div>
            ))}
          </Section>
        )}

        {interests && (
          <Section
            title="Interests"
            style={sectionStyle}
            titleStyle={titleStyle}>
            <div style={{ fontSize: 10.5 }}>
              {splitComma(interests).join(' · ')}
            </div>
          </Section>
        )}
      </main>
    </div>
  );
};

CopperTemplate.displayName = 'CopperTemplate';

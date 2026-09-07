import type { FC } from 'react';
import { collectContact } from '../../../../utils/contact';
import { splitComma } from '../../../../utils/text';
import { BulletList } from '../../../atoms/BulletList';
import { ContactList } from '../../../atoms/ContactList';
import { HeaderRow } from '../../../atoms/HeaderRow';
import { Section } from '../../../atoms/Section';
import { TextBlock } from '../../../atoms/TextBlock';
import type { TemplateProps } from '../types';

const ink = '#27272a';
const accent = '#65a30d';
const muted = '#a1a1aa';

const sectionStyle = { marginBottom: 16 } as const;
const titleStyle = {
  color: accent,
  fontSize: 11,
  letterSpacing: 2,
  borderBottom: `1px solid ${accent}66`,
  paddingBottom: 3,
} as const;

export const WillowTemplate: FC<TemplateProps> = ({ data }) => {
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
          width: '34%',
          background: '#d9f99d',
          padding: '28px 22px',
          color: '#3f6212',
        }}>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            margin: '0 0 4px',
            color: '#365314',
          }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 11.5, color: '#4d7c0f', marginBottom: 14 }}>
          {personal.jobTitle}
        </div>
        <ContactList
          items={collectContact(data)}
          style={{ flexDirection: 'column', fontSize: 9.5 }}
        />

        {skills.length > 0 && (
          <div style={{ marginTop: 18 }}>
            <div
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                borderBottom: `1px solid #4d7c0f66`,
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
                    color: '#4d7c0f',
                  }}>
                  {group.category}
                </div>
                <div style={{ fontSize: 9.5, lineHeight: 1.4 }}>
                  {group.items}
                </div>
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div style={{ marginTop: 18 }}>
            <div
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                borderBottom: `1px solid #4d7c0f66`,
                paddingBottom: 4,
                marginBottom: 10,
              }}>
              Languages
            </div>
            {languages.map((item) => (
              <div key={item.id} style={{ fontSize: 9.5, marginBottom: 4 }}>
                <strong>{item.name}</strong>
                {item.proficiency && (
                  <span style={{ opacity: 0.75 }}> — {item.proficiency}</span>
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
              <div key={item.id} style={{ marginBottom: 11 }}>
                <HeaderRow
                  primary={item.company}
                  right={[item.startDate, item.endDate]
                    .filter(Boolean)
                    .join(' – ')}
                  primaryStyle={{ fontSize: 12.5 }}
                  rightStyle={{ color: muted }}
                />
                <div style={{ fontSize: 11, color: accent, marginBottom: 4 }}>
                  {item.role}
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
          <Section
            title="Projects"
            style={sectionStyle}
            titleStyle={titleStyle}>
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

WillowTemplate.displayName = 'WillowTemplate';

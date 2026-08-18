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

const indigo = '#4338ca';
const accent = '#6366f1';
const ink = '#1e1b4b';
const muted = '#6b7280';

const sectionStyle = { marginBottom: 16 } as const;
const titleStyle = { color: indigo, fontSize: 11, letterSpacing: 2 } as const;

export const OrbitTemplate: FC<TemplateProps> = ({ data }) => {
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
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}>
      <header
        style={{
          background: '#eef2ff',
          padding: '26px 38px',
          borderBottom: `3px solid ${accent}`,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
        }}>
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: '50%',
            background: indigo,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            fontWeight: 800,
            flexShrink: 0,
          }}>
          {personal.fullName
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join('')}
        </div>
        <div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              margin: '0 0 2px',
              color: indigo,
            }}>
            {personal.fullName}
          </h1>
          <div style={{ fontSize: 12, color: muted, marginBottom: 6 }}>
            {personal.jobTitle}
          </div>
          <ContactList items={collectContact(data)} style={{ fontSize: 9.5 }} />
        </div>
      </header>

      <main style={{ padding: '20px 38px' }}>
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
                  primaryStyle={{ fontSize: 12, color: indigo }}
                  rightStyle={{ color: muted }}
                />
                <div style={{ fontSize: 11, color: accent, marginBottom: 4 }}>
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
                  primaryStyle={{ fontSize: 12, color: indigo }}
                  rightStyle={{ color: muted }}
                />
                <div style={{ fontSize: 11 }}>
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
                  primaryStyle={{ fontSize: 12, color: indigo }}
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
                <strong style={{ color: indigo }}>{group.category}: </strong>
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

OrbitTemplate.displayName = 'OrbitTemplate';

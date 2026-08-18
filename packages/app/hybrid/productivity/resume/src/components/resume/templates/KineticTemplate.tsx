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

const DEFAULT_ACCENT = '#ef4444';
const ink = '#111827';
const muted = '#6b7280';

const sectionStyle = { marginBottom: 16 } as const;

export const KineticTemplate: FC<TemplateProps> = ({ data, options }) => {
  const stripe = options?.accentColor || DEFAULT_ACCENT;
  const titleStyle = {
    color: ink,
    borderLeft: `4px solid ${stripe}`,
    paddingLeft: 8,
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
        height: '100%',
        color: ink,
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}>
      <header
        style={{
          color: '#ffffff',
          background: ink,
          clipPath: 'polygon(0 0, 100% 0, 100% 78%, 0 100%)',
          padding: '30px 40px 46px',
        }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            margin: '0 0 4px',
            color: '#ffffff',
            letterSpacing: -0.5,
          }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 12, color: '#fca5a5', marginBottom: 12 }}>
          {personal.jobTitle}
        </div>
        <ContactList
          items={collectContact(data)}
          style={{ fontSize: 9.5, color: '#d1d5db' }}
        />
      </header>

      <main style={{ padding: '6px 40px 30px' }}>
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
                  primary={item.company}
                  right={[item.startDate, item.endDate]
                    .filter(Boolean)
                    .join(' – ')}
                  primaryStyle={{ fontSize: 12, color: stripe }}
                  rightStyle={{ color: muted }}
                />
                <div style={{ fontSize: 11, fontWeight: 600 }}>
                  {item.role}
                  {item.location && (
                    <span style={{ color: muted, fontWeight: 400 }}>
                      {' '}
                      · {item.location}
                    </span>
                  )}
                </div>
                <BulletList text={item.description} style={{ marginTop: 4 }} />
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
                  primaryStyle={{ fontSize: 12, color: stripe }}
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
                  primaryStyle={{ fontSize: 12, color: stripe }}
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
                <strong style={{ color: stripe }}>{group.category}: </strong>
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

KineticTemplate.displayName = 'KineticTemplate';

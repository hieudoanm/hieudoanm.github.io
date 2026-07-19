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

const cyan = '#0891b2';
const accent = '#06b6d4';
const ink = '#164e63';
const muted = '#64748b';

const sectionStyle = { marginBottom: 16 } as const;
const titleStyle = {
  color: cyan,
  borderLeft: `3px solid ${accent}`,
  paddingLeft: 8,
  letterSpacing: 2,
} as const;

export const PulseTemplate: FC<TemplateProps> = ({ data }) => {
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
        fontFamily: "'JetBrains Mono', 'SFMono-Regular', monospace",
      }}>
      <header
        style={{
          background: ink,
          color: '#ffffff',
          padding: '28px 38px',
        }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            margin: '0 0 4px',
            color: '#ffffff',
          }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 12, color: accent, marginBottom: 10 }}>
          {personal.jobTitle}
        </div>
        <ContactList
          items={collectContact(data)}
          style={{ fontSize: 9.5, color: '#a5f3fc' }}
        />
      </header>

      <main style={{ padding: '22px 38px' }}>
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
              <div key={item.id} style={{ marginBottom: 12 }}>
                <HeaderRow
                  primary={item.company}
                  right={[item.startDate, item.endDate]
                    .filter(Boolean)
                    .join(' – ')}
                  primaryStyle={{ fontSize: 12, color: cyan }}
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
                  primaryStyle={{ fontSize: 12, color: cyan }}
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
                  primaryStyle={{ fontSize: 12, color: cyan }}
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
                <strong style={{ color: cyan }}>{group.category}: </strong>
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

PulseTemplate.displayName = 'PulseTemplate';

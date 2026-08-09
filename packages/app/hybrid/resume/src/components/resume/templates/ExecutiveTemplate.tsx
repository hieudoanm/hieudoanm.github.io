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

const bandBg = '#1f2937';
const DEFAULT_ACCENT = '#c9a227';
const ink = '#374151';
const muted = '#9ca3af';

const sectionStyle = { marginBottom: 14 } as const;

export const ExecutiveTemplate: FC<TemplateProps> = ({ data, options }) => {
  const gold = options?.accentColor || DEFAULT_ACCENT;
  const titleStyle = { color: gold, fontSize: 11, letterSpacing: 2 } as const;
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
        fontFamily: "Garamond, 'Times New Roman', serif",
      }}>
      <header
        style={{ background: bandBg, color: '#ffffff', padding: '34px 44px' }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            margin: '0 0 4px',
            color: '#ffffff',
            letterSpacing: 1,
          }}>
          {personal.fullName}
        </h1>
        <div
          style={{
            fontSize: 13,
            color: gold,
            marginBottom: 12,
            letterSpacing: 1.5,
          }}>
          {personal.jobTitle}
        </div>
        <ContactList
          items={collectContact(data)}
          style={{ fontSize: 10, color: '#e5e7eb', justifyContent: 'center' }}
        />
      </header>

      <main style={{ padding: '26px 44px' }}>
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
                  primaryStyle={{ fontSize: 13 }}
                  rightStyle={{ color: muted, fontSize: 10 }}
                />
                <div
                  style={{
                    fontSize: 11.5,
                    fontStyle: 'italic',
                    color: gold,
                    marginBottom: 4,
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
                  primaryStyle={{ fontSize: 13 }}
                  rightStyle={{ color: muted, fontSize: 10 }}
                />
                <div
                  style={{ fontSize: 11.5, fontStyle: 'italic', color: gold }}>
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
                  primaryStyle={{ fontSize: 13 }}
                  rightStyle={{ color: muted, fontSize: 10 }}
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
              <div key={group.id} style={{ fontSize: 10.5, marginBottom: 3 }}>
                <strong>{group.category}:</strong> {group.items}
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

ExecutiveTemplate.displayName = 'ExecutiveTemplate';

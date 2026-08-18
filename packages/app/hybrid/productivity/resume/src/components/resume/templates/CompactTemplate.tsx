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

const ink = '#1f2937';
const DEFAULT_ACCENT = '#111827';
const muted = '#6b7280';

const sectionStyle = { marginBottom: 10 } as const;

export const CompactTemplate: FC<TemplateProps> = ({ data, options }) => {
  const accent = options?.accentColor || DEFAULT_ACCENT;
  const titleStyle = {
    color: accent,
    fontSize: 10,
    letterSpacing: 1.2,
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
        padding: '22px 28px',
        color: ink,
        fontFamily: "Arial, 'Helvetica Neue', sans-serif",
        height: '100%',
      }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderBottom: `2px solid ${accent}`,
          paddingBottom: 8,
          marginBottom: 12,
        }}>
        <div>
          <h1
            style={{ fontSize: 20, fontWeight: 700, margin: 0, color: accent }}>
            {personal.fullName}
          </h1>
          <div style={{ fontSize: 11, color: muted }}>{personal.jobTitle}</div>
        </div>
        <ContactList
          items={collectContact(data)}
          style={{
            flexDirection: 'column',
            alignItems: 'flex-end',
            fontSize: 8.5,
            color: muted,
            margin: 0,
          }}
        />
      </header>

      {summary && (
        <Section title="Summary" style={sectionStyle} titleStyle={titleStyle}>
          <TextBlock
            text={summary}
            style={{ fontSize: 9.5, marginBottom: 0 }}
          />
        </Section>
      )}

      {experience.length > 0 && (
        <Section
          title="Experience"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {experience.map((item) => (
            <div key={item.id} style={{ marginBottom: 7 }}>
              <HeaderRow
                primary={`${item.role}, ${item.company}`}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' – ')}
                primaryStyle={{ fontSize: 10 }}
                rightStyle={{ color: muted, fontSize: 8.5 }}
              />
              {item.location && (
                <div style={{ fontSize: 8.5, color: muted }}>
                  {item.location}
                </div>
              )}
              <BulletList
                text={item.description}
                style={{ marginTop: 2 }}
                itemStyle={{ fontSize: 9.5, lineHeight: 1.4 }}
              />
            </div>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills" style={sectionStyle} titleStyle={titleStyle}>
          <div style={{ fontSize: 9.5, lineHeight: 1.5 }}>
            {skills.map((group) => (
              <div key={group.id}>
                <strong>{group.category}: </strong>
                {group.items}
              </div>
            ))}
          </div>
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education" style={sectionStyle} titleStyle={titleStyle}>
          {education.map((item) => (
            <div key={item.id} style={{ marginBottom: 4 }}>
              <HeaderRow
                primary={`${item.degree}${item.field ? ` in ${item.field}` : ''} — ${item.school}`}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' – ')}
                primaryStyle={{ fontSize: 10 }}
                rightStyle={{ color: muted, fontSize: 8.5 }}
              />
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects" style={sectionStyle} titleStyle={titleStyle}>
          {projects.map((item) => (
            <div
              key={item.id}
              style={{ marginBottom: 5, fontSize: 9.5, lineHeight: 1.4 }}>
              <strong>{item.name}</strong>
              {item.link && (
                <span style={{ color: muted }}> — {item.link}</span>
              )}
              {item.technologies && (
                <div style={{ color: muted }}>{item.technologies}</div>
              )}
              {item.description && <div>{item.description}</div>}
            </div>
          ))}
        </Section>
      )}

      {(certifications.length > 0 || languages.length > 0) && (
        <Section
          title="Certifications & Languages"
          style={sectionStyle}
          titleStyle={titleStyle}>
          <div style={{ fontSize: 9.5, lineHeight: 1.5 }}>
            {certifications.length > 0 && (
              <div>{certifications.map((item) => item.name).join(' · ')}</div>
            )}
            {languages.length > 0 && (
              <div>
                {languages
                  .map((item) =>
                    item.proficiency
                      ? `${item.name} (${item.proficiency})`
                      : item.name
                  )
                  .join(' · ')}
              </div>
            )}
            {interests && (
              <div>Interests: {splitComma(interests).join(' · ')}</div>
            )}
          </div>
        </Section>
      )}
    </div>
  );
};

CompactTemplate.displayName = 'CompactTemplate';

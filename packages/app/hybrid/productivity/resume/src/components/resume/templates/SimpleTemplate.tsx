import type { FC } from 'react';
import { collectContact } from '../../../utils/contact';
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
const muted = '#6b7280';

const sectionStyle = { marginBottom: 16 } as const;
const titleStyle = { fontSize: 12, fontWeight: 700, color: ink } as const;

export const SimpleTemplate: FC<TemplateProps> = ({ data }) => {
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
        fontFamily: "Arial, 'Helvetica Neue', sans-serif",
        height: '100%',
      }}>
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: '0 0 2px' }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 13, marginBottom: 8 }}>{personal.jobTitle}</div>
        <ContactList
          items={collectContact(data)}
          style={{ fontSize: 10, color: muted }}
        />
      </header>

      {summary && (
        <Section title="Summary" style={sectionStyle} titleStyle={titleStyle}>
          <TextBlock text={summary} />
        </Section>
      )}

      {experience.length > 0 && (
        <Section
          title="Work Experience"
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
                rightStyle={{ color: muted, fontSize: 10 }}
              />
              <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 4 }}>
                {item.company}
                {item.location && (
                  <span style={{ fontWeight: 400, color: muted }}>
                    {' '}
                    — {item.location}
                  </span>
                )}
              </div>
              <BulletList text={item.description} />
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
                primaryStyle={{ fontSize: 12 }}
                rightStyle={{ color: muted, fontSize: 10 }}
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
        <Section title="Projects" style={sectionStyle} titleStyle={titleStyle}>
          {projects.map((item) => (
            <div key={item.id} style={{ marginBottom: 8 }}>
              <HeaderRow
                primary={item.name}
                right={item.link}
                primaryStyle={{ fontSize: 12 }}
                rightStyle={{ color: muted, fontSize: 10 }}
              />
              {item.technologies && (
                <div style={{ fontSize: 10, color: muted, marginBottom: 2 }}>
                  {item.technologies}
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
            <div key={group.id} style={{ fontSize: 10.5, marginBottom: 4 }}>
              <strong>{group.category}: </strong>
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
          {certifications.map((item) => (
            <div key={item.id} style={{ fontSize: 10.5, marginBottom: 4 }}>
              <strong>{item.name}</strong>
              {item.issuer && ` — ${item.issuer}`}
              {item.date && (
                <span style={{ color: muted }}> ({item.date})</span>
              )}
            </div>
          ))}
        </Section>
      )}

      {languages.length > 0 && (
        <Section title="Languages" style={sectionStyle} titleStyle={titleStyle}>
          <div style={{ fontSize: 10.5 }}>
            {languages.map((item) => (
              <span key={item.id} style={{ marginRight: 14 }}>
                {item.name}
                {item.proficiency && (
                  <span style={{ color: muted }}> — {item.proficiency}</span>
                )}
              </span>
            ))}
          </div>
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

SimpleTemplate.displayName = 'SimpleTemplate';

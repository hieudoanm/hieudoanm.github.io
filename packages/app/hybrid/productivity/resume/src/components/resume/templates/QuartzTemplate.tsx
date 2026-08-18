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

const violet = '#6d28d9';
const accent = '#8b5cf6';
const ink = '#312e81';
const muted = '#8b8a9e';

const sectionStyle = { marginBottom: 20 } as const;
const titleStyle = { color: violet, fontSize: 11, letterSpacing: 2 } as const;

export const QuartzTemplate: FC<TemplateProps> = ({ data }) => {
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
        padding: '46px 50px',
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}>
      <header style={{ marginBottom: 26 }}>
        <h1
          style={{
            fontSize: 30,
            fontWeight: 600,
            margin: '0 0 4px',
            color: violet,
            letterSpacing: -0.5,
          }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 12, color: muted, marginBottom: 10 }}>
          {personal.jobTitle}
        </div>
        <ContactList
          items={collectContact(data)}
          style={{ fontSize: 9.5, color: muted }}
        />
      </header>

      {summary && (
        <Section title="About" style={sectionStyle} titleStyle={titleStyle}>
          <TextBlock text={summary} />
        </Section>
      )}

      {experience.length > 0 && (
        <Section
          title="Experience"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {experience.map((item) => (
            <div key={item.id} style={{ marginBottom: 14 }}>
              <HeaderRow
                primary={item.role}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' — ')}
                primaryStyle={{ fontSize: 12, color: ink }}
                rightStyle={{ color: muted, fontSize: 9.5 }}
              />
              <div style={{ fontSize: 11, color: accent, marginBottom: 6 }}>
                {item.company}
                {item.location && ` · ${item.location}`}
              </div>
              <BulletList text={item.description} />
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education" style={sectionStyle} titleStyle={titleStyle}>
          {education.map((item) => (
            <div key={item.id} style={{ marginBottom: 10 }}>
              <HeaderRow
                primary={item.school}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' — ')}
                primaryStyle={{ fontSize: 12, color: ink }}
                rightStyle={{ color: muted, fontSize: 9.5 }}
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
            <div key={item.id} style={{ marginBottom: 10 }}>
              <HeaderRow
                primary={item.name}
                right={item.link}
                primaryStyle={{ fontSize: 12, color: ink }}
                rightStyle={{ color: muted, fontSize: 9.5 }}
              />
              {item.technologies && (
                <div style={{ fontSize: 10, color: muted, marginBottom: 3 }}>
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
              <strong style={{ color: violet }}>{group.category}: </strong>
              {group.items}
            </div>
          ))}
        </Section>
      )}

      {(certifications.length > 0 || languages.length > 0) && (
        <Section
          title="Additional"
          style={sectionStyle}
          titleStyle={titleStyle}>
          {certifications.length > 0 && (
            <div style={{ fontSize: 10.5, marginBottom: 8 }}>
              <strong style={{ color: violet }}>Certifications: </strong>
              {certifications.map((item) => item.name).join(', ')}
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ fontSize: 10.5 }}>
              <strong style={{ color: violet }}>Languages: </strong>
              {languages
                .map((item) =>
                  item.proficiency
                    ? `${item.name} (${item.proficiency})`
                    : item.name
                )
                .join(', ')}
            </div>
          )}
        </Section>
      )}

      {interests && (
        <Section title="Interests" style={sectionStyle} titleStyle={titleStyle}>
          <div style={{ fontSize: 10.5 }}>
            {splitComma(interests).join(' · ')}
          </div>
        </Section>
      )}
    </div>
  );
};

QuartzTemplate.displayName = 'QuartzTemplate';

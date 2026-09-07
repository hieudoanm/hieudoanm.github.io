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
const accent = '#78716c';
const muted = '#a8a29e';

const sectionStyle = { marginBottom: 20 } as const;
const titleStyle = {
  color: accent,
  fontSize: 10,
  letterSpacing: 3,
  textAlign: 'center',
} as const;

export const ZenTemplate: FC<TemplateProps> = ({ data }) => {
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
        padding: '44px 48px',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}>
      <header style={{ textAlign: 'center', marginBottom: 30 }}>
        <h1
          style={{
            fontSize: 30,
            fontWeight: 300,
            margin: '0 0 6px',
            letterSpacing: 2,
          }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 12, color: accent, marginBottom: 12 }}>
          {personal.jobTitle}
        </div>
        <div
          style={{
            width: 48,
            height: 1,
            background: muted,
            margin: '0 auto 12px',
          }}
        />
        <ContactList
          items={collectContact(data)}
          style={{ justifyContent: 'center', fontSize: 9.5, color: muted }}
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
            <div
              key={item.id}
              style={{ marginBottom: 14, textAlign: 'center' }}>
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
                  marginBottom: 6,
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
        <Section title="Education" style={sectionStyle} titleStyle={titleStyle}>
          {education.map((item) => (
            <div
              key={item.id}
              style={{ marginBottom: 10, textAlign: 'center' }}>
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
            <div
              key={item.id}
              style={{ marginBottom: 10, textAlign: 'center' }}>
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
          <div style={{ textAlign: 'center', fontSize: 10.5 }}>
            {skills.map((group) => (
              <div key={group.id} style={{ marginBottom: 4 }}>
                <strong style={{ color: accent }}>{group.category}: </strong>
                {group.items}
              </div>
            ))}
          </div>
        </Section>
      )}

      {(certifications.length > 0 || languages.length > 0) && (
        <Section
          title="Credentials"
          style={sectionStyle}
          titleStyle={titleStyle}>
          <div style={{ textAlign: 'center', fontSize: 10.5 }}>
            {certifications.length > 0 && (
              <div style={{ marginBottom: 4 }}>
                {certifications.map((item) => item.name).join(' · ')}
              </div>
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
          </div>
        </Section>
      )}

      {interests && (
        <Section title="Interests" style={sectionStyle} titleStyle={titleStyle}>
          <div style={{ textAlign: 'center', fontSize: 10.5 }}>
            {splitComma(interests).join(' · ')}
          </div>
        </Section>
      )}
    </div>
  );
};

ZenTemplate.displayName = 'ZenTemplate';

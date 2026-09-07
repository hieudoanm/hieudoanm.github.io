import type { FC } from 'react';
import { collectContact } from '../../../../utils/contact';
import { splitComma } from '../../../../utils/text';
import { BulletList } from '../../../atoms/BulletList';
import { ContactList } from '../../../atoms/ContactList';
import { HeaderRow } from '../../../atoms/HeaderRow';
import { Section } from '../../../atoms/Section';
import { TextBlock } from '../../../atoms/TextBlock';
import type { TemplateProps } from '../types';

const ink = '#3f1726';
const accent = '#be123c';
const muted = '#9f6b7f';

const sectionStyle = { marginBottom: 18 } as const;

export const RoseTemplate: FC<TemplateProps> = ({ data }) => {
  const titleStyle = {
    color: accent,
    fontSize: 11,
    letterSpacing: 2.4,
    borderBottom: `2px solid ${accent}44`,
    paddingBottom: 4,
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
        padding: '36px 42px',
        fontFamily: "Garamond, 'Times New Roman', serif",
      }}>
      <header style={{ textAlign: 'center', marginBottom: 26 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 4px' }}>
          {personal.fullName}
        </h1>
        <div
          style={{
            fontSize: 12,
            fontStyle: 'italic',
            color: accent,
            marginBottom: 8,
          }}>
          {personal.jobTitle}
        </div>
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
            <div key={item.id} style={{ marginBottom: 12 }}>
              <HeaderRow
                primary={item.company}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' – ')}
                primaryStyle={{ fontSize: 13 }}
                rightStyle={{ color: muted, fontSize: 9.5 }}
              />
              <div
                style={{
                  fontSize: 11.5,
                  fontStyle: 'italic',
                  color: accent,
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
        <Section title="Education" style={sectionStyle} titleStyle={titleStyle}>
          {education.map((item) => (
            <div key={item.id} style={{ marginBottom: 10 }}>
              <HeaderRow
                primary={item.school}
                right={[item.startDate, item.endDate]
                  .filter(Boolean)
                  .join(' – ')}
                primaryStyle={{ fontSize: 13 }}
                rightStyle={{ color: muted, fontSize: 9.5 }}
              />
              <div style={{ fontSize: 11.5, color: accent }}>
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
                primaryStyle={{ fontSize: 13 }}
                rightStyle={{ color: muted, fontSize: 9.5 }}
              />
              {item.technologies && (
                <div style={{ fontSize: 10, color: accent, marginBottom: 2 }}>
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
              <strong style={{ color: accent }}>{group.category}: </strong>
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
        <Section title="Interests" style={sectionStyle} titleStyle={titleStyle}>
          <div style={{ fontSize: 10.5 }}>
            {splitComma(interests).join(' · ')}
          </div>
        </Section>
      )}
    </div>
  );
};

RoseTemplate.displayName = 'RoseTemplate';

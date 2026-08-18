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

const DEFAULT_PRIMARY = '#7c3aed';
const secondary = '#f97316';
const ink = '#1f2937';
const muted = '#6b7280';

const Chip = ({ label, color }: { label: string; color: string }) => (
  <span
    style={{
      display: 'inline-block',
      background: `${color}14`,
      color,
      borderRadius: 999,
      padding: '2px 8px',
      fontSize: 9,
      fontWeight: 600,
      marginRight: 5,
      marginBottom: 5,
    }}>
    {label}
  </span>
);

export const CreativeTemplate: FC<TemplateProps> = ({ data, options }) => {
  const primary = options?.accentColor || DEFAULT_PRIMARY;
  const titleStyle = {
    color: primary,
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 1,
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
        fontFamily: "'Trebuchet MS', Arial, sans-serif",
      }}>
      <header
        style={{
          background: primary,
          color: '#ffffff',
          padding: '30px 40px',
          position: 'relative',
        }}>
        <div
          style={{
            position: 'absolute',
            right: 28,
            top: 28,
            width: 54,
            height: 54,
            borderRadius: 12,
            background: secondary,
            transform: 'rotate(12deg)',
          }}
        />
        <h1
          style={{
            fontSize: 30,
            fontWeight: 800,
            margin: '0 0 2px',
            color: '#ffffff',
          }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
          {personal.jobTitle}
        </div>
        <ContactList
          items={collectContact(data)}
          style={{ fontSize: 10, color: '#ede9fe' }}
        />
      </header>

      <main style={{ padding: '24px 40px' }}>
        {summary && (
          <Section
            title="About Me"
            style={{ marginBottom: 16 }}
            titleStyle={titleStyle}>
            <div
              style={{ borderLeft: `4px solid ${secondary}`, paddingLeft: 12 }}>
              <TextBlock text={summary} />
            </div>
          </Section>
        )}

        {experience.length > 0 && (
          <Section
            title="Work Experience"
            style={{ marginBottom: 16 }}
            titleStyle={titleStyle}>
            {experience.map((item) => (
              <div key={item.id} style={{ marginBottom: 12 }}>
                <HeaderRow
                  primary={item.role}
                  right={[item.startDate, item.endDate]
                    .filter(Boolean)
                    .join(' – ')}
                  primaryStyle={{ fontSize: 12.5, color: primary }}
                  rightStyle={{ color: muted, fontSize: 10 }}
                />
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: secondary,
                    marginBottom: 4,
                  }}>
                  {item.company}
                  {item.location && (
                    <span style={{ color: muted, fontWeight: 400 }}>
                      {' '}
                      · {item.location}
                    </span>
                  )}
                </div>
                <BulletList text={item.description} />
              </div>
            ))}
          </Section>
        )}

        {skills.length > 0 && (
          <Section
            title="Skills"
            style={{ marginBottom: 16 }}
            titleStyle={titleStyle}>
            {skills.map((group) => (
              <div key={group.id} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 4 }}>
                  {group.category}
                </div>
                <div>
                  {splitComma(group.items).map((item) => (
                    <Chip key={item} label={item} color={primary} />
                  ))}
                </div>
              </div>
            ))}
          </Section>
        )}

        {projects.length > 0 && (
          <Section
            title="Projects"
            style={{ marginBottom: 16 }}
            titleStyle={titleStyle}>
            {projects.map((item) => (
              <div key={item.id} style={{ marginBottom: 10 }}>
                <HeaderRow
                  primary={item.name}
                  right={item.link}
                  primaryStyle={{ fontSize: 12.5, color: primary }}
                  rightStyle={{ color: muted, fontSize: 10 }}
                />
                {item.technologies && (
                  <div style={{ fontSize: 10, color: muted, marginBottom: 3 }}>
                    {item.technologies}
                  </div>
                )}
                <TextBlock text={item.description} />
              </div>
            ))}
          </Section>
        )}

        {education.length > 0 && (
          <Section
            title="Education"
            style={{ marginBottom: 16 }}
            titleStyle={titleStyle}>
            {education.map((item) => (
              <div key={item.id} style={{ marginBottom: 8 }}>
                <HeaderRow
                  primary={item.school}
                  right={[item.startDate, item.endDate]
                    .filter(Boolean)
                    .join(' – ')}
                  primaryStyle={{ fontSize: 12.5 }}
                  rightStyle={{ color: muted, fontSize: 10 }}
                />
                <div style={{ fontSize: 11, color: secondary }}>
                  {item.degree}
                  {item.field && ` in ${item.field}`}
                </div>
              </div>
            ))}
          </Section>
        )}

        {(certifications.length > 0 || languages.length > 0) && (
          <Section
            title="Extras"
            style={{ marginBottom: 16 }}
            titleStyle={titleStyle}>
            {certifications.map((item) => (
              <Chip key={item.id} label={item.name} color={primary} />
            ))}
            {languages.map((item) => (
              <Chip
                key={item.id}
                color={primary}
                label={
                  item.proficiency
                    ? `${item.name} (${item.proficiency})`
                    : item.name
                }
              />
            ))}
          </Section>
        )}

        {interests && (
          <Section
            title="Interests"
            style={{ marginBottom: 16 }}
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

CreativeTemplate.displayName = 'CreativeTemplate';

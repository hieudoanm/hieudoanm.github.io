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

const DEFAULT_NAVY = '#1e3a8a';
const amber = '#f59e0b';
const ink = '#111827';
const muted = '#6b7280';

const sectionStyle = { marginBottom: 16 } as const;

const SideItem = ({ label, value }: { label: string; value: string }) => (
  <div style={{ marginBottom: 8 }}>
    <div
      style={{
        fontSize: 9,
        textTransform: 'uppercase',
        letterSpacing: 1.4,
        color: '#93c5fd',
        marginBottom: 2,
      }}>
      {label}
    </div>
    <div style={{ fontSize: 10.5, lineHeight: 1.45 }}>{value}</div>
  </div>
);

export const BeaconTemplate: FC<TemplateProps> = ({ data, options }) => {
  const navy = options?.accentColor || DEFAULT_NAVY;
  const titleStyle = {
    color: navy,
    borderBottom: `2px solid ${amber}`,
    paddingBottom: 3,
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
        display: 'flex',
        height: '100%',
        color: ink,
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}>
      <aside
        style={{
          width: '33%',
          background: navy,
          color: '#ffffff',
          padding: '28px 22px',
        }}>
        <div style={{ marginBottom: 16 }}>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 700,
              margin: '0 0 4px',
              color: '#ffffff',
            }}>
            {personal.fullName}
          </h1>
          <div style={{ fontSize: 12, color: amber }}>{personal.jobTitle}</div>
        </div>

        <ContactList
          items={collectContact(data)}
          style={{
            flexDirection: 'column',
            fontSize: 10,
            color: '#dbeafe',
            marginBottom: 18,
          }}
        />

        {skills.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                borderBottom: `1px solid ${amber}66`,
                paddingBottom: 4,
                marginBottom: 10,
                color: amber,
              }}>
              Skills
            </div>
            {skills.map((group) => (
              <SideItem
                key={group.id}
                label={group.category}
                value={group.items}
              />
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                borderBottom: `1px solid ${amber}66`,
                paddingBottom: 4,
                marginBottom: 10,
                color: amber,
              }}>
              Languages
            </div>
            {languages.map((item) => (
              <SideItem
                key={item.id}
                label={item.name}
                value={item.proficiency}
              />
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                borderBottom: `1px solid ${amber}66`,
                paddingBottom: 4,
                marginBottom: 10,
                color: amber,
              }}>
              Certifications
            </div>
            {certifications.map((item) => (
              <SideItem key={item.id} label={item.name} value={item.issuer} />
            ))}
          </div>
        )}
      </aside>

      <main style={{ flex: 1, padding: '28px 26px' }}>
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
                  primaryStyle={{ fontSize: 12, color: navy }}
                  rightStyle={{ color: muted }}
                />
                <div style={{ fontSize: 11, fontWeight: 600 }}>
                  {item.company}
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
                  primaryStyle={{ fontSize: 12, color: navy }}
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
                  primaryStyle={{ fontSize: 12, color: navy }}
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

BeaconTemplate.displayName = 'BeaconTemplate';

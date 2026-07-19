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

const DEFAULT_SIDEBAR_BG = '#0f766e';
const sidebarText = '#ffffff';
const sidebarMuted = '#99f6e4';
const ink = '#0f172a';
const muted = '#64748b';

const SideItem = ({ label, value }: { label: string; value: string }) => (
  <div style={{ marginBottom: 6 }}>
    <div
      style={{
        fontSize: 9,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        color: sidebarMuted,
      }}>
      {label}
    </div>
    <div style={{ fontSize: 10.5, lineHeight: 1.45 }}>{value}</div>
  </div>
);

export const ModernTemplate: FC<TemplateProps> = ({ data, options }) => {
  const sidebarBg = options?.accentColor || DEFAULT_SIDEBAR_BG;
  const titleStyle = {
    color: sidebarBg,
    borderBottom: `2px solid ${sidebarBg}`,
    paddingBottom: 2,
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
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        color: ink,
      }}>
      <aside
        style={{
          width: '34%',
          background: sidebarBg,
          color: sidebarText,
          padding: '28px 22px',
        }}>
        <div style={{ marginBottom: 18 }}>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 700,
              margin: '0 0 4px',
              color: sidebarText,
            }}>
            {personal.fullName}
          </h1>
          <div style={{ fontSize: 12, color: sidebarMuted }}>
            {personal.jobTitle}
          </div>
        </div>

        <ContactList
          items={collectContact(data)}
          style={{
            flexDirection: 'column',
            fontSize: 10,
            color: sidebarText,
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
                borderBottom: `1px solid ${sidebarMuted}44`,
                paddingBottom: 4,
                marginBottom: 10,
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
                borderBottom: `1px solid ${sidebarMuted}44`,
                paddingBottom: 4,
                marginBottom: 10,
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
                borderBottom: `1px solid ${sidebarMuted}44`,
                paddingBottom: 4,
                marginBottom: 10,
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
          <Section
            title="Summary"
            style={{ marginBottom: 16 }}
            titleStyle={titleStyle}>
            <TextBlock text={summary} />
          </Section>
        )}

        {experience.length > 0 && (
          <Section
            title="Experience"
            style={{ marginBottom: 16 }}
            titleStyle={titleStyle}>
            {experience.map((item) => (
              <div key={item.id} style={{ marginBottom: 10 }}>
                <HeaderRow
                  primary={item.role}
                  right={[item.startDate, item.endDate]
                    .filter(Boolean)
                    .join(' – ')}
                  primaryStyle={{ fontSize: 12, color: sidebarBg }}
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
            style={{ marginBottom: 16 }}
            titleStyle={titleStyle}>
            {education.map((item) => (
              <div key={item.id} style={{ marginBottom: 8 }}>
                <HeaderRow
                  primary={item.school}
                  right={[item.startDate, item.endDate]
                    .filter(Boolean)
                    .join(' – ')}
                  primaryStyle={{ fontSize: 12, color: sidebarBg }}
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
            style={{ marginBottom: 16 }}
            titleStyle={titleStyle}>
            {projects.map((item) => (
              <div key={item.id} style={{ marginBottom: 8 }}>
                <HeaderRow
                  primary={item.name}
                  right={item.link}
                  primaryStyle={{ fontSize: 12, color: sidebarBg }}
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

ModernTemplate.displayName = 'ModernTemplate';

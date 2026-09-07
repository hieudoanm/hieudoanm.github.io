import type { FC } from 'react';
import { collectContact } from '../../../../utils/contact';
import { splitComma } from '../../../../utils/text';
import { BulletList } from '../../../atoms/BulletList';
import { ContactList } from '../../../atoms/ContactList';
import { HeaderRow } from '../../../atoms/HeaderRow';
import { Section } from '../../../atoms/Section';
import { TextBlock } from '../../../atoms/TextBlock';
import type { TemplateProps } from '../types';

const azure = '#0e7490';
const ink = '#164e63';
const muted = '#64748b';
const sidebarMuted = '#a5f3fc';

const SideItem = ({ label, value }: { label: string; value: string }) => (
  <div style={{ marginBottom: 7 }}>
    <div
      style={{
        fontSize: 8.5,
        textTransform: 'uppercase',
        letterSpacing: 1.4,
        color: sidebarMuted,
      }}>
      {label}
    </div>
    <div style={{ fontSize: 10, lineHeight: 1.4 }}>{value}</div>
  </div>
);

export const AzureTemplate: FC<TemplateProps> = ({ data }) => {
  const titleStyle = {
    color: azure,
    borderBottom: `2px solid ${azure}`,
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
      <main style={{ flex: 1, padding: '28px 26px' }}>
        <header style={{ marginBottom: 18 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 2px' }}>
            {personal.fullName}
          </h1>
          <div style={{ fontSize: 12, color: azure, marginBottom: 8 }}>
            {personal.jobTitle}
          </div>
        </header>

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
                  primaryStyle={{ fontSize: 12, color: azure }}
                  rightStyle={{ color: muted }}
                />
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>
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
                  primaryStyle={{ fontSize: 12, color: azure }}
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
                  primaryStyle={{ fontSize: 12, color: azure }}
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

      <aside
        style={{
          width: '31%',
          background: azure,
          color: '#ffffff',
          padding: '28px 22px',
        }}>
        <ContactList
          items={collectContact(data)}
          style={{
            flexDirection: 'column',
            fontSize: 9.5,
            color: '#ffffff',
            marginBottom: 18,
          }}
        />

        {skills.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div
              style={{
                fontSize: 9.5,
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
                fontSize: 9.5,
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
                fontSize: 9.5,
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
    </div>
  );
};

AzureTemplate.displayName = 'AzureTemplate';

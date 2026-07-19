import type { CSSProperties, FC, ReactNode } from 'react';
import { splitLines } from '../../../utils/text';

interface SectionProps {
  title: string;
  style?: CSSProperties;
  titleStyle?: CSSProperties;
  titleDividerStyle?: CSSProperties;
  children: ReactNode;
}

export const Section: FC<SectionProps> = ({
  title,
  style,
  titleStyle,
  titleDividerStyle,
  children,
}) => (
  <section style={style}>
    <h2
      style={{
        fontSize: 12,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 1.4,
        margin: '0 0 8px',
        ...titleStyle,
      }}>
      {title}
    </h2>
    {titleDividerStyle && <div style={titleDividerStyle} />}
    <div>{children}</div>
  </section>
);

Section.displayName = 'ResumeSection';

interface TextBlockProps {
  text: string;
  style?: CSSProperties;
}

export const TextBlock: FC<TextBlockProps> = ({ text, style }) => (
  <p
    style={{
      margin: '0 0 8px',
      fontSize: 10.5,
      lineHeight: 1.5,
      whiteSpace: 'pre-line',
      ...style,
    }}>
    {text}
  </p>
);

TextBlock.displayName = 'ResumeTextBlock';

interface BulletListProps {
  text: string;
  style?: CSSProperties;
  bulletStyle?: CSSProperties;
  itemStyle?: CSSProperties;
}

export const BulletList: FC<BulletListProps> = ({
  text,
  style,
  bulletStyle,
  itemStyle,
}) => (
  <ul
    style={{
      margin: 0,
      padding: 0,
      listStyle: 'none',
      fontSize: 10.5,
      lineHeight: 1.5,
      ...style,
    }}>
    {splitLines(text).map((line) => (
      <li key={line} style={{ display: 'flex', gap: 6, ...itemStyle }}>
        <span style={{ flexShrink: 0, ...bulletStyle }}>•</span>
        <span style={{ flex: 1 }}>{line}</span>
      </li>
    ))}
  </ul>
);

BulletList.displayName = 'ResumeBulletList';

interface HeaderRowProps {
  primary: string;
  secondary?: string;
  right?: string;
  primaryStyle?: CSSProperties;
  rightStyle?: CSSProperties;
  secondaryStyle?: CSSProperties;
}

export const HeaderRow: FC<HeaderRowProps> = ({
  primary,
  secondary,
  right,
  primaryStyle,
  rightStyle,
  secondaryStyle,
}) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
    <div>
      <div style={{ fontWeight: 700, fontSize: 11, ...primaryStyle }}>
        {primary}
      </div>
      {secondary && (
        <div style={{ fontStyle: 'italic', fontSize: 10, ...secondaryStyle }}>
          {secondary}
        </div>
      )}
    </div>
    {right && (
      <div style={{ fontSize: 10, flexShrink: 0, ...rightStyle }}>{right}</div>
    )}
  </div>
);

HeaderRow.displayName = 'ResumeHeaderRow';

interface ContactProps {
  items: string[];
  style?: CSSProperties;
}

export const ContactList: FC<ContactProps> = ({ items, style }) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      fontSize: 10,
      lineHeight: 1.6,
      ...style,
    }}>
    {items.filter(Boolean).map((item) => (
      <span key={item} style={{ marginRight: 14 }}>
        {item}
      </span>
    ))}
  </div>
);

ContactList.displayName = 'ResumeContactList';

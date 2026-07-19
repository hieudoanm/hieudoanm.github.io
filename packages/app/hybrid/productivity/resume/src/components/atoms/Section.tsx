import type { CSSProperties, FC, ReactNode } from 'react';

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

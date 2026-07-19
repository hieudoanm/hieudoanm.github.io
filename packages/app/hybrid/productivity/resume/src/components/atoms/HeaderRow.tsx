import type { CSSProperties, FC } from 'react';

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

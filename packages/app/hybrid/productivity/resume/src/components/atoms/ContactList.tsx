import type { CSSProperties, FC } from 'react';

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

import type { CSSProperties, FC } from 'react';
import { splitLines } from '../../utils/text';

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

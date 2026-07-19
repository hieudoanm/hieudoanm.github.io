import type { CSSProperties, FC } from 'react';

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

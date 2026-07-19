'use client';

import { getHighlightParts } from '@/lib/highlight';
import type { FC } from 'react';

interface HighlightProps {
  text: string;
  query: string;
}

export const Highlight: FC<HighlightProps> = ({ text, query }) => (
  <>
    {getHighlightParts(text, query).map((part, i) =>
      part.highlight ? (
        <mark key={i} className="bg-primary/30 rounded-[2px]">
          {part.text}
        </mark>
      ) : (
        <span key={i}>{part.text}</span>
      )
    )}
  </>
);

Highlight.displayName = 'Highlight';

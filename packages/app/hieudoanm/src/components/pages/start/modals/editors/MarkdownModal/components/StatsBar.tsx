import { FC, memo } from 'react';

import { Stats } from '../markdownFormatting';

export const StatsBar: FC<{ stats: Stats }> = memo(({ stats }) => (
  <div className="border-base-300 text-base-content/60 flex flex-wrap items-center gap-4 border-t px-3 py-1 text-xs">
    <span>Chars: {stats.characters}</span>
    <span>Chars (no space): {stats.charactersNoSpaces}</span>
    <span>Words: {stats.words}</span>
    <span>Lines: {stats.lines}</span>
    <span>Reading: {stats.readingTime}</span>
  </div>
));

StatsBar.displayName = 'StatsBar';

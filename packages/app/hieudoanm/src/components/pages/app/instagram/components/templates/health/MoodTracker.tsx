import type { FC } from 'react';
import type { TemplateProps } from '../common';

const MOOD_EMOJIS: Record<string, string> = {
  great: '😄',
  good: '🙂',
  okay: '😐',
  low: '😔',
  bad: '😢',
};

export const MoodTracker: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const mood = (data.mood as string) ?? '';
  const note = (data.note as string) ?? '';
  const date = (data.date as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-12 text-center">
      <span className="text-accent mb-2 text-[10px] font-bold tracking-[0.2em] uppercase">
        {title || 'Mood Tracker'}
      </span>
      {date && <p className="text-neutral mb-6 text-xs">{date}</p>}
      <span className="text-6xl">{MOOD_EMOJIS[mood] ?? '😐'}</span>
      <p className="text-base-content mt-4 text-lg font-semibold capitalize">
        {mood || 'Okay'}
      </p>
      {note && (
        <p className="text-neutral mt-4 text-sm leading-relaxed">{note}</p>
      )}
    </div>
  );
};

MoodTracker.displayName = 'MoodTracker';

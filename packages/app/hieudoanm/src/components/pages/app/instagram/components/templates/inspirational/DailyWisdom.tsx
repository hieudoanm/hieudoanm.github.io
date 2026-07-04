import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const DailyWisdom: FC<TemplateProps> = ({ data }) => {
  const wisdom = (data.wisdom as string) ?? '';
  const author = (data.author as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center gap-6 p-12 text-center">
      <svg
        className="text-accent/30 h-8 w-8"
        fill="currentColor"
        viewBox="0 0 24 24">
        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
      </svg>
      <p className="text-base-content text-lg leading-relaxed font-light italic">
        &ldquo;{wisdom}&rdquo;
      </p>
      <p className="text-accent text-xs font-medium">&mdash; {author}</p>
    </div>
  );
};

DailyWisdom.displayName = 'DailyWisdom';

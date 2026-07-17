import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const WritingPrompt: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Writing Prompt';
  const prompt =
    (data.prompt as string) ?? 'Write something inspired by this moment.';
  const genre = (data.genre as string) ?? 'Fiction';
  const difficulty = (data.difficulty as string) ?? 'Intermediate';
  const wordCount = (data.wordCount as string) ?? '500';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-base-content mb-2 text-4xl font-black tracking-tight">
        {title}
      </h1>
      <blockquote className="text-base-content mb-3 max-w-md text-sm leading-relaxed italic">
        &ldquo;{prompt}&rdquo;
      </blockquote>
      <ul className="flex items-center gap-2">
        <li className="badge badge-primary badge-sm">{genre}</li>
        <li className="badge badge-secondary badge-sm">{difficulty}</li>
        <li className="badge badge-outline badge-sm">{wordCount} words</li>
      </ul>
    </div>
  );
};

WritingPrompt.displayName = 'WritingPrompt';

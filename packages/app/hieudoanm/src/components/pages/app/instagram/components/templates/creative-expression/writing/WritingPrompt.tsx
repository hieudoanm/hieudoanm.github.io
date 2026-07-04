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
      <h1 className="text-base-content mb-4 text-2xl font-black tracking-tight">
        {title}
      </h1>
      <p className="text-base-content mb-6 max-w-md text-lg leading-relaxed italic">
        &ldquo;{prompt}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <span className="badge badge-primary badge-sm">{genre}</span>
        <span className="badge badge-secondary badge-sm">{difficulty}</span>
        <span className="badge badge-outline badge-sm">{wordCount} words</span>
      </div>
    </div>
  );
};

WritingPrompt.displayName = 'WritingPrompt';

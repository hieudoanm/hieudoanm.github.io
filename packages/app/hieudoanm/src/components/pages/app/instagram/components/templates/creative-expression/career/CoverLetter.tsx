import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const CoverLetter: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Cover Letter';
  const greeting = (data.greeting as string) ?? '';
  const body = (data.body as string) ?? '';
  const closing = (data.closing as string) ?? '';
  const signature = (data.signature as string) ?? '';

  const paragraphs = body.split('\n').filter((p) => p.trim());

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-primary mb-6 text-3xl font-bold">{title}</h1>
      <div className="text-base-content/80 max-w-lg space-y-4 text-left text-sm leading-relaxed">
        {greeting && <p className="font-medium">{greeting}</p>}
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        {closing && <p className="mt-4">{closing}</p>}
        {signature && (
          <p className="text-primary mt-2 font-semibold italic">{signature}</p>
        )}
      </div>
    </div>
  );
};
CoverLetter.displayName = 'CoverLetter';

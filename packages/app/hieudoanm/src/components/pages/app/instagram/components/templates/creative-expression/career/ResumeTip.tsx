import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const ResumeTip: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Resume Tip';
  const tip = (data.tip as string) ?? '';
  const category = (data.category as string) ?? '';
  const description = (data.description as string) ?? '';
  const examples = (data.examples as string[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-primary mb-2 text-3xl font-bold">{title}</h1>
      <p className="badge badge-accent badge-lg mb-4">{category}</p>
      <p className="text-accent mb-6 text-xl font-semibold italic">"{tip}"</p>
      <p className="text-base-content/80 mb-6 max-w-lg text-sm leading-relaxed">
        {description}
      </p>
      {examples.length > 0 && (
        <ul className="text-base-content/70 space-y-2 text-left text-sm">
          {examples.map((example, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-secondary mt-0.5">▸</span>
              <span>{example}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
ResumeTip.displayName = 'ResumeTip';

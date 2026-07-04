import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const Glossary: FC<TemplateProps> = ({ data }) => {
  const term = (data.term as string) ?? '';
  const definition = (data.definition as string) ?? '';
  const example = (data.example as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col justify-center p-10">
      <div className="mb-4">
        <span className="bg-accent/10 text-accent rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
          Glossary
        </span>
      </div>
      <h1 className="text-base-content mb-6 text-4xl font-bold tracking-tight">
        {term}
      </h1>
      <p className="text-neutral mb-8 max-w-md text-base leading-relaxed">
        {definition}
      </p>
      {example && (
        <div className="rounded-box border-accent/20 bg-accent/5 border p-5">
          <span className="text-accent mb-2 block text-xs font-bold tracking-widest uppercase">
            Example
          </span>
          <p className="text-base-content text-sm leading-relaxed italic">
            {example}
          </p>
        </div>
      )}
    </div>
  );
};

Glossary.displayName = 'Glossary';

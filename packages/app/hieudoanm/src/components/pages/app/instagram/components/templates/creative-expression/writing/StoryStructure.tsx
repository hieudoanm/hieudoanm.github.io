import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface StoryElement {
  name: string;
  description: string;
}

export const StoryStructure: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Story Structure';
  const structure = (data.structure as string) ?? 'Three-Act Structure';
  const description = (data.description as string) ?? '';
  const elements = (data.elements as StoryElement[]) ?? [
    { name: 'Setup', description: 'Introduce characters and world' },
    { name: 'Confrontation', description: 'Rising conflict and stakes' },
    { name: 'Resolution', description: 'Climax and resolution' },
  ];

  const citation = (data.citation as string) ?? '';
  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-base-content mb-0.5 text-4xl font-black tracking-tight">
        {title}
      </h1>
      <p className="text-primary mb-1 text-xs font-semibold tracking-wider uppercase">
        {structure}
      </p>
      {description && (
        <p className="text-neutral mb-3 max-w-sm text-xs leading-relaxed">
          {description}
        </p>
      )}
      <ol className="w-full max-w-sm space-y-2 text-left">
        {elements.map((el, i) => (
          <li key={el.name} className="flex items-start gap-2">
            <span className="badge badge-primary badge-sm mt-0.5 shrink-0">
              {i + 1}
            </span>
            <div>
              <h3 className="text-base-content text-xs font-bold">{el.name}</h3>
              <p className="text-neutral text-xs leading-relaxed">
                {el.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </div>
  );
};

StoryStructure.displayName = 'StoryStructure';

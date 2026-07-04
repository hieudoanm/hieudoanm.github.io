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

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-base-content mb-1 text-2xl font-black tracking-tight">
        {title}
      </h1>
      <p className="text-primary mb-2 text-sm font-semibold tracking-wider uppercase">
        {structure}
      </p>
      {description && (
        <p className="text-neutral mb-6 max-w-sm text-sm leading-relaxed">
          {description}
        </p>
      )}
      <ol className="w-full max-w-sm space-y-3 text-left">
        {elements.map((el, i) => (
          <li key={el.name} className="flex items-start gap-3">
            <span className="badge badge-primary badge-sm mt-0.5 shrink-0">
              {i + 1}
            </span>
            <div>
              <span className="text-base-content text-sm font-bold">
                {el.name}
              </span>
              <p className="text-neutral text-xs leading-relaxed">
                {el.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

StoryStructure.displayName = 'StoryStructure';

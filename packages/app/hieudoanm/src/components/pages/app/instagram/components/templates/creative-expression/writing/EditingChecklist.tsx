import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface ChecklistCategory {
  name: string;
  items: string[];
}

export const EditingChecklist: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Editing Checklist';
  const description = (data.description as string) ?? '';
  const categories = (data.categories as ChecklistCategory[]) ?? [
    {
      name: 'Structure',
      items: ['Clear thesis', 'Logical flow', 'Strong conclusion'],
    },
    {
      name: 'Language',
      items: ['Grammar correct', 'Varied sentence length', 'Active voice'],
    },
  ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-base-content mb-2 text-2xl font-black tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-neutral mb-5 max-w-sm text-sm leading-relaxed">
          {description}
        </p>
      )}
      <div className="w-full max-w-md space-y-4 text-left">
        {categories.map((cat) => (
          <div key={cat.name}>
            <span className="text-base-content mb-2 block text-xs font-bold tracking-wider uppercase">
              {cat.name}
            </span>
            <ul className="space-y-1">
              {cat.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs">
                  <span className="text-success font-bold">&#10003;</span>
                  <span className="text-neutral">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

EditingChecklist.displayName = 'EditingChecklist';

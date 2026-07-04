import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface SkillCategory {
  name: string;
  items: string[];
}

export const Skills: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Skills';
  const categories = (data.categories as SkillCategory[]) ?? [
    {
      name: 'Design',
      items: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'Design Systems'],
    },
    {
      name: 'Development',
      items: ['React', 'TypeScript', 'CSS/Tailwind', 'HTML', 'Git'],
    },
    {
      name: 'Research',
      items: [
        'User Interviews',
        'Usability Testing',
        'A/B Testing',
        'Analytics',
      ],
    },
  ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <span className="text-accent mb-3 text-[10px] font-bold tracking-[0.2em] uppercase">
        {title}
      </span>

      <div className="flex flex-1 flex-col gap-5">
        {categories.map((cat, i) => (
          <div key={i}>
            <span className="text-base-content text-xs font-bold">
              {cat.name}
            </span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {cat.items.map((item, j) => (
                <span
                  key={j}
                  className="bg-accent/10 text-accent rounded px-2 py-1 text-[10px] font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Skills.displayName = 'Skills';

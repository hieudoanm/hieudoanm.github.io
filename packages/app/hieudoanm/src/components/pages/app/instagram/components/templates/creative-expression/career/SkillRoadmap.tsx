import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface SkillLevel {
  level: string;
  description: string;
  duration: string;
}

export const SkillRoadmap: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Skill Roadmap';
  const skill = (data.skill as string) ?? '';
  const levels = (data.levels as SkillLevel[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-primary mb-1 text-3xl font-bold">{title}</h1>
      {skill && <p className="badge badge-primary mb-6">{skill}</p>}
      <div className="flex w-full max-w-md flex-col items-center gap-3">
        {levels.map((item, index) => (
          <div
            key={index}
            className="bg-base-200 flex w-full items-center gap-4 rounded-xl p-4">
            <div className="bg-primary text-primary-content flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold">
              {index + 1}
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <p className="text-primary text-sm font-semibold">
                  {item.level}
                </p>
                <span className="text-base-content/40 text-xs">
                  · {item.duration}
                </span>
              </div>
              <p className="text-base-content/70 text-xs">{item.description}</p>
            </div>
            {index < levels.length - 1 && (
              <div className="text-secondary absolute -mb-8 ml-5 text-xs">
                ↓
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
SkillRoadmap.displayName = 'SkillRoadmap';

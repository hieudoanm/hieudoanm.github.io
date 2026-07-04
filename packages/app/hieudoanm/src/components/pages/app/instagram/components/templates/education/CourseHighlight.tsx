import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const CourseHighlight: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const instructor = (data.instructor as string) ?? '';
  const modules = (data.modules as string[]) ?? [];
  const duration = (data.duration as string) ?? '';
  const level = (data.level as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-12">
      <h1 className="text-base-content text-xl leading-tight font-bold">
        {title}
      </h1>
      {instructor && (
        <p className="text-neutral mt-1 text-xs">by {instructor}</p>
      )}
      <div className="mt-4 flex gap-2">
        {duration && (
          <span className="rounded-box bg-accent/10 text-accent px-3 py-1 text-[10px] font-bold">
            {duration}
          </span>
        )}
        {level && (
          <span className="rounded-box bg-base-300 text-neutral px-3 py-1 text-[10px] font-bold">
            {level}
          </span>
        )}
      </div>
      <div className="mt-5 flex flex-col gap-2">
        {modules.map((mod, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-accent flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
              {i + 1}
            </span>
            <p className="text-base-content text-sm">{mod}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

CourseHighlight.displayName = 'CourseHighlight';

import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const MindMap: FC<TemplateProps> = ({ data }) => {
  const central = (data.central as string) ?? 'Web Dev';
  const branches = (data.branches as { topic: string; detail: string }[]) ?? [
    { topic: 'Frontend', detail: 'React, Vue, Angular' },
    { topic: 'Backend', detail: 'Node, Python, Go' },
    { topic: 'DevOps', detail: 'Docker, K8s, CI/CD' },
  ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-10">
      <div className="bg-primary text-primary-content mb-8 rounded-full px-8 py-3 text-lg font-black">
        {central}
      </div>
      <div className="flex w-full flex-col gap-3">
        {branches.map((b, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="bg-accent/20 h-px w-8" />
            <div className="bg-base-200 flex-1 rounded-lg px-4 py-3">
              <p className="text-base-content text-sm font-bold">{b.topic}</p>
              <p className="text-neutral text-[11px]">{b.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

MindMap.displayName = 'MindMap';

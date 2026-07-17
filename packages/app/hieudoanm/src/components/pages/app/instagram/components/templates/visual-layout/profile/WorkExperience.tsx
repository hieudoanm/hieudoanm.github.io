import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Job {
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

export const WorkExperience: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Work Experience';
  const jobs = (data.jobs as Job[]) ?? [
    {
      company: 'Figma',
      role: 'Senior Product Designer',
      period: '2022 — Present',
      achievements: [
        'Led design system used by 50+ engineers',
        'Shipped 3 major features reaching 2M users',
      ],
    },
    {
      company: 'Stripe',
      role: 'Product Designer',
      period: '2019 — 2022',
      achievements: [
        'Redesigned checkout flow increasing conversion 18%',
        'Built and mentored design guild of 8 designers',
      ],
    },
  ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <span className="text-accent mb-2 text-xs font-bold tracking-[0.2em] uppercase">
        {title}
      </span>

      <div className="flex flex-1 flex-col gap-1">
        {jobs.map((job, i) => (
          <div key={i}>
            <div className="flex items-baseline justify-between">
              <span className="text-base-content text-xs font-bold">
                {job.role}
              </span>
              <span className="text-neutral text-xs">{job.period}</span>
            </div>
            <span className="text-accent text-xs font-semibold">
              {job.company}
            </span>
            <div className="mt-1 flex flex-col gap-1">
              {job.achievements.map((a, j) => (
                <div key={j} className="flex items-start gap-1">
                  <span className="bg-accent mt-1 h-1 w-1 flex-shrink-0 rounded-full" />
                  <span className="text-base-content text-xs leading-relaxed">
                    {a}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

WorkExperience.displayName = 'WorkExperience';

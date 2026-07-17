import type { FC } from 'react';
import { useMemo } from 'react';
import type { TemplateProps } from '../../common';

interface Degree {
  institution: string;
  degree: string;
  field: string;
  period: string;
  location?: string;
  gpa?: string;
  highlights?: string[];
}

export const Education: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Education';
  const degrees = (data.degrees as Degree[]) ?? [
    {
      institution: 'Stanford University',
      degree: 'M.S.',
      field: 'Computer Science',
      period: '2017 — 2019',
      location: 'Stanford, CA',
      gpa: '3.9',
      highlights: [
        'Focus: Human-Computer Interaction',
        'Teaching Assistant for CS 147',
      ],
    },
    {
      institution: 'UC Berkeley',
      degree: 'B.S.',
      field: 'Cognitive Science',
      period: '2013 — 2017',
      location: 'Berkeley, CA',
      gpa: '3.8',
      highlights: ['Minor in Design Innovation'],
    },
  ];

  const gapClass = useMemo(() => {
    const count = degrees.length;
    if (count <= 1) return 'gap-3';
    if (count === 2) return 'gap-2';
    if (count === 3) return 'gap-1';
    return 'gap-2';
  }, [degrees.length]);

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <span className="text-primary mb-2 text-xs font-bold tracking-[0.2em] uppercase">
        {title}
      </span>

      <div
        className={`divide-base-300 flex flex-1 flex-col divide-y ${gapClass} `}>
        {degrees.map((d, i) => (
          <div key={i} className="pb-2">
            <span className="text-base-content text-xs font-bold">
              🎓 {d.degree} {d.field}
            </span>
            <div>
              <span className="text-accent text-xs font-semibold">
                {d.institution}
              </span>
              {d.location && (
                <span className="text-neutral ml-2 text-xs">{d.location}</span>
              )}
            </div>
            {d.gpa && <div className="text-neutral text-xs">GPA: {d.gpa}</div>}
            {d.period && <div className="text-neutral text-xs">{d.period}</div>}
            {d.highlights && d.highlights.length > 0 && (
              <div className="mt-1 flex flex-col gap-1">
                {d.highlights.map((h, j) => (
                  <div key={j} className="flex items-start gap-1">
                    <span className="bg-accent mt-1 h-1 w-1 flex-shrink-0 rounded-full" />
                    <span className="text-base-content text-xs leading-relaxed">
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Education.displayName = 'Education';

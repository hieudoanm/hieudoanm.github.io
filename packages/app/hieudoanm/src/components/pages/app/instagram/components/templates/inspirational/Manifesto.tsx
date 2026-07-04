import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const Manifesto: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const principles = (data.principles as string[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <h1 className="text-base-content mb-6 text-2xl font-bold tracking-tight">
        {headline}
      </h1>
      <ul className="flex flex-1 flex-col justify-center gap-4">
        {principles.map((p, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="bg-accent/20 text-accent mt-0.5 h-5 w-5 flex-shrink-0 rounded-full p-1 text-xs">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="text-neutral text-sm leading-relaxed">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

Manifesto.displayName = 'Manifesto';
